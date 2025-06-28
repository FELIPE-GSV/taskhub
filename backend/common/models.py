from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from  common.managers.user_manager import CustomUserManager
from common.enum import StatusTask
from common.mixin import TrackableMixin


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

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