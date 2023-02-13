from django.test import TestCase, Client
from django.urls import reverse, resolve
import json
from ToDoApp.views import *

class TestViews(TestCase):
  def setup(self):
    self.client = Client()

  def test_list_tasks_returns_object_with_array_of_tasks(self):
    task_list_response = self.client.get(reverse('list_tasks'))
    task_list = json.loads(task_list_response.content)
    self.assertEqual(task_list, { 'tasks': [] })

