from rest_framework import serializers
from common.models import (
    Task
)

class TaskSerializer(serializers.ModelSerializer):
    expiration_date = serializers.DateTimeField(required=True, allow_null=False)
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'expiration_date', 'status']
        
