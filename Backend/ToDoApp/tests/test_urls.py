from django.test import TestCase,  Client
from django.urls import reverse, resolve
from ToDoApp.views import *
from ToDoApp import views

class TestUrls(TestCase):
  def setUp(self):
    self.client=Client()

  def test_index_url(self):
    url = reverse('index')
    self.assertEquals(resolve(url).func, index)

  def test_index_GET(self):
    response = self.client.get(reverse('index'))
    self.assertEquals(response.status_code, 200)

  def test_list_tasks_GET(self):
    response = self.client.get(reverse('list_tasks'))
    self.assertEquals(response.status_code, 200)

  def test_list_tasks_func(self):
    url = reverse('list_tasks')
    self.assertEqual(resolve(url).func, views.list_tasks)