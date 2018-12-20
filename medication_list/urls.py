#from django.conf.urls import url

from django.urls import path

from . import views

app_name = 'medicines'

urlpatterns = [
    path('', views.index, name='index'),
    path('get-medicine/<int:pk>/', views.get_medicine_detail, name='get_medicine_detail'),
    path('api/get_medicine/', views.get_medicine, name='api_get_medicine'),
    path('api/get_type_values/', views.get_medicine_type, name='api_get_type_values'),
    path('api/get_frequency_values/', views.get_medicine_frequency, name='api_get_frequency_values'),
    path('api/get_dosage_values/', views.get_medicine_dosage, name='api_get_dosage_values'),
	path('api/get_category_values/', views.get_medicine_category, name='api_get_category_values'),
    path('api/add_medicine/', views.add_medicine, name='api_add_medicine'),   
]

# urlpatterns = [
#      path(r'^$', views.index, name='index'),
#     path(r'^get-medicine/(?P<pk>\d+)/?$', views.get_medicine_detail, name='get_medicine_detail'),
#     path(r'^api/get_medicine/?$', views.get_medicine, name='api_get_medicine'),
#     path(r'^api/get_type_values/?$', views.get_medicine_type, name='api_get_type_values'),
#     path(r'^api/get_frequency_values/?$', views.get_medicine_frequency, name='api_get_frequency_values'),
#     path(r'^api/get_dosage_values/?$', views.get_medicine_dosage, name='api_get_dosage_values'),
# 	path(r'^api/get_category_values/?$', views.get_medicine_category, name='api_get_category_values'),
#     path(r'^api/add_medicine/?$', views.add_medicine, name='api_add_medicine'),   
# ]