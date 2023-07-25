from django.db import models
from django.urls import reverse

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    technician_id = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.technician_id

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.technician_id})

class Appointment(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    date_time = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    vip = models.BooleanField(default=False, null=True)
    status = models.CharField(max_length=200, default=False, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.customer

    def gat_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.vin})
