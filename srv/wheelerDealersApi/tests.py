# In your tests.py
from django.test import TestCase
from django.contrib.auth import get_user_model

class UserManagerTests(TestCase):
    def test_create_superuser(self):
        user = get_user_model()
        admin_user = user.objects.create_superuser(
            username='testadmin',
            email='admin@test.com',
            password='testpass123'
        )
        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_staff)
