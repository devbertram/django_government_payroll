from django.contrib import admin
from .models import Route, Subroute, UserRoute, UserSubroute

admin.site.register(Route)
admin.site.register(Subroute)
admin.site.register(UserRoute)
admin.site.register(UserSubroute)
