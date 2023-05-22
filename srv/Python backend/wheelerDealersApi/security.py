from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['firstName'] = user.first_name
        token['lastName'] = user.last_name
        token['username'] = user.username
        token['email'] = user.email
        token['isStaff'] = user.is_staff
        token['isAdmin'] = user.is_superuser
        token['dateJoined'] = str(user.date_joined)

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
