from django.test import TestCase, Client
from django.urls import reverse, resolve
import json
from ToDoApp.views import *

class TestViews(TestCase):
  def setup(self):
    self.client = Client()

  def test_list_tasks_returns_object_with_array_of_tasks(self):
    task_list_response = self.client.get(reverse('task_list'))
    task_list = json.loads(task_list_response.content)
    self.assertEqual(task_list, { 'tasks': [] })
      
  def test_new_task_returns_false_without_title(self):
      response=self.client.post(reverse('add_task'))
      body=json.loads(response.content)
      self.assertFalse(body['taskCreated'])
      
  def test_new_task_returns_true_with_title(self):
      response=self.client.post(reverse('add_task'),{'title': 'test'})
      body=json.loads(response.content)
      self.assertTrue(body['taskCreated'])

