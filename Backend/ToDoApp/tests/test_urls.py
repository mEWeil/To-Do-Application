from django.test import TestCase,  Client
from django.urls import reverse, resolve
from ToDoApp.views import *
from ToDoApp import views

class TestUrls(TestCase):
  def setUp(self):
    self.client=Client()

  def test_index_url_is_resolved(self):
    url = reverse('index')
    print(url)
    self.assertEquals(resolve(url).func, index)

  def test_index_returns_successful_response(self):
    response = self.client.get(reverse('index'))
    self.assertEquals(response.status_code, 200)

  def test_task_list_url_is_resolved(self):
    url = reverse('task_list')
    self.assertEqual(resolve(url).func.view_class, Task_handler)

  def test_task_list_returns_successful_response(self):
    response = self.client.get(reverse('task_list'))
    self.assertEquals(response.status_code, 200)

  def test_add_task_url_is_resolved(self):
    url = reverse('add_task')
    self.assertEqual(resolve(url).func.view_class, Task_handler)

  def test_add_task_returns_successful_response(self):
    response = self.client.post(reverse('add_task'), {'title': 'test'})
    self.assertEquals(response.status_code, 200)
