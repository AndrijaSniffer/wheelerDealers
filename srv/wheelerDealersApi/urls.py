from django.conf.urls.static import static
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from srv import settings
from . import views
from .security import MyTokenObtainPairView

urlpatterns = [
    path('', include(views.router.urls)),
    path('api/auth/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/auth/create', views.create_account, name='create_user'),
    path('api/auth/users', views.get_all_users, name='get_all_users'),
    path('api/auth/user/<int:userID>', views.get_user_by_id, name='get_user_by_id'),
    path('api/auth/user/ban', views.ban_user_by_id, name='ban_user_by_id'),
    path('api/company', views.create_company, name='create_company'),
    path('search/normal', views.car_search, name='normalSearch'),
    path('car/colors', views.get_all_car_color, name='getAllCarColor')
]

if settings.DEBUG:
    urlpatterns += static(settings.LOGO_URL, document_root=settings.LOGO_ROOT)
