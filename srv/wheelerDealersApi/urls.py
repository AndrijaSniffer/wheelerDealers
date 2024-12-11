from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from . import views
from .security import MyTokenObtainPairView

urlpatterns = [
    path('', include(views.router.urls)),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/user/create', views.registerUser, name='register_user'),
    path('api/user/signin', views.signIn, name='sign_in'),
    path('getAllEngine', views.getAllEngine, name='getAllEngine'),
    path('getAllManufacturers', views.getAllManufacturers, name='getAllManufacturers'),
    path('getAllModels', views.getAllModels, name='getAllModels'),
    path('search/default', views.defaultSearch, name='defaultSearch'),
    path('search/normal', views.normalSearch, name='normalSearch')
]
