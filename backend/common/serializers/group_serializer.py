from rest_framework import serializers
from common.models import Group, GroupMember, TaskUser, Task
from datetime import datetime

class GroupMemberSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    id_user = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = GroupMember
        fields = ['id', 'name', 'avatar', 'role', 'id_user', 'email']

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip()
    
    def get_email(self, obj):
        return obj.user.email

    def get_avatar(self, obj):
        request = self.context.get('request')
        if obj.user.profile_picture:
            url = obj.user.profile_picture.url
            if request is not None:
                return request.build_absolute_uri(url)
            return url
        return None

    def get_id_user(self, obj):
        return obj.user.id

class GroupSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    tasksCount = serializers.SerializerMethodField()
    completedTasks = serializers.SerializerMethodField()
    createdAt = serializers.DateTimeField(source='created_at', format='%Y-%m-%dT%H:%M:%S')
    creatorId = serializers.IntegerField(source='created_by.id')

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'privacy', 'createdAt', 'members', 'completedTasks', 'tasksCount', 'creatorId']

    def get_members(self, obj):
        members = GroupMember.objects.filter(group=obj).select_related('user')
        return GroupMemberSerializer(members, many=True, context=self.context).data

    def get_tasksCount(self, obj):
        return TaskUser.objects.filter(group=obj).count()

    def get_completedTasks(self, obj):
        return TaskUser.objects.filter(group=obj, task__status=3).count()
    
class TaskGroupSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    daysLate = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'daysLate', 'members', 'priority', 'created_by']

    def get_members(self, obj):
        request = self.context.get("request")
        group = self.context.get('group')
        task_users = TaskUser.objects.filter(task=obj, group=group).select_related('user')
        return [
            {
                "id": tu.user.id,
                "name": f"{tu.user.first_name} {tu.user.last_name}".strip(),
                "email": tu.user.email,
                "status_task": tu.status_task,
                "avatar": (
                    request.build_absolute_uri(tu.user.profile_picture.url)
                    if tu.user.profile_picture and request
                    else None
                )
            }
            for tu in task_users
        ]

    def get_daysLate(self, obj):
        if obj.expiration_date:
            now = datetime.now(obj.expiration_date.tzinfo)
            delta = obj.expiration_date - now

            if delta.days > 0:
                return f"Vence em {delta.days} dias"
            elif delta.days == 0:
                return "Vence hoje"
            else:
                return f"{abs(delta.days)} dias vencida"
        return "Sem data de vencimento"

    def get_status(self, obj):
        group = self.context.get('group')
        task_users = TaskUser.objects.filter(task=obj, group=group)

        if not task_users.exists():
            return "Não iniciada"

        status_list = list(task_users.values_list('status_task', flat=True))

        if all(status == 3 for status in status_list):
            return {
                "status": "Concluida",
                "id": 3
            }
        elif any(status == 2 for status in status_list):
            return {
                "status": "Em andamento",
                "id": 2
            }
        else:
            return {
                "status": "A fazer",
                "id": 1
            }