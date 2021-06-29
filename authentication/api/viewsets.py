
from authentication.models import Route, Subroute, UserRoute
from django.contrib.auth.models import User

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection

from .serializers import (
    RouteSerializer,
    RouteCreateFormSerializer,
    RouteUpdateFormSerializer,
    RouteBulkDeleteSerializer,
    SubrouteSerializer,
    SubrouteFormSerializer,
    UserRouteSerializer,
    UserSerializer,
    UserCreateFormSerializer,
    UserUpdateFormSerializer,
    UserResetPasswordFormSerializer,
    UserBulkDeleteSerializer,
)

from .pagination import (
    UserListPagination, 
    RouteListPagination
)



class RouteViewSet(viewsets.ModelViewSet):
    
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    pagination_class = RouteListPagination


    def list(self, request):
        search = request.GET.get('q', None)
        filter_conditions = Q()
        
        if search: 
            filter_conditions.add(Q(name__icontains=search) | Q(category__icontains=search), Q.AND)

        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by(self.__sort_field()))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


    def __sort_field(self):
        field = '-updated_at'
        sort_field = self.request.GET.get('sort_field', None)
        sort_order = self.request.GET.get('sort_order', None)
        available_sort_fields = ["name", "category", "is_menu", "is_dropdown", "url", "url_name"]
        if sort_field:
            if sort_field in available_sort_fields:
                if sort_order == "desc":
                    field = "-"+sort_field
                else:
                    field = sort_field
        return field
        

    def create(self, request):
        serializer = RouteCreateFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subroutes = serializer.data['subroutes']

        # Create Route   
        route = Route()
        route.name = serializer.data['name']
        route.category = serializer.data['category']
        route.nav_name = serializer.data['nav_name']
        route.url = serializer.data['url']
        route.url_name = serializer.data['url_name']
        route.icon = serializer.data['icon']
        route.is_menu = serializer.data['is_menu']
        route.is_dropdown = serializer.data['is_dropdown']
        route.created_by_id = request.user.id
        route.updated_by_id = request.user.id
        route.save()
        
        # Create Subroute
        if subroutes:
            for data in subroutes:
                subroute = Subroute()
                subroute.route_id = route.id
                subroute.is_nav = data['is_nav']
                subroute.name = data['name']
                subroute.nav_name = data['nav_name']
                subroute.url = data['url']
                subroute.url_name = data['url_name']
                subroute.save()

        return Response({"id": route.id}, 201)


    def retrieve(self, request, pk=None):
        route = self.queryset.get(id=pk)
        if route:
            serializer = self.get_serializer(route)
            return Response(serializer.data, 200)
        else:
            return Response({}, 404)
    
    
    def update(self, request, pk=None):
        serializer = RouteUpdateFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        route = self.queryset.get(id=pk)
        route.name = serializer.data['name']
        route.category = serializer.data['category']
        route.nav_name = serializer.data['nav_name']
        route.url = serializer.data['url']
        route.url_name = serializer.data['url_name']
        route.icon = serializer.data['icon']
        route.is_menu = serializer.data['is_menu']
        route.is_dropdown = serializer.data['is_dropdown']
        route.updated_by_id = request.user.id
        route.save()
        return Response({"id":route.id}, 200)


    def destroy(self, request, pk=None):
        route = self.queryset.get(id=pk)
        if route:
            route.delete()
            return Response({}, 200)
        else:
            return Response({}, 404)


    @action(methods=['delete'], detail=False)
    def bulk_destroy(self, request):
        serializer = RouteBulkDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ids = serializer.data['ids']
        for data in ids:
            route = self.queryset.get(id=data)
            if route:
                route.delete()
        return Response({}, 200)


    @action(methods=['get'], detail=False)
    def get_all(self, request):
        routes_queryset = Route.objects.all()
        serializer = self.get_serializer(routes_queryset, many=True)
        return Response(serializer.data, 200)



class SubrouteViewSet(viewsets.ModelViewSet):
    
    queryset = Subroute.objects.all()
    serializer_class = SubrouteSerializer
        

    def create(self, request):
        serializer = SubrouteFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subroute = Subroute()
        subroute.route_id = serializer.data['route']
        subroute.is_nav = serializer.data['is_nav']
        subroute.name = serializer.data['name']
        subroute.nav_name = serializer.data['nav_name']
        subroute.url = serializer.data['url']
        subroute.url_name = serializer.data['url_name']
        subroute.save()
        return Response({"id":subroute.id}, 200)


    def update(self, request, pk=None):
        serializer = SubrouteFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subroute = self.queryset.get(route_id=serializer.data['route'], id=pk)
        if subroute:
            subroute.is_nav = serializer.data['is_nav']
            subroute.name = serializer.data['name']
            subroute.nav_name = serializer.data['nav_name']
            subroute.url = serializer.data['url']
            subroute.url_name = serializer.data['url_name']
            subroute.save()
            return Response({"id":subroute.id}, 200)
        else:
            return Response({}, 404)


    def destroy(self, request, pk=None):
        subroute = self.queryset.get(id=pk)
        if subroute:
            subroute.delete()
            return Response({}, 200)
        else:
            return Response({}, 404)



class UserViewSet(viewsets.ModelViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserListPagination


    def list(self, request):
        search = request.GET.get('q', None)
        online_status = request.GET.get('os', None)
        su_status = request.GET.get('sus', None)     
        filter_conditions = Q()

        if search:
            filter_conditions.add(Q(username__icontains=search) | Q(first_name__icontains=search) | Q(last_name__icontains=search), Q.AND)
        if online_status:
            filter_conditions.add(Q(is_active = online_status), Q.AND) 
        if su_status:
            filter_conditions.add(Q(is_superuser = su_status), Q.AND)
        
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by(self.__sort_field()))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


    def __sort_field(self):
        field = '-date_joined'
        sort_field = self.request.GET.get('sort_field', None)
        sort_order = self.request.GET.get('sort_order', None)
        available_sort_fields = ["username", "first_name", "last_name", "is_active", "last_login", "date_joined"]
        if sort_field:
            if sort_field in available_sort_fields:
                if sort_order == "desc":
                    field = "-"+sort_field
                else:
                    field = sort_field
        return field
        

    def create(self, request):
        serializer = UserCreateFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.create(request.data)
        return Response({"id": user.id}, 201)


    def retrieve(self, request, pk=None):
        user = self.queryset.get(id=pk)
        if user:
            serializer = self.get_serializer(user)
            return Response(serializer.data, 200)
        else:
            return Response({}, 404)
    
    
    def update(self, request, pk=None):
        user = self.queryset.get(id=pk)
        if user:
            serializer = UserUpdateFormSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.update(user, request.data)
            return Response({"id": pk}, 200)
        else:
            return Response({}, 404)


    def destroy(self, request, pk=None):
        user = self.queryset.get(id=pk)
        if user:
            user.delete()
            return Response({}, 200)
        else:
            return Response({}, 404)


    @action(methods=['delete'], detail=False)
    def bulk_destroy(self, request):
        serializer = UserBulkDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ids = serializer.data['ids']
        for data in ids:
            user = self.queryset.get(id=data)
            if user:
                user.delete()
        return Response({}, 200)


    @action(methods=['post'], detail=False)
    def reset_password(self, request):
        serializer = UserResetPasswordFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.data['new_password'] != serializer.data['new_password_confirm']:
            return Response({"new_password" : "Password doesn't match."}, 400)
        else:
            user = self.queryset.get(id=serializer.data['id'])
            user.set_password(serializer.data['new_password'])
            user.save()
        return Response({"id":user.id}, 200)
    

    @action(methods=['get'], detail=False)
    def current_user(self, request):
        serializer =  UserSerializer(request.user)
        return Response(serializer.data, 200)








    
