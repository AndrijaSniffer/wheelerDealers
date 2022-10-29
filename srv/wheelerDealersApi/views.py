import json

from django.core import serializers
from wheelerDealersApi.models import Country

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

    return HttpResponse(status=403)


def deleteCountryByPK(request):
    if request.method == "DELETE":
        pk = request.GET['PK']

        country = Country.objects.filter(id_country=pk)
        country.delete()

        return HttpResponse(content="Successfully deleted country", status=200)

    return HttpResponse(status=403)


def updateCountryByPK(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        country = Country.objects.filter(id_country=body["id_country"])

        if body["name_country"] is not None:
            country.update(name_country=body["name_country"])

        return HttpResponse(content="Successfully updated country", status=200)

    return HttpResponse(status=403)
# endregion
