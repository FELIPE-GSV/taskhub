# accounts/serializers.py
from rest_framework import serializers
from common.models import (
    CustomUser,
    TaskUser,
    GroupMember
)

from common.serializers.task_serializer import TaskSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = (
            'id', 'email', 'first_name', 'last_name', 'password',
            'bio', 'phone', 'profile_picture'
        )

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['profile_picture'] = f'http://localhost:8000/media/{instance.profile_picture}'
        return data
    
    
class UserMemberGroupSerializer(serializers.ModelSerializer):
    
    avatar = serializers.SerializerMethodField()
    total_tasks = serializers.SerializerMethodField()
    completed_tasks = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    is_creator = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'first_name',
            'last_name',
            'avatar',
            'email',
            'total_tasks',
            'completed_tasks',
            'role',
            'is_creator'
        ]
        
    def get_is_creator(self, obj):
        group = self.context.get("group")
        if group.created_by.id == obj.id:
            return True
        return False
        
    def get_total_tasks(self, obj):
        group = self.context.get("group")
        return TaskUser.objects.filter(user=obj, group=group).count()
    
    def get_role(self, obj):
        group = self.context.get("group")
        return GroupMember.objects.filter(user=obj, group=group).first().role
    
    def get_completed_tasks(self, obj):
        group = self.context.get("group")
        return TaskUser.objects.filter(user=obj, group=group, status_task=3).count()
        
    def get_avatar(self, obj):
        request = self.context.get("request")
        return (
            request.build_absolute_uri(obj.profile_picture.url)
            if obj.profile_picture and request
            else None
        )
    
