from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import requests


def loginPage(request):
    if request.user.is_authenticated == False:
        return render(request, 'authentication/login.html')
    else:
        return redirect('/dashboard')


def setUsernamelogoutPage(request):
    if request.user.is_authenticated == False:
        return render(request, 'authentication/set_username_logout.html')
    else:
        return redirect('/dashboard')


def setPasswordlogoutPage(request):
    if request.user.is_authenticated == False:
        return render(request, 'authentication/set_password_logout.html')
    else:
        return redirect('/dashboard')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logoutUser(request): 
    logout(request)
    protocol = 'https://' if request.is_secure() else 'http://'
    url = protocol + request.get_host() + '/auth/token/logout/'
    header = {'Authorization' : request.META.get('HTTP_AUTHORIZATION')}
    try:
        response = requests.post(url, data={}, headers=header)
    except requests.exceptions.ConnectionError:
        response = {"Connection refused", 500}
    return Response(response)


@login_required
def dashboardMainPage(request):
    return render(request, 'base_template/dashboard.html')


@login_required
def dashboardProfilePage(request):
    return render(request, 'dashboard/profile/profile.html')
    

        



    