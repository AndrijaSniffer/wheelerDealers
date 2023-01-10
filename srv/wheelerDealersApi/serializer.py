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


class ManufacturerSerializer(serializers.Serializer):
    id_manufacturer = serializers.IntegerField()
    name_manufacturer = serializers.CharField(max_length=255)
    id_country = CountrySerializer(many=False, read_only=True)


class EngineTypeSerializer(serializers.Serializer):
    id_engine_type = serializers.IntegerField()
    engine_type = serializers.CharField(max_length=255)


class EngineSerializer(serializers.Serializer):
    id_engine = serializers.IntegerField()
    engine_code = serializers.CharField(max_length=255)
    horsepower = serializers.IntegerField()
    kilowatt = serializers.IntegerField()
    volume = serializers.IntegerField()
    id_engine_type = EngineTypeSerializer(many=False, read_only=True)


class ModelTypeSerializer(serializers.Serializer):
    id_model_type = serializers.IntegerField()
    type_name = serializers.CharField(max_length=255)


class ModelSerializer(serializers.Serializer):
    id_model = serializers.IntegerField()
    name_model = serializers.CharField(max_length=255)
    year_of_manufacture = serializers.IntegerField()
    id_manufacturer = ManufacturerSerializer(many=False, read_only=True)
    id_engine = EngineSerializer(many=False, read_only=True)


class ModelTypeModelSerializer(serializers.Serializer):
    id_model_type = ModelTypeSerializer(many=True, read_only=True)
    id_model = ModelSerializer(many=True, read_only=True)


class OrderSerializer(serializers.Serializer):
    id_order = serializers.IntegerField()
    id_user = serializers.IntegerField()
    order_number = serializers.CharField(max_length=255)
    created_at = serializers.DateTimeField(default=datetime.datetime.now())
    total = serializers.DecimalField(max_digits=6, decimal_places=2)


class FuelSerializer(serializers.Serializer):
    id_fuel = serializers.IntegerField()
    fuel_name = serializers.CharField(max_length=255, )
    kml = serializers.IntegerField()


class DriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drive
        fields = ['id_drive', 'drive_type']


class TransmissionSerializer(serializers.Serializer):
    id_transmission = serializers.IntegerField()
    number_of_speeds = serializers.IntegerField()
    transmission_type = serializers.CharField(max_length=255)


class InteriorSerializer(serializers.Serializer):
    id_interior = serializers.IntegerField()
    number_of_doors = serializers.IntegerField()
    number_of_seats = serializers.IntegerField()
    left_side_steering_wheel = serializers.BooleanField(default=True)
    color = serializers.CharField(max_length=255)


class CarSerializer(serializers.Serializer):
    id_car = serializers.IntegerField()
    id_user = serializers.IntegerField()
    id_model = ModelSerializer(many=False, read_only=True)
    id_transmission = TransmissionSerializer(many=False, read_only=True)
    id_fuel = FuelSerializer(many=False, read_only=True)
    id_interior = InteriorSerializer(many=False, read_only=True)
    price = serializers.DecimalField(max_digits=6, decimal_places=2)
    color = serializers.CharField(max_length=255)
    chassie_number = serializers.CharField(max_length=255)
    is_preowned = serializers.BooleanField(default=True)
    created_at = serializers.DateTimeField(default=datetime.datetime.now())


class CarPhoneNumberSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=20)
    id_car = CarSerializer(many=False, read_only=True)


class ImageSerializer(serializers.Serializer):
    id_image = serializers.IntegerField()
    image_name = serializers.CharField(max_length=255)


class CarImageSerializer(serializers.Serializer):
    id_image = ImageSerializer(many=False, read_only=True)
    id_car = CarSerializer(many=False, read_only=True)


class OrderCarSerializer(serializers.Serializer):
    id_order_car = serializers.IntegerField()
    id_car = CarSerializer(many=False, read_only=True)
    id_poster = serializers.IntegerField()
    id_order = OrderSerializer(many=False, read_only=True)
    quantity = serializers.IntegerField()
