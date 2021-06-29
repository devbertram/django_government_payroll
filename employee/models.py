from django.db import models
from django.contrib.auth.models import User



class Station(models.Model):

    station_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200, default="")
    created_by = models.ForeignKey(User, related_name='station_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='station_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)



class Employee(models.Model):

    SEX_TYPES = ( (0,'N/A'), (1,'Male'), (2,'Female') )
    CIVIL_STATUS_TYPES = ( (0,'N/A'), (1,'Single'), (2,'Married'), (3,'Widow') )
    APPLICATION_STATUS_TYPES = ( (0,'N/A'), (1,'Permanent'), (2,'Contract of Service') )
    LEVEL_TYPES = ( (0,'N/A'), (1,'First'), (2,'Second'), (3,'RA1080') )

    SORTABLE_FIELDS = [
        "employee_id", 
        "firstname", 
        "lastname", 
        "position", 
        "birthdate", 
        "no_of_children",
        "weight",
        "height",
        "salary_grade",
        "monthly_salary",
        "firstday_gov",
        "firstday_sra",
        "first_appointment",
        "last_appointment",
        "last_step_increment",
        "last_adjustment",
        "last_promotion",
        "original_appointment",
        "adjustment_date",
    ]
    
    #Foreign Keys
    station = models.CharField(max_length=20, blank=True, null=True)
    station_link =  models.ForeignKey(
        Station, 
        db_column="station_id", 
        related_name='employee_station', 
        null=True, 
        default=None, 
        on_delete=models.PROTECT
    )
    # Personal Information
    employee_id = models.CharField(max_length=20, unique=True)
    firstname = models.CharField(max_length=100, default="")
    middlename = models.CharField(max_length=100, default="")
    lastname = models.CharField(max_length=100, default="")
    suffixname = models.CharField(max_length=100, default="", blank=True)
    fullname = models.CharField(max_length=200, default="")
    address_present = models.CharField(max_length=200, default="", blank=True)
    address_permanent = models.CharField(max_length=200, default="", blank=True)
    birthdate =  models.DateField(null=True, blank=True)
    place_of_birth = models.CharField(max_length=200, default="", blank=True)
    sex = models.IntegerField(choices=SEX_TYPES, default=0)
    civil_status = models.IntegerField(choices=CIVIL_STATUS_TYPES, default=0)
    tel_no = models.CharField(max_length=50, default="", blank=True)
    cell_no = models.CharField(max_length=50, default="", blank=True)
    email_address = models.EmailField(max_length=100, default="", blank=True)
    spouse_name = models.CharField(max_length=200, default="", blank=True)
    spouse_occupation = models.CharField(max_length=200, default="", blank=True)
    no_of_children = models.PositiveIntegerField(default=0)
    height = models.CharField(max_length=20, default="", blank=True)
    weight = models.CharField(max_length=20, default="", blank=True)
    religion = models.CharField(max_length=100, default="", blank=True)
    blood_type = models.CharField(max_length=20, default="", blank=True)
    # Appointment Details
    position = models.CharField(max_length=200, default="", blank=True)
    is_active = models.BooleanField(null=True, default=None)
    salary_grade = models.PositiveIntegerField(default=0)
    step_increment = models.PositiveIntegerField(default=0)
    application_status = models.IntegerField(choices=APPLICATION_STATUS_TYPES, default=0)
    tax_status = models.CharField(max_length=20, default="", blank=True)
    monthly_salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    level = models.IntegerField(choices=LEVEL_TYPES, default=0)
    plantilla_item = models.CharField(max_length=20, default="", blank=True)
    firstday_gov =  models.DateField(null=True)
    firstday_sra =  models.DateField(null=True)
    first_appointment =  models.DateField(null=True)
    last_appointment =  models.DateField(null=True)
    last_step_increment =  models.DateField(null=True)
    last_adjustment =  models.DateField(null=True)
    last_promotion =  models.DateField(null=True)
    original_appointment =  models.DateField(null=True)
    adjustment_date =  models.DateField(null=True)
    tin = models.CharField(max_length=50, default="", blank=True)
    gsis = models.CharField(max_length=50, default="", blank=True)
    philhealth = models.CharField(max_length=50, default="", blank=True)
    pagibig = models.CharField(max_length=50, default="", blank=True)
    sss = models.CharField(max_length=50, default="", blank=True)
    #Default Fields
    created_by = models.ForeignKey(User, related_name='employee_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employee_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def set_fullname(self, lastname, firstname, middlename, suffixname):
        self.fullname = lastname.upper()+", "+firstname.upper()+" "+suffixname.upper()+" "+middlename[0]

    def set_level(self, salary_grade):
        value = 0
        if salary_grade > 0 and salary_grade <= 10:
            value = 1
        elif salary_grade > 10:
            value = 2
        self.level = value




class Plantilla(models.Model):

    APPOINTMENT_STATUS_TYPES = ( (1, 'PERMANENT'), (2, 'CO-TERMINUS'), (3, 'PRESIDENT APPOINTEE'))

    station = models.CharField(max_length=20, blank=True, null=True)
    station_link =  models.ForeignKey(
        Station, 
        db_column="station_id", 
        related_name='plantilla_station', 
        null=True, 
        default=None, 
        on_delete=models.PROTECT
    )
    
    employee = models.CharField(max_length=20, blank=True, null=True)
    employee_link =  models.ForeignKey(
        Employee, 
        db_column="employee_id", 
        related_name='plantilla_employee', 
        null=True, 
        default=None, 
        on_delete=models.PROTECT
    )

    plantilla_id = models.CharField(max_length=20, unique=True)
    employee_name = models.CharField(max_length=200, default="")
    position = models.CharField(max_length=200)
    salary_grade = models.PositiveIntegerField(default=0)
    step_increment = models.PositiveIntegerField(default=0)
    monthly_salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    orig_monthly_salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    eligibility = models.CharField(max_length=200)
    education = models.CharField(max_length=200)
    appointment_status = models.IntegerField(choices=APPOINTMENT_STATUS_TYPES, default=0)
    appointment_date = models.DateField(null=True)
    promotion_date =  models.DateField(null=True)
    is_open =  models.BooleanField(default=False, null=True)
    plantilla_date =  models.DateField(null=True)
    created_by = models.ForeignKey(User, related_name='plantilla_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='plantilla_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)



class EmployeeEducationalBackground(models.Model):

    employee = models.ForeignKey(
        Employee, 
        db_column="employee_id", 
        related_name='employeeEB_employee', 
        on_delete=models.CASCADE
    )

    level = models.CharField(max_length=100, default="")
    school = models.CharField(max_length=200, default="")
    course = models.CharField(max_length=200, default="", blank=True)
    date_from =  models.CharField(max_length=200, default="", blank=True)
    date_to =  models.CharField(max_length=200, default="", blank=True)
    units = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=True)
    graduate_year =  models.CharField(max_length=20, default="", blank=True)
    scholarship =  models.CharField(max_length=200, default="", blank=True)
    honor =  models.CharField(max_length=200, default="", blank=True)



class EmployeeEligibility(models.Model):

    employee = models.ForeignKey(
        Employee, 
        db_column="employee_id", 
        related_name='employeeELIG_employee', 
        on_delete=models.CASCADE
    )
    
    eligibility = models.CharField(max_length=200, default="")
    level = models.CharField(max_length=100, default="", blank=True)
    rating = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=True)
    exam_place = models.CharField(max_length=200, default="", blank=True)
    exam_date =  models.CharField(max_length=100, default="", blank=True)
    license_no = models.CharField(max_length=50, default="", blank=True)
    license_validity = models.CharField(max_length=100, default="", blank=True)



class EmployeeTrainings(models.Model):

    employee = models.ForeignKey(Employee, 
        db_column="employee_id", 
        related_name='employeeTRNG_employee', 
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=200, default="")
    category = models.CharField(max_length=100, default="")
    date_from = models.DateField(null=True)
    date_to = models.DateField(null=True)
    hours = models.DecimalField(max_digits=5, decimal_places=2, default="")
    conducted_by = models.CharField(max_length=200, default="")
    venue = models.CharField(max_length=200, default="")
    remarks = models.CharField(max_length=200, default="")
    is_relevant = models.BooleanField(null=True)
    created_by = models.ForeignKey(User, related_name='employeeTRNG_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employeeTRNG_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)



class EmployeeServiceRecords(models.Model):

    employee = models.ForeignKey(
        Employee, 
        db_column="employee_id", 
        related_name='employeeSR_employee', 
        on_delete=models.CASCADE
    )

    seq = models.IntegerField(default=0)
    date_from = models.CharField(max_length=50, default="")
    date_to = models.CharField(max_length=50, default="")
    position = models.CharField(max_length=100, default="")
    appointment_status = models.CharField(max_length=50, default="")
    salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    mode_of_payment = models.CharField(max_length=50, default="")
    station = models.CharField(max_length=50, default="")
    gov_serve = models.CharField(max_length=50, default="")
    psc_serve = models.CharField(max_length=50, default="")
    lwp = models.CharField(max_length=20, default="")
    sp_date = models.CharField(max_length=20, default="")
    status = models.CharField(max_length=100, default="")
    remarks = models.CharField(max_length=100, default="")
    created_by = models.ForeignKey(User, related_name='employeeSR_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employeeSR_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)