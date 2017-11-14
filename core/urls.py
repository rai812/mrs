from django.conf.urls import url, include

from django.contrib.auth import views as auth_views


from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^add-patient/?$', views.add_patient, name='add_patient'),
    url(r'^get-patient/(?P<pk>\d+)/?$', views.get_patient_detail, name='get_patient_detail'),
    url(r'^core/api/get_patients/?$', views.get_patients, name='api_get_patient'),
    url(r'^core/api/add_vitals/?$', views.add_vitals, name='api_add_vitals'),
    url(r'^accounts/', include('django.contrib.auth.urls')),
]
