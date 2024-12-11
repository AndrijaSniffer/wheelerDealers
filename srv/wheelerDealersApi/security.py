from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from passlib.hash import pbkdf2_sha256 as sha256


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['isStaff'] = user.is_reseller
        token['isAdmin'] = user.is_superuser
        token['dateJoined'] = str(user.date_joined)

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class SecurityUtil:
    @staticmethod
    def hashing_password(password: str) -> str:
        return sha256.using(rounds=100000).hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str):
        return sha256.verify(plain_password, hashed_password)
