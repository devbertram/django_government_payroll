

import React from 'react'
import { observer } from 'mobx-react'
import { InputText, DatePicker, RadioButton, SelectInput } from '../Utils/Forms/DefaultInputs'


const EmployeeFormPersonalDetails = observer(({ employeeStore }) => {


    return (
        
            <div className="row">

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Firstname"
                    placeholder="Firstname"
                    errorField={ employeeStore.error_fields.firstname }
                    value={ employeeStore.firstname }
                    setter={ e => employeeStore.setFirstname(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Middlename"
                    placeholder="Middlename"
                    errorField={ employeeStore.error_fields.middlename }
                    value={ employeeStore.middlename }
                    setter={ e => employeeStore.setMiddlename(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Lastname"
                    placeholder="Lastname"
                    errorField={ employeeStore.error_fields.lastname }
                    value={ employeeStore.lastname }
                    setter={ e => employeeStore.setLastname(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Suffixname"
                    placeholder="Suffixname"
                    errorField={ employeeStore.error_fields.suffixname }
                    value={ employeeStore.suffixname }
                    setter={ e => employeeStore.setSuffixname(e.target.value) }
                />

                <InputText 
                    col="col-sm-6"
                    type="text"
                    label="Present Address"
                    placeholder="Present Address"
                    errorField={ employeeStore.error_fields.address_present }
                    value={ employeeStore.address_present }
                    setter={ e => employeeStore.setAddressPresent(e.target.value) }
                />

                <InputText 
                    col="col-sm-6"
                    type="text"
                    label="Permanent Address"
                    placeholder="Permanent Address"
                    errorField={ employeeStore.error_fields.address_permanent }
                    value={ employeeStore.address_permanent }
                    setter={ e => employeeStore.setAddressPermanent(e.target.value) }
                />

                <DatePicker 
                    col="col-sm-3"
                    label="Date of Birth"
                    errorField={ employeeStore.error_fields.birthdate }
                    value={ employeeStore.birthdate }
                    setter={ e => employeeStore.setBirthdate(e.target.value) }
                />

                <InputText 
                    col="col-sm-6"
                    type="text"
                    label="Place of Birth"
                    placeholder="Place of Birth"
                    errorField={ employeeStore.error_fields.place_of_birth }
                    value={ employeeStore.place_of_birth }
                    setter={ e => employeeStore.setPlaceOfBirth(e.target.value) }
                />

                <RadioButton
                    col="col-sm-3"
                    label="Sex"
                    name="sex"
                    value={ employeeStore.sex }
                    options={ employeeStore.SEX_OPTIONS.slice(1) }
                    onChange={ (e) => employeeStore.setSex(e.target.value) }
                    errorField={ employeeStore.error_fields.sex }
                />

                <SelectInput
                    col="col-md-3"
                    name="civil_status"
                    label="Civil Status:"
                    value={ employeeStore.civil_status }
                    isDisabled={ false }
                    options={ employeeStore.CIVIL_STATUS_OPTIONS }
                    onChange={ (value) => employeeStore.setCivilStatus(value) }
                    errorField={ employeeStore.error_fields.civil_status }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Telephone No."
                    placeholder="Telephone No."
                    errorField={ employeeStore.error_fields.tel_no }
                    value={ employeeStore.tel_no }
                    setter={ e => employeeStore.setTelNo(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Cellphone No."
                    placeholder="Cellphone No."
                    errorField={ employeeStore.error_fields.cell_no }
                    value={ employeeStore.cell_no }
                    setter={ e => employeeStore.setCellNo(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="email"
                    label="Email Address"
                    placeholder="Email Address"
                    errorField={ employeeStore.error_fields.email_address }
                    value={ employeeStore.email_address }
                    setter={ e => employeeStore.setEmailAddress(e.target.value) }
                />

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Spouse Name"
                    placeholder="Spouse Name"
                    errorField={ employeeStore.error_fields.spouse_name }
                    value={ employeeStore.spouse_name }
                    setter={ e => employeeStore.setSpouseName(e.target.value) }
                />

                <InputText 
                    col="col-sm-4"
                    type="text"
                    label="Spouse Occupation"
                    placeholder="Spouse Occupation"
                    errorField={ employeeStore.error_fields.spouse_occupation }
                    value={ employeeStore.spouse_occupation }
                    setter={ e => employeeStore.setSpouseOccupation(e.target.value) }
                />

                <InputText 
                    col="col-sm-4"
                    type="number"
                    label="Number of Children"
                    placeholder="Number of Children"
                    errorField={ employeeStore.error_fields.no_of_children }
                    value={ employeeStore.no_of_children }
                    setter={ e => employeeStore.setNoOfChildren(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Height"
                    placeholder="Height"
                    errorField={ employeeStore.error_fields.height }
                    value={ employeeStore.height }
                    setter={ e => employeeStore.setHeight(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Weight"
                    placeholder="Weight"
                    errorField={ employeeStore.error_fields.weight }
                    value={ employeeStore.weight }
                    setter={ e => employeeStore.setWeight(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Religion"
                    placeholder="Religion"
                    errorField={ employeeStore.error_fields.religion }
                    value={ employeeStore.religion }
                    setter={ e => employeeStore.setReligion(e.target.value) }
                />

                <InputText 
                    col="col-sm-3"
                    type="text"
                    label="Blood Type"
                    placeholder="Blood Type"
                    errorField={ employeeStore.error_fields.blood_type }
                    value={ employeeStore.blood_type }
                    setter={ e => employeeStore.setBloodType(e.target.value) }
                />

            </div>
    );

    
});


export default EmployeeFormPersonalDetails