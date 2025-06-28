from django.urls import path, include
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from common.views.user import UserViewSet
from common.views.task import TaskViewSet

router = DefaultRouter()
router.register(r"user", UserViewSet, basename="user")
router.register(r"task", TaskViewSet, basename="task")

urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("", include(router.urls)),
]
