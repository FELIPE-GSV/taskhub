from rest_framework import serializers
from common.models import (
    Task,
    TaskUser
)
from datetime import datetime

class TaskSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateTimeField(required=True, allow_null=False, format="%d/%m/%Y %H:%M")
    created_by = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'expiration_date','status', 'priority', 'created_by']
        
    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['created_by'] = request.user
        return super().create(validated_data)
        
    def get_created_by(self, obj):
        if obj.created_by:
            return f'{obj.created_by.first_name} {obj.created_by.last_name}'
        return None
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = self.context.get('request').user
        task_user = TaskUser.objects.filter(task=instance, user=user).first()
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
        