from django.test import TestCase
from ToDoApp.models import Task

class TestTaskModel(TestCase):
    def setUp(self):
      self.pending_task = Task.objects.create(title='task 1')
      self.completed_task = Task.objects.create(title='task 2', isCompleted=True)

    def test_task_creation(self):
      self.assert_(self.pending_task)
      self.assert_(self.completed_task)