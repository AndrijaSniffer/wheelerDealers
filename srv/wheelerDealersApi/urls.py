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
    path('api/auth/create', views.createAccount, name='create_user'),
    path('api/auth/user', views.getAllUsers, name='get_all_users'),
    path('api/auth/user/<int:id>', views.getAllUsers, name='get_all_users'),
    path('api/company', views.createCompany, name='create_company'),
    path('search/normal', views.normalSearch, name='normalSearch')
]

if settings.DEBUG:
    urlpatterns += static(settings.LOGO_URL, document_root=settings.LOGO_ROOT)
