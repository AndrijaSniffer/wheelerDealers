from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.db.models import UniqueConstraint
from django.utils import timezone

from wheelerDealersApi.managers import CustomUserManager


# region USERS

class Company(models.Model):
    PIB = models.BigIntegerField(primary_key=True, null=False)
    address = models.CharField(max_length=255, null=False)
    phone = models.CharField(max_length=255, null=False)
    logo_name = models.CharField(max_length=255, null=True, unique=True)
    website_url = models.CharField(max_length=255, null=True, unique=True)


class User(AbstractBaseUser, PermissionsMixin):
    PIB = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    username = models.CharField(max_length=255, null=False, unique=True)
    email = models.CharField(max_length=255, null=False, unique=True)
    password = models.CharField(max_length=255, null=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    phone = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    is_reseller = models.BooleanField(null=False, default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password', 'is_reseller']
    objects = CustomUserManager()

    def __str__(self):
        return self.username


class ChatActivityLogs(models.Model):
    id_activity = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey(User, on_delete=models.RESTRICT, null=False, related_name='source')
    user2 = models.ForeignKey(User, on_delete=models.RESTRICT, null=False, related_name='destination')
    started_at = models.DateTimeField(null=False, auto_now_add=True)
    ended_at = models.DateTimeField(null=True)


# endregion USERS

# region LOOKUP TABLES

class Country(models.Model):
    country = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=255, null=False)


class EngineType(models.Model):
    engine_type = models.AutoField(primary_key=True, null=False)
    type = models.CharField(max_length=255, null=False, unique=True)


class EmissionClass(models.Model):
    emission_class = models.AutoField(primary_key=True, null=False)
    class_name = models.CharField(max_length=255, null=False, unique=True)


class ModelType(models.Model):
    model_type = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255, null=False)


class TransmissionType(models.Model):
    transmission_type = models.AutoField(primary_key=True, null=False)
    type = models.CharField(max_length=255, null=False, unique=True)


class Fuel(models.Model):
    fuel = models.AutoField(primary_key=True, null=False)
    type = models.CharField(max_length=255, null=False)


class Drivetrain(models.Model):
    drivetrain = models.AutoField(primary_key=True, null=False)
    type = models.CharField(max_length=255, null=False)


# endregion LOOKUP TABLES

# region MANUFACTURER AND MODEL

class Manufacturer(models.Model):
    manufacturer = models.AutoField(primary_key=True, null=False)
    country = models.ForeignKey(Country, on_delete=models.RESTRICT, null=False)
    name = models.CharField(max_length=255, null=False)


class Model(models.Model):
    model = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=255, null=False)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.RESTRICT, null=False)


class ModelTypeModel(models.Model):
    model_type = models.ForeignKey(ModelType, on_delete=models.RESTRICT, null=False)
    model = models.ForeignKey(Model, on_delete=models.RESTRICT, null=False)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['model_type', 'model'], name='modelTypeModelPK')
        ]


# endregion MANUFACTURER AND MODEL

# region CAR

class Car(models.Model):
    car = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey(User, on_delete=models.RESTRICT, null=False)

    # Predefined selections (FKs)
    model = models.ForeignKey(Model, on_delete=models.RESTRICT, null=False)
    transmission_type = models.ForeignKey(TransmissionType, on_delete=models.RESTRICT, null=False)
    fuel = models.ForeignKey(Fuel, on_delete=models.RESTRICT, null=False)
    drivetrain = models.ForeignKey(Drivetrain, on_delete=models.RESTRICT, null=False)
    engine_type = models.ForeignKey(EngineType, on_delete=models.RESTRICT, null=False)
    emission_class = models.ForeignKey(EmissionClass, on_delete=models.RESTRICT, null=False)

    # Car-specific values (direct columns)
    year = models.IntegerField(null=False)
    horsepower = models.IntegerField(null=False)
    kilowatt = models.IntegerField(null=False)
    engine_volume = models.IntegerField(null=False)
    gears = models.IntegerField(null=False, default=1)

    # Interior specifications (direct columns)
    doors = models.IntegerField(null=False)
    seats = models.IntegerField(null=False)
    steering_wheel_left = models.BooleanField(null=False, default=True)
    interior_color = models.CharField(max_length=255, null=True)

    # General car info
    price = models.DecimalField(null=False, max_digits=10, decimal_places=2)
    exterior_color = models.CharField(max_length=255, null=True)
    chassis_number = models.CharField(max_length=255, null=True)
    is_preowned = models.BooleanField(null=False, default=True)
    created_at = models.DateTimeField(null=False, auto_now_add=True)


class Image(models.Model):
    image = models.AutoField(primary_key=True, null=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=True, related_name='images')
    image_url = models.CharField(max_length=255, null=False)

# endregion CAR
