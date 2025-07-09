from rest_framework import serializers
from common.models import Notification
from common.enum import NotificationTypeEnum
from django.utils.timezone import now


class NotificationSerializer(serializers.ModelSerializer):
    type_display = serializers.SerializerMethodField()
    sender_name = serializers.SerializerMethodField()
    sender = serializers.SerializerMethodField()
    time_since_created = serializers.SerializerMethodField()
    group = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            "id",
            "receiver",
            "sender",
            "sender_name",
            "title",
            "message",
            "type",
            "type_display",
            "read",
            "created_at",
            "time_since_created",
            "group",
            "message_invite",
            "accepted_invite",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "sender_name",
            "type_display",
            "time_since_created",
            "group",
        ]

    def get_type_display(self, obj):
        return NotificationTypeEnum(obj.type).name.replace("_", " ").title()

    def get_group(self, obj):
        if obj.group:
            return {"id": obj.group.id, "name": obj.group.name}
        return None

    def get_sender_name(self, obj):
        if obj.sender:
            return f"{obj.sender.first_name} {obj.sender.last_name}".strip()
        return None

    def get_sender(self, obj):
        if obj.sender:
            return {
                "id": obj.sender.id,
                "profile_foto": f"http://localhost:8000/media/{obj.sender.profile_picture}",
            }
        return None

    def get_time_since_created(self, obj):
        delta = now() - obj.created_at
        seconds = delta.total_seconds()

        time_rules = [
            (60, lambda s: "Agora mesmo"),
            (
                3600,
                lambda s: f"{int(s // 60)} minuto{'s' if s // 60 != 1 else ''} atrás",
            ),
            (
                86400,
                lambda s: f"{int(s // 3600)} hora{'s' if s // 3600 != 1 else ''} atrás",
            ),
            (
                604800,
                lambda s: f"{int(s // 86400)} dia{'s' if s // 86400 != 1 else ''} atrás",
            ),
            (
                2592000,
                lambda s: f"{int(s // 604800)} semana{'s' if s // 604800 != 1 else ''} atrás",
            ),
            (
                31536000,
                lambda s: f"{int(s // 2592000)} mês{'es' if s // 2592000 != 1 else ''} atrás",
            ),
            (
                float("inf"),
                lambda s: f"{int(s // 31536000)} ano{'s' if s // 31536000 != 1 else ''} atrás",
            ),
        ]

        for threshold, formatter in time_rules:
            if seconds < threshold:
                return formatter(seconds)
