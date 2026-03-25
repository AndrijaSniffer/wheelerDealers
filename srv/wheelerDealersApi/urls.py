from django.conf.urls.static import static
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from srv import settings
from . import views
from .security import MyTokenObtainPairView

urlpatterns = [
    path('', include(views.router.urls)),
    path('api/auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/auth/create/', views.create_account, name='create_user'),
    path('api/auth/users/', views.get_all_users, name='get_all_users'),
    path('api/auth/user/<int:user_id>/', views.get_user_by_id, name='get_user_by_id'),
    path('api/auth/user/<int:user_id>/update/', views.update_user, name='update_user'),
    path('api/auth/user/<int:user_id>/cars/', views.get_cars_by_user_id, name='get_cars_by_user_id'),
    path('api/auth/user/ban/', views.ban_user_by_id, name='ban_user_by_id'),
    path('api/company/', views.create_company, name='create_company'),
    path('search/normal/', views.car_search, name='normal_search'),
    path('car/colors/', views.get_all_car_color, name='get_all_car_color'),
    path('car/<int:car_id>/images/', views.upload_car_images, name='upload_car_images'),
    path('model/byManufacturerId/', views.get_models_by_manufacturer_id, name='get_model_by_manufacturer_id'),

]

if settings.DEBUG:
    urlpatterns += static(settings.LOGO_URL, document_root=settings.LOGO_ROOT)
    urlpatterns += static(settings.CAR_IMAGES_URL, document_root=settings.CAR_IMAGES_ROOT)
