from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from .models import *

def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp

class Task_handler(APIView):
    def post(self, request):
        try:
            newTask=Task.objects.create(title=request.data['title'])
            newTask.save()
            return JsonResponse({'taskCreated': True, 'id': newTask.id})
        except:
            return JsonResponse({'taskCreated': False})
    def put(self, request):
        try:
            task = Task.objects.get(id=request.data['id'])
            task.change_title(request.data['newTitle'])
            return JsonResponse({'titleChange': True})
        except:
            return JsonResponse({'titleChange': False})

class Multiple_Task_handler(APIView):
    def get(self, request):
        tasks = list(Task.objects.all().values())
        tasks = sorted(tasks, key=lambda x:x['id'])
        return JsonResponse({'tasks': tasks})
    def put(self, request):
        try:
            for id in request.data:
                task = Task.objects.get(id=id)
                task.change_status()
            return JsonResponse({'statusChange': True})
        except:
            return JsonResponse({'statusChange': False})
    def delete(self, request):
        try:
            for id in request.data:
                task = Task.objects.get(id=id)
                task.delete()
            return JsonResponse({'taskDeleted': True})
        except:
            return JsonResponse({'taskDeleted': False})
