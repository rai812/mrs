from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^add-history/?$', views.add_history, name='add_history'),
    url(r'^add-history-api/?$', views.add_history_api, name='add_history_api'),
]