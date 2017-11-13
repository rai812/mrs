from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^add-visit/?$', views.add_visit, name='add_visit'),
    url(r'^get-visit/(?P<pk>\d+)/?$', views.get_visit_detail, name='get_visit_detail'),
]