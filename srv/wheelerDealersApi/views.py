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


# region Auth
#
# def loginUser(request):
#     if request.method == "POST":
#         post = request.POST
#
#         if not (checkIfKeyExists(post, 'username') and checkIfKeyExists(post, 'password')):
#             return HttpResponse(status=400)
#
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#
#             response = HttpResponse(json.dumps(dataclasses.asdict(UserDto(
#                 id=user.id,
#                 firstName=user.first_name,
#                 lastName=user.last_name,
#                 username=user.username,
#                 isStaff=user.is_staff,
#                 isSuperuser=user.is_superuser,
#                 email=user.email,
#                 isActive=user.is_active,
#                 dateJoined=str(user.date_joined)
#             ))), content_type='json')
#
#             return response
#         else:
#             return HttpResponse(status=401)
#
#     else:
#         return HttpResponse(status=400)
#
#
# def logoutUser(request):
#     if request.method == 'DELETE':
#         logout(request)
#         return HttpResponse(status=200)
#     else:
#         return HttpResponse(status=400)
#
#
# def isAuthorized(request):
#     if request.method == 'GET':
#         return HttpResponse(json.dumps({"authorized": request.user.is_authenticated}), content_type='json')
#     else:
#         return HttpResponse(status=400)
#
#
# def registerUser(request):
#     if request.method == 'POST':
#         post = request.POST
#
#         if not (checkIfKeyExists(post, 'username') and checkIfKeyExists(post, 'password')
#                 and checkIfKeyExists(post, 'email') and checkIfKeyExists(post, 'firstName')
#                 and checkIfKeyExists(post, 'lastName')):
#             return HttpResponse(status=400)
#
#         user = User.objects.create_user(post["username"], post["email"], post["password"], first_name=post["firstName"],
#                                         last_name=post["lastName"], is_staff=False)
#         return HttpResponse(status=200)
#     else:
#         return HttpResponse(status=400)
#
#
# def deactivateUser(request):
#     if request.method == 'DELETE':
#         if request.user.is_superuser:
#             if not checkIfKeyExists(request.GET, 'PK'):
#                 return HttpResponse(status=400)
#
#             pk = request.GET["PK"]
#
#             user = User.objects.filter(id=pk)
#             user.update(is_active=False)
#
#             return HttpResponse(status=200)
#
#         else:
#             return HttpResponse(status=401)
#     else:
#         return HttpResponse(status=400)
#
#
# def updateUser(request):
#     if request.method == 'PUT':
#         id = request.user.id
#         body_unicode = request.body.decode('utf-8')
#         body = json.loads(body_unicode)
#
#         user = User.objects.filter(id=id)
#
#         if checkIfKeyExists(body, 'firstName'):
#             user.update(first_name=body['firstName'])
#
#         if checkIfKeyExists(body, 'lastName'):
#             user.update(last_name=body['lastName'])
#
#         if checkIfKeyExists(body, 'password'):
#             user.set_password(body['password'])
#             user.save()
#
#         return HttpResponse(status=200)
#     else:
#         return HttpResponse(status=400)
#
#
# # endregion

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
