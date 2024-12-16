from datetime import timedelta

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import BasePermission, SAFE_METHODS


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['isReseller'] = user.is_reseller
        token['isAdmin'] = user.is_superuser
        token['dateJoined'] = str(user.date_joined)
        # token.set_exp(lifetime=timedelta(minutes=30))
        token.set_exp(lifetime=timedelta(hours=2))

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class IsAdminOrReadOnly(BasePermission):
    """
    Custom permission to allow read-only access to all, but restrict modifications to admins.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:  # SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')
            return True
        return request.user and request.user.is_superuser
