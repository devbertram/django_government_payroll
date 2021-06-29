from rest_framework import serializers

from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import User

from authentication.models import (
    Route, 
    Subroute, 
    UserRoute, 
    UserSubroute
)



class SubrouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subroute
        fields = ('id', 'is_nav', 'name', 'nav_name', 'url', 'url_name')



class SubrouteCreateMultiFormSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    is_nav = serializers.BooleanField(required=True)
    nav_name = serializers.CharField(required=True, max_length=100)
    url = serializers.CharField(required=True, max_length=100)
    url_name = serializers.CharField(required=True, max_length=100)



class SubrouteFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subroute
        fields = ('route', 'is_nav', 'name', 'nav_name', 'url', 'url_name')



class RouteSerializer(serializers.ModelSerializer):
    subroute_route = SubrouteSerializer(many=True)
    
    class Meta:
        model = Route
        fields = ('id', 'category', 'name', 'nav_name', 'url', 'url_name', 'icon', 'is_menu', 'is_dropdown', 'subroute_route')



class RouteCreateFormSerializer(serializers.ModelSerializer):
    subroutes = SubrouteCreateMultiFormSerializer(many=True)

    class Meta:
        model = Route
        fields = ('category', 'name', 'nav_name', 'url', 'url_name', 'icon', 'is_menu', 'is_dropdown', 'subroutes')



class RouteUpdateFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route
        fields = ('category', 'name', 'nav_name', 'url', 'url_name', 'icon', 'is_menu', 'is_dropdown')



class RouteBulkDeleteSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.IntegerField(min_value=1))



class UserSubrouteSerializer(serializers.ModelSerializer):
    subroute = SubrouteSerializer()

    class Meta:
        model = UserSubroute
        fields = ('subroute',)
        


class UserSubrouteCreateMultiFormSerializer(serializers.Serializer):
    value = serializers.IntegerField(required=True)
    label = serializers.CharField(required=True, max_length=100)



class UserRouteSerializer(serializers.ModelSerializer):
    route = RouteSerializer()
    userSubroute_userRoute = UserSubrouteSerializer(many=True)

    class Meta:
        model = UserRoute
        fields = ('route', 'userSubroute_userRoute')



class UserRouteCreateMultiFormSerializer(serializers.Serializer):
    value = serializers.IntegerField(required=True)
    label = serializers.CharField(required=True, max_length=100)



class UserSerializer(serializers.ModelSerializer): 
    userRoute_user = UserRouteSerializer(many=True)
    fullname = serializers.SerializerMethodField('get_fullname')

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'fullname', 'date_joined', 'last_login', 'is_active', 'userRoute_user')

    def get_fullname(self, user):
        return user.first_name +" "+ user.last_name



class UserCreateFormSerializer(serializers.ModelSerializer): 
    user_routes = UserRouteCreateMultiFormSerializer(many=True, required=True)
    user_subroutes = UserSubrouteCreateMultiFormSerializer(many=True, required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'password', 'user_routes', 'user_subroutes')

    def create(self, validated_data):
        user_routes = validated_data.pop('user_routes')
        user_subroutes = validated_data.pop('user_subroutes')

        #Insert User
        user = User()
        user.first_name=validated_data['first_name']
        user.last_name=validated_data['last_name']
        user.email=validated_data['email']
        user.username=validated_data['username']
        user.is_staff=False
        user.is_active=True
        user.is_superuser=False
        user.set_password(validated_data['password'])
        user.save()

        #Insert User Routes
        if user_routes:
            for user_route_data in user_routes:
                user_route = UserRoute()
                user_route.route_id=user_route_data['value']
                user_route.user_id=user.id
                user_route.save()

                #Insert User Subroutes
                if user_subroutes:
                    for user_subroute_data in user_subroutes:
                        subroute = Subroute.objects.all().get(id=user_subroute_data['value'])
                        if subroute.route_id == user_route.route_id:
                            user_subroute = UserSubroute()
                            user_subroute.user_route_id=user_route.id
                            user_subroute.subroute_id=user_subroute_data['value']
                            user_subroute.user_id=user.id
                            user_subroute.save()

        return user;



class UserUpdateFormSerializer(serializers.ModelSerializer):
    user_routes = UserRouteCreateMultiFormSerializer(many=True, required=True)
    user_subroutes = UserSubrouteCreateMultiFormSerializer(many=True, required=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'user_routes', 'user_subroutes')
        extra_kwargs = {
            'username': {
                'validators': [ UnicodeUsernameValidator() ],
            }
        }
        
    def update(self, user, validated_data):
        user_routes = validated_data.pop('user_routes')
        user_subroutes = validated_data.pop('user_subroutes')

        #Update User
        user.first_name=validated_data['first_name']
        user.last_name=validated_data['last_name']
        user.email=validated_data['email']
        user.username=validated_data['username']
        user.save()

        #Delete User Routes and User Subroutes
        user.userSubroute_user.all().delete()
        user.userRoute_user.all().delete()

        #Insert User Routes
        if user_routes:
            for user_route_data in user_routes:
                user_route = UserRoute()
                user_route.route_id=user_route_data['value']
                user_route.user_id=user.id
                user_route.save()

                #Insert User Subroutes
                if user_subroutes:
                    for user_subroute_data in user_subroutes:
                        subroute = Subroute.objects.all().get(id=user_subroute_data['value'])
                        if subroute.route_id == user_route.route_id:
                            user_subroute = UserSubroute()
                            user_subroute.user_route_id=user_route.id
                            user_subroute.subroute_id=user_subroute_data['value']
                            user_subroute.user_id=user.id
                            user_subroute.save()

        return user;



class UserResetPasswordFormSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True, min_value=1)
    new_password = serializers.CharField(required=True)
    new_password_confirm = serializers.CharField(required=True)

 
    
class UserBulkDeleteSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.IntegerField(min_value=1))