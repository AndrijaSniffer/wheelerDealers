import json
from dataclasses import asdict

from django.forms.models import model_to_dict
from django.db import connection
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import routers, viewsets
from rest_framework.permissions import AllowAny

from wheelerDealersApi import security
from wheelerDealersApi.classes import UserClass, CompanyClass
from wheelerDealersApi.db_handler import DBHandler
from wheelerDealersApi.security import MyTokenObtainPairSerializer
from wheelerDealersApi.serializer import *
from wheelerDealersApi.util import checkIfKeyExists, checkIfValueExists, safe_int

router = routers.DefaultRouter()
db_handler = DBHandler()


def registerUser(request):
    if request.method == 'POST':
        post = request.POST

        if not (checkIfKeyExists(post, 'username') and checkIfKeyExists(post, 'password')
                and checkIfKeyExists(post, 'email') and checkIfKeyExists(post, 'is_reseller')):
            return HttpResponse(status=400)

        if db_handler.CheckIfUserExists(str(post.get('username'))):
            return HttpResponse("User already exists", status=409)

        password = post.get('password')

        PIB, phone, address = None, None, None

        if checkIfKeyExists(post, 'PIB'):
            PIB = safe_int(post.get('PIB'))

        if checkIfKeyExists(post, 'phone'):
            phone = post.get('phone')

        if checkIfKeyExists(post, 'address'):
            address = post.get('address')

        # Password hashing done in constructor
        user = UserClass(
            None,
            CompanyClass(PIB, None, None, None, None),
            post.get('username'),
            post.get('email'),
            password,
            bool(post.get('deactivated')),
            timezone.now(),
            phone,
            address,
            bool(post.get('is_reseller')),
            False,
        )

        if db_handler.CreateNewUser(user):
            return HttpResponse("New user added", status=201)
        else:
            return HttpResponse("Unable to create user", status=500)
    else:
        return HttpResponse(status=400)


def signIn(request):
    if request.method == 'POST':
        post = request.POST

        username = post.get('username')
        password = post.get('password')

        user = db_handler.GetUserForAuthorization(username)

        if user is not None:
            if security.SecurityUtil.verify_password(password, user.password):
                token = MyTokenObtainPairSerializer.get_token(user)
                return HttpResponse(status=200)
            else:
                return HttpResponse(status=401)
        else:
            return HttpResponse(status=404)


def getAllEngine(request):
    if request.method == 'GET':
        listEngine = []

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT `id_engine`, `engine_code`, `horsepower`, `kilowatt`, `volume`, `id_engine_type`, `engine_type`"
                " FROM `wheelerdealersapi_engine` as `e`, `wheelerdealersapi_enginetype` as `et`"
                " WHERE e.id_engine_type_id = et.id_engine_type;")
            rows = cursor.fetchall()

            for row in rows:
                listEngine.append(asdict(EngineDto(
                    id_engine=row[0],
                    engine_code=row[1],
                    horsepower=row[2],
                    kilowatt=row[3],
                    volume=row[4],
                    id_engine_type=row[5],
                    engine_type=row[6]
                )))

        return HttpResponse(json.dumps(listEngine))


def getAllManufacturers(request):
    if request.method == 'GET':
        listManufacturers = []

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT `id_manufacturer`, `name_manufacturer`, `id_country_id` as `id_country`, `name_country` "
                "FROM `wheelerdealersapi_manufacturer` m, `wheelerdealersapi_country` c "
                "WHERE m.id_country_id = c.id_country;")
            rows = cursor.fetchall()

            for row in rows:
                listManufacturers.append(asdict(ManufacturerDto(
                    id_manufacturer=row[0],
                    name_manufacturer=row[1],
                    id_country=model_to_dict(Country(id_country=row[2], name_country=row[3]))
                )))

        return HttpResponse(json.dumps(listManufacturers))


def getAllModels(request):
    if request.method == 'GET':
        listModels = []

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT `id_model`, `name_model`, `year_of_manufacture`, `id_engine`, `engine_code`, `id_manufacturer`, `name_manufacturer` "
                "FROM `wheelerdealersapi_model` mo, `wheelerdealersapi_engine` e, `wheelerdealersapi_manufacturer` ma "
                "WHERE mo.id_engine_id = e.id_engine and mo.id_manufacturer_id = ma.id_manufacturer")
            rows = cursor.fetchall()

            for row in rows:
                listModels.append(asdict(ModelDto(
                    id_model=row[0],
                    name_model=row[1],
                    year_of_manufacture=row[2],
                    id_engine=model_to_dict(Engine(id_engine=row[3], engine_code=row[4])),
                    id_manufacturer=model_to_dict(Manufacturer(id_manufacturer=row[5], name_manufacturer=row[6]))
                )))

        return HttpResponse(json.dumps(listModels))


def getAllUsers(request):
    if request.method == 'GET':
        listUser = UserClass.objects.all()
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


def defaultSearch(request):
    if request.method == 'GET':
        listCars = []

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT `id_car`, `id_user`, `price`, `color`, `chassis_number`, `is_preowned`, `created_at`, `id_fuel`, `fuel_name`, `kml`, `id_model`, `name_model`, `year_of_manufacture`, `id_manufacturer`, `name_manufacturer` "
                "FROM `wheelerdealersapi_car` c, `wheelerdealersapi_fuel` f, `wheelerdealersapi_model` mo, `wheelerdealersapi_manufacturer` ma "
                "WHERE c.id_fuel_id = f.id_fuel and c.id_model_id = mo.id_model and mo.id_manufacturer_id = ma.id_manufacturer;")
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


class FuelView(viewsets.ModelViewSet):
    queryset = Fuel.objects.all()
    serializer_class = FuelSerializer
    permission_classes = [AllowAny]


class DrivetrainView(viewsets.ModelViewSet):
    queryset = Drivetrain.objects.all()
    serializer_class = DrivetrainSerializer
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


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [AllowAny]


# region Router

router.register(r'countries', CountryView, 'countries')
router.register(r'drivetrains', DrivetrainView, 'drivetrains')
router.register(r'manufacturers', ManufacturerView, 'manufacturers')
router.register(r'engineTypes', EngineTypeView, 'engineTypes')
router.register(r'engines', EngineView, 'engines')
router.register(r'modelTypes', ModelTypeView, 'modelTypes')
router.register(r'models', ModelView, 'models')
router.register(r'modelTypeModels', ModelTypeModelView, 'modelTypeModels')
router.register(r'fuels', FuelView, 'fuel')
router.register(r'transmissions', TransmissionView, 'transmissions')
router.register(r'interiors', InteriorView, 'interiors')
router.register(r'images', ImageView, 'images')
router.register(r'carImages', CarImageView, 'carImages')
router.register(r'cars', CarView, 'cars')

# endregion
