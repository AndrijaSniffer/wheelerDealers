import json
from dataclasses import asdict

from django.http import HttpResponse
from rest_framework import routers, viewsets
from rest_framework.permissions import AllowAny

from wheelerDealersApi.serializer import *
from wheelerDealersApi.util import checkIfKeyExists

router = routers.DefaultRouter()


def registerUser(request):
    if request.method == 'POST':
        post = request.POST

        if not (checkIfKeyExists(post, 'username') and checkIfKeyExists(post, 'password')
                and checkIfKeyExists(post, 'email') and checkIfKeyExists(post, 'firstName')
                and checkIfKeyExists(post, 'lastName')):
            return HttpResponse(status=400)

        user = User.objects.create_user(post["username"], post["email"], post["password"], first_name=post["firstName"],
                                        last_name=post["lastName"], is_staff=False)
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


def getAllUsers(request):
    if request.method == 'GET':
        listUser = User.objects.all()
        listUserDto = []

        for user in listUser:
            dto = UserDto(
                id=user.id,
                username=user.username,
                firstName=user.first_name,
                lastName=user.last_name,
                isStaff=user.is_staff,
                isAdmin=user.is_superuser,
                isActive=user.is_active,
                lastLogin=str(user.last_login),
                email=user.email,
                dateJoined=str(user.date_joined)
            )
            listUserDto.append(asdict(dto))

        return HttpResponse(json.dumps(listUserDto))
    else:
        return HttpResponse(status=400)


class CountryView(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [AllowAny]


class ManufacturerView(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    permission_classes = [AllowAny]


class EngineTypeView(viewsets.ModelViewSet):
    queryset = EngineType.objects.all()
    serializer_class = EngineTypeSerializer
    permission_classes = [AllowAny]


class EngineView(viewsets.ModelViewSet):
    queryset = Engine.objects.all()
    serializer_class = EngineSerializer
    permission_classes = [AllowAny]


class ModelTypeView(viewsets.ModelViewSet):
    queryset = ModelType.objects.all()
    serializer_class = ModelTypeSerializer
    permission_classes = [AllowAny]


class ModelView(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer
    permission_classes = [AllowAny]


class ModelTypeModelView(viewsets.ModelViewSet):
    queryset = ModelTypeModel.objects.all()
    serializer_class = ModelTypeModelSerializer
    permission_classes = [AllowAny]


class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]


class FuelView(viewsets.ModelViewSet):
    queryset = Fuel.objects.all()
    serializer_class = FuelSerializer
    permission_classes = [AllowAny]


class DriveView(viewsets.ModelViewSet):
    queryset = Drive.objects.all()
    serializer_class = DriveSerializer
    permission_classes = [AllowAny]


class TransmissionView(viewsets.ModelViewSet):
    queryset = Transmission.objects.all()
    serializer_class = TransmissionSerializer
    permission_classes = [AllowAny]


class InteriorView(viewsets.ModelViewSet):
    queryset = Interior.objects.all()
    serializer_class = InteriorSerializer
    permission_classes = [AllowAny]


class ImageView(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [AllowAny]


class CarImageView(viewsets.ModelViewSet):
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer
    permission_classes = [AllowAny]


class OrderCarView(viewsets.ModelViewSet):
    queryset = OrderCar.objects.all()
    serializer_class = OrderCarSerializer
    permission_classes = [AllowAny]


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [AllowAny]


# region Router

router.register(r'countries', CountryView, 'countries')
router.register(r'manufacturers', ManufacturerView, 'manufacturers')
router.register(r'engineTypes', EngineTypeView, 'engineTypes')
router.register(r'engines', EngineView, 'engines')
router.register(r'modelTypes', ModelTypeView, 'modelTypes')
router.register(r'models', ModelView, 'models')
router.register(r'modelTypeModels', ModelTypeModelView, 'modelTypeModels')
router.register(r'orders', OrderView, 'orders')
router.register(r'fuels', FuelView, 'fuel')
router.register(r'drives', DriveView, 'drives')
router.register(r'transmissions', TransmissionView, 'transmissions')
router.register(r'interiors', InteriorView, 'interiors')
router.register(r'images', ImageView, 'images')
router.register(r'carImages', CarImageView, 'carImages')
router.register(r'orderCars', OrderCarView, 'orderCars')
router.register(r'cars', CarView, 'cars')

# endregion
