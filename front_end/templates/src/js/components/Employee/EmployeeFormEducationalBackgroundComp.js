

import React from 'react'
import { observer } from 'mobx-react'
import { InputText } from '../Utils/Forms/DefaultInputs'


const EmployeeFormEducationalBackground = observer(({ employeeStore }) => {


    return (
        
            <div className="row">

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Level"
                    placeholder="Primary, Secondary, Tertiary, Masteral, Doctorate"
                    errorField={ employeeStore.educ_bg_error_fields.level }
                    value={ employeeStore.educ_bg_level }
                    setter={ e => employeeStore.setEducBgLevel(e.target.value) }
                />

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="School"
                    placeholder="School"
                    errorField={ employeeStore.educ_bg_error_fields.school }
                    value={ employeeStore.educ_bg_school }
                    setter={ e => employeeStore.setEducBgSchool(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Course"
                    placeholder="Course"
                    errorField={ employeeStore.educ_bg_error_fields.course }
                    value={ employeeStore.educ_bg_course }
                    setter={ e => employeeStore.setEducBgCourse(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Date From"
                    placeholder="Date From"
                    errorField={ employeeStore.educ_bg_error_fields.date_from }
                    value={ employeeStore.educ_bg_date_from }
                    setter={ e => employeeStore.setEducBgDateFrom(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Date To"
                    placeholder="Date To"
                    errorField={ employeeStore.educ_bg_error_fields.date_to }
                    value={ employeeStore.educ_bg_date_to }
                    setter={ e => employeeStore.setEducBgDateTo(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-4"
                    type="number"
                    label="Units"
                    placeholder="Units"
                    errorField={ employeeStore.educ_bg_error_fields.units }
                    value={ employeeStore.educ_bg_units }
                    setter={ e => employeeStore.setEducBgUnits(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Graduate Year"
                    placeholder="Graduate Year"
                    errorField={ employeeStore.educ_bg_error_fields.graduate_year }
                    value={ employeeStore.educ_bg_graduate_year }
                    setter={ e => employeeStore.setEducBgGraduateYear(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Scholarship"
                    placeholder="Scholarship"
                    errorField={ employeeStore.educ_bg_error_fields.scholarship }
                    value={ employeeStore.educ_bg_scholarship }
                    setter={ e => employeeStore.setEducBgScholarship(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Honor"
                    placeholder="Honor"
                    errorField={ employeeStore.educ_bg_error_fields.honor }
                    value={ employeeStore.educ_bg_honor }
                    setter={ e => employeeStore.setEducBgHonor(e.target.value) }
                />

            </div>
    );

    
});


export default EmployeeFormEducationalBackground