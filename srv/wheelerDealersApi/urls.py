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
    path('deleteManufacturerByPK', views.deleteManufacturerByPK, name="deleteManufacturerByPK"),

    path('getAllEngineType', views.getAllEngineType, name="getAllEngineType"),
    path('getEngineTypeByPK', views.getEngineTypeByPK, name="getEngineTypeByPK"),
    path('insertEngineType', views.insertEngineType, name="insertEngineType"),
    path('updateEngineTypeByPK', views.updateEngineTypeByPK, name="updateEngineTypeByPK"),
    path('deleteEngineTypeByPK', views.deleteEngineTypeByPK, name="deleteEngineTypeByPK"),

    path('getAllEngine', views.getAllEngine, name="getAllEngine"),
    path('getEngineByPK', views.getEngineByPK, name="getEngineByPK"),
    path('insertEngine', views.insertEngine, name="insertEngine"),
    path('updateEngineByPK', views.updateEngineByPK, name="updateEngineByPK"),
    path('deleteEngineByPK', views.deleteEngineByPK, name="deleteEngineByPK"),

    path('getAllModelType', views.getAllModelType, name="getAllModelType"),
    path('getModelTypeByPK', views.getModelTypeByPK, name="getModelTypeByPK"),
    path('insertModelType', views.insertModelType, name="insertModelType"),
    path('updateModelTypeByPK', views.updateModelTypeByPK, name="updateModelTypeByPK"),
    path('deleteModelTypeByPK', views.deleteModelTypeByPK, name="deleteModelTypeByPK"),

    path('getAllModel', views.getAllModel, name="getAllModel"),
    path('getModelByPK', views.getModelByPK, name="getModelByPK"),
    path('insertModel', views.insertModel, name="insertModel"),
    path('updateModelByPK', views.updateModelByPK, name="updateModelByPK"),
    path('deleteModelByPK', views.deleteModelByPK, name="deleteModelByPK"),
]
