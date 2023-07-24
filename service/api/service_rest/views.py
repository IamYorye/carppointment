from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods

# Create your views here.

class AutomobileVOEnconder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "technician_id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "date_time",
        "reason",
        "customer",
        "vip",
        "status",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        return {"technician": o.technician_id}


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"MESSAGE": "TECHNICIAN COULD NOT BE CREATED"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"MESSAGE": "TECHNICIAN DOES NOT EXIST"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=pk).delete()
            return JsonResponse({"DELETED": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse({"MESSAGE": "TECHNICIAN DOES NOT EXIST"})
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=pk)

            props = ["id", "first_name", "last_name", "technician_id"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"MESSAGE": "TECHNICIAN DOES NOT EXIST"})
            response.status_code = 404
            return JsonResponse


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content=json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"MESSAGE": "INVALID TECHNICIAN ID"},
                status=400
            )
        try:
            if AutomobileVO.objects.get(vin=content["vin"]):
                content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )



@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointment(request,pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"MESSAGE": "APPOINTMENT DOES NOT EXIST"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=pk).delete()
            return JsonResponse({"DELETED": count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse({"MESSAGE": "APPOINTMENT DOES NOT EXIST"})
    else:
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=pk)

            props = ["id", "vin", "date_time", "reason", "customer", "vip", "status", "technician"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"MESSAGE": "APPOINTMENT DOES NOT EXIST"})
            response.status_code = 404
            return JsonResponse
