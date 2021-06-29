
from employee.models import Employee
from rest_framework import serializers
from payroll.models import (
     Deductions, 
     Allowances, 
     PayrollRegular, 
     PayrollRegularData, 
     PayrollRegularDataDeductions, 
     PayrollRegularDataAllowances,
     PayrollRegularMaintenance
)
from employee.api.serializers import (
     EmployeeDetailsSerializer,
     StationSerializer,
)



class DeductionSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Deductions
          fields = ('id', 'code', 'name', 'description', 'priority_seq')
          read_only_fields = ('id',)


class AllowanceSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Allowances
          fields = ('id', 'code', 'name', 'description')
          read_only_fields = ('id',)


class PayrollRegularDataDeductionsDetailsSerializer(serializers.ModelSerializer):
     deduction = DeductionSerializer(many=False)
     class Meta:
          model = PayrollRegularDataDeductions
          fields = ('id', 'code', 'name', 'description', 'amount', 'deduction', 'priority_seq')
          read_only_fields = ('id',)


class PayrollRegularDataDeductionsFormSerializer(serializers.ModelSerializer):
     id = serializers.IntegerField(required=True)
     class Meta:
          model = PayrollRegularDataDeductions
          fields = ('id', 'amount')


class PayrollRegularDataAllowancesDetailsSerializer(serializers.ModelSerializer):
     allowance = AllowanceSerializer(many=False)
     class Meta:
          model = PayrollRegularDataAllowances
          fields = ('id', 'code', 'name', 'description', 'amount', 'allowance')
          read_only_fields = ('id',)


class PayrollRegularDataAllowancesFormSerializer(serializers.ModelSerializer):
     id = serializers.IntegerField(required=True)
     class Meta:
          model = PayrollRegularDataAllowances
          fields = ('id', 'amount')


class PayrollRegularMaintenanceDetailsSerializer(serializers.ModelSerializer):
     class Meta:
          model = PayrollRegularMaintenance
          fields = (
               'id', 
               'category',
               'field',
               'field_description',
               'mod_value',
               'remarks',
               'deduc_priority_seq',
               'payroll_regular_data_id',
          )


class PayrollRegularDataSerializer(serializers.ModelSerializer):
     payrollRegularDataDeduc_payrollRegularData = PayrollRegularDataDeductionsDetailsSerializer(many=True, allow_empty=True)
     payrollRegularDataAllow_payrollRegularData = PayrollRegularDataAllowancesDetailsSerializer(many=True, allow_empty=True)
     payrollRegularMnt_payrollRegularData = PayrollRegularMaintenanceDetailsSerializer(many=True)
     employee = EmployeeDetailsSerializer(many=False)
     station = StationSerializer(many=False)
     class Meta:
          model = PayrollRegularData
          fields = (
               'id', 
               'payroll_regular_id',
               'employee',
               'station',
               'employee_no',
               'station_no',
               'paygroup' ,
               'fullname',
               'position',
               'salary_grade',
               'step_increment',
               'monthly_salary',
               'plantilla_item',
               'status',
               'is_atm',
               'atm_account_no',
               'tin',
               'gsis',
               'philhealth',
               'pagibig',
               'sss',
               'is_new',
               'is_removed',
               'payrollRegularDataDeduc_payrollRegularData',
               'payrollRegularDataAllow_payrollRegularData',
               'payrollRegularMnt_payrollRegularData'
          )
          read_only_fields = ('id',)


class PayrollRegularDataDetailsSerializer(serializers.ModelSerializer):
    class Meta:
          model = PayrollRegularData
          fields = (
               'id', 
               'payroll_regular_id',
               'employee_no',
               'station_no',
               'paygroup' ,
               'fullname',
               'position',
               'salary_grade',
               'step_increment',
               'monthly_salary',
               'plantilla_item',
               'status',
               'is_atm',
               'atm_account_no',
               'tin',
               'gsis',
               'philhealth',
               'pagibig',
               'sss',
               'is_new',
               'is_removed',
          )


class PayrollRegularDataFormSerializer(serializers.ModelSerializer):
     payrollRegularDataDeduc_payrollRegularData = PayrollRegularDataDeductionsFormSerializer(many=True)
     payrollRegularDataAllow_payrollRegularData = PayrollRegularDataAllowancesFormSerializer(many=True)
     class Meta:
          model = PayrollRegularData
          fields = (
               'payroll_regular',
               'employee',
               'station',
               'paygroup' ,
               'fullname',
               'position',
               'salary_grade',
               'step_increment',
               'monthly_salary',
               'plantilla_item',
               'status',
               'is_atm',
               'atm_account_no',
               'tin',
               'gsis',
               'philhealth',
               'pagibig',
               'sss',
               'payrollRegularDataDeduc_payrollRegularData',
               'payrollRegularDataAllow_payrollRegularData',
          )


class PayrollRegularDataUpdateIsRemovedSerializer(serializers.ModelSerializer):
     class Meta:
          model = PayrollRegularData
          fields = (
               'is_removed',
          )


class PayrollRegularSerializer(serializers.ModelSerializer): 
     class Meta:
          model = PayrollRegular
          fields = ('id', 'description', 'remarks', 'process_date', 'updated_at')
          read_only_fields = ('id',)


class PayrollRegularMaintenanceSerializer(serializers.ModelSerializer):
     payroll_regular_data = PayrollRegularDataDetailsSerializer(many=False)
     class Meta:
          model = PayrollRegularMaintenance
          fields = (
               'id', 
               'category',
               'field',
               'field_description',
               'mod_value',
               'remarks',
               'deduc_priority_seq',
               'payroll_regular_data',
          )
          read_only_fields = ('id',)


class PayrollRegularMaintenanceFormSerializer(serializers.ModelSerializer):
     pr_id = serializers.CharField(required=True, max_length=20)
     prd_id = serializers.CharField(required=True, max_length=20)
     class Meta:
          model = PayrollRegularMaintenance
          fields = (
               'pr_id',
               'prd_id',
               'category',
               'field',
               'field_description',
               'mod_value',
               'remarks',
               'deduc_priority_seq',
          )