from django.contrib.auth.models import User

from wheelerDealersApi.models import *
from rest_framework import serializers


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'password', 'last_login', 'is_superuser', 'username', 'first_name', 'last_name', 'email', 'is_staff',
#                   'is_active', 'date_joined']


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id_country', 'name_country']


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = '__all__'


class EngineTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineType
        fields = '__all__'


class EngineSerializer(serializers.ModelSerializer):
    # id_engine = serializers.IntegerField()
    # engine_code = serializers.CharField(max_length=255)
    # horsepower = serializers.IntegerField()
    # kilowatt = serializers.IntegerField()
    # volume = serializers.IntegerField()
    # id_engine_type = EngineTypeSerializer(many=False, read_only=True)

    # id_engine_type = EngineTypeSerializer(many=False)
    class Meta:
        model = Engine
        fields = '__all__'

    # def create(self, validated_data):
    #     engineType = validated_data.pop('id_engine_type')
    #     engineType.id_engine_type = 1
    #     instance = Engine.objects.create(**validated_data)
    #     EngineType.objects.create(instance=instance, **engineType)
    #
    #
    #     return instance

    # def to_representation(self, instance):
    #     representation = super(EquipmentSerializer, self).to_representation(instance)
    #     representation['assigment'] = AssignmentSerializer(instance.assigment_set.all(), many=True).data
    #     return representation


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


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class FuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fuel
        fields = '__all__'


class DriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drive
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


class CarPhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarPhoneNumber
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = '__all__'


class OrderCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCar
        fields = '__all__'
