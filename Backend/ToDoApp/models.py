from django.db import models

class Task(models.Model):
    title=models.CharField(max_length=250)
    isCompleted=models.BooleanField(default=False)