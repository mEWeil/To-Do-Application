from django.db import models

class Task(models.Model):
    title=models.CharField(max_length=250)
    isCompleted=models.BooleanField(default=False)

    def change_status(self):
        self.isCompleted = not self.isCompleted
        self.save()
    
    def change_title(self, title):
        self.title = title
        self.save()