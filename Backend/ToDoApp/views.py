from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import *

def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp

@api_view(['GET'])
def list_tasks(request):
    if request.method == 'GET':
        resp = list(Task.objects.all().values())
        return JsonResponse({'tasks': resp})
