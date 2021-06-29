

import React from 'react'
import { observer } from 'mobx-react'
import { InputText, InputNumeric, DatePicker, RadioButton, SelectInput } from '../Utils/Forms/DefaultInputs'


const EmployeeFormAppointmentDetails = observer(({ employeeStore }) => {


    return (
        
            <div className="row">

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Employee No."
                    placeholder="Employee No."
                    errorField={ employeeStore.error_fields.employee_id }
                    value={ employeeStore.employee_id }
                    setter={ e => employeeStore.setEmployeeId(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Position"
                    placeholder="Position"
                    errorField={ employeeStore.error_fields.position }
                    value={ employeeStore.position }
                    setter={ e => employeeStore.setPosition(e.target.value) }
                />

                <RadioButton
                    col="col-sm-3"
                    label="Status"
                    name="is_active"
                    value={ employeeStore.is_active }
                    options={ [{value:true, label:"Active"}, {value:false, label:"Inactive"}] }
                    onChange={ (e) => employeeStore.setIsActive(e.target.value) }
                    errorField={ employeeStore.error_fields.is_active }
                />
                
                <RadioButton
                    col="col-sm-3"
                    label="Application Status"
                    name="application_status"
                    value={ employeeStore.application_status }
                    options={ employeeStore.APPLICATION_STATUS_OPTIONS.slice(1) }
                    onChange={ (e) => employeeStore.setApplicationStatus(e.target.value) }
                    errorField={ employeeStore.error_fields.application_status }
                />

                <InputText 
                    col="col-sm-3"
                    type="number"
                    label="Salary Grade"
                    placeholder="Salary Grade"
                    errorField={ employeeStore.error_fields.salary_grade }
                    value={ employeeStore.salary_grade }
                    setter={ e => employeeStore.setSalaryGrade(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="number"
                    label="Step Increment"
                    placeholder="Step Increment"
                    errorField={ employeeStore.error_fields.step_increment }
                    value={ employeeStore.step_increment }
                    setter={ e => employeeStore.setStepIncrement(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Tax Status"
                    placeholder="Tax Status"
                    errorField={ employeeStore.error_fields.tax_status }
                    value={ employeeStore.tax_status }
                    setter={ e => employeeStore.setTaxStatus(e.target.value) }
                />
                
                <InputNumeric
                    col="col-sm-3"
                    label="Monthly Salary"
                    placeholder="Monthly Salary"
                    errorField={ employeeStore.error_fields.monthly_salary }
                    value={ employeeStore.monthly_salary }
                    setter={ values => employeeStore.setMonthlySalary(values.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Firstday in Government"
                    errorField={ employeeStore.error_fields.firstday_gov }
                    value={ employeeStore.firstday_gov }
                    setter={ e => employeeStore.setFirstdayGov(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Firstday in SRA"
                    errorField={ employeeStore.error_fields.firstday_sra }
                    value={ employeeStore.firstday_sra }
                    setter={ e => employeeStore.setFirstdaySRA(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="First Appointment"
                    errorField={ employeeStore.error_fields.first_appointment }
                    value={ employeeStore.first_appointment }
                    setter={ e => employeeStore.setFirstAppointment(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Last Appointment"
                    errorField={ employeeStore.error_fields.last_appointment }
                    value={ employeeStore.last_appointment }
                    setter={ e => employeeStore.setLastAppointment(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Last Step Increment"
                    errorField={ employeeStore.error_fields.last_step_increment }
                    value={ employeeStore.last_step_increment }
                    setter={ e => employeeStore.setLastStepIncrement(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Last Adjustment"
                    errorField={ employeeStore.error_fields.last_adjustment }
                    value={ employeeStore.last_adjustment }
                    setter={ e => employeeStore.setLastAdjustment(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Last Promotion"
                    errorField={ employeeStore.error_fields.last_promotion }
                    value={ employeeStore.last_promotion }
                    setter={ e => employeeStore.setLastPromotion(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Original Appointment"
                    errorField={ employeeStore.error_fields.original_appointment }
                    value={ employeeStore.original_appointment }
                    setter={ e => employeeStore.setOriginalAppointment(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Adjustment Date"
                    errorField={ employeeStore.error_fields.adjustment_date }
                    value={ employeeStore.adjustment_date }
                    setter={ e => employeeStore.setAdjustmentDate(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="TIN"
                    placeholder="TIN"
                    errorField={ employeeStore.error_fields.tin }
                    value={ employeeStore.tin }
                    setter={ e => employeeStore.setTin(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="GSIS"
                    placeholder="GSIS"
                    errorField={ employeeStore.error_fields.gsis }
                    value={ employeeStore.gsis }
                    setter={ e => employeeStore.setGsis(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Philhealth"
                    placeholder="Philhealth"
                    errorField={ employeeStore.error_fields.philhealth }
                    value={ employeeStore.philhealth }
                    setter={ e => employeeStore.setPhilhealth(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="PAG-IBIG"
                    placeholder="PAG-IBIG"
                    errorField={ employeeStore.error_fields.pagibig }
                    value={ employeeStore.pagibig }
                    setter={ e => employeeStore.setPagibig(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="SSS"
                    placeholder="SSS"
                    errorField={ employeeStore.error_fields.sss }
                    value={ employeeStore.sss }
                    setter={ e => employeeStore.setSss(e.target.value) }
                />

            </div>

);

    
});


export default EmployeeFormAppointmentDetails