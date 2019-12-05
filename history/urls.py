#from django.conf.urls import url

from django.urls import path

from . import views

app_name = 'history'

urlpatterns = [
    path('add-history/', views.add_history, name='add_history'),
    path('add-history-api/', views.add_history_api, name='add_history_api'),
    path('get-history-api/', views.get_history_api, name='get_history_api'),
    path('history-doc-upload-api/', views.history_doc_upload_api, name='history_doc_upload_api'),
    path('get-medical-files-api/', views.get_medical_files, name='get_medical_files_api'),

]

# urlpatterns = [
#     path(r'^add-history/?$', views.add_history, name='add_history'),
#     path(r'^add-history-api/?$', views.add_history_api, name='add_history_api'),
#     path(r'^get-history-api/?$', views.get_history_api, name='get_history_api'),
# ]