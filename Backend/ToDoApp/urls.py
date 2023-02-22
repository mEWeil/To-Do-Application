from django.urls import path
from .views import Task_handler, Multiple_Task_handler
from . import views

urlpatterns = [ 
  path('', views.index, name='index'),
  path('task_list', Multiple_Task_handler.as_view(), name='task_list'),
  path('add_task', Task_handler.as_view(), name='add_task'),
  path('status_change', Multiple_Task_handler.as_view(), name='status_change'),
  path('delete_tasks', Multiple_Task_handler.as_view(), name='delete_tasks'),
  path('update_task_title', Task_handler.as_view(), name='update_task_title'),
]