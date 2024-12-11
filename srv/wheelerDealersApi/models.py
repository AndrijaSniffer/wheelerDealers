import datetime
from dataclasses import dataclass

from django.db.models.functions import Now
from django.db import models
from django.db.models import UniqueConstraint


# region USERS

class Company(models.Model):
    PIB = models.AutoField(primary_key=True, null=False)
    address = models.CharField(max_length=255, null=False)
    phone = models.CharField(max_length=255, null=False)
    logo_url = models.CharField(max_length=255, null=True)
    website_url = models.CharField(max_length=255, null=True)


class User(models.Model):
    user = models.AutoField(primary_key=True, null=False)
    PIB = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    username = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    deactivated = models.BooleanField(null=False, default=False)
    created_at = models.DateTimeField(null=False, auto_now_add=True)
    phone = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    is_reseller = models.BooleanField(null=False, default=False)
    is_admin = models.BooleanField(null=False, default=False)


class ChatActivityLogs(models.Model):
    id_activity = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey(User, on_delete=models.RESTRICT, null=False, related_name='source')
    user2 = models.ForeignKey(User, on_delete=models.RESTRICT, null=False, related_name='destination')
    started_at = models.DateTimeField(null=False, auto_now_add=True)
    ended_at = models.DateTimeField(null=True)


# endregion USERS

# region THE START
class Country(models.Model):
    country = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=255, null=False)


class EngineType(models.Model):
    engine_type = models.AutoField(primary_key=True, null=False)
    type = models.CharField(max_length=255, null=False)
    engine_emission_class = models.CharField(max_length=255, null=False, default='EURO6')


class ModelType(models.Model):
    model_type = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255, null=False)


class Transmission(models.Model):
    transmission = models.AutoField(primary_key=True, null=False)
    gears = models.IntegerField(null=False)
    type = models.CharField(max_length=255, null=False)


class Fuel(models.Model):
    fuel = models.AutoField(primary_key=True, null=False)
    type = models.CharField(max_length=255, null=False)


class Image(models.Model):
    image = models.AutoField(primary_key=True, null=False)
    image_url = models.CharField(max_length=255, null=False)


class Interior(models.Model):
    interior = models.AutoField(primary_key=True, null=False)
    doors = models.IntegerField(null=False)
    seats = models.IntegerField(null=False)
    steering_wheel_left = models.BooleanField(null=False, default=True)
    color = models.CharField(max_length=255, null=True)


class Drivetrain(models.Model):
    drivetrain = models.AutoField(primary_key=True, null=False)
    type = models.CharField(max_length=255, null=False)


# endregion THE START

# region THE MIDDLE

class Manufacturer(models.Model):
    manufacturer = models.AutoField(primary_key=True, null=False)
    country = models.ForeignKey(Country, on_delete=models.RESTRICT, null=False)
    name = models.CharField(max_length=255, null=False)


class Engine(models.Model):
    engine = models.AutoField(primary_key=True, null=False)
    engine_type = models.ForeignKey(EngineType, on_delete=models.RESTRICT, null=False)
    engine_code = models.CharField(max_length=255, null=False)
    horsepower = models.IntegerField(null=True)
    kilowatt = models.IntegerField(null=True)
    volume = models.IntegerField(null=False)


class Model(models.Model):
    model = models.AutoField(primary_key=True, null=False)
    name_model = models.CharField(max_length=255, null=False)
    year_of_manufacture = models.IntegerField(null=False)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.RESTRICT, null=False)
    engine = models.ForeignKey(Engine, on_delete=models.RESTRICT, null=True)


class ModelTypeModel(models.Model):
    model_type = models.ForeignKey(ModelType, on_delete=models.RESTRICT, null=False)
    model = models.ForeignKey(Model, on_delete=models.RESTRICT, null=False)
    UniqueConstraint(fields=['model_type', 'model'], name='modelTypeModelPK')


# endregion THE MIDDLE

# region THE END

class Car(models.Model):
    car = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey(User, on_delete=models.RESTRICT, null=False)
    model = models.ForeignKey(Model, on_delete=models.RESTRICT, null=False)
    transmission = models.ForeignKey(Transmission, on_delete=models.RESTRICT, null=False)
    fuel = models.ForeignKey(Fuel, on_delete=models.RESTRICT, null=False)
    interior = models.ForeignKey(Interior, on_delete=models.RESTRICT, null=False)
    price = models.DecimalField(null=False, max_digits=6, decimal_places=2)
    color = models.CharField(max_length=255, null=True)
    chassis_number = models.CharField(max_length=255, null=True)
    is_preowned = models.BooleanField(null=False, default=True)
    created_at = models.DateTimeField(null=False, auto_now_add=True)


class CarImage(models.Model):
    image = models.ForeignKey(Image, on_delete=models.RESTRICT, null=False)
    car = models.ForeignKey(Car, on_delete=models.RESTRICT, null=False)
    UniqueConstraint(fields=['image', 'car'], name='carImagePK')


# endregion THE END

# region DTO

@dataclass(frozen=True)
class ManufacturerDto:
    manufacturer: int
    name_manufacturer: str
    country: Country  # JSON Objekat


@dataclass(frozen=True)
class EngineDto:
    engine: int
    engine_code: str
    horsepower: int
    kilowatt: int
    volume: int
    engine_type: int
    type: str


@dataclass(frozen=True)
class ModelDto:
    model: int
    name_model: str
    year_of_manufacture: int
    manufacturer: ManufacturerDto
    engine: EngineDto


@dataclass(frozen=True)
class CarDto:
    car: int
    user: int
    model: Model
    transmission: Transmission
    fuel: Fuel
    interior: Interior
    price: str
    color: str
    chassis_number: str
    is_preowned: bool
    created_at: str


@dataclass()
class UserDto:
    user_id: int
    PIB: Company
    display_name: str
    email: str
    password: str
    deactivated: bool
    created_at: datetime
    phone: str
    address: str
    is_reseller: bool
    is_admin: bool

# class IfExistsSearch:
#     manufacturer: bool
#     model: bool
#     transmission: bool
#     fuel: bool
#     drive: bool
#     is_preowned: bool
#     price_from: bool
#     price_to: bool
#     volume: bool
#     hp_from: bool
#     hp_to: bool
#     kw_from: bool
#     kw_to: bool
#     car_color: bool
#     left_side_steering_wheel: bool

# endregion
