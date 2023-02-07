from django.urls import path
from . import views

urlpatterns = [ 
  path('', views.index, name='index'),
  path('list_tasks', views.list_tasks, name='list_tasks'),
]