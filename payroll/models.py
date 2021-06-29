from django.db import models
from django.contrib.auth.models import User
from employee.models import Employee, Station


class Deductions(models.Model):
    code = models.CharField(max_length=50, default="")
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="", blank=True)
    priority_seq = models.IntegerField(blank=True)
    created_by = models.ForeignKey(User, related_name='deductions_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='deductions_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Allowances(models.Model):
    code = models.CharField(max_length=50, default="")
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="", blank=True)
    created_by = models.ForeignKey(User, related_name='allowances_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='allowances_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class PayrollRegular(models.Model):
    process_date = models.DateField(null=True)
    description = models.CharField(max_length=200, default="")
    remarks = models.CharField(max_length=200, default="")
    created_by = models.ForeignKey(User, related_name='payrollRegular_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='payrollRegular_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class PayrollRegularData(models.Model):
    PAYGROUP_TYPES = ( (0,'N/A'), (1,'Regular'), (2,'Pay with Check'), (3,'Actual'), (4,'COS'),)
    STATUS_TYPES = ( (0,'N/A'), (1,'REGULAR'), (2,'COS') )
    payroll_regular = models.ForeignKey(PayrollRegular, db_column="payroll_regular_id", related_name='payrollRegularData_payrollRegular', on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='payrollRegularData_employee', on_delete=models.PROTECT)
    station = models.ForeignKey(Station, db_column="station_id", related_name='payrollRegularData_station', on_delete=models.PROTECT)
    employee_no = models.CharField(max_length=20, default="")
    station_no = models.CharField(max_length=20, default="")
    paygroup = models.IntegerField(choices=PAYGROUP_TYPES, default=0)
    fullname = models.CharField(max_length=200, default="")
    position = models.CharField(max_length=200, default="")
    salary_grade = models.PositiveIntegerField(default=0, blank=True)
    step_increment = models.PositiveIntegerField(default=0, blank=True)
    monthly_salary = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    plantilla_item = models.CharField(max_length=20, default="", blank=True)
    status = models.IntegerField(choices=STATUS_TYPES, default=0)
    is_atm = models.BooleanField(null=True, default=None, blank=True)
    atm_account_no = models.CharField(max_length=50, default="", blank=True)
    tin = models.CharField(max_length=50, default="", blank=True)
    gsis = models.CharField(max_length=50, default="", blank=True)
    philhealth = models.CharField(max_length=50, default="", blank=True)
    pagibig = models.CharField(max_length=50, default="", blank=True)
    sss = models.CharField(max_length=50, default="", blank=True)
    is_new = models.BooleanField(default=False)
    is_removed = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, related_name='payrollRegularData_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='payrollRegularData_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def set_field_via_mnt(self, array, prd_id, field, default_value): 
        obj = next((item for item in array if item['prd_id'] == prd_id and item['category'] == 1 and item['field'] == field), None)
        return obj['mod_value'] if obj else default_value


class PayrollRegularMaintenance(models.Model):
    CATEGORY = ((1,'Modify Field'), (2,'Modify Deductions'), (3,'Modify Allowance'), (4,'Create Content'), (5,'Remove Content'))
    payroll_regular = models.ForeignKey(PayrollRegular, db_column="payroll_regular_id", related_name='payrollRegularMnt_payrollRegular', on_delete=models.CASCADE)
    payroll_regular_data = models.ForeignKey(PayrollRegularData, db_column="payroll_regular_data_id", related_name='payrollRegularMnt_payrollRegularData', on_delete=models.CASCADE)
    category = models.IntegerField(choices=CATEGORY, default=0)
    field = models.CharField(max_length=50, default="")
    field_description = models.CharField(max_length=200, default="", blank=True)
    mod_value = models.CharField(max_length=50, default="")
    remarks = models.CharField(max_length=200, default="", blank=True)
    deduc_priority_seq = models.IntegerField(blank=True, default=0)
    created_by = models.ForeignKey(User, related_name='payrollRegularMnt_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='payrollRegularMnt_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class PayrollRegularDataDeductions(models.Model):
    payroll_regular_data = models.ForeignKey(PayrollRegularData, db_column="payroll_regular_data_id", related_name='payrollRegularDataDeduc_payrollRegularData', on_delete=models.CASCADE)
    deduction = models.ForeignKey(Deductions, db_column="deduction_id", related_name='payrollRegularDataDeduc_deduction', on_delete=models.PROTECT)
    code = models.CharField(max_length=50, blank=True)
    name = models.CharField(max_length=200, default="", blank=True)
    description = models.CharField(max_length=200, default="", blank=True)
    priority_seq = models.IntegerField(blank=True, default=0)
    amount = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)


class PayrollRegularDataAllowances(models.Model):
    payroll_regular_data = models.ForeignKey(PayrollRegularData, db_column="payroll_regular_data_id", related_name='payrollRegularDataAllow_payrollRegularData', on_delete=models.CASCADE)
    allowance = models.ForeignKey(Allowances, db_column="allowance_id", related_name='payrollRegularDataAllow_allowance', on_delete=models.PROTECT)
    code = models.CharField(max_length=50, blank=True)
    name = models.CharField(max_length=200, default="", blank=True)
    description = models.CharField(max_length=200, default="", blank=True)
    amount = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)






# Mock Tables
class MockDeductions(models.Model):
    payroll_id = models.CharField(max_length=50)
    d1 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d2 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d3 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d4 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d5 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d6 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d7 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d7oldbir = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d8 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d9 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d10 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d11 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d12 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d13 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d14 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d15 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d16 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d17 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d18 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d19 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d20 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d21 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d22 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d23 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d24 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d25 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d26 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d27 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d28 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d29 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d30 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d31 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d32 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d33 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d34 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d35 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d36 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d37 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d38 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d39 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d40 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d41 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d42 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d43 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d44 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d45 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d46 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d47 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d48 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d49 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d50 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d51 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d52 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d53 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d54 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d55 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d56 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)


class MockAllowance(models.Model):
    payroll_id = models.CharField(max_length=50)
    allow1 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow2 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow3 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow4 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow5 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow6 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow7 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow8 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow9 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    allow10 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)


