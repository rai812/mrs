#from django.conf.urls import url, include

from django.urls import path, include
from django.contrib.auth import views as auth_views


from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
    path('add-patient/', views.add_patient, name='add_patient'),
    path('get-patient/<int:pk>/', views.get_patient_detail, name='get_patient_detail'),
    path('core/api/get_patients/', views.get_patients, name='api_get_patient'),
    path('core/api/add_vitals/', views.add_vitals, name='api_add_vitals'),
    path('core/api/add_patient/', views.add_patient_api, name='api_add_patient'),
    path('core/get_patient_list/', views.get_patient_list, name='get_patient_list'),
    path('profile/', views.profile, name='get_user_profile'),
    path('accounts/', include('django.contrib.auth.urls')),
]

#urlpatterns = [
#    path(r'^$', views.index, name='index'),
#     path(r'^add-patient/?$', views.add_patient, name='add_patient'),
#     path(r'^get-patient/(?P<pk>\d+)/?$', views.get_patient_detail, name='get_patient_detail'),
#     path(r'^core/api/get_patients/?$', views.get_patients, name='api_get_patient'),
#     path(r'^core/api/add_vitals/?$', views.add_vitals, name='api_add_vitals'),
#     path(r'^core/api/add_patient/?$', views.add_patient_api, name='api_add_patient'),
#     path(r'^core/get_patient_list/?$', views.get_patient_list, name='get_patient_list'),
#     path(r'^accounts/', include('django.contrib.auth.urls')),
# ]
