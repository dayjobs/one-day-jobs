from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import generics
from oauth2_provider.ext.rest_framework import (TokenHasReadWriteScope,
                                                TokenHasScope)

from django.contrib.auth.models import User
from authentication.permissions import IsAccountOwner
from .serializers import UserSerializer


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(), TokenHasReadWriteScope())

        return (permissions.IsAuthenticated(),
                IsAccountOwner(), TokenHasReadWriteScope())


class UserView(generics.RetrieveAPIView):
    model = User
    serializer_class = UserSerializer

    def retrieve(self, request):
        return Response(UserSerializer(request.user).data)
