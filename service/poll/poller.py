import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something

def get_automobile():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin = automobile["vin"],
            defaults ={
                "vin": automobile["vin"],
            }
        )


def poll(repeat=True):
    while True:
        print('Service poller polling for data')
        try:
            get_automobile()
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
