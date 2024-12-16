from django.contrib.auth.password_validation import validate_password

from wheelerDealersApi.models import *
from rest_framework import serializers

from wheelerDealersApi.models import User


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    PIB = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    # The view handles 'is_staff' and 'is_superuser' so you don't need to pass them through the request
    # There can only be one staff and superuser for now
    class Meta:
        model = User
        fields = ('username',
                  'email',
                  'password',
                  'PIB',
                  'is_active',
                  'is_staff',
                  'is_reseller',
                  'is_superuser',
                  'phone',
                  'address')
        extra_kwargs = {
            'username': {'required': True},
            'password': {'required': True},
            'is_active': {'required': True},
            'is_staff': {'required': True},
            'phone': {'required': False},
            'address': {'required': False},
            'PIB': {'required': False},
            'is_reseller': {'required': True},
            'is_superuser': {'required': True}
        }

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        PIB_id = validated_data.get('PIB').PIB if validated_data.get('PIB') is not None else None
        user = User.objects.create(
            username=validated_data.get('username'),
            is_active=validated_data.get('is_active'),
            is_reseller=validated_data.get('is_reseller'),
            PIB=validated_data.get('PIB'),
            phone=validated_data.get('phone'),
            address=validated_data.get('address'),
            is_staff=validated_data.get('is_staff'),
            email=validated_data.get('email'),
            is_superuser=validated_data.get('is_superuser')
        )
        user.set_password(validated_data.get('password'))
        user.save()

        return user


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    PIB = CompanySerializer(allow_null=True, required=False)

    class Meta:
        model = User
        exclude = ['password']


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = '__all__'


class EngineTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineType
        fields = '__all__'


class EngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engine
        fields = '__all__'


class ModelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelType
        fields = '__all__'


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'


class ModelTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelTypeModel
        fields = '__all__'


class FuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fuel
        fields = '__all__'


class DrivetrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drivetrain
        fields = '__all__'


class TransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transmission
        fields = '__all__'


class InteriorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interior
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = '__all__'
