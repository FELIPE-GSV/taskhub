from typing import Optional
from common.types import TaskGroupData
from common.models import Group, CustomUser, Task, TaskUser, Notification
from common.serializers.task_serializer import TaskSerializer
from common.enum import NotificationTypeEnum, InviteStatusEnum
from rest_framework.request import Request

class GroupService:
    
    def __init__(
        self,
        *,
        task_group_data: Optional[TaskGroupData],
        group: Optional[Group],
        task_return: Optional[Task] = None,
        user: Optional[CustomUser],
        request: Optional[Request] = None
    ):
        self.task_group_data = task_group_data
        self.group = group
        self.task_return = task_return
        self.user = user
        self.request = request
        
        
    def create_task_group(self):
        data_task = {
            "title": self.task_group_data.title,
            "description": self.task_group_data.description,
            "expiration_date": self.task_group_data.expiration_date,
            "status": self.task_group_data.status,
            "priority": self.task_group_data.priority,
            "created_by": self.user
        }
        task_serializer = TaskSerializer(data=data_task, context={"request": self.request})
        if task_serializer.is_valid():
            task = task_serializer.save()
            self.task_return = task
            for user in self.task_group_data.assignedTo:
                user_instance = CustomUser.objects.filter(id=user).first()
                TaskUser.objects.create(task=task, user=user_instance, group=self.group)
                
    def create_notifications_user(self):
        for id_user in self.task_group_data.assignedTo:
            user_instance = CustomUser.objects.filter(id=id_user).first()
            if user_instance == self.user:
                continue
            Notification.objects.create(
                receiver=user_instance,
                sender=self.user,
                title="Tarefa",
                message=f"{self.user.first_name} atribuiu a você uma nova tarefa para o grupo {self.group.name}.",
                type=NotificationTypeEnum.REMINDER,
                read=False,
                group=self.group,
                invite_status=InviteStatusEnum.NO_INVITE
            )
            
    def init_task_group(self):
        self.create_task_group()
        self.create_notifications_user()
        
    