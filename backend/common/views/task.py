from rest_framework import viewsets, permissions
from common.models import (
    Task,
    TaskUser
)
from common.serializers.task_serializer import TaskSerializer
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import action

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            task = serializer.save(created_by=request.user, updated_by=request.user)
            user = request.user
            TaskUser.objects.create(user=user, task=task)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        