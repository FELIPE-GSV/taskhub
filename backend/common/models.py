from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from  common.managers.user_manager import CustomUserManager
from common.enum import StatusTask, PriorityTaskEnum, NotificationTypeEnum
from common.mixin import TrackableMixin


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
class Task(TrackableMixin):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expiration_date = models.DateTimeField(null=True)
    status = models.IntegerField(
        choices=StatusTask.choices, default=1
    )
    priority = models.IntegerField(
        choices=PriorityTaskEnum.choices, default=1
    )
    

    def __str__(self):
        return self.title
    
class TaskUser(TrackableMixin):
    user = models.ForeignKey(
        "CustomUser",
        on_delete=models.CASCADE,
        related_name="user_task"
    )
    task = models.ForeignKey(
        "Task",
        on_delete=models.CASCADE,
        related_name="task_user"
    )
    
    
class Notification(TrackableMixin):
    receiver = models.ForeignKey(
        "CustomUser",
        on_delete=models.CASCADE,
        related_name="user_notification"
    )
    sender = models.ForeignKey(
        "CustomUser",
        on_delete=models.CASCADE,
        related_name="sender_notification",
        null=True,
        blank=True
    )
    message = models.TextField()
    title = models.CharField(max_length=100)
    type = models.IntegerField(
        choices=NotificationTypeEnum.choices,
        default=1
    )
    read = models.BooleanField(default=False)