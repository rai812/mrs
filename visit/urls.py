from django.conf.urls import url

from . import views
from . import report

urlpatterns = [
    url(r'^add-visit/?$', views.add_visit, name='add_visit'),
    url(r'^get-visit/(?P<pk>\d+)/?$', views.get_visit_detail, name='get_visit_detail'),
    url(r'^api/add_visit/?$', views.add_visit_api, name='api_add_visit'),
    url(r'^report/?$', report.fc_maker_view, name='visit_report'),
]