from django.db import models


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"



class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=12, unique=True)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin



class Sale(models.Model):
    customer = models.ForeignKey("Customer", related_name="Customer", on_delete=models.PROTECT)
    automobile = models.ForeignKey("AutomobileVO", related_name="automobiles", on_delete=models.CASCADE)
    salesperson = models.ForeignKey("Salesperson", related_name="Salesperson", on_delete=models.PROTECT)
    price = models.PositiveIntegerField()
