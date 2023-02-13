from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from .models import *

def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp

class Task_handler(APIView):
    def get(self, request):
        tasks = list(Task.objects.all().values())
        return JsonResponse({'tasks': tasks})
