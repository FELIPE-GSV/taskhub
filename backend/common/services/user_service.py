from common.models import CustomUser, TaskUser
from typing import Optional
from django.utils import timezone
from common.serializers.task_serializer import TaskSerializer
import random


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

    def get_random_message(self, key: str, value: int) -> str:
        now = timezone.now()
        start_of_week = now - timezone.timedelta(days=now.weekday())
        yesterday = now - timezone.timedelta(days=1)

        if key == "total_tasks":
            created_yesterday = TaskUser.objects.filter(
                user=self.user,
                task__created_at__date=yesterday.date()
            ).exists()

            created_this_week = TaskUser.objects.filter(
                user=self.user,
                task__created_at__gte=start_of_week
            ).count()

            if created_yesterday:
                return "Você criou uma nova tarefa ontem. Mantenha o ritmo! 💪"
            elif created_this_week > 1:
                return f"Você criou {created_this_week} tarefas esta semana. Excelente produtividade! 🚀"
            else:
                return "Vamos começar a semana com foco e organização! ✨"

        elif key == "tasks_pending":
            if value == 0:
                return "Nenhuma pendência no momento."

            from django.db.models import Count, DateField
            from django.db.models.functions import TruncDate

            grouped = (
                TaskUser.objects
                .filter(
                    user=self.user,
                    task__expiration_date__lt=timezone.now(),
                )
                .exclude(task__status=3)
                .annotate(expired_day=TruncDate("task__expiration_date"))
                .values("expired_day")
                .annotate(total=Count("id"))
                .order_by("-total")
            )

            if grouped and grouped[0]["total"] > 1:
                expired_date = grouped[0]["expired_day"]
                days_ago = (timezone.now().date() - expired_date).days
                return (
                    f"{grouped[0]['total']} tarefas venceram há {days_ago} dias. "
                )

            messages = [
                f"Você tem {value} pendências vencidas.",
                f"Atenção: {value} tarefas estão atrasadas!",
                f"{value} tarefas precisam de atenção urgente."
            ]
            return random.choice(messages)

        messages = {
            "tasks_done": [
                f"Parabéns! Você concluiu {value} tarefas.",
                f"{value} tarefas finalizadas. Continue assim!",
                f"Progresso visível: {value} tarefas concluídas."
            ],
            "tasks_in_progress": [
                f"Você está trabalhando em {value} tarefas agora.",
                f"{value} tarefas em andamento. Foco total!",
                f"Atenção: {value} tarefas ainda em execução."
            ]
        }

        options = messages.get(key, [])
        return random.choice(options) if options else ""


    def return_data_dashboard(self):
        now = timezone.now()

        total_tasks = TaskUser.objects.filter(user=self.user).count()
        tasks_done = TaskUser.objects.filter(user=self.user, task__status=3).count()
        tasks_in_progress = TaskUser.objects.filter(
            user=self.user, task__status=2
        ).count()
        tasks_pending = (
            TaskUser.objects.filter(
                user=self.user,
                task__expiration_date__lt=now,
            )
            .exclude(task__status=3)
            .count()
        )

        latest_tasks = TaskUser.objects.filter(user=self.user).order_by("-id")[:4]
        tasks_to_serialize = [task.task for task in latest_tasks]
        serializer = TaskSerializer(tasks_to_serialize, many=True)

        weekly_progress_percent = self.calculates_weekly_productivity()

        return {
            "total_tasks": {
                "message": self.get_random_message("total_tasks", total_tasks),
                "tasks": total_tasks,
            },
            "tasks_done": {
                "message": self.get_random_message("tasks_done", tasks_done),
                "tasks": tasks_done,
            },
            "tasks_in_progress": {
                "message": self.get_random_message(
                    "tasks_in_progress", tasks_in_progress
                ),
                "tasks": tasks_in_progress,
            },
            "tasks_pending": {
                "message": self.get_random_message("tasks_pending", tasks_pending),
                "tasks": tasks_pending,
            },
            "last_tasks": serializer.data,
            "weekly_progress": round(weekly_progress_percent, 2),
        }
