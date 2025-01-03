import json
from dataclasses import asdict

from django.forms.models import model_to_dict
from django.db import connection
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers, viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


from wheelerDealersApi.serializer import *
from wheelerDealersApi.util import checkIfValueExists
from wheelerDealersApi.security import IsAdminOrReadOnly

router = routers.DefaultRouter()


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def createAccount(request):
    user = User.objects.filter(is_superuser=True).first()
    admin_exists = bool(user)  # True if admin exists, False if not

    # Create a mutable copy of request data (using _full_data)
    data = request.data.dict()  # Convert from QueryDict to Dict
    data['is_superuser'] = not admin_exists  # Add is_superuser to the request data
    data['is_staff'] = not admin_exists
    data['is_active'] = True
    data['PIB'] = None if data.get('PIB') is None else int(data.get('PIB'))

    serializer = RegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    else:
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY, data=serializer.errors)


@csrf_exempt
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()  # Fetch all users
    serializer = UserSerializer(users, many=True)  # Serialize the queryset
    return Response(status=status.HTTP_200_OK, data=serializer.data)


def normalSearch(request):
    if request.method == 'POST':
        postData = dict(request.POST)
        search = {}

        for key in postData.keys():
            search[key] = postData[key]

        listCars = []

        id_manufacturer = checkIfValueExists(search, 'id_manufacturer')
        id_model = checkIfValueExists(search, 'id_model')
        id_transmission = checkIfValueExists(search, 'id_transmission')
        id_fuel = checkIfValueExists(search, 'id_fuel')
        id_drive = checkIfValueExists(search, 'id_drive')
        is_preowned = checkIfValueExists(search, 'is_preowned')
        price_from = checkIfValueExists(search, 'price_from')
        price_to = checkIfValueExists(search, 'price_to')
        volume = checkIfValueExists(search, 'volume')
        hp_from = checkIfValueExists(search, 'hp_from')
        hp_to = checkIfValueExists(search, 'hp_to')
        kw_from = checkIfValueExists(search, 'kw_from')
        kw_to = checkIfValueExists(search, 'kw_to')
        car_color = checkIfValueExists(search, 'car_color')
        left_side_steering_wheel = checkIfValueExists(search, 'left_side_steering_wheel')

        id_manufacturer_sql = f"{f'and ma.id_manufacturer = {int(id_manufacturer[0])} ' if id_manufacturer is not None else ''}"
        id_model_sql = f"{f'and mo.id_model = {int(id_model[0])} ' if id_model is not None else ''}"
        id_transmission_sql = f"{f'and t.id_transmission = {int(id_transmission[0])} ' if id_transmission is not None else ''}"
        id_fuel_sql = f"{f'and f.id_fuel = {int(id_fuel[0])} ' if id_fuel is not None else ''}"
        id_drive_sql = f"{f'and d.id_drive = {int(id_drive[0])} ' if id_drive is not None else ''}"
        id_preowned_sql = f"{f'and c.is_preowned = {bool(is_preowned[0])} ' if is_preowned is not None else ''}"

        if price_from is not None and price_to is not None:
            price_sql = f"and c.price is between {int(price_from[0])} and {int(price_to[0])} "
        elif price_from is None and price_to is not None:
            price_sql = f"and c.price < {int(price_to[0])} "
        elif price_from is not None and price_to is None:
            price_sql = f"and c.price > {int(price_from[0])} "
        else:
            price_sql = ''

        volume_sql = f"{f'and e.volume = {int(volume[0])} ' if volume is not None else ''}"

        if hp_from is not None and hp_to is not None:
            hp_sql = f"and e.horsepower is between {int(hp_from[0])} and {int(hp_to[0])} "
        elif hp_from is None and hp_to is not None:
            hp_sql = f"and e.horsepower < {int(hp_to[0])} "
        elif hp_from is not None and hp_to is None:
            hp_sql = f"and e.horsepower > {int(hp_from[0])} "
        else:
            hp_sql = ''

        if kw_from is not None and kw_to is not None:
            kw_sql = f"and e.kilowatt is between {int(kw_from[0])} and {int(kw_to[0])} "
        elif kw_from is None and kw_to is not None:
            kw_sql = f"and e.kilowatt < {int(kw_to[0])} "
        elif kw_from is not None and kw_to is None:
            kw_sql = f"and e.kilowatt > {int(kw_from[0])} "
        else:
            kw_sql = ''

        car_color_sql = f"{f'and c.color = {car_color} ' if car_color is not None else ''}"
        left_side_steering_wheel_sql = f"{f'and i.left_side_steering_wheel = {bool(left_side_steering_wheel[0])} ' if left_side_steering_wheel is not None else ''}"

        sql = "SELECT DISTINCT `id_car`, `id_user`, `price`, c.`color`, `chassis_number`, `is_preowned`, `created_at`, `id_fuel`, `fuel_name`, `kml`, `id_model`, `name_model`, `year_of_manufacture`, `id_manufacturer`, `name_manufacturer` " \
              "FROM `wheelerdealersapi_car` c, `wheelerdealersapi_fuel` f, `wheelerdealersapi_model` mo, `wheelerdealersapi_manufacturer` ma," \
              " `wheelerdealersapi_transmission` t, `wheelerdealersapi_drive` d, `wheelerdealersapi_engine` e,  `wheelerdealersapi_interior` i " \
              "WHERE c.id_fuel_id = f.id_fuel and c.id_model_id = mo.id_model and mo.id_manufacturer_id = ma.id_manufacturer " \
              f"{id_manufacturer_sql}{id_model_sql}{id_transmission_sql}{id_fuel_sql}{id_drive_sql}{id_preowned_sql}" \
              f"{price_sql}{volume_sql}{hp_sql}{kw_sql}{car_color_sql}{left_side_steering_wheel_sql}"

        with connection.cursor() as cursor:
            cursor.execute(sql)
            rows = cursor.fetchall()

            for row in rows:
                man = ManufacturerDto(id_manufacturer=row[13], name_manufacturer=row[14], id_country=None)
                listCars.append(
                    asdict(CarDto(
                        id_car=row[0],
                        id_user=row[1],
                        price=str(row[2]),
                        color=row[3],
                        chassis_number=row[4],
                        is_preowned=row[5],
                        created_at=str(row[6]),
                        id_fuel=model_to_dict(Fuel(id_fuel=row[7], fuel_name=row[8], kml=row[9])),
                        id_model=asdict(ModelDto(id_model=row[10], name_model=row[11], year_of_manufacture=row[12],
                                                 id_manufacturer=man, id_engine=None)),
                        id_interior=None,
                        id_transmission=None
                    ))
                )

            return HttpResponse(json.dumps(listCars))
    else:
        return HttpResponse(status=400)


class CountryView(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [IsAdminOrReadOnly]


class ManufacturerView(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    permission_classes = [IsAdminOrReadOnly]


class EngineTypeView(viewsets.ModelViewSet):
    queryset = EngineType.objects.all()
    serializer_class = EngineTypeSerializer
    permission_classes = [IsAdminOrReadOnly]


class EngineView(viewsets.ModelViewSet):
    queryset = Engine.objects.all()
    serializer_class = EngineSerializer
    permission_classes = [IsAdminOrReadOnly]


class ModelTypeView(viewsets.ModelViewSet):
    queryset = ModelType.objects.all()
    serializer_class = ModelTypeSerializer
    permission_classes = [IsAdminOrReadOnly]


class ModelView(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer
    permission_classes = [IsAdminOrReadOnly]


class ModelTypeModelView(viewsets.ModelViewSet):
    queryset = ModelTypeModel.objects.all()
    serializer_class = ModelTypeModelSerializer
    permission_classes = [IsAdminOrReadOnly]


class FuelView(viewsets.ModelViewSet):
    queryset = Fuel.objects.all()
    serializer_class = FuelSerializer
    permission_classes = [IsAdminOrReadOnly]


class DrivetrainView(viewsets.ModelViewSet):
    queryset = Drivetrain.objects.all()
    serializer_class = DrivetrainSerializer
    permission_classes = [IsAdminOrReadOnly]


class TransmissionView(viewsets.ModelViewSet):
    queryset = Transmission.objects.all()
    serializer_class = TransmissionSerializer
    permission_classes = [IsAdminOrReadOnly]


class InteriorView(viewsets.ModelViewSet):
    queryset = Interior.objects.all()
    serializer_class = InteriorSerializer
    permission_classes = [IsAdminOrReadOnly]


class ImageView(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAdminOrReadOnly]


class CarImageView(viewsets.ModelViewSet):
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer
    permission_classes = [IsAdminOrReadOnly]


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAdminOrReadOnly]


# region Router

router.register(r'country', CountryView, 'country')
router.register(r'drivetrain', DrivetrainView, 'drivetrain')
router.register(r'manufacturer', ManufacturerView, 'manufacturer')
router.register(r'engineType', EngineTypeView, 'engineType')
router.register(r'engine', EngineView, 'engine')
router.register(r'modelType', ModelTypeView, 'modelType')
router.register(r'model', ModelView, 'model')
router.register(r'modelTypeModel', ModelTypeModelView, 'modelTypeModel')
router.register(r'fuel', FuelView, 'fuel')
router.register(r'transmission', TransmissionView, 'transmission')
router.register(r'interior', InteriorView, 'interior')
router.register(r'image', ImageView, 'image')
router.register(r'carImage', CarImageView, 'carImage')
router.register(r'car', CarView, 'car')

# endregion
