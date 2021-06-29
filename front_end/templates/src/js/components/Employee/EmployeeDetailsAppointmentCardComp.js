

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';
import moment from 'moment'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { numberFormat, defaultValueSetter } from '../Utils/DataFilters'
import EmployeeFormAppointmentDetails from './EmployeeFormAppointmentDetailsComp'

const EmployeeDetailsAppointmentCard = observer(({ employeeStore, dashboardMainStore }) => {

    const [page_loader, SetPageLoader] = useState(false);
    const { employee_id } = useParams();


    const handleEditAppointmentDetailsModal = (e) => {
        e.preventDefault()
        $("#employee-edit-appointment-details-modal").modal('toggle')
    }
    

    const handleUpdateAppointmentDetails = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.patch('api/employee/'+employee_id+'/', {
            form_type: "AD",
            employee_id: employeeStore.employee_id,
            position: employeeStore.position,
            is_active: employeeStore.is_active,
            salary_grade: defaultValueSetter(employeeStore.salary_grade, "", 0),
            step_increment: defaultValueSetter(employeeStore.step_increment, "", 0),
            application_status: employeeStore.application_status,
            tax_status: employeeStore.tax_status,
            monthly_salary: defaultValueSetter(employeeStore.monthly_salary, "", 0),
            firstday_gov: defaultValueSetter(employeeStore.firstday_gov, "", null),
            firstday_sra: defaultValueSetter(employeeStore.firstday_sra, "", null),
            first_appointment: defaultValueSetter(employeeStore.first_appointment, "", null),
            last_appointment: defaultValueSetter(employeeStore.last_appointment, "", null),
            last_step_increment: defaultValueSetter(employeeStore.last_step_increment, "", null),
            last_adjustment: defaultValueSetter(employeeStore.last_adjustment, "", null),
            last_promotion: defaultValueSetter(employeeStore.last_promotion, "", null),
            original_appointment: defaultValueSetter(employeeStore.original_appointment, "", null),
            adjustment_date: defaultValueSetter(employeeStore.adjustment_date, "", null),
            tin: employeeStore.tin,
            gsis: employeeStore.gsis,
            philhealth: employeeStore.philhealth,
            pagibig: employeeStore.pagibig,
            sss: employeeStore.sss,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Employee Appointment Details Successfully Updated!", type: "inverse" 
            });
            SetPageLoader(false);
            $("#employee-edit-appointment-details-modal").modal('hide');
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setErrorFields({
                    employee_id: field_errors.employee_id?.toString(),
                    position: field_errors.position?.toString(),
                    is_active: field_errors.is_active?.toString(),
                    salary_grade: field_errors.salary_grade?.toString(),
                    step_increment: field_errors.step_increment?.toString(),
                    application_status: field_errors.application_status?.toString(),
                    tax_status: field_errors.tax_status?.toString(),
                    monthly_salary: field_errors.monthly_salary?.toString(),
                    firstday_gov: field_errors.firstday_gov?.toString(),
                    firstday_sra: field_errors.firstday_sra?.toString(),
                    first_appointment: field_errors.first_appointment?.toString(),
                    last_appointment: field_errors.last_appointment?.toString(),
                    last_step_increment: field_errors.last_step_increment?.toString(),
                    last_adjustment: field_errors.last_adjustment?.toString(),
                    last_promotion: field_errors.last_promotion?.toString(),
                    original_appointment: field_errors.original_appointment?.toString(),
                    adjustment_date: field_errors.adjustment_date?.toString(),
                    tin: field_errors.tin?.toString(),
                    gsis: field_errors.gsis?.toString(),
                    philhealth: field_errors.philhealth?.toString(),
                    pagibig: field_errors.pagibig?.toString(),
                    sss: field_errors.sss?.toString(),
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
                <h5>Appointment Details</h5>
                { dashboardMainStore.checkIfSubrouteExist('employee-edit-appointment-details') ?
                    <button onClick={ handleEditAppointmentDetailsModal } 
                            className="btn btn-sm btn-primary btn-outline-primary icon-btn float-right">
                        <i className="icofont icofont-edit"></i>
                    </button> : <></> 
                }
            </div>
            <div className="card-block">

                <div className="row">

                    <div className="col-md-3">
                        <span> Employee No.: {'\n'} </span>
                        <h5>{ employeeStore.employee_id }</h5>
                    </div>

                    <div className="col-md-3">
                        <span> Position: {'\n'} </span>
                        <h5>{ employeeStore.position }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Active Status: {'\n'} </span>
                        <h5>{ employeeStore.is_active == true ? "Active" : "Inactive" }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span> Application Status: {'\n'} </span>
                        <h5>{ employeeStore.getApplicationStatusLabel() }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>

                    <div className="col-md-3">
                        <span>Salary Grade: {'\n'} </span>
                        <h5>{ employeeStore.salary_grade }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span>Step Increment: {'\n'} </span>
                        <h5>{ employeeStore.step_increment }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>Tax Status: {'\n'} </span>
                        <h5>{ employeeStore.tax_status }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>Monthly Salary: {'\n'} </span>
                        <h5>{ numberFormat(employeeStore.monthly_salary) }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>

                    <div className="col-md-3">
                        <span>Firstday Gov.: {'\n'} </span>
                        <h5>{ employeeStore.firstday_gov === "" ? "" : 
                        moment(employeeStore.firstday_gov).format("MMM D, YYYY") }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span>Firstday SRA: {'\n'} </span>
                        <h5>{ employeeStore.firstday_sra === "" ? "" : 
                        moment(employeeStore.firstday_sra).format("MMM D, YYYY") }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>First Appointment: {'\n'} </span>
                        <h5>{ employeeStore.first_appointment === "" ? "" : 
                        moment(employeeStore.first_appointment).format("MMM D, YYYY") }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>Last Appointment: {'\n'} </span>
                        <h5>{ employeeStore.last_appointment === "" ? "" : 
                        moment(employeeStore.last_appointment).format("MMM D, YYYY") }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>

                    <div className="col-md-3">
                        <span>Last Step Increment: {'\n'} </span>
                        <h5>{ employeeStore.last_step_increment === "" ? "" : 
                        moment(employeeStore.last_step_increment).format("MMM D, YYYY") }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>Last Adjustment: {'\n'} </span>
                        <h5>{ employeeStore.last_adjustment === "" ? "" : 
                        moment(employeeStore.last_adjustment).format("MMM D, YYYY") }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span>Last Promotion: {'\n'} </span>
                        <h5>{ employeeStore.last_promotion === "" ? "" : 
                        moment(employeeStore.last_promotion).format("MMM D, YYYY") }</h5>
                    </div>
                    
                    <div className="col-md-3">
                        <span>Original Appointment: {'\n'} </span>
                        <h5>{ employeeStore.original_appointment === "" ? "" : 
                        moment(employeeStore.original_appointment).format("MMM D, YYYY") }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>
                    
                    <div className="col-md-3">
                        <span>Adjustment Date: {'\n'} </span>
                        <h5>{ employeeStore.adjustment_date === "" ? "" : 
                        moment(employeeStore.adjustment_date).format("MMM D, YYYY") }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>TIN: {'\n'} </span>
                        <h5>{ employeeStore.tin }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>GSIS: {'\n'} </span>
                        <h5>{ employeeStore.gsis }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>PHILHEALTH: {'\n'} </span>
                        <h5>{ employeeStore.philhealth }</h5>
                    </div>
                    
                    <div className="col-md-12 mt-4">{' '}</div>
                    
                    <div className="col-md-3">
                        <span>PAGIBIG: {'\n'} </span>
                        <h5>{ employeeStore.pagibig }</h5>
                    </div>

                    <div className="col-md-3">
                        <span>SSS: {'\n'} </span>
                        <h5>{ employeeStore.sss }</h5>
                    </div>

                </div>

            </div>
        </div>

        {/* EDIT MODAL */}
        <div className="modal" id="employee-edit-appointment-details-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Appointment Details</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormAppointmentDetails employeeStore={employeeStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleUpdateAppointmentDetails }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );

    
});


export default EmployeeDetailsAppointmentCard