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

        country = Country.objects.filter(id_model_type=pk)
        country.delete()

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
        pk = request.GET['PK']
        return HttpResponse(serializers.serialize('json', Country.objects.filter(id_country=pk)), status=200)


def insertModelTypeModel(request):
    if request.method == "POST":
        post = request.POST

        country = Country(name_country=post['name_country'])
        country.save()

        return HttpResponse(content="Successfully created new country", status=200)

    return HttpResponse(status=400)


def updateModelTypeModelByPK(request):
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


def deleteModelTypeModelByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        country = Country.objects.filter(id_country=pk)
        country.delete()

        return HttpResponse(content="Successfully deleted country", status=200)

    return HttpResponse(status=400)

# endregion
