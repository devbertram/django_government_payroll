from django.db import models
from django.contrib.auth.models import User



class Route(models.Model):
    category = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    nav_name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    url_name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    is_menu = models.BooleanField(default=False)
    is_dropdown = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, related_name='route_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='route_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.name



class Subroute(models.Model):
    route = models.ForeignKey(Route, related_name='subroute_route', on_delete=models.CASCADE)
    is_nav = models.BooleanField(default=False)
    name = models.CharField(max_length=100)
    nav_name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    url_name = models.CharField(max_length=100)

    def __str__(self):
        return self.route.name +" - "+ self.name



class UserRoute(models.Model):
    user = models.ForeignKey(User, related_name='userRoute_user', on_delete=models.CASCADE)
    route = models.ForeignKey(Route, related_name='userRoute_route', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name +" - "+ self.route.name


    
class UserSubroute(models.Model):
    user = models.ForeignKey(User, related_name='userSubroute_user', on_delete=models.CASCADE)
    user_route = models.ForeignKey(UserRoute, related_name='userSubroute_userRoute', on_delete=models.CASCADE)
    subroute = models.ForeignKey(Subroute, related_name='userSubroute_subroute', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name +" - "+ self.user_route.route.name +" - "+ self.subroute.name


    


