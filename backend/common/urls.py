from django.urls import path, include

from . import views

urlpatterns = [
    path('teste/', views.index, name='teste'),
]