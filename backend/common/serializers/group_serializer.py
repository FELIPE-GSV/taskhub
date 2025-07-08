from rest_framework import serializers
from common.models import Group, GroupMember, TaskUser


class GroupMemberSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = GroupMember
        fields = ['id', 'name', 'avatar', 'role']

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip()

    def get_avatar(self, obj):
        request = self.context.get('request')
        if obj.user.profile_picture:
            url = obj.user.profile_picture.url
            if request is not None:
                return request.build_absolute_uri(url)
            return url
        return None


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