from django.urls import path
from .views import api_list_customer,  api_list_sales, api_list_automobiles, api_list_salesperson, api_show_sales, api_show_customer, api_show_salesperson


urlpatterns = [
    path('salespeople/', api_list_salesperson, name="api_list_salesperson"),
    path("salespeople/<int:id>/", api_show_salesperson, name="api_show_salesperson"),
    path("customer/<int:id>/", api_show_customer, name="api_show_customer"),
    path("customer/", api_list_customer, name="api_list_customer"),
    path("sales/<int:id>/", api_show_sales, name="api_show_sales"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("autos/", api_list_automobiles, name="api_list_sales"),
]
