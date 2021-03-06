#from django.conf.urls import url
from django.urls import path

from . import views

app_name='complaints'

urlpatterns = [
    path('api/get_disease/', views.get_disease, name='api_get_disease'),
    path('api/get_complaints/', views.get_complaints, name='api_get_complaints'),
    path('api/add_complaints/', views.add_complaints, name='api_add_complaints'),
    path('api/add_disease/', views.add_disease, name='api_add_disease'),
]