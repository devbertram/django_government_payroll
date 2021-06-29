

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import { useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import { defaultValueSetter } from '../Utils/DataFilters'
import DivLoader from '../Utils/DivLoaderComp'
import EmployeeFormPersonalDetails from './EmployeeFormPersonalDetailsComp'


const EmployeeDetailsPersonalCard = observer(({ employeeStore, dashboardMainStore }) => {
    
    const [page_loader, SetPageLoader] = useState(false);
    const { employee_id } = useParams();


    const handleEditPersonalDetailsModal = (e) => {
        e.preventDefault()
        $("#employee-edit-personal-details-modal").modal('toggle')
    }


    const handleUpdatePersonalDetails = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.patch('api/employee/'+employee_id+'/', {
            form_type: "PD",
            firstname: employeeStore.firstname, 
            middlename: employeeStore.middlename, 
            lastname: employeeStore.lastname, 
            suffixname: employeeStore.suffixname, 
            address_present: employeeStore.address_present, 
            address_permanent: employeeStore.address_permanent, 
            birthdate: defaultValueSetter(employeeStore.birthdate, "", null),
            place_of_birth: employeeStore.place_of_birth, 
            sex: employeeStore.sex, 
            civil_status: employeeStore.civil_status.value,
            tel_no: employeeStore.tel_no, 
            cell_no: employeeStore.cell_no, 
            email_address: employeeStore.email_address, 
            spouse_name: employeeStore.spouse_name, 
            spouse_occupation: employeeStore.spouse_occupation, 
            no_of_children: defaultValueSetter(employeeStore.no_of_children, "", 0), 
            height: employeeStore.height, 
            weight: employeeStore.weight, 
            religion: employeeStore.religion, 
            blood_type: employeeStore.blood_type, 
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Employee Personal Details Successfully Updated!", type: "inverse" 
            });
            SetPageLoader(false);
            $("#employee-edit-personal-details-modal").modal('hide');
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setErrorFields({
                    firstname: field_errors.firstname?.toString(), 
                    middlename: field_errors.middlename?.toString(), 
                    lastname: field_errors.lastname?.toString(),
                    suffixname: field_errors.suffixname?.toString(), 
                    address_present: field_errors.address_present?.toString(), 
                    address_permanent: field_errors.address_permanent?.toString(), 
                    birthdate: field_errors.birthdate?.toString(), 
                    place_of_birth: field_errors.place_of_birth?.toString(), 
                    sex: field_errors.sex?.toString(), 
                    civil_status: field_errors.civil_status?.toString(), 
                    tel_no: field_errors.tel_no?.toString(), 
                    cell_no: field_errors.cell_no?.toString(), 
                    email_address: field_errors.email_address?.toString(), 
                    spouse_name: field_errors.spouse_name?.toString(), 
                    spouse_occupation: field_errors.spouse_occupation?.toString(), 
                    no_of_children: field_errors.no_of_children?.toString(), 
                    height: field_errors.height?.toString(), 
                    weight: field_errors.weight?.toString(), 
                    religion: field_errors.religion?.toString(), 
                    blood_type: field_errors.blood_type?.toString(),
                    non_field_errors: field_errors.non_field_errors?.toString(),
                });
            }
            if(error.response.status == 404 || error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Error Occured!", type: "danger" 
                });
            }
            SetPageLoader(false);
        });

    }


    return (
    <>
        <div className="card z-depth-0">
            <div className="card-header">
                <h5>Personal Details</h5>
                { dashboardMainStore.checkIfSubrouteExist('employee-edit-personal-details') ?
                    <button onClick={ handleEditPersonalDetailsModal }
                            className="btn btn-sm btn-primary btn-outline-primary icon-btn float-right">
                        <i className="icofont icofont-edit"></i>
                    </button> : <></> 
                }
            </div>
            <div className="card-block">

                <div className="row">

                    <div className="col-md-3">
                        <span> Firstname: {'\n'} </span>
                        <h5>{ employeeStore.firstname }</h5>
                    </div>

                    <div className="col-md-3">
                        <span> Middlename: {'\n'} </span>
                        <h5>{ employeeStore.middlename }</h5>
                    </div>

                    <div className="col-md-3">
                        <span> Lastname: {'\n'} </span>
                        <h5>{ employeeStore.lastname }</h5>
                    </div>

                    <div className="col-md-3">
                        <span> Suffixname: {'\n'} </span>
                        <h5>{ employeeStore.suffixname }</h5>
                    </div>

                    <div className="col-md-12 mt-4">{' '}</div>

                    <div className="col-md-6">
                        <span> Present Address: {'\n'} </span>
                        <h5>{ employeeStore.address_present }</h5>
                    </div>

                    <div className="col-md-6">
                        <span> Permanent Address: {'\n'} </span>
                        <h5>{ employeeStore.address_permanent }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>

                    <div className="col-md-3">
                        <span> Date of Birth: {'\n'} </span>
                        <h5>
                            { employeeStore.birthdate === "" ? "" :
                                moment(employeeStore.birthdate).format("MMM D, YYYY") 
                            }
                        </h5>
                    </div>
                    
                    <div className="col-md-6">
                        <span> Place of Birth: {'\n'} </span>
                        <h5>{ employeeStore.place_of_birth }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Sex: {'\n'} </span>
                        <h5>{ employeeStore.getSexLabel() }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>
                    
                    <div className="col-md-3">
                        <span> Civil Status: {'\n'} </span>
                        <h5>{ employeeStore.getCivilStatusLabel() }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Telephone No.: {'\n'} </span>
                        <h5>{ employeeStore.tel_no }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Cellphone No.: {'\n'} </span>
                        <h5>{ employeeStore.cell_no }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Email Address: {'\n'} </span>
                        <h5>{ employeeStore.email_address }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>
                    
                    <div className="col-md-3">
                        <span> Spouse Name: {'\n'} </span>
                        <h5>{ employeeStore.spouse_name }</h5>
                    </div>

                    <div className="col-md-6">
                        <span> Spouse Occupation: {'\n'} </span>
                        <h5>{ employeeStore.spouse_occupation }</h5>
                    </div>

                    <div className="col-md-3">
                        <span> Number of Children: {'\n'} </span>
                        <h5>{ employeeStore.no_of_children }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>
                    
                    <div className="col-md-3">
                        <span> Height: {'\n'} </span>
                        <h5>{ employeeStore.height }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Weight: {'\n'} </span>
                        <h5>{ employeeStore.weight }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Religion: {'\n'} </span>
                        <h5>{ employeeStore.religion }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Blood Type: {'\n'} </span>
                        <h5>{ employeeStore.blood_type }</h5>
                    </div>

                </div>

            </div>
        </div>
            
        {/* EDIT MODAL */}
        <div className="modal" id="employee-edit-personal-details-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Personal Details</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormPersonalDetails employeeStore={employeeStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleUpdatePersonalDetails }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );

    
});


export default EmployeeDetailsPersonalCard