import os

from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers, viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from wheelerDealersApi.security import IsAdminOrReadOnly, IsUserSelf, CarPermission
from wheelerDealersApi.serializer import *

router = routers.DefaultRouter()


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def create_account(request):
    user = User.objects.filter(is_superuser=True).first()
    admin_exists = bool(user)  # True if admin exists, False if not

    # Create a mutable copy of request data (using _full_data)
    data = request.data.dict()  # Convert from QueryDict to Dict
    data['is_superuser'] = not admin_exists  # Add is_superuser to the request data
    data['is_staff'] = not admin_exists
    data['is_active'] = True
    data['PIB'] = None if data.get('PIB') is None or data.get('PIB') == 'null' else int(data.get('PIB'))

    serializer = RegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    else:
        if data['PIB'] is not None:
            try:
                # Attempt to find and delete the company with the given PIB
                company = Company.objects.get(PIB=data['PIB'])
                company.delete()
            except Company.DoesNotExist:
                # If no company exists with the given PIB, do nothing
                pass
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY, data=serializer.errors)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def create_company(request):
    logo_name = None
    if request.FILES.get('logo'):
        logo_image = request.FILES['logo']

        # Define the path to save the logo
        upload_dir = settings.LOGO_ROOT
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        # Save the logo to the local folder
        file_path = os.path.join(upload_dir, logo_image.name)
        with open(file_path, 'wb+') as destination:
            for chunk in logo_image.chunks():
                destination.write(chunk)
        logo_name = logo_image.name

    data = request.data.dict()
    data['logo_name'] = logo_name
    data.pop('logo', None)

    serializer = CompanySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    else:
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY, data=serializer.errors)


@csrf_exempt
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def get_all_users(request):
    users = User.objects.all()  # Fetch all users
    serializer = UserSerializer(users, many=True)  # Serialize the queryset
    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['GET'])
@permission_classes([IsUserSelf | permissions.IsAdminUser])
def get_user_by_id(request, user_id: int):
    user = User.objects.get(pk=user_id)  # Fetch user by id
    serializer = UserSerializer(user, many=False)  # Serialize the queryset
    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_car_color(request):
    colors = Car.objects.all().values_list('color', flat=True).distinct()
    color_list = [{"color": color} for color in colors if color]  # Exclude None/empty values

    # Return the formatted data as a JSON response
    return Response(color_list)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_models_by_manufacturer_id(request):
    manufacturer_id = request.query_params.get('manufacturer_id')
    if manufacturer_id is not None:
        models = Model.objects.filter(manufacturer=manufacturer_id)
        serializer = ModelSerializer(models, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': 'manufacturer_id is required'})


@api_view(['PUT'])
@permission_classes([IsUserSelf | permissions.IsAdminUser])
def ban_user_by_id(request):
    try:
        userID = request.data.get('id')
        user = User.objects.get(pk=userID)  # Fetch user by id
        user.is_active = False  # Set is_active to False
        user.save()  # Save the change to the database
        return Response({"success": True}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"success": False}, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return Response({"success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def car_search(request):
    if request.method == 'GET':
        search = request.GET

        filters = Q()

        id_manufacturer = search.get('manufacturer', None)
        id_model = search.get('model', None)
        id_transmission = search.get('transmission', None)
        id_fuel = search.get('fuel', None)
        id_drive = search.get('drivetrain', None)
        is_preowned = search.get('is_preowned', None)
        price_from = search.get('price_from', None)
        price_to = search.get('price_to', None)
        volume = search.get('volume', None)
        hp_from = search.get('hp_from', None)
        hp_to = search.get('hp_to', None)
        kw_from = search.get('kw_from', None)
        kw_to = search.get('kw_to', None)
        car_color = search.get('car_color', None)
        steering_wheel_left = search.get('steering_wheel_left', None)

        if id_manufacturer:
            filters &= Q(model__manufacturer=id_manufacturer)
        if id_model:
            filters &= Q(model=id_model)
        if id_transmission:
            filters &= Q(transmission=id_transmission)
        if id_fuel:
            filters &= Q(fuel=id_fuel)
        if id_drive:
            filters &= Q(drive=id_drive)
        if is_preowned is not None:
            filters &= Q(is_preowned=is_preowned)
        if price_from:
            filters &= Q(price__gte=price_from)
        if price_to:
            filters &= Q(price__lte=price_to)
        if volume:
            filters &= Q(engine__volume=volume)
        if hp_from:
            filters &= Q(engine__horsepower__gte=hp_from)
        if hp_to:
            filters &= Q(engine__horsepower__lte=hp_to)
        if kw_from:
            filters &= Q(engine__kilowatt__gte=kw_from)
        if kw_to:
            filters &= Q(engine__kilowatt__lte=kw_to)
        if car_color:
            filters &= Q(color=car_color)
        if steering_wheel_left is not None:
            filters &= Q(interior__steering_wheel_left=steering_wheel_left)

        # Combine all filters and filter by active users in one query
        filters &= Q(user__is_active=True)
        cars = Car.objects.filter(filters).distinct()

        serializer = CarSerializer(cars, many=True)  # Pass queryset to the serializer

        return Response(status=status.HTTP_200_OK, data=serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


class CompanyView(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('PIB')
    serializer_class = CompanySerializer
    permission_classes = [IsAdminOrReadOnly]


class CountryView(viewsets.ModelViewSet):
    queryset = Country.objects.all().order_by('country')
    serializer_class = CountrySerializer
    permission_classes = [IsAdminOrReadOnly]


class ManufacturerView(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all().order_by('manufacturer')
    serializer_class = ManufacturerSerializer
    permission_classes = [IsAdminOrReadOnly]


class EngineTypeView(viewsets.ModelViewSet):
    queryset = EngineType.objects.all().order_by('engine_type')
    serializer_class = EngineTypeSerializer
    permission_classes = [IsAdminOrReadOnly]


class EmissionClassView(viewsets.ModelViewSet):
    queryset = EmissionClass.objects.all().order_by('emission_class')
    serializer_class = EmissionClassSerializer
    permission_classes = [IsAdminOrReadOnly]


class EngineView(viewsets.ModelViewSet):
    queryset = Engine.objects.all().order_by('engine')
    serializer_class = EngineSerializer
    permission_classes = [IsAdminOrReadOnly]


class ModelTypeView(viewsets.ModelViewSet):
    queryset = ModelType.objects.all().order_by('model_type')
    serializer_class = ModelTypeSerializer
    permission_classes = [IsAdminOrReadOnly]


class ModelView(viewsets.ModelViewSet):
    queryset = Model.objects.all().order_by('model')
    serializer_class = ModelSerializer
    permission_classes = [IsAdminOrReadOnly]


class ModelTypeModelView(viewsets.ModelViewSet):
    queryset = ModelTypeModel.objects.all().order_by('model_type')
    serializer_class = ModelTypeModelSerializer
    permission_classes = [IsAdminOrReadOnly]


class FuelView(viewsets.ModelViewSet):
    queryset = Fuel.objects.all().order_by('fuel')
    serializer_class = FuelSerializer
    permission_classes = [IsAdminOrReadOnly]


class DrivetrainView(viewsets.ModelViewSet):
    queryset = Drivetrain.objects.all().order_by('drivetrain')
    serializer_class = DrivetrainSerializer
    permission_classes = [IsAdminOrReadOnly]


class TransmissionView(viewsets.ModelViewSet):
    queryset = Transmission.objects.all().order_by('-gears')
    serializer_class = TransmissionSerializer
    permission_classes = [IsAdminOrReadOnly]


class InteriorView(viewsets.ModelViewSet):
    queryset = Interior.objects.all().order_by('interior')
    serializer_class = InteriorSerializer
    permission_classes = [IsAdminOrReadOnly]


class ImageView(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by('image')
    serializer_class = ImageSerializer
    permission_classes = [IsAdminOrReadOnly]


class CarImageView(viewsets.ModelViewSet):
    queryset = CarImage.objects.all().order_by('image')
    serializer_class = CarImageSerializer
    permission_classes = [IsAdminOrReadOnly]


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all().order_by('car')
    serializer_class = CarSerializer
    permission_classes = [CarPermission]


# region Router

router.register(r'company', CompanyView, 'company')
router.register(r'country', CountryView, 'country')
router.register(r'drivetrain', DrivetrainView, 'drivetrain')
router.register(r'manufacturer', ManufacturerView, 'manufacturer')
router.register(r'engineType', EngineTypeView, 'engineType')
router.register(r'emissionClass', EmissionClassView, 'emissionClass')
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
