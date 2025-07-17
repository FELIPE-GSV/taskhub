from rest_framework import viewsets, permissions
from common.models import (
    CustomUser,
)
from common.services.user_service import UserService
from common.serializers.user_serializer import RegisterSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    @action(
        detail=False,
        url_path='get-user',
        url_name='get_user',
        methods=['GET'],
    )
    def get_user(self, request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    @action(
        detail=False,
        url_path='get-user-by-email',
        url_name='get_user_by_email',
        methods=['GET'],
    )
    def get_user_by_email(self, request):
        email = request.query_params.get('email')
        user = CustomUser.objects.filter(email=email).first()
        if not user:
            return Response(data={"message": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        serializer = RegisterSerializer(user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    @action(
        detail=False,
        methods=['GET'],
        url_path='dashboard-user',
        url_name='dashboard_user',
    )
    def get_dashboard_user(self, request):
        user = request.user
        service = UserService(
            user=user,
            request=request
        )
        data = service.return_data_dashboard()
        return Response(
            data=data,
            status=status.HTTP_200_OK
        )
        
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(
            user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    
        
        