from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


@api_view(['GET'])
def index(request):
    return Response(
        data={"message": "Hello, World!"},
        status=status.HTTP_200_OK
    )