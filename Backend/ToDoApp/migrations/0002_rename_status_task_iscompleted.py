# Generated by Django 4.1.5 on 2023-02-08 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ToDoApp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='status',
            new_name='isCompleted',
        ),
    ]
