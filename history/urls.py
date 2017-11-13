from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^add-history/?$', views.add_history, name='add_history'),
]