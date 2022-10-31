from django.urls import path
from . import views

urlpatterns = [
    path('getAllCountry', views.getAllCountry, name="getAllCountry"),
    path('insertCountry', views.insertCountry, name="insertCountry"),
    path('getCountryByPK', views.getCountryByPK, name="getCountryByPK"),
    path('deleteCountryByPK', views.deleteCountryByPK, name="deleteCountry"),
    path('updateCountryByPK', views.updateCountryByPK, name="updateCountryByPK"),

    path('getAllManufacturer', views.getAllManufacturer, name="getAllManufacturer"),
    path('getManufacturerByPK', views.getManufacturerByPK, name="getManufacturerByPK"),
    path('insertManufacturer', views.insertManufacturer, name="insertManufacturer"),
    path('updateManufacturerByPK', views.updateManufacturerByPK, name="updateManufacturerByPK"),
    path('deleteManufacturerByPK', views.deleteManufacturerByPK, name="deleteManufacturerByPK")
]
