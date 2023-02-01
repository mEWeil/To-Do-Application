from django.db import models

class Task(models.Model):
    title=models.CharField(max_length=250)
    status=models.BooleanField(default=False)
    # parent=models.ForeignKey("Task",null=True, on_delete=models.CASCADE)
    # user= models.ForeignKey("AppUser", null=True, on_delete=models.CASCADE)

# class AppUser(models.Model):
