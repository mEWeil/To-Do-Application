from django.urls import path
from .views import Task_handler
from . import views

urlpatterns = [ 
  path('', views.index, name='index'),
  path('task_list', Task_handler.as_view(), name='task_list'),
  path('add_task', Task_handler.as_view(), name='add_task'),
  path('status_change', Task_handler.as_view(), name='status_change'),
]