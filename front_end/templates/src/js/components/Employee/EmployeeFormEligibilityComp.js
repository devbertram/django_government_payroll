

import React from 'react'
import { observer } from 'mobx-react'
import { InputText, InputNumeric } from '../Utils/Forms/DefaultInputs'


const EmployeeFormEligibility = observer(({ employeeStore }) => {


    return (
        
            <div className="row">

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Eligibility"
                    placeholder="Eligibility"
                    errorField={ employeeStore.elig_error_fields.level }
                    value={ employeeStore.elig_eligibility }
                    setter={ e => employeeStore.setEligEligibility(e.target.value) }
                />

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Level"
                    placeholder="Level"
                    errorField={ employeeStore.elig_error_fields.level }
                    value={ employeeStore.elig_level }
                    setter={ e => employeeStore.setEligLevel(e.target.value) }
                />
                
                <InputNumeric
                    col="col-sm-4"
                    label="Rating"
                    placeholder="Rating"
                    errorField={ employeeStore.elig_error_fields.rating }
                    value={ employeeStore.elig_rating }
                    setter={ values => employeeStore.setEligRating(values.value) }
                />

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Exam Place"
                    placeholder="Exam Place"
                    errorField={ employeeStore.elig_error_fields.exam_place }
                    value={ employeeStore.elig_exam_place }
                    setter={ e => employeeStore.setEligExamPlace(e.target.value) }
                />
                
                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Exam Date"
                    placeholder="Exam Date"
                    errorField={ employeeStore.elig_error_fields.exam_date }
                    value={ employeeStore.elig_exam_date }
                    setter={ e => employeeStore.setEligExamDate(e.target.value) }
                />

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="License No."
                    placeholder="License No."
                    errorField={ employeeStore.elig_error_fields.license_no }
                    value={ employeeStore.elig_license_no }
                    setter={ e => employeeStore.setEligLicenseNo(e.target.value) }
                />

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="License Validity"
                    placeholder="License Validity"
                    errorField={ employeeStore.elig_error_fields.license_validity }
                    value={ employeeStore.elig_license_validity }
                    setter={ e => employeeStore.setEligLicenseValidity(e.target.value) }
                />

            </div>

    );

    
});


export default EmployeeFormEligibility