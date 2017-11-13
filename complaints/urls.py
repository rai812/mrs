from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^api/get_disease/?$', views.get_disease, name='api_get_disease'),
    url(r'^api/get_complaints/?$', views.get_complaints, name='api_get_complaints'),
    url(r'^api/add_complaints/?$', views.add_complaints, name='api_add_complaints'),
    url(r'^api/add_disease/?$', views.add_disease, name='api_add_disease'),
]