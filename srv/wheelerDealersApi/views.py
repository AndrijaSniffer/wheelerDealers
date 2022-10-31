import dataclasses
import json

from django.core import serializers
from wheelerDealersApi.models import Country, Manufacturer, ManufacturerDto

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


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
            if body["name_manufacturer"] is not None and body["id_country"] is not None:
                manufacturer.update(name_manufacturer=body["name_manufacturer"], id_country_id=body["id_country"])
        except KeyError:
            try:
                if body["name_manufacturer"] is not None:
                    manufacturer.update(name_manufacturer=body["name_manufacturer"])
            except KeyError:
                try:
                    if body["id_country"] is not None:
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
