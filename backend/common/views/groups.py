from rest_framework import viewsets, permissions
from common.models import Group, GroupMember, CustomUser, Notification
from common.serializers.group_serializer import GroupSerializer
from rest_framework.response import Response
from rest_framework import status
from common.enum import RoleMemberGroupEnum, NotificationTypeEnum, InviteStatusEnum
from django.db.models import Case, When, Value, IntegerField
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError


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
