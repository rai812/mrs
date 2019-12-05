# from django.conf.urls import url

from django.urls import path

from . import views
from . import report
# from . import report_testing
# from . import report_generic
from . import report_doc

app_name = 'visit'

urlpatterns = [
    path('', views.index, name='index'),
    path('add-visit/', views.add_visit, name='add_visit'),
    path('get-visit/<int:pk>/', views.get_visit_detail, name='get_visit_detail'),
    path('api/add_visit/', views.add_visit_api, name='api_add_visit'),
    # path('report/<int:pk>/', report_testing.fc_maker_view, name='visit_report'),
    # path('report/<int:pk>/', report_generic.fc_maker_view, name='visit_report'),
    path('report/<int:pk>/', report_doc.generate_report, name='visit_report'),
    path('get_visit_list/', views.get_visit_list, name='get_visit_list'),
]

# urlpatterns = [
#     path(r'^$', views.index, name='index'),
#     path(r'^add-visit/?$', views.add_visit, name='add_visit'),
#     path(r'^get-visit/(?P<pk>\d+)/?$', views.get_visit_detail, name='get_visit_detail'),
#     path(r'^api/add_visit/?$', views.add_visit_api, name='api_add_visit'),
#     path(r'^report/(?P<pk>\d+)/?$', report_testing.fc_maker_view, name='visit_report'),
#     path(r'^get_visit_list/?$', views.get_visit_list, name='get_visit_list'),
# ]
