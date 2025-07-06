from rest_framework import serializers
from common.models import (
    Task,
    TaskUser
)
from datetime import datetime

class TaskSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateTimeField(required=True, allow_null=False, format="%d/%m/%Y %H:%M")
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'expiration_date','status']
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        task_user = TaskUser.objects.filter(task=instance).first()
        data['responsible'] = f'{task_user.user.first_name} {task_user.user.last_name}'
        
        if instance.priority == 1:
            data['priority'] = {
                'id': instance.priority,
                'label': 'Baixa'
            }
        elif instance.priority == 2:
            data['priority'] = {
                'id': instance.priority,
                'label': 'Média'
            }
        elif instance.priority == 3:
            data['priority'] = {
                'id': instance.priority,
                'label': 'Alta'
            }
        
        return data
        