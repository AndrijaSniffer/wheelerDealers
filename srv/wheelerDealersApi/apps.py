import sys

from django.apps import AppConfig
from django.db.models.signals import post_migrate


class WheelerdealersapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'wheelerDealersApi'

    def ready(self):
        post_migrate.connect(create_default_superuser, sender=self)


def create_default_superuser(sender, **kwargs):
    if 'test' in sys.argv:
        return

    from django.contrib.auth import get_user_model
    user = get_user_model()

    if not user.objects.filter(is_superuser=True).exists():
        user.objects.create_superuser(
            username='admin',
            password='ThisIsMyAdminPassword',
            email='admin@admin.com'
        )
        print('Default superuser created successfully')
