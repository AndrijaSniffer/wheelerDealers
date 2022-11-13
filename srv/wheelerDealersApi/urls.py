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

    path('getAllModelTypeModel', views.getAllModelTypeModel, name="getAllModelTypeModel"),
    path('getModelTypeModelByPK', views.getModelTypeModelByPK, name="getModelTypeModelByPK"),
    path('insertModelTypeModel', views.insertModelTypeModel, name="insertModelTypeModel"),
    path('updateModelTypeModelByPK', views.updateModelTypeModelByPK, name="updateModelTypeModelByPK"),
    path('deleteModelTypeModelByPK', views.deleteModelTypeModelByPK, name="deleteModelTypeModelByPK"),

    path('getAllOrder', views.getAllOrder, name="getAllOrder"),
    path('getOrderByPK', views.getOrderByPK, name="getOrderByPK"),
    path('insertOrder', views.insertOrder, name="insertOrder"),
    # path('updateOrderByPK', views.updateOrderByPK, name="updateOrderByPK"),
    # path('deleteOrderByPK', views.deleteOrderByPK, name="deleteOrderByPK"),

    path('getAllFuel', views.getAllFuel, name="getAllFuel"),
    path('getFuelByPK', views.getFuelByPK, name="getFuelByPK"),
    path('insertFuel', views.insertFuel, name="insertFuel"),
    path('updateFuelByPK', views.updateFuelByPK, name="updateFuelByPK"),
    path('deleteFuelByPK', views.deleteFuelByPK, name="deleteFuelByPK"),

    path('getAllDrive', views.getAllDrive, name="getAllDrive"),
    path('getDriveByPK', views.getDriveByPK, name="getDriveByPK"),
    path('insertDrive', views.insertDrive, name="insertDrive"),
    path('updateDriveByPK', views.updateDriveByPK, name="updateDriveByPK"),
    path('deleteDriveByPK', views.deleteDriveByPK, name="deleteDriveByPK"),

    path('getAllTransmission', views.getAllTransmission, name="getAllTransmission"),
    path('getTransmissionByPK', views.getTransmissionByPK, name="getTransmissionByPK"),
    path('insertTransmission', views.insertTransmission, name="insertTransmission"),
    path('updateTransmissionByPK', views.updateTransmissionByPK, name="updateTransmissionByPK"),
    path('deleteTransmissionByPK', views.deleteTransmissionByPK, name="deleteTransmissionByPK"),

    path('getAllInterior', views.getAllInterior, name="getAllInterior"),
    path('getInteriorByPK', views.getInteriorByPK, name="getInteriorByPK"),
    path('insertInterior', views.insertInterior, name="insertInterior"),
    path('updateInteriorByPK', views.updateInteriorByPK, name="updateInteriorByPK"),
    path('deleteInteriorByPK', views.deleteInteriorByPK, name="deleteInteriorByPK"),

    path('getAllImage', views.getAllImage, name="getAllImage"),
    path('getImageByPK', views.getImageByPK, name="getImageByPK"),
    path('insertImage', views.insertImage, name="insertImage"),
    path('updateImageByPK', views.updateImageByPK, name="updateImageByPK"),
    path('deleteImageByPK', views.deleteImageByPK, name="deleteImageByPK"),

    path('getAllCarImage', views.getAllCarImage, name="getAllCarImage"),
    path('getCarImageByPK', views.getCarImageByPK, name="getCarImageByPK"),
    path('insertCarImage', views.insertCarImage, name="insertCarImage"),
    path('updateCarImageByPK', views.updateCarImageByPK, name="updateCarImageByPK"),
    path('deleteCarImageByPK', views.deleteCarImageByPK, name="deleteCarImageByPK"),

    path('getAllOrderCar', views.getAllOrderCar, name="getAllOrderCar"),
    path('getOrderCarByPK', views.getOrderCarByPK, name="getOrderCarByPK"),
    path('insertOrderCar', views.insertOrderCar, name="insertOrderCar"),
    path('updateOrderCarByPK', views.updateOrderCarByPK, name="updateOrderCarByPK"),
    path('deleteOrderCarByPK', views.deleteOrderCarByPK, name="deleteOrderCarByPK"),

    path('getAllCar', views.getAllCar, name="getAllCar"),
    path('getCarByPK', views.getCarByPK, name="getCarByPK"),
    path('insertCar', views.insertCar, name="insertCar"),
    path('updateCarByPK', views.updateCarByPK, name="updateCarByPK"),
    path('deleteCarByPK', views.deleteCarByPK, name="deleteCarByPK"),

    path('login', views.loginUser, name="loginUser"),
    path('logout', views.logoutUser, name='logoutUser'),
    path('isAuthorized', views.isAuthorized, name='isAuthorized')
]
