from django.urls import path
from . import views

urlpatterns = [
    path('getAllCountry', views.getAllCountry, name="getAllCountry"),
    path('insertCountry', views.insertCountry, name="insertCountry"),
    path('getCountryByPK', views.getCountryByPK, name="getCountryByPK"),
    path('deleteCountryByPK', views.deleteCountryByPK, name="deleteCountry"),
    path('updateCountryByPK', views.updateCountryByPK, name="updateCountryByPK")
]
