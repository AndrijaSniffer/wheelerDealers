import jwt
from django.conf import settings
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        return super().get_token(user)


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


class IsUserSelf(BasePermission):
    """
        Custom permission to allow read-only access to the user who is making the request.
    """

    def has_permission(self, request, view):
        # Extract user ID from JWT
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return False

        try:
            token = auth_header.split(' ')[1]  # Format: Bearer <token>
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            token_user_id = decoded_token.get('user_id')
        except (IndexError, jwt.DecodeError, jwt.ExpiredSignatureError):
            raise PermissionDenied('Invalid or expired token.')

        # Compare with the requested ID
        requested_id = view.kwargs.get('user_id')  # Extract ID from the URL
        if requested_id and int(requested_id) == token_user_id:
            return True

        return False


class CarPermission(BasePermission):
    """
    Custom permission class for car-related views:
    - Allows anyone (even unregistered users) to use GET.
    - Allows registered non-admin users to POST (create) cars, which will be owned by them.
    - Allows registered users to PUT (update) and DELETE only their own cars.
    - Allows admins to GET and DELETE any car, but not POST or PUT.
    """

    def has_permission(self, request, view):
        # Allow safe methods (GET, HEAD, OPTIONS) for everyone
        if request.method in SAFE_METHODS:
            return True
        # For POST (create), allow only authenticated non-admin users
        if view.action == 'create':
            return request.user.is_authenticated and not request.user.is_superuser
        # For PUT and DELETE, defer to has_object_permission
        return True

    def has_object_permission(self, request, view, obj):
        # Allow safe methods (GET) for everyone
        if request.method in SAFE_METHODS:
            return True
        # For PUT (update), allow only the car's owner
        if view.action in ['update', 'partial_update']:
            return obj.user == request.user
        # For DELETE, allow the owner or an admin
        if view.action == 'destroy':
            return obj.user == request.user or request.user.is_superuser
        return False
