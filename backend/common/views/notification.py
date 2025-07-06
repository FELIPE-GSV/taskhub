from rest_framework import viewsets, permissions
from common.models import Notification, TaskUser
from common.serializers.notification_serializer import NotificationSerializer
from django.utils import timezone
from common.enum import NotificationTypeEnum
from rest_framework.response import Response
from rest_framework import status
from django.db import models
from rest_framework.decorators import action


class NotificationViewSet(viewsets.ModelViewSet):

    queryset = Notification.objects.order_by("-id").all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return (
            Notification.objects.filter(receiver=user)
            .annotate(
                priority=models.Case(
                    models.When(read=False, then=0),
                    models.When(read=True, then=1),
                    output_field=models.IntegerField(),
                )
            )
            .order_by("priority", "-id")
        )

    def list(self, request, *args, **kwargs):
        user = request.user
        today = timezone.now().date()
        tasks_today = TaskUser.objects.filter(
            user=user, task__expiration_date__date=today
        ).exclude(task__status=3)
        for task_user in tasks_today:
            task_title = task_user.task.title
            message = f"A tarefa '{task_title}' está vencendo hoje."
            if not Notification.objects.filter(receiver=user, message=message).exists():
                Notification.objects.create(
                    receiver=user,
                    sender=None,
                    title="Prazo se encerrando",
                    message=message,
                    type=NotificationTypeEnum.REMINDER,
                    read=False,
                )

        queryset = Notification.objects.filter(receiver=user).order_by(
            models.Case(
                models.When(read=False, then=0),
                models.When(read=True, then=1),
                output_field=models.IntegerField(),
            ),
            "-id",
        )
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=["PATCH"],
        url_path="read-notification",
        url_name="read_notification",
    )
    def read_notification(self, request, pk=None):
        notification = self.get_object()
        notification.read = True
        notification.save()
        serializer = NotificationSerializer(notification)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
