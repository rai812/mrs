from django.conf.urls import url

from . import views

urlpatterns = [
     url(r'^$', views.index, name='index'),
    url(r'^get-medicine/(?P<pk>\d+)/?$', views.get_medicine_detail, name='get_medicine_detail'),
    url(r'^api/get_medicine/?$', views.get_medicine, name='api_get_medicine'),
    url(r'^api/get_type_values/?$', views.get_medicine_type, name='api_get_type_values'),
    url(r'^api/get_frequency_values/?$', views.get_medicine_frequency, name='api_get_frequency_values'),
    url(r'^api/get_dosage_values/?$', views.get_medicine_dosage, name='api_get_dosage_values'),
    url(r'^api/add_medicine/?$', views.add_medicine, name='api_add_medicine'),   
]