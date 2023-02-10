from django.test import TestCase, Client
from django.urls import reverse, resolve
import json
from ToDoApp.views import *

class TestViews(TestCase):
  def setup(self):
    self.client = Client()

  def test_list_tasks(self):
    task_list_response = self.client.get(reverse('list_tasks'))
    task_list = json.loads(task_list_response.content)
    print(task_list)
    self.assertEquals(task_list, { 'tasks': [] })

