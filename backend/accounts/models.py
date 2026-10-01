from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField("Телефон", max_length=20, blank=True)

    def __str__(self):
        return self.username or self.phone or str(self.pk)