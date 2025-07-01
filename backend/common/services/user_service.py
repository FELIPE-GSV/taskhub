from common.models import CustomUser, TaskUser
from typing import Optional
from django.utils import timezone
from common.serializers.task_serializer import TaskSerializer


class UserService:
    def __init__(self, *, user: Optional[CustomUser]):
        self.user = user

    def return_data_dashboard(self):
        total_tasks = TaskUser.objects.filter(user=self.user).count()
        tasks_done = (
            TaskUser.objects.filter(user=self.user).filter(task__status=3).count()
        )
        tasks_in_progress = (
            TaskUser.objects.filter(user=self.user).filter(task__status=2).count()
        )
        tasks_pending = (
            TaskUser.objects.filter(
                user=self.user,
                task__expiration_date__lt=timezone.now(),
            )
            .exclude(task__status=3)
            .count()
        )
        tasks_to_serialize = []
        latest_tasks = TaskUser.objects.filter(user=self.user).order_by("-id")[:4]
        for task in latest_tasks:
            tasks_to_serialize.append(task.task)

        serializer = TaskSerializer(tasks_to_serialize, many=True)

        return {
            "total_tasks": total_tasks,
            "tasks_done": tasks_done,
            "tasks_in_progress": tasks_in_progress,
            "tasks_pending": tasks_pending,
            "last_tasks": serializer.data,
        }
