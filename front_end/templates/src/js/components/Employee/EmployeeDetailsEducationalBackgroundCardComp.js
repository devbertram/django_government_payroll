

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { defaultValueSetter } from '../Utils/DataFilters'
import EmployeeFormEducationalBackground from './EmployeeFormEducationalBackgroundComp'

const EmployeeDetailsEducationalBackgroundCard = observer(({ employeeStore, dashboardMainStore }) => {


    const [page_loader, SetPageLoader] = useState(false);
    const { employee_id } = useParams();


    const handleOpenCreateEducationalBackgroundModal = (e) => {
        e.preventDefault()
        if(employeeStore.educ_bg_is_opened_form === 1){
            employeeStore.educBgResetForm()
        }
        employeeStore.setEducBgIsOpenedForm(0)
        $("#employee-educ-bg-create-modal").modal('toggle')
    }


    const handleCreateEducationalBackground = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.post('api/employee_educ_bg/', { 
            employee: employee_id,
            level: employeeStore.educ_bg_level, 
            school: employeeStore.educ_bg_school, 
            course: employeeStore.educ_bg_course, 
            date_from: employeeStore.educ_bg_date_from, 
            date_to: employeeStore.educ_bg_date_to, 
            units: defaultValueSetter(employeeStore.educ_bg_units, "", 0), 
            graduate_year: employeeStore.educ_bg_graduate_year, 
            scholarship: employeeStore.educ_bg_scholarship, 
            honor: employeeStore.educ_bg_honor, 
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Educational Background Successfully Created!", type: "inverse" 
            });
            employeeStore.educBgResetForm()
            employeeStore.retrieve(employee_id)
            SetPageLoader(false);
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setEducBgErrorFields({
                    level: field_errors.level?.toString(),
                    school: field_errors.school?.toString(), 
                    course: field_errors.course?.toString(), 
                    date_from: field_errors.date_from?.toString(), 
                    date_to: field_errors.date_to?.toString(), 
                    units: field_errors.units?.toString(), 
                    graduate_year: field_errors.graduate_year?.toString(), 
                    scholarship: field_errors.scholarship?.toString(), 
                    honor: field_errors.honor?.toString(), 
                    non_field_errors: field_errors.non_field_errors?.toString(),
                });
            }
            if(error.response.status == 404){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Data Not Found!", type: "danger" 
                });
            }
            if(error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "There's an error trying to send data to the server!", type: "danger" 
                });
            }
            SetPageLoader(false);
        });
    }


    const handleOpenEditEducationalBackgroundModal = (e, id) => {
        e.preventDefault()
        SetPageLoader(true)
        employeeStore.retrieveEducBg(id)
        employeeStore.setEducBgIsOpenedForm(1)
        $("#employee-educ-bg-edit-modal").modal('toggle')
        SetPageLoader(false)
    }


    const handleUpdateEducationalBackground = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.put('api/employee_educ_bg/'+employeeStore.educ_bg_id+'/', { 
            employee: employee_id,
            level: employeeStore.educ_bg_level, 
            school: employeeStore.educ_bg_school, 
            course: employeeStore.educ_bg_course, 
            date_from: employeeStore.educ_bg_date_from, 
            date_to: employeeStore.educ_bg_date_to, 
            units: defaultValueSetter(employeeStore.educ_bg_units, "", 0),
            graduate_year: employeeStore.educ_bg_graduate_year, 
            scholarship: employeeStore.educ_bg_scholarship, 
            honor: employeeStore.educ_bg_honor, 
        }).then((response) => {
            employeeStore.retrieve(employee_id)
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Educational Background Successfully Updated!", type: "inverse" 
            });
            SetPageLoader(false);
            $("#employee-educ-bg-edit-modal").modal('hide');
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setEducBgErrorFields({
                    level: field_errors.level?.toString(),
                    school: field_errors.school?.toString(), 
                    course: field_errors.course?.toString(), 
                    date_from: field_errors.date_from?.toString(), 
                    date_to: field_errors.date_to?.toString(), 
                    units: field_errors.units?.toString(), 
                    graduate_year: field_errors.graduate_year?.toString(), 
                    scholarship: field_errors.scholarship?.toString(), 
                    honor: field_errors.honor?.toString(), 
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


    const handleOpenDeleteEducationalBackgroundModal = (e, id) => {
        e.preventDefault()
        employeeStore.setEducBgId(id)
        $("#employee-educ-bg-delete-modal").modal('toggle')
    }


    const handleDeleteEmployeeEducationalBackground = (e) => {
        e.preventDefault()
        axios.delete('api/employee_educ_bg/'+employeeStore.educ_bg_id+'/')
        .then((response) => {
            employeeStore.retrieve(employee_id)
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Educational Background Successfully Deleted!", type: "inverse" 
            });
            $("#employee-educ-bg-delete-modal").modal('hide');
        }).catch((error) => {
            if(error.response.status == 404 || error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Error Occured!", type: "danger" 
                });
            }
        });
    }


    return (
    <>

        <div className="card z-depth-0">
            <div className="card-header">
                <h5>Educational Background</h5>
                { dashboardMainStore.checkIfSubrouteExist('employee-edit-educational-background') ?
                    <button onClick={ handleOpenCreateEducationalBackgroundModal }
                            className="btn btn-sm btn-success btn-outline-success icon-btn float-right">
                        <i className="icofont icofont-plus"></i>
                    </button> : <></> 
                }
            </div>
            <div className="card-block">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <tbody>

                            { employeeStore.educ_bg_list.map((val, key) => { 
                                return (
                                    <tr key={key} className={ val.id == employeeStore.educ_bg_id ? "table-info" : "" }>
                                        <td className="align-middle">
                                            <h4>{ val.school }</h4>
                                            <h6>{ val.course }</h6>
                                            <h6>{ val.level }</h6>
                                            { val.date_from && val.date_to ? <h6> {val.date_from} - {val.date_to} </h6> : ""}
                                        </td>

                                        { dashboardMainStore.checkIfSubrouteExist('employee-edit-educational-background') ?
                                            <td className="align-middle">
                                                <a href="" onClick={ e => handleOpenEditEducationalBackgroundModal(e, val.id) }>
                                                    <i className="feather icon-edit f-w-1000 f-18 m-r-15 text-c-blue"></i>
                                                </a>
                                                <a href="" onClick={ e => handleOpenDeleteEducationalBackgroundModal(e, val.id) }>
                                                    <i className="feather icon-trash-2 f-w-1000 f-18 text-c-red"></i>
                                                </a>
                                            </td>: <td></td> 
                                        }
                                    </tr>
                                ) 
                            }) }
                            { employeeStore.educ_bg_list.length == 0 ?
                                <tr>
                                    <td>
                                        <h4>No Data Encoded!</h4>
                                    </td>
                                </tr> : <></> }
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        {/* CREATE MODAL */}
        <div className="modal" id="employee-educ-bg-create-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Add Educational Background</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormEducationalBackground employeeStore={employeeStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleCreateEducationalBackground }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* EDIT MODAL */}
        <div className="modal" id="employee-educ-bg-edit-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Educational Background</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormEducationalBackground employeeStore={employeeStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleUpdateEducationalBackground }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
                                                                    
        {/* DELETE MODAL */}
        <div className="modal" id="employee-educ-bg-delete-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Educational Background</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure you want to permanently delete this record?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeleteEmployeeEducationalBackground }>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );

    
});


export default EmployeeDetailsEducationalBackgroundCard