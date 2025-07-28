from rest_framework import viewsets, permissions
from common.models import Group, GroupMember, CustomUser, Notification, Task, TaskUser
from common.serializers.group_serializer import GroupSerializer, TaskGroupSerializer
from common.serializers.user_serializer import UserMemberGroupSerializer
from rest_framework.response import Response
from rest_framework import status
from common.enum import RoleMemberGroupEnum, NotificationTypeEnum, InviteStatusEnum, TaskGroupStatusEnum
from django.db.models import Case, When, Value, IntegerField
from rest_framework.decorators import action
from common.services.group_service import GroupService
from django.db import transaction
from common.types import TaskGroupData

class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        params = self.request.query_params
        name_filter = params.get("name")
        privacy_filter = params.get("privacy")
        group_memberships = GroupMember.objects.filter(user=user)
        user_group_ids = group_memberships.values_list("group_id", flat=True)
        queryset = Group.objects.filter(id__in=user_group_ids).select_related(
            "created_by"
        )

        if name_filter:
            queryset = queryset.filter(name__icontains=name_filter)

        if privacy_filter and not privacy_filter == "all":
            queryset = queryset.filter(privacy=privacy_filter)

        queryset = queryset.annotate(
            is_admin=Case(
                When(
                    id__in=GroupMember.objects.filter(
                        user=user, role=RoleMemberGroupEnum.ADMIN
                    ).values_list("group_id", flat=True),
                    then=Value(0),
                ),
                default=Value(1),
                output_field=IntegerField(),
            )
        ).order_by("is_admin", "-id")

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(
            queryset, many=True, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data.copy()
        name = data.get("name")
        description = data.get("description", "")
        privacy = data.get("privacy", "private")
        user_ids = data.get("user_ids", [])
        message = data.get("message", "")

        group = Group.objects.create(
            name=name, description=description, privacy=privacy, created_by=user
        )
        GroupMember.objects.create(
            group=group, user=user, role=RoleMemberGroupEnum.ADMIN
        )
        for uid in user_ids:
            try:
                target_user = CustomUser.objects.get(id=uid)
                if target_user.id == user.id:
                    continue

                Notification.objects.create(
                    receiver=target_user,
                    sender=user,
                    title="Convite",
                    message=f"{user.first_name} convidou você para o grupo {group.name}.",
                    type=NotificationTypeEnum.GROUP_INVITE,
                    read=False,
                    message_invite=message,
                    group=group,
                    invite_status=InviteStatusEnum.PENDING,
                )
            except CustomUser.DoesNotExist:
                continue

        serializer = self.get_serializer(group)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(
        detail=False,
        url_path="accept-invite",
        url_name="accept_invite",
        methods=["PATCH"],
    )
    def accept_invite(self, request):
        id_group = request.data.get("id_group")
        id_notification = request.data.get("id_notification")
        user = request.user
        group = Group.objects.filter(id=id_group).first()
        if GroupMember.objects.filter(
            group=group,
            user=user,
        ).exists():
           return Response(
                {"detail": "Você já faz parte deste grupo."},
                status=status.HTTP_400_BAD_REQUEST
            )

        GroupMember.objects.create(
            group=group, user=user, role=RoleMemberGroupEnum.MEMBER
        )
        notification = Notification.objects.filter(id=id_notification).first()
        notification.invite_status = InviteStatusEnum.ACCEPTED
        notification.save()
        message = f"{user.first_name} aceitou o convite para o grupo {group.name}."
        Notification.objects.create(
            receiver=notification.sender,
            sender=None,
            title="Aviso",
            message=message,
            type=NotificationTypeEnum.REMINDER,
            read=False,
        )

        return Response(
            data={"success": "Convite aceito com sucesso!"}, status=status.HTTP_200_OK
        )

    @action(
        detail=False,
        url_path="decline-invite",
        url_name="decline_invite",
        methods=["PATCH"],
    )
    def decline_invite(self, request):
        id_notification = request.data.get("id_notification")
        notification = Notification.objects.filter(id=id_notification).first()
        notification.invite_status = InviteStatusEnum.DECLINED
        notification.save()

        return Response(
            data={"success": "Convite recusado com sucesso!"}, status=status.HTTP_200_OK
        )

    @action(
        detail=True,
        url_path="invite-members-group",
        url_name="invite_members_group",
        methods=["POST"],
    )
    def invite_members_group(self, request, pk=None):
        group = self.get_object()
        users = request.data.get("users")
        message = request.data.get("message")
        for user in users:
            user_instance = CustomUser.objects.filter(id=user).first()
            if GroupMember.objects.filter(
                group=group,
                user=user_instance,
            ).exists():
                return Response(
                    {"detail": f"O usuário {user_instance.first_name} já faz parte do grupo."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            Notification.objects.create(
                receiver=CustomUser.objects.get(id=user),
                sender=request.user,
                title="Convite",
                message=f"{request.user.first_name} convidou você para o grupo {group.name}.",
                type=NotificationTypeEnum.GROUP_INVITE,
                read=False,
                message_invite=message,
                group=group,
                invite_status=InviteStatusEnum.PENDING,
            )
        return Response(
            data={"success": "Convite enviado com sucesso!"}, status=status.HTTP_200_OK
        )

    @action(
        detail=True,
        url_path="leave-group",
        url_name="leave_group",
        methods=["DELETE"],
    )
    def leave_group(self, request, pk=None):
        group = self.get_object()
        user = request.user
        GroupMember.objects.filter(group=group, user=user).delete()
        return Response(
            data={"success": "Saiu do grupo com sucesso!"}, status=status.HTTP_200_OK
        )

    @action(
        detail=True,
        methods=['POST'],
        url_path='create-task-group',
        url_name='create_task_group',
    )
    @transaction.atomic
    def create_task_group(self, request, pk=None):
        group = self.get_object()
        task_group_data = TaskGroupData(**request.data)
        service = GroupService(
            task_group_data=task_group_data,
            group=group,
            user=request.user,
            request=request
        )
        service.init_task_group()
        return Response(
            data={"success": "Tarefa criada com sucesso!"}, status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=["get"], url_path="tasks")
    def list_group_tasks(self, request, pk=None):
        group = self.get_object()
        task_ids = TaskUser.objects.filter(group=group).values_list('task_id', flat=True).distinct()
        tasks = Task.objects.filter(id__in=task_ids).order_by('-id')
        serializer = TaskGroupSerializer(tasks, many=True, context={'request': request, 'group': group})
        return Response(serializer.data)
    
    @action(detail=True, methods=["PATCH"], url_path="toggle-task-group")
    def init_task_group(self, request, pk=None):
        is_in_progress = request.query_params.get("is_in_progress")
        group = self.get_object()
        data = request.data
        task = Task.objects.filter(id=data['task_id']).first()
        task_user = TaskUser.objects.filter(task=task, user=request.user, group=group).first()
        if is_in_progress:
            task_user.status_task = TaskGroupStatusEnum.IN_PROGRESS  
        else:
            task_user.status_task = TaskGroupStatusEnum.DONE
        
        task_user.save()

        return Response(
            data={"success": "Tarefa atualizada com sucesso!"}, status=status.HTTP_200_OK
        )
        
    @action(
        detail=True,
        methods=["DELETE"],
        url_path="delete-task-group",
        url_name="delete_task_group",
    )
    def delete_task_group(self, request, pk=None):
        group = self.get_object()
        group_member = GroupMember.objects.filter(group=group, user=request.user).first()
        if int(group_member.role) != RoleMemberGroupEnum.ADMIN.value:
            return Response(
                data={"detail": "Apenas o administrador pode deletar tarefas."}, status=status.HTTP_400_BAD_REQUEST
            )
            
        task = request.query_params.get("task_id")
        service = GroupService(
            group=group,
            task=Task.objects.filter(id=task).first(),
            user=request.user,
            request=request
        )
        service.delete_task_group()
        return Response(
            data={"success": "Tarefa deletada com sucesso!"}, status=status.HTTP_200_OK
        )
        
    @action(
        detail=True,
        methods=["GET"],
        url_path="get-users-group",
        url_name="get_users_group",
    )
    def get_users_group(self, request, pk=None):
        group = self.get_object()
        group_members = GroupMember.objects.filter(group=group)
        members_instances = None
        
        for member in group_members:
            if members_instances is None:
                members_instances = [member.user]
            else:
                members_instances.append(member.user)
        serializer = UserMemberGroupSerializer(members_instances, many=True, context={"request": request, "group": group})
        return Response(serializer.data)
    
    @action(
        detail=True,
        methods=["PATCH"],
        url_path="change-role-member",
        url_name="change_role_member",
    )
    def change_role_group(self, request, pk=None):
        group = self.get_object()
        data = request.data
        group_member = GroupMember.objects.filter(group=group, user=data["id_user"]).first()
        print(group_member.role)
        if int(group_member.role) == RoleMemberGroupEnum.ADMIN.value:
            group_member.role = RoleMemberGroupEnum.MEMBER.value
        else:
            group_member.role = RoleMemberGroupEnum.ADMIN.value
        
        group_member.save()

        return Response(
            data={"success": "Cargo alterado com sucesso!"}, status=status.HTTP_200_OK
        )
    
    @action(
        detail=True,
        methods=["DELETE"],
        url_path="remove-user-group",
        url_name="remover_user_group",
    )
    def remove_user_group(self, request, pk=None):
        group = self.get_object()
        id_user = request.query_params.get("id_user")
        group_member = GroupMember.objects.filter(group=group, user=int(id_user)).first()
        group_member.delete()
        return Response(
            data={"success": "Usuário removido com sucesso!"}, status=status.HTTP_200_OK
        )
        