import dataclasses
import json
import logging

from django.core import serializers
from django.http import HttpResponse

from wheelerDealersApi.models import *
from wheelerDealersApi.util import checkIfKeyExists


# region Country
def getAllCountry(request):
    return HttpResponse(content=serializers.serialize('json', Country.objects.all()), status=200)


def getCountryByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', Country.objects.filter(id_country=pk)), status=200)


def insertCountry(request):
    if request.method == "POST":
        post = request.POST

        country = Country(name_country=post['name_country'])
        country.save()

        return HttpResponse(content="Successfully created new country", status=200)

    return HttpResponse(status=400)


def updateCountryByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_country'):
            return HttpResponse(status=400)

        country = Country.objects.filter(id_country=body["id_country"])

        if checkIfKeyExists(body, "name_country"):
            country.update(name_country=body["name_country"])

        return HttpResponse(content="Successfully updated country", status=200)

    return HttpResponse(status=400)


def deleteCountryByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        country = Country.objects.filter(id_country=pk)
        country.delete()

        return HttpResponse(content="Successfully deleted country", status=200)

    return HttpResponse(status=400)


# endregion

# region Manufacturer

def getAllManufacturer(request):
    if request.method == "GET":
        dbManufacturers = Manufacturer.objects.all()
        manufacturers = []

        for m in dbManufacturers:
            manufacturers.append(dataclasses.asdict(ManufacturerDto(
                id_manufacturer=m.id_manufacturer,
                name_manufacturer=m.name_manufacturer,
                name_country=m.id_country.name_country
            )))

        return HttpResponse(content=json.dumps(manufacturers, indent=2), status=200)
    else:
        return HttpResponse(status=400)


def getManufacturerByPK(request):
    if request.method == "GET":
        dbManufacturer = Manufacturer.objects.filter(id_manufacturer=request.GET["id_manufacturer"])[0]

        manufacturer = dataclasses.asdict(ManufacturerDto(
            id_manufacturer=dbManufacturer.id_manufacturer,
            name_manufacturer=dbManufacturer.name_manufacturer,
            name_country=dbManufacturer.id_country.name_country
        ))

        return HttpResponse(json.dumps(manufacturer))
    else:
        return HttpResponse(status=400)


def insertManufacturer(request):
    if request.method == "POST":
        post = request.POST

        manufacturer = Manufacturer(
            name_manufacturer=post["name_manufacturer"],
            id_country_id=post["id_country"]
        )
        manufacturer.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


def updateManufacturerByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        manufacturer = Manufacturer.objects.filter(id_manufacturer=body["id_manufacturer"])

        if checkIfKeyExists(body, "name_manufacturer"):
            manufacturer.update(name_manufacturer=body["name_manufacturer"])

        if checkIfKeyExists(body, "id_country"):
            manufacturer.update(id_country_id=body["id_country"])

        return HttpResponse(content="Successfully updated manufacturer", status=200)

    return HttpResponse(status=400)


def deleteManufacturerByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        manufacturer = Manufacturer.objects.filter(id_manufacturer=pk)
        manufacturer.delete()

        return HttpResponse(content="Successfully deleted manufacturer", status=200)

    return HttpResponse(status=400)


# endregion

# region Engine Type

def getAllEngineType(request):
    return HttpResponse(content=serializers.serialize('json', EngineType.objects.all()), status=200)


def getEngineTypeByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', EngineType.objects.filter(id_engine_type=pk)), status=200)


def insertEngineType(request):
    if request.method == "POST":
        post = request.POST

        engineType = EngineType(engine_type=post['engine_type'])
        engineType.save()

        return HttpResponse(content="Successfully created new engine type", status=200)

    return HttpResponse(status=400)


def deleteEngineTypeByPK(request):
    if request.method == "DELETE":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        try:
            if body["id_engine_type"] is not None:
                pk = body["id_engine_type"]
                engineType = EngineType.objects.filter(id_engine_type=pk)
                engineType.delete()
        except KeyError:
            return HttpResponse(status=400)

        return HttpResponse(content="Successfully deleted engine type", status=200)

    return HttpResponse(status=400)


def updateEngineTypeByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        engineType = EngineType.objects.filter(id_engine_type=body["id_engine_type"])

        try:
            if body["id_engine_type"] is not None:
                engineType.update(engine_type=body["engine_type"])
        except KeyError:
            return HttpResponse(status=400)

        return HttpResponse(content="Successfully updated engine type", status=200)

    return HttpResponse(status=400)


# endregion

# region Engine

def getAllEngine(request):
    if request.method == "GET":
        dbEngines = Engine.objects.all()
        engines = []

        for e in dbEngines:
            engines.append(dataclasses.asdict(EngineDto(
                id_engine=e.id_engine,
                volume=e.volume,
                horsepower=e.horsepower,
                kilowatt=e.kilowatt,
                engine_type=e.id_engine_type.engine_type
            )))

        return HttpResponse(content=json.dumps(engines, indent=2), status=200, content_type='json')
    else:
        return HttpResponse(status=400)


def getEngineByPK(request):
    if request.method == "GET":
        dbEngine = Engine.objects.filter(id_engine=request.GET["PK"])[0]

        engine = dataclasses.asdict(EngineDto(
            id_engine=dbEngine.id_engine,
            volume=dbEngine.volume,
            horsepower=dbEngine.horsepower,
            kilowatt=dbEngine.kilowatt,
            engine_type=dbEngine.id_engine_type.engine_type
        ))

        return HttpResponse(json.dumps(engine))
    else:
        return HttpResponse(status=400)


def insertEngine(request):
    if request.method == "POST":
        post = request.POST

        try:
            horsepower = post["horsepower"]
        except KeyError:
            horsepower = None

        try:
            kilowatt = post["kilowatt"]
        except KeyError:
            kilowatt = None

        engine = Engine(
            engine_code=post["engine_code"],
            horsepower=horsepower,
            kilowatt=kilowatt,
            volume=post["volume"],
            id_engine_type_id=post["id_engine_type"]
        )
        engine.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


def updateEngineByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        try:
            body["id_engine"]
        except KeyError:
            logging.debug("No id_engine")
            return HttpResponse(status=400)

        engine = Engine.objects.filter(id_engine=body["id_engine"])

        try:
            engine.update(engine_code=body["engine_code"])
        except KeyError:
            logging.debug("No engine_code")

        try:
            engine.update(volume=body["volume"])
        except KeyError:
            logging.debug("No volume")

        try:
            engine.update(id_engine_type=body["id_engine_type"])
        except KeyError:
            logging.debug("No id_engine_type")

        try:
            engine.update(horsepower=body["horsepower"])
        except KeyError:
            logging.debug("No horsepower")

        try:
            engine.update(kilowatt=body["kilowatt"])
        except KeyError:
            logging.debug("No kilowatt")

        return HttpResponse(content="Successfully updated engine", status=200)

    return HttpResponse(status=400)


def deleteEngineByPK(request):
    if request.method == "DELETE":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        try:
            pk = body["id_engine"]
            engine = Engine.objects.filter(id_engine=pk)
            engine.delete()
        except KeyError:
            return HttpResponse(status=400)

        return HttpResponse(content="Successfully deleted engine type", status=200)

    return HttpResponse(status=400)


# endregion

# region ModelType

def getAllModelType(request):
    return HttpResponse(content=serializers.serialize('json', ModelType.objects.all()), status=200)


def getModelTypeByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', ModelType.objects.filter(id_model_type=pk)), status=200)


def insertModelType(request):
    if request.method == "POST":
        post = request.POST

        modelType = ModelType(type_name=post['type_name'])
        modelType.save()

        return HttpResponse(content="Successfully created new model type", status=200)

    return HttpResponse(status=400)


def updateModelTypeByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_model_type'):
            return HttpResponse(status=400)

        modelType = ModelType.objects.filter(id_model_type=body["id_model_type"])

        if checkIfKeyExists(body, "type_name"):
            modelType.update(type_name=body["type_name"])

        return HttpResponse(content="Successfully updated model type", status=200)

    return HttpResponse(status=400)


def deleteModelTypeByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        modelType = ModelType.objects.filter(id_model_type=pk)
        modelType.delete()

        return HttpResponse(content="Successfully deleted model type", status=200)

    return HttpResponse(status=400)


# endregion

# region Model

def getAllModel(request):
    if request.method == "GET":
        dbModels = Model.objects.all()
        modelsArray = []

        for m in dbModels:
            modelsArray.append(dataclasses.asdict(ModelDto(
                id_model=m.id_model,
                name_model=m.name_model,
                year_of_manufacture=m.year_of_manufacture,
                manufacturer=m.id_manufacturer,
                engine=m.id_engine
            )))

        return HttpResponse(content=json.dumps(modelsArray, indent=2), status=200)
    else:
        return HttpResponse(status=400)


def getModelByPK(request):
    if request.method == "GET":
        dbModel = Model.objects.filter(id_manufacturer=request.GET["id_model"])[0]

        modelObj = dataclasses.asdict(ModelDto(
            id_model=dbModel.id_model,
            name_model=dbModel.name_model,
            year_of_manufacture=dbModel.year_of_manufacture,
            manufacturer=dbModel.id_manufacturer,
            engine=dbModel.id_engine
        ))

        return HttpResponse(json.dumps(modelObj))
    else:
        return HttpResponse(status=400)


def insertModel(request):
    if request.method == "POST":
        post = request.POST

        modelObj = Model(
            id_model=post["id_model"],
            name_model=post["name_model"],
            year_of_manufacture=post["year_of_manufacture"],
            id_manufacturer_id=post["id_manufacturer"],
            id_engine_id=post["id_engine"]
        )
        modelObj.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


def updateModelByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        modelObj = Model.objects.filter(id_model=body["id_model"])

        if checkIfKeyExists(body, "name_model"):
            modelObj.update(name_model=body["name_model"])

        if checkIfKeyExists(body, "year_of_manufacture"):
            modelObj.update(year_of_manufacture=body["year_of_manufacture"])

        if checkIfKeyExists(body, "id_manufacturer"):
            modelObj.update(id_manufacturer_id=body["id_manufacturer"])

        if checkIfKeyExists(body, "id_engine"):
            modelObj.update(id_engine_id=body["id_engine"])

        return HttpResponse(content="Successfully updated model", status=200)

    return HttpResponse(status=400)


def deleteModelByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        modelObj = Model.objects.filter(id_manufacturer=pk)
        modelObj.delete()

        return HttpResponse(content="Successfully deleted model", status=200)

    return HttpResponse(status=400)


# endregion

# region ModelTypeModel

def getAllModelTypeModel(request):
    return HttpResponse(content=serializers.serialize('json', ModelTypeModel.objects.all()), status=200)


def getModelTypeModelByPK(request):
    if request.method == "GET":
        pk = request.GET['model']
        pk2 = request.GET['modelType']
        return HttpResponse(
            serializers.serialize('json', ModelTypeModel.objects.filter(id_model=pk, id_model_type=pk2)), status=200)


def insertModelTypeModel(request):
    if request.method == "POST":
        post = request.POST

        modelTypeModel = ModelTypeModel(
            id_model_type=post["id_model_type"],
            id_model=post["id_model"]
        )
        modelTypeModel.save()

        return HttpResponse(content="Successfully created new model type model", status=200)

    return HttpResponse(status=400)


def updateModelTypeModelByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        modelTypeModel = ModelTypeModel.objects.filter(id_model=body["id_model"], id_model_type=body["id_model_type"])

        modelTypeModel.update(id_model=body["id_model"], id_model_type=body["id_model_type"])

        return HttpResponse(content="Successfully updated model type model", status=200)

    return HttpResponse(status=400)


def deleteModelTypeModelByPK(request):
    if request.method == "DELETE":
        pk = request.GET['model']
        pk2 = request.GET['modelType']

        modelTypeModel = ModelTypeModel.objects.filter(id_model=pk, id_model_type=pk2)
        modelTypeModel.delete()

        return HttpResponse(content="Successfully deleted model type model", status=200)

    return HttpResponse(status=400)


# endregion

# region Order

def getAllOrder(request):
    return HttpResponse(content=serializers.serialize('json', Order.objects.all()), status=200)


def getOrderByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', Order.objects.filter(id_order=pk)), status=200)


def insertOrder(request):
    if request.method == "POST":
        post = request.POST

        order = Order(
            id_user=post["id_user"],
            order_number=post["order_number"],
            total=post["total"]
        )
        order.save()

        return HttpResponse(content="Successfully created new order", status=200)

    return HttpResponse(status=400)


# def updateOrderByPK(request):
#     if request.method == "PUT":
#         body_unicode = request.body.decode('utf-8')
#         body = json.loads(body_unicode)
#
#         if not checkIfKeyExists(body, 'id_country'):
#             return HttpResponse(status=400)
#
#         country = Country.objects.filter(id_country=body["id_country"])
#
#         if checkIfKeyExists(body, "name_country"):
#             country.update(name_country=body["name_country"])
#
#         return HttpResponse(content="Successfully updated country", status=200)
#
#     return HttpResponse(status=400)

# def deleteorderByPK(request):
#     if request.method == "DELETE":
#         pk = request.GET['PK']
#
#         country = Country.objects.filter(id_country=pk)
#         country.delete()
#
#         return HttpResponse(content="Successfully deleted country", status=200)
#
#     return HttpResponse(status=400)

# endregion

# region Fuel

def getAllFuel(request):
    return HttpResponse(content=serializers.serialize('json', Fuel.objects.all()), status=200)


def getFuelByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', Fuel.objects.filter(id_fuel=pk)), status=200)


def insertFuel(request):
    if request.method == "POST":
        post = request.POST

        if checkIfKeyExists(post, "kml"):
            fuel = Fuel(
                fuel_name=post["fuel_name"],
                kml=post["kml"]
            )
            fuel.save()
        else:
            fuel = Fuel(
                fuel_name=post["fuel_name"]
            )
            fuel.save()

        return HttpResponse(content="Successfully created new fuel", status=200)

    return HttpResponse(status=400)


def updateFuelByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_fuel'):
            return HttpResponse(status=400)

        fuel = Fuel.objects.filter(id_fuel=body["id_fuel"])

        if checkIfKeyExists(body, "fuel_name"):
            fuel.update(fuel_name=body["fuel_name"])

        if checkIfKeyExists(body, "kml"):
            fuel.update(kml=body["kml"])

        return HttpResponse(content="Successfully updated fuel", status=200)

    return HttpResponse(status=400)


def deleteFuelByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        fuel = Fuel.objects.filter(id_fuel=pk)
        fuel.delete()

        return HttpResponse(content="Successfully deleted fuel", status=200)

    return HttpResponse(status=400)


# endregion

# region Drive

def getAllDrive(request):
    return HttpResponse(content=serializers.serialize('json', Drive.objects.all()), status=200)


def getDriveByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', Drive.objects.filter(id_drive=pk)), status=200)


def insertDrive(request):
    if request.method == "POST":
        post = request.POST

        drive = Drive(drive_type=post['drive_type'])
        drive.save()

        return HttpResponse(content="Successfully created new drive", status=200)

    return HttpResponse(status=400)


def updateDriveByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_drive'):
            return HttpResponse(status=400)

        drive = Drive.objects.filter(id_drive=body["id_drive"])

        if checkIfKeyExists(body, "drive_type"):
            drive.update(drive_type=body["drive_type"])

        return HttpResponse(content="Successfully updated drive", status=200)

    return HttpResponse(status=400)


def deleteDriveByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        drive = Drive.objects.filter(id_drive=pk)
        drive.delete()

        return HttpResponse(content="Successfully deleted drive", status=200)

    return HttpResponse(status=400)


# endregion

# region Transmission

def getAllTransmission(request):
    return HttpResponse(content=serializers.serialize('json', Transmission.objects.all()), status=200)


def getTransmissionByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', Transmission.objects.filter(id_transmission=pk)), status=200)


def insertTransmission(request):
    if request.method == "POST":
        post = request.POST

        transmission = Transmission(
            number_of_speeds=post["number_of_speeds"],
            transmission_type=post["transmission_type"]
        )
        transmission.save()

        return HttpResponse(content="Successfully created new transmission", status=200)

    return HttpResponse(status=400)


def updateTransmissionByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_transmission'):
            return HttpResponse(status=400)

        transmission = Transmission.objects.filter(id_transmission=body["id_transmission"])

        if checkIfKeyExists(body, "number_of_speeds"):
            transmission.update(number_of_speeds=body["number_of_speeds"])

        if checkIfKeyExists(body, "transmission_type"):
            transmission.update(transmission_type=body["transmission_type"])

        return HttpResponse(content="Successfully updated transmission", status=200)

    return HttpResponse(status=400)


def deleteTransmissionByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        transmission = Transmission.objects.filter(id_transmission=pk)
        transmission.delete()

        return HttpResponse(content="Successfully deleted transmission", status=200)

    return HttpResponse(status=400)


# endregion

# region Interior

def getAllInterior(request):
    return HttpResponse(content=serializers.serialize('json', Interior.objects.all()), status=200)


def getInteriorByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', Interior.objects.filter(id_interior=pk)), status=200)


def insertInterior(request):
    if request.method == "POST":
        post = request.POST

        if checkIfKeyExists(post, "color"):
            interior = Interior(
                number_of_doors=post["number_of_doors"],
                number_of_seats=post["number_of_seats"],
                left_side_steering_wheel=post["left_side_steering_wheel"],
                color=post["color"]
            )
            interior.save()
        else:
            interior = Interior(
                number_of_doors=post["number_of_doors"],
                number_of_seats=post["number_of_seats"],
                left_side_steering_wheel=post["left_side_steering_wheel"]
            )
            interior.save()

        return HttpResponse(content="Successfully created new interior", status=200)

    return HttpResponse(status=400)


def updateInteriorByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_interior'):
            return HttpResponse(status=400)

        interior = Interior.objects.filter(id_interior=body["id_interior"])

        if checkIfKeyExists(body, "number_of_doors"):
            interior.update(number_of_doors=body["number_of_doors"])

        if checkIfKeyExists(body, "number_of_seats"):
            interior.update(number_of_seats=body["number_of_seats"])

        if checkIfKeyExists(body, "left_side_steering_wheel"):
            interior.update(left_side_steering_wheel=body["left_side_steering_wheel"])

        if checkIfKeyExists(body, "color"):
            interior.update(color=body["color"])

        return HttpResponse(content="Successfully updated interior", status=200)

    return HttpResponse(status=400)


def deleteInteriorByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        interior = Interior.objects.filter(id_interior=pk)
        interior.delete()

        return HttpResponse(content="Successfully deleted interior", status=200)

    return HttpResponse(status=400)


# endregion

# region Image

def getAllImage(request):
    return HttpResponse(content=serializers.serialize('json', Image.objects.all()), status=200)


def getImageByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', Image.objects.filter(id_image=pk)), status=200)


def insertImage(request):
    if request.method == "POST":
        post = request.POST

        image = Image(image_name=post["image_name"])
        image.save()

        return HttpResponse(content="Successfully created new image", status=200)

    return HttpResponse(status=400)


def updateImageByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_image'):
            return HttpResponse(status=400)

        image = Image.objects.filter(id_image=body["id_image"])

        if checkIfKeyExists(body, "image_name"):
            image.update(image_name=body["image_name"])

        return HttpResponse(content="Successfully updated image", status=200)

    return HttpResponse(status=400)


def deleteImageByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        image = Image.objects.filter(id_image=pk)
        image.delete()

        return HttpResponse(content="Successfully deleted image", status=200)

    return HttpResponse(status=400)


# endregion

# region CarImage

def getAllCarImage(request):
    return HttpResponse(content=serializers.serialize('json', CarImage.objects.all()), status=200)


def getCarImageByPK(request):
    if request.method == "GET":
        pk = request.GET['image']
        pk2 = request.GET['car']
        return HttpResponse(serializers.serialize('json', CarImage.objects.filter(id_image=pk, id_car=pk2)), status=200)


def insertCarImage(request):
    if request.method == "POST":
        post = request.POST

        carImage = CarImage(
            id_image=post["id_image"],
            id_car=post["id_car"]
        )
        carImage.save()

        return HttpResponse(content="Successfully created new car image", status=200)

    return HttpResponse(status=400)


def updateCarImageByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        carImage = CarImage.objects.filter(id_image=body["id_image"], id_car=body["id_car"])

        carImage.update(id_image=body["id_image"], id_car=body["id_car"])

        return HttpResponse(content="Successfully updated car image", status=200)

    return HttpResponse(status=400)


def deleteCarImageByPK(request):
    if request.method == "DELETE":
        pk = request.GET['image']
        pk2 = request.GET['car']

        carImage = CarImage.objects.filter(id_image=pk, id_car=pk2)
        carImage.delete()

        return HttpResponse(content="Successfully deleted car image", status=200)

    return HttpResponse(status=400)


# endregion

# region OrderCar

def getAllOrderCar(request):
    return HttpResponse(content=serializers.serialize('json', OrderCar.objects.all()), status=200)


def getOrderCarByPK(request):
    if request.method == "GET":
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', OrderCar.objects.filter(id_order_car=pk)), status=200)


def insertOrderCar(request):
    if request.method == "POST":
        post = request.POST

        orderCar = OrderCar(
            id_car=post["id_car"],
            id_poster=post["id_user"],
            id_order=post["id_order"],
            quantity=post["quantity"]
        )
        orderCar.save()

        return HttpResponse(content="Successfully created new car order", status=200)

    return HttpResponse(status=400)


def updateOrderCarByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_order_car'):
            return HttpResponse(status=400)

        orderCar = OrderCar.objects.filter(id_order_car=body["id_order_car"])

        if checkIfKeyExists(body, "quantity"):
            orderCar.update(quantity=body["quantity"])

        return HttpResponse(content="Successfully updated car order", status=200)

    return HttpResponse(status=400)


def deleteOrderCarByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        orderCar = OrderCar.objects.filter(id_order_car=pk)
        orderCar.delete()

        return HttpResponse(content="Successfully deleted car order", status=200)

    return HttpResponse(status=400)


# endregion

# region Car

def getAllCar(request):
    if request.method == "GET":
        dbCars = Car.objects.all()
        cars = []

        for c in dbCars:
            cars.append(dataclasses.asdict(CarDto(
                id_car=c.id_car,
                id_user=c.id_user,
                created_at=c.created_at,
                is_preowned=c.is_preowned,
                chassie_number=c.chassie_number,
                color=c.color,
                model=c.id_model,
                price=c.price,
                interior=c.id_interior,
                transmission=c.id_transmission,
                fuel=c.id_fuel
            )))

        return HttpResponse(content=json.dumps(cars, indent=2), status=200)
    else:
        return HttpResponse(status=400)


def getCarByPK(request):
    if request.method == "GET":
        dbCar = Car.objects.filter(id_car=request.GET["id_car"])[0]

        car = dataclasses.asdict(CarDto(
            id_car=dbCar.id_car,
            id_user=dbCar.id_user,
            created_at=dbCar.created_at,
            is_preowned=dbCar.is_preowned,
            chassie_number=dbCar.chassie_number,
            color=dbCar.color,
            model=dbCar.id_model,
            price=dbCar.price,
            interior=dbCar.id_interior,
            transmission=dbCar.id_transmission,
            fuel=dbCar.id_fuel
        ))

        return HttpResponse(json.dumps(car))
    else:
        return HttpResponse(status=400)


def insertCar(request):
    if request.method == "POST":
        post = request.POST

        car = Car(
            id_user=post["id_user"],
            created_at=datetime.datetime.utcnow(),
            is_preowned=post["is_preowned"],
            chassie_number=post["chassie_number"],
            color=post["color"],
            id_model_id=post["id_model"],
            price=post["price"],
            id_interior_id=post["id_interior"],
            id_transmission_id=post["id_transmission"],
            id_fuel_id=post["id_fuel"]
        )
        car.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


def updateCarByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if not checkIfKeyExists(body, 'id_car'):
            return HttpResponse(status=400)

        car = Car.objects.filter(id_car=body["id_car"])

        if checkIfKeyExists(body, "id_user"):
            car.update(id_user=body["id_user"])

        if checkIfKeyExists(body, "is_preowned"):
            car.update(is_preowned=body["is_preowned"])

        if checkIfKeyExists(body, "chassie_number"):
            car.update(chassie_number=body["chassie_number"])

        if checkIfKeyExists(body, "color"):
            car.update(color=body["color"])

        if checkIfKeyExists(body, "id_model"):
            car.update(id_model_id=body["id_model"])

        if checkIfKeyExists(body, "price"):
            car.update(price=body["price"])

        if checkIfKeyExists(body, "id_interior"):
            car.update(id_interior_id=body["id_interior"])

        if checkIfKeyExists(body, "id_transmission"):
            car.update(id_transmission_id=body["id_transmission"])

        if checkIfKeyExists(body, "id_fuel"):
            car.update(id_fuel_id=body["id_fuel"])

        return HttpResponse(content="Successfully updated car", status=200)

    return HttpResponse(status=400)


def deleteCarByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        car = Car.objects.filter(id_car=pk)
        car.delete()

        return HttpResponse(content="Successfully deleted car", status=200)

    return HttpResponse(status=400)

# endregion
