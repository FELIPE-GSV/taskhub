# accounts/serializers.py
from rest_framework import serializers
from common.models import (
    CustomUser,
    Task
)

from common.serializers.task_serializer import TaskSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'nome', 'password')

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        tasks = Task.objects.filter(task_user__user=instance).distinct()
        data['tasks'] = TaskSerializer(tasks, many=True).data
        return data        
