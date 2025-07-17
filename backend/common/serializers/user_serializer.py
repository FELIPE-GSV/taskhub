# accounts/serializers.py
from rest_framework import serializers
from common.models import (
    CustomUser,
    Task
)

from common.serializers.task_serializer import TaskSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = (
            'id', 'email', 'first_name', 'last_name', 'password',
            'bio', 'phone', 'profile_picture'
        )

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['profile_picture'] = f'http://localhost:8000/media/{instance.profile_picture}'
        return data       
