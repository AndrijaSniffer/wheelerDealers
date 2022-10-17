from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def testApi(request):
    return HttpResponse("Test123")
