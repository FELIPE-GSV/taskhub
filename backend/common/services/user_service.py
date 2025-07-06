from common.models import CustomUser, TaskUser
from typing import Optional
from django.utils import timezone
from common.serializers.task_serializer import TaskSerializer


class UserService:
    def __init__(self, *, user: Optional[CustomUser]):
        self.user = user

    def calculates_weekly_productivity(self):
        today = timezone.now()
        start_of_week = today - timezone.timedelta(days=today.weekday())
        end_of_week = start_of_week + timezone.timedelta(days=7)
        weekly_tasks_qs = TaskUser.objects.filter(
            user=self.user,
            task__created_at__gte=start_of_week,
            task__created_at__lt=end_of_week,
        )
        weekly_total = weekly_tasks_qs.count()
        weekly_done = weekly_tasks_qs.filter(task__status=3).count()

        weekly_progress_percent = (
            (weekly_done / weekly_total) * 100 if weekly_total > 0 else 0
        )
        
        return weekly_progress_percent
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
        
        weekly_progress_percent = self.calculates_weekly_productivity()

        return {
            "total_tasks": total_tasks,
            "tasks_done": tasks_done,
            "tasks_in_progress": tasks_in_progress,
            "tasks_pending": tasks_pending,
            "last_tasks": serializer.data,
            "weekly_progress": round(weekly_progress_percent, 2)
        }
