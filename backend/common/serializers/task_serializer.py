from rest_framework import serializers
from common.models import (
    Task,
    TaskUser
)

class TaskSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateTimeField(required=True, allow_null=False, format="%d/%m/%Y %H:%M")
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'expiration_date', 'status', 'priority']
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        task_user = TaskUser.objects.filter(task=instance).first()
        data['responsible'] = task_user.user.nome
        return data
        