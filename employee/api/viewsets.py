
from employee.models import Station, Plantilla, Employee, EmployeeEducationalBackground, EmployeeEligibility
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .pagination import EmployeeListPagination
from .serializers import (
    StationSerializer,
    PlantillaSerializer,
    EmployeeListSerializer,
    EmployeeCreateFormSerializer,
    EmployeeUpdatePersonalDetailsFormSerializer,
    EmployeeUpdateAppointmentDetailsFormSerializer,
    EmployeeDetailsSerializer,
    EmployeeBulkDeleteSerializer,
    EmployeeEducationalBackgroundSerializer,
    EmployeeEligibilitySerializer
)



class StationViewSet(viewsets.ModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer

    @action(methods=['get'], detail=False)
    def get_all(self, request):
        station_queryset = Station.objects.all()
        serializer = self.get_serializer(station_queryset, many=True)
        return Response(serializer.data, 200)



class PlantillaViewSet(viewsets.ModelViewSet):
    queryset = Plantilla.objects.all()
    serializer_class = PlantillaSerializer

    @action(methods=['get'], detail=False)
    def get_all_open_by_station(self, request):
        station = request.GET.get('s')    
        filter_conditions = Q()
        plantilla_queryset = []
        if station != "":
            filter_conditions.add(Q(station=station), Q.AND)
            filter_conditions.add(Q(is_open=1), Q.AND)
            plantilla_queryset = Plantilla.objects.all().filter(filter_conditions)
        serializer = self.get_serializer(plantilla_queryset, many=True)
        return Response(serializer.data, 200)



class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeListSerializer
    pagination_class = EmployeeListPagination

    def list(self, request):
        search = request.GET.get('q', None)
        is_active = request.GET.get('ia', None)   
        station = request.GET.get('st', None)  
        sex = request.GET.get('se', None)
        civil_status = request.GET.get('cs', None)
        application_status = request.GET.get('as', None)   
        level = request.GET.get('l', None)      
        firstday_gov_from = request.GET.get('fd_g_f', None) 
        firstday_gov_to = request.GET.get('fd_g_t', None)    
        firstday_sra_from = request.GET.get('fd_s_f', None) 
        firstday_sra_to = request.GET.get('fd_s_t', None)  
        first_appointment_from = request.GET.get('f_appt_f', None) 
        first_appointment_to = request.GET.get('f_appt_t', None) 
        last_appointment_from = request.GET.get('l_appt_f', None) 
        last_appointment_to = request.GET.get('l_appt_t', None)   
        last_step_increment_from = request.GET.get('l_si_f', None) 
        last_step_increment_to = request.GET.get('l_si_t', None)   
        last_adjustment_from = request.GET.get('l_adj_f', None) 
        last_adjustment_to = request.GET.get('l_adj_t', None)  
        last_promotion_from = request.GET.get('l_prom_f', None) 
        last_promotion_to = request.GET.get('l_prom_t', None)
        filter_conditions = Q()

        if search:
            filter_conditions.add(
                Q(fullname__icontains=search) 
                | Q(employee_id__icontains=search) 
                | Q(position__icontains=search) 
                | Q(address_present__icontains=search) 
                | Q(address_permanent__icontains=search) 
                | Q(place_of_birth__icontains=search) 
                | Q(tin__icontains=search) 
                | Q(gsis__icontains=search) 
                | Q(philhealth__icontains=search) 
                | Q(pagibig__icontains=search) 
                | Q(sss__icontains=search) 
                | Q(station_link__name__icontains=search),
                Q.AND
            )
        if is_active:
            filter_conditions.add(Q(is_active = is_active), Q.AND)
        if station:
            filter_conditions.add(Q(station = station), Q.AND)
        if sex:
            filter_conditions.add(Q(sex = sex), Q.AND)
        if civil_status:
            filter_conditions.add(Q(civil_status = civil_status), Q.AND)
        if application_status:
            filter_conditions.add(Q(application_status = application_status), Q.AND)
        if level:
            filter_conditions.add(Q(level = level), Q.AND)
        if firstday_gov_from and firstday_gov_to:
            filter_conditions.add(Q(firstday_gov__range = (firstday_gov_from, firstday_gov_to)), Q.AND)
        if firstday_sra_from and firstday_sra_to:
            filter_conditions.add(Q(firstday_sra__range = (firstday_sra_from, firstday_sra_to)), Q.AND)
        if first_appointment_from and first_appointment_to:
            filter_conditions.add(Q(first_appointment__range = (first_appointment_from, first_appointment_to)), Q.AND)
        if last_appointment_from and last_appointment_to:
            filter_conditions.add(Q(last_appointment__range = (last_appointment_from, last_appointment_to)), Q.AND)
        if last_step_increment_from and last_step_increment_to:
            filter_conditions.add(Q(last_step_increment__range = (last_step_increment_from, last_step_increment_to)), Q.AND)
        if last_adjustment_from and last_adjustment_to:
            filter_conditions.add(Q(last_adjustment__range = (last_adjustment_from, last_adjustment_to)), Q.AND)
        if last_promotion_from and last_promotion_to:
            filter_conditions.add(Q(last_promotion__range = (last_promotion_from, last_promotion_to)), Q.AND)
            
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by(self.__sort_field()))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


    def __sort_field(self):
        field = '-updated_at'
        sort_field = self.request.GET.get('sort_field', None)
        sort_order = self.request.GET.get('sort_order', None)
        available_sort_fields = Employee().SORTABLE_FIELDS
        if sort_field:
            if sort_field in available_sort_fields:
                if sort_order == "desc":
                    field = "-"+sort_field
                else:
                    field = sort_field
        return field


    def create(self, request):
        serializer = EmployeeCreateFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            employee = Employee()
            # Personal Details
            employee.firstname = serializer.data['firstname'].upper()
            employee.middlename = serializer.data['middlename'].upper()
            employee.lastname = serializer.data['lastname'].upper()
            employee.suffixname = serializer.data['suffixname']
            employee.set_fullname(
                serializer.data['lastname'], 
                serializer.data['firstname'], 
                serializer.data['middlename'], 
                serializer.data['suffixname']
            )
            employee.address_present = serializer.data['address_present']
            employee.address_permanent = serializer.data['address_permanent']
            employee.birthdate = serializer.data['birthdate']
            employee.place_of_birth = serializer.data['place_of_birth']
            employee.sex = serializer.data['sex']
            employee.civil_status = serializer.data['civil_status']
            employee.tel_no = serializer.data['tel_no']
            employee.cell_no = serializer.data['cell_no']
            employee.email_address = serializer.data['email_address']
            employee.spouse_name = serializer.data['spouse_name']
            employee.spouse_occupation = serializer.data['spouse_occupation']
            employee.no_of_children = serializer.data['no_of_children']
            employee.height = serializer.data['height']
            employee.weight = serializer.data['weight']
            employee.religion = serializer.data['religion']
            employee.blood_type = serializer.data['blood_type']
            # Appointment Details
            employee.employee_id = serializer.data['employee_id'] 
            employee.position = serializer.data['position'].upper()
            employee.is_active = serializer.data['is_active']
            employee.salary_grade = serializer.data['salary_grade']
            employee.step_increment = serializer.data['step_increment']
            employee.application_status = serializer.data['application_status']
            employee.tax_status = serializer.data['tax_status']
            employee.monthly_salary = serializer.data['monthly_salary']
            employee.set_level(serializer.data['salary_grade'])
            employee.firstday_gov = serializer.data['firstday_gov']
            employee.firstday_sra = serializer.data['firstday_sra']
            employee.first_appointment = serializer.data['first_appointment']
            employee.last_appointment = serializer.data['last_appointment']
            employee.last_step_increment = serializer.data['last_step_increment']
            employee.last_adjustment = serializer.data['last_adjustment']
            employee.last_promotion = serializer.data['last_promotion']
            employee.original_appointment = serializer.data['original_appointment']
            employee.adjustment_date = serializer.data['adjustment_date']
            employee.adjustment_date = serializer.data['adjustment_date']
            employee.tin = serializer.data['tin']
            employee.gsis = serializer.data['gsis']
            employee.philhealth = serializer.data['philhealth']
            employee.pagibig = serializer.data['pagibig']
            employee.sss = serializer.data['sss']
            employee.created_by_id = request.user.id
            employee.updated_by_id = request.user.id
            employee.save()
            return Response({"id":employee.id}, 201)
        except:
            return Response({}, 500)



    def retrieve(self, request, pk=None):
        employee = get_object_or_404(self.queryset, id=pk)
        serializer = EmployeeDetailsSerializer(employee)
        return Response(serializer.data, 200)


    def partial_update(self, request, pk=None):
        # Personal Details
        if request.data['form_type'] == "PD":
            serializer = EmployeeUpdatePersonalDetailsFormSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            try:
                employee = get_object_or_404(self.queryset, id=pk)
                employee.firstname = serializer.data['firstname'].upper()
                employee.middlename = serializer.data['middlename'].upper()
                employee.lastname = serializer.data['lastname'].upper()
                employee.suffixname = serializer.data['suffixname']
                employee.set_fullname(
                    serializer.data['lastname'], 
                    serializer.data['firstname'], 
                    serializer.data['middlename'], 
                    serializer.data['suffixname']
                )
                employee.address_present = serializer.data['address_present']
                employee.address_permanent = serializer.data['address_permanent']
                employee.birthdate = serializer.data['birthdate']
                employee.place_of_birth = serializer.data['place_of_birth']
                employee.sex = serializer.data['sex']
                employee.civil_status = serializer.data['civil_status']
                employee.tel_no = serializer.data['tel_no']
                employee.cell_no = serializer.data['cell_no']
                employee.email_address = serializer.data['email_address']
                employee.spouse_name = serializer.data['spouse_name']
                employee.spouse_occupation = serializer.data['spouse_occupation']
                employee.no_of_children = serializer.data['no_of_children']
                employee.height = serializer.data['height']
                employee.weight = serializer.data['weight']
                employee.religion = serializer.data['religion']
                employee.blood_type = serializer.data['blood_type']
                employee.created_by_id = request.user.id
                employee.updated_by_id = request.user.id
                employee.save()
                return Response({}, 201)
            except:
                return Response({}, 500)
        # Appointment Details
        elif request.data['form_type'] == "AD":
            serializer = EmployeeUpdateAppointmentDetailsFormSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            try:
                employee = get_object_or_404(self.queryset, id=pk)
                employee.employee_id = serializer.data['employee_id'] 
                employee.position = serializer.data['position'].upper()
                employee.is_active = serializer.data['is_active']
                employee.salary_grade = serializer.data['salary_grade']
                employee.step_increment = serializer.data['step_increment']
                employee.application_status = serializer.data['application_status']
                employee.tax_status = serializer.data['tax_status']
                employee.monthly_salary = serializer.data['monthly_salary']
                employee.set_level(serializer.data['salary_grade'])
                employee.firstday_gov = serializer.data['firstday_gov']
                employee.firstday_sra = serializer.data['firstday_sra']
                employee.first_appointment = serializer.data['first_appointment']
                employee.last_appointment = serializer.data['last_appointment']
                employee.last_step_increment = serializer.data['last_step_increment']
                employee.last_adjustment = serializer.data['last_adjustment']
                employee.last_promotion = serializer.data['last_promotion']
                employee.original_appointment = serializer.data['original_appointment']
                employee.adjustment_date = serializer.data['adjustment_date']
                employee.adjustment_date = serializer.data['adjustment_date']
                employee.tin = serializer.data['tin']
                employee.gsis = serializer.data['gsis']
                employee.philhealth = serializer.data['philhealth']
                employee.pagibig = serializer.data['pagibig']
                employee.sss = serializer.data['sss']
                employee.created_by_id = request.user.id
                employee.updated_by_id = request.user.id
                employee.save()
                return Response({}, 201)
            except:
                return Response({}, 500)
        else:
            return Response({"form_type" : "Invalid Form Type!"}, 400)


    def destroy(self, request, pk=None):
        try:
            employee = get_object_or_404(self.queryset, id=pk)
            employee.delete()
            return Response({}, 200)
        except:
            return Response({}, 500)


    @action(methods=['delete'], detail=False)
    def bulk_destroy(self, request):
        serializer = EmployeeBulkDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ids = serializer.data['ids']
        try:
            for data in ids:            
                employee = get_object_or_404(self.queryset, id=data)
                employee.delete()
            return Response({}, 200)
        except:
            return Response({}, 500)


    @action(methods=['get'], detail=False)
    def get_all(self, request):
        employee_queryset = Employee.objects.all()
        serializer = self.get_serializer(employee_queryset, many=True)
        return Response(serializer.data, 200)



class EmployeeEducationalBackgroundViewSet(viewsets.ModelViewSet):
    queryset = EmployeeEducationalBackground.objects.all()
    serializer_class = EmployeeEducationalBackgroundSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:    
            employee = get_object_or_404(Employee.objects, id=serializer.data['employee'])
            employee_educ_bg = EmployeeEducationalBackground()
            employee_educ_bg.employee = employee
            employee_educ_bg.level = serializer.data['level']
            employee_educ_bg.school = serializer.data['school']
            employee_educ_bg.course = serializer.data['course']
            employee_educ_bg.date_from = serializer.data['date_from']
            employee_educ_bg.date_to = serializer.data['date_to']
            employee_educ_bg.units = serializer.data['units']
            employee_educ_bg.graduate_year = serializer.data['graduate_year']
            employee_educ_bg.scholarship = serializer.data['scholarship']
            employee_educ_bg.honor = serializer.data['honor']
            employee_educ_bg.save()
            return Response({}, 201)
        except:
            return Response({}, 500)


    def retrieve(self, request, pk=None):
        employee_educ_bg = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(employee_educ_bg)
        return Response(serializer.data, 200)
        

    def update(self, request, pk=None):
        employee_educ_bg = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            employee_educ_bg.level = serializer.data['level']
            employee_educ_bg.school = serializer.data['school']
            employee_educ_bg.course = serializer.data['course']
            employee_educ_bg.date_from = serializer.data['date_from']
            employee_educ_bg.date_to = serializer.data['date_to']
            employee_educ_bg.units = serializer.data['units']
            employee_educ_bg.graduate_year = serializer.data['graduate_year']
            employee_educ_bg.scholarship = serializer.data['scholarship']
            employee_educ_bg.honor = serializer.data['honor']
            employee_educ_bg.save()
            return Response({}, 201)
        except:
            return Response({}, 500)


    def destroy(self, request, pk=None):
        try:
            employee_educ_bg = get_object_or_404(self.queryset, id=pk)
            employee_educ_bg.delete()
            return Response({}, 200)
        except:
            return Response({}, 500)



class EmployeeEligibilityViewSet(viewsets.ModelViewSet):
    queryset = EmployeeEligibility.objects.all()
    serializer_class = EmployeeEligibilitySerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:    
            employee = get_object_or_404(Employee.objects, id=serializer.data['employee'])
            employee_elig = EmployeeEligibility()
            employee_elig.employee = employee
            employee_elig.eligibility = serializer.data['eligibility']
            employee_elig.level = serializer.data['level']
            employee_elig.rating = serializer.data['rating']
            employee_elig.exam_place = serializer.data['exam_place']
            employee_elig.exam_date = serializer.data['exam_date']
            employee_elig.license_no = serializer.data['license_no']
            employee_elig.license_validity = serializer.data['license_validity']
            employee_elig.save()
            return Response({}, 201)
        except:
            return Response({}, 500)


    def retrieve(self, request, pk=None):
        employee_elig = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(employee_elig)
        return Response(serializer.data, 200)
        

    def update(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            employee_elig = get_object_or_404(self.queryset, id=pk)
            employee_elig.eligibility = serializer.data['eligibility']
            employee_elig.level = serializer.data['level']
            employee_elig.rating = serializer.data['rating']
            employee_elig.exam_place = serializer.data['exam_place']
            employee_elig.exam_date = serializer.data['exam_date']
            employee_elig.license_no = serializer.data['license_no']
            employee_elig.license_validity = serializer.data['license_validity']
            employee_elig.save()
            return Response({}, 201)
        except:
            return Response({}, 500)


    def destroy(self, request, pk=None):
        try:
            employee_elig = get_object_or_404(self.queryset, id=pk)
            employee_elig.delete()
            return Response({}, 200)
        except:
            return Response({}, 500)











    
