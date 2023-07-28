from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import Salesperson, Customer, Sale, AutomobileVO
import json
from django.http import JsonResponse


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "id",
    ]


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
        "id",
    ]
    encoders = {
        "customer": CustomerDetailEncoder(),
        "salesperson": SalespersonDetailEncoder(),
        "automobile": AutomobileVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonDetailEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                    salesperson,
                    encoder=SalespersonDetailEncoder,
                    safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson already exists"})
            response.status_code = 400
            return response
        except:
            response = JsonResponse({"message": "Creation Failed!!!!"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(salesperson, encoder=SalespersonDetailEncoder, safe=False)
        except Salesperson.DoesNotExist:
            response = JsonResponse({"messages": "Salesperson is not in database"})
            response.status_code = 404
            return response
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            Salesperson.objects.filter(id=id).update(**content)
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(salesperson, encoder=SalespersonDetailEncoder, safe=False)
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "salesperson does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            salesperson = Salesperson.objects.get(employee_id=id).delete()
            return JsonResponse({"confirmation": "Successfully deleted salesperson!!"})
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Salesperson is not in database"})


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse({"customer": customer}, encoder=CustomerDetailEncoder,)
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(customer, encoder=CustomerDetailEncoder, safe=False)
        except:
            response = JsonResponse({"message": "Can't create customer"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerDetailEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer doesn't exist in database"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.filter(id=id).delete()
            return JsonResponse({"confirmation": "Delete Successful!"})
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist! check database or customer list."})
    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerDetailEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist! check database or customer list."})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sale": list(sales)}, encoder=SaleDetailEncoder)
    else:
        content = json.loads(request.body)
        try:
            salesperson = content["salesperson"]
            sale = Salesperson.objects.get(id=salesperson)
            content["salesperson"] = sale
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": 'Salesperson is not in the database'}, status=404
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer

        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": 'Customer does not exist! Check the database or customer list'}, status=404
            )
        try:
            vin = content["automobile"]
            car = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = car
            content["automobile"].sold = True
            content["automobile"].save()
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": 'Automobile not in the database! Check for sales records'}, status=404
            )
        try:
            price = content["price"]
            sale = Sale.objects.create(**content)

            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Price not available! Maybe it's free.. you never know lol"}, status=404
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_sales(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(sale, encoder=SaleDetailEncoder, safe=False)
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Sales record does not exist"})
            response.status_code = 404
            return response
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            Sale.objects.filter(id=id).update(**content)
            sales_record = Sale.objects.get(id=id)
            return JsonResponse(sales_record, encoder=SaleDetailEncoder, safe=False)
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Sales record does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            sale = Sale.objects.get(id=id).delete()
            return JsonResponse({"confirmation": "sale deleted"})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"},
                status=404
            )


require_http_methods(["GET"])
def api_list_automobiles(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse({"automobiles": automobiles}, encoder=AutomobileVODetailEncoder, safe=False)
