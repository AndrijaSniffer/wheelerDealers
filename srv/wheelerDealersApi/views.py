import dataclasses
import json
import logging

from django.core import serializers
from wheelerDealersApi.models import *

from django.http import HttpResponse


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


def deleteCountryByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        country = Country.objects.filter(id_country=pk)
        country.delete()

        return HttpResponse(content="Successfully deleted country", status=200)

    return HttpResponse(status=400)


def updateCountryByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        country = Country.objects.filter(id_country=body["id_country"])

        try:
            if body["name_country"] is not None:
                country.update(name_country=body["name_country"])
        except KeyError:
            return HttpResponse(status=400)

        return HttpResponse(content="Successfully updated country", status=200)

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

        try:
            manufacturer.update(name_manufacturer=body["name_manufacturer"], id_country_id=body["id_country"])
        except KeyError:
            try:
                manufacturer.update(name_manufacturer=body["name_manufacturer"])
            except KeyError:
                try:
                    manufacturer.update(id_country_id=body["id_country"])
                except KeyError:
                    return HttpResponse(status=400)

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
