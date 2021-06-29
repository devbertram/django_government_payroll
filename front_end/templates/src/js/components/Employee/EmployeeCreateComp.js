
import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Link, useHistory } from 'react-router-dom'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'

import EmployeeFormPersonalDetails from './EmployeeFormPersonalDetailsComp'
import EmployeeFormAppointmentDetails from './EmployeeFormAppointmentDetailsComp'



const EmployeeCreate = observer(({ employeeStore }) => {
    
    const history = useHistory();
    const [page_loader, SetPageLoader] = useState(false);


    const redirectBackToEmployeeList = useCallback(() => {
        history.push('/employees'), [history]
    });


    const handleResetForm = (e) =>{
        e.preventDefault()
        employeeStore.resetForm()
    }


    const handleCreate = (e, is_save_another) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.post('api/employee/', { 
            // Personal Details
            firstname: employeeStore.firstname, 
            middlename: employeeStore.middlename, 
            lastname: employeeStore.lastname, 
            suffixname: employeeStore.suffixname, 
            address_present: employeeStore.address_present, 
            address_permanent: employeeStore.address_permanent, 
            birthdate: employeeStore.birthdate === "" ? null : employeeStore.birthdate,
            place_of_birth: employeeStore.place_of_birth, 
            sex: employeeStore.sex, 
            civil_status: employeeStore.civil_status.value,
            tel_no: employeeStore.tel_no, 
            cell_no: employeeStore.cell_no, 
            email_address: employeeStore.email_address, 
            spouse_name: employeeStore.spouse_name, 
            spouse_occupation: employeeStore.spouse_occupation, 
            no_of_children: employeeStore.no_of_children === "" ? 0 : employeeStore.no_of_children, 
            height: employeeStore.height, 
            weight: employeeStore.weight, 
            religion: employeeStore.religion, 
            blood_type: employeeStore.blood_type, 
            // Appointment Details
            employee_id: employeeStore.employee_id,
            position: employeeStore.position,
            is_active: employeeStore.is_active,
            salary_grade: employeeStore.salary_grade === "" ? 0 : employeeStore.salary_grade,
            step_increment: employeeStore.step_increment === "" ? 0 : employeeStore.step_increment,
            application_status: employeeStore.application_status,
            tax_status: employeeStore.tax_status,
            monthly_salary: employeeStore.monthly_salary === "" ? 0 : employeeStore.monthly_salary,
            firstday_gov: employeeStore.firstday_gov === "" ? null : employeeStore.firstday_gov,
            firstday_sra: employeeStore.firstday_sra === "" ? null : employeeStore.firstday_sra,
            first_appointment: employeeStore.first_appointment === "" ? null : employeeStore.first_appointment,
            last_appointment: employeeStore.last_appointment === "" ? null : employeeStore.last_appointment,
            last_step_increment: employeeStore.last_step_increment === "" ? null : employeeStore.last_step_increment,
            last_adjustment: employeeStore.last_adjustment === "" ? null : employeeStore.last_adjustment,
            last_promotion: employeeStore.last_promotion === "" ? null : employeeStore.last_promotion,
            original_appointment: employeeStore.original_appointment === "" ? null : employeeStore.original_appointment,
            adjustment_date: employeeStore.adjustment_date === "" ? null : employeeStore.adjustment_date,
            tin: employeeStore.tin,
            gsis: employeeStore.gsis,
            philhealth: employeeStore.philhealth,
            pagibig: employeeStore.pagibig,
            sss: employeeStore.sss,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Employee Successfully Created!", type: "inverse" 
            });
            employeeStore.fetch();
            employeeStore.setSelectedEmployee(response.data.id);
            employeeStore.resetForm()
            if (is_save_another == 0){
                redirectBackToEmployeeList()
            }
            SetPageLoader(false);
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setErrorFields({
                    // Personal Details
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
                    // Appointment Details
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
                    // ID's
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
        
    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Employees</h5>
                            <span>Manage Employees</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="page-header-breadcrumb">
                        <ul className=" breadcrumb breadcrumb-title">
                            <li className="breadcrumb-item">
                                <Link to="/"><i className="feather icon-home"></i></Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/employees">Employees</Link>
                            </li>
                            <li className="breadcrumb-item">
                                Create
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="pcoded-inner-content">
            <div className="main-body">
                <div className="page-wrapper">
                    <div className="page-body">

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card z-depth-0">

                                    <DivLoader type="Circles" loading={page_loader}/>
                                    <div className="card-header">
                                        <h5>Create Employee</h5>
                                        <Link to="/employees" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                    </div>

                                    <div className="card-block">
                                        <div className="row">
                                            
                                            {/* Personal Details */}
                                            <div className="col-sm-12 mb-5">
                                                <h4 className="sub-title">Personal Details</h4>
                                                <EmployeeFormPersonalDetails employeeStore={employeeStore}/>
                                            </div>

                                            {/* Appointment Details */}
                                            <div className="col-sm-12">
                                                <h4 className="sub-title">Appointment Details</h4>
                                                <EmployeeFormAppointmentDetails employeeStore={employeeStore}/>
                                            </div>

                                        </div>


                                        <div className="form-group row mt-2">
                                            <div className="col-sm-12">
                                                <button type="button" className="btn btn-primary float-right mr-2" onClick={ (e) => handleCreate(e, 0) }>
                                                    Save
                                                </button>
                                                <button type="button" className="btn btn-primary float-right mr-2" onClick={ (e) => handleCreate(e, 1) }>
                                                    Save and add another
                                                </button>
                                                <button type="button" className="btn btn-primary float-right mr-2" onClick={ (e) => handleResetForm(e) }>
                                                    Reset
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
    
});


export default EmployeeCreate