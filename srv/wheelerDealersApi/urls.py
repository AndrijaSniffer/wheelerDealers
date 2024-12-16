from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from . import views
from .security import MyTokenObtainPairView

urlpatterns = [
    path('', include(views.router.urls)),
    path('api/auth/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/auth/create', views.createAccount, name='create_user'),
    path('api/auth/getAll', views.getAllUsers, name='get_all_users'),
    path('getAllEngine', views.getAllEngine, name='getAllEngine'),
    path('getAllManufacturers', views.getAllManufacturers, name='getAllManufacturers'),
    path('getAllModels', views.getAllModels, name='getAllModels'),
    path('search/default', views.defaultSearch, name='defaultSearch'),
    path('search/normal', views.normalSearch, name='normalSearch')
]
