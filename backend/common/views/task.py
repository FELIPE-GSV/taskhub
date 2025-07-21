from rest_framework import viewsets, permissions
from common.models import (
    Task,
    TaskUser
)
from common.serializers.task_serializer import TaskSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from rest_framework.decorators import action

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.order_by("-id").all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = TaskSerializer(data=data, context={"request": self.request})
        if serializer.is_valid():
            task = serializer.save(created_by=request.user, updated_by=request.user)
            user = request.user
            TaskUser.objects.create(user=user, task=task)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(
        detail=False,
        methods=['GET'],
        url_path='user-tasks',
        url_name='user_tasks',
    )
    def user_tasks(self, request, pk=None):
        user = request.user

        title = request.query_params.get('title')
        status_param = request.query_params.get('status')
        priority_param = request.query_params.get('priority')
        task_users_qs = TaskUser.objects.filter(user=user).select_related("task")
        tasks = Task.objects.filter(id__in=task_users_qs.values_list("task_id", flat=True))
        if title:
            tasks = tasks.filter(title__icontains=title)
        if status_param and status_param != '0':
            tasks = tasks.filter(status=status_param)
        if priority_param and priority_param != '0':
            tasks = tasks.filter(priority=priority_param)
            
        data_return = tasks.order_by('-id')

        serializer = TaskSerializer(data_return, many=True, context={'request': request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        task_remote_to_delete = TaskUser.objects.filter(task=instance).first()
        task_remote_to_delete.delete()
        instance.delete()
        return Response(data={"message": "Tarefa excluida com sucesso!"},status=status.HTTP_200_OK)    