import datetime
from dataclasses import dataclass

from django.db import models
from django.db.models import UniqueConstraint


# region BASE CLASSES
class Country(models.Model):
    id_country = models.AutoField(primary_key=True, null=False)
    name_country = models.CharField(max_length=255, null=False)


class Manufacturer(models.Model):
    id_manufacturer = models.AutoField(primary_key=True, null=False)
    name_manufacturer = models.CharField(max_length=255, null=False)
    id_country = models.ForeignKey(Country, on_delete=models.RESTRICT, null=False)


class EngineType(models.Model):
    id_engine_type = models.AutoField(primary_key=True, null=False)
    engine_type = models.CharField(max_length=255, null=False)


class Engine(models.Model):
    id_engine = models.AutoField(primary_key=True, null=False)
    engine_code = models.CharField(max_length=255, null=False)
    horsepower = models.IntegerField(null=True)
    kilowatt = models.IntegerField(null=True)
    volume = models.IntegerField(null=False)
    id_engine_type = models.ForeignKey(EngineType, on_delete=models.RESTRICT, null=False)


class ModelType(models.Model):
    id_model_type = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=255, null=False)


class Model(models.Model):
    id_model = models.AutoField(primary_key=True, null=False)
    name_model = models.CharField(max_length=255, null=False)
    year_of_manufacture = models.IntegerField(null=False)
    id_manufacturer = models.ForeignKey(Manufacturer, on_delete=models.RESTRICT, null=False)
    id_engine = models.ForeignKey(Engine, on_delete=models.RESTRICT, null=True)


class ModelTypeModel(models.Model):
    id_model_type = models.ForeignKey(ModelType, on_delete=models.RESTRICT, null=False)
    id_model = models.ForeignKey(Model, on_delete=models.RESTRICT, null=False)
    UniqueConstraint(fields=['id_model_type', 'id_model'], name='modelTypeModelPK')


class Order(models.Model):
    id_order = models.AutoField(primary_key=True, null=False)
    id_user = models.IntegerField(null=False)
    order_number = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(null=False, default=datetime.datetime.now())
    total = models.DecimalField(null=False, max_digits=6, decimal_places=2)


class Fuel(models.Model):
    id_fuel = models.AutoField(primary_key=True, null=False)
    fuel_name = models.CharField(max_length=255, null=False)
    kml = models.IntegerField(null=True)


class Drive(models.Model):
    id_drive = models.AutoField(primary_key=True, null=False)
    drive_type = models.CharField(max_length=255, null=False)


class Transmission(models.Model):
    id_transmission = models.AutoField(primary_key=True, null=False)
    number_of_speeds = models.IntegerField(null=False)
    transmission_type = models.CharField(max_length=255, null=False)


class Interior(models.Model):
    id_interior = models.AutoField(primary_key=True, null=False)
    number_of_doors = models.IntegerField(null=False)
    number_of_seats = models.IntegerField(null=False)
    left_side_steering_wheel = models.BooleanField(null=False, default=True)
    color = models.CharField(max_length=255, null=True)


class Car(models.Model):
    id_car = models.AutoField(primary_key=True, null=False)
    id_user = models.IntegerField(null=False)
    id_model = models.ForeignKey(Model, on_delete=models.RESTRICT, null=False)
    id_transmission = models.ForeignKey(Transmission, on_delete=models.RESTRICT, null=False)
    id_fuel = models.ForeignKey(Fuel, on_delete=models.RESTRICT, null=False)
    id_interior = models.ForeignKey(Interior, on_delete=models.RESTRICT, null=False)
    price = models.DecimalField(null=False, max_digits=6, decimal_places=2)
    quantity = models.IntegerField(null=True)
    color = models.CharField(max_length=255, null=True)
    chassie_number = models.CharField(max_length=255, null=True)
    is_preowned = models.BooleanField(null=False, default=True)
    created_at = models.DateTimeField(null=False, default=datetime.datetime.now())


class Image(models.Model):
    id_image = models.AutoField(primary_key=True, null=False)
    image_name = models.CharField(max_length=255, null=False)


class CarImage(models.Model):
    id_image = models.ForeignKey(Image, on_delete=models.RESTRICT, null=False)
    id_car = models.ForeignKey(Car, on_delete=models.RESTRICT, null=False)
    UniqueConstraint(fields=['id_image', 'id_car'], name='carImagePK')


class OrderCar(models.Model):
    id_order_car = models.AutoField(primary_key=True, null=False)
    id_car = models.ForeignKey(Car, on_delete=models.RESTRICT, null=False)
    id_poster = models.IntegerField(null=False)
    id_order = models.ForeignKey(Order, on_delete=models.RESTRICT, null=False)
    quantity = models.IntegerField(null=False)


# endregion

# region DTO

@dataclass(frozen=True)
class ManufacturerDto:
    id_manufacturer: int
    name_manufacturer: str
    name_country: str


@dataclass(frozen=True)
class EngineDto:
    id_engine: int
    engine_code = str
    horsepower: int
    kilowatt: int
    volume: int
    engine_type: str


@dataclass(frozen=True)
class ModelDto:
    id_model: int
    name_model: str
    year_of_manufacture: int
    manufacturer: ManufacturerDto
    engine: EngineDto

# endregion
