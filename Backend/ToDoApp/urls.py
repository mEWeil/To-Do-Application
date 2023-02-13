from django.urls import path
from .views import Task_handler
from . import views

urlpatterns = [ 
  path('', views.index, name='index'),
  path('list_tasks/', Task_handler.as_view(), name='list_tasks'),
]