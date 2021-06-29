

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { numberFormat, defaultValueSetter } from '../Utils/DataFilters'
import EmployeeFormEligibility from './EmployeeFormEligibilityComp'

const EmployeeDetailsEligibilityCard = observer(({ employeeStore, dashboardMainStore }) => {


    const [page_loader, SetPageLoader] = useState(false);
    const { employee_id } = useParams();


    const handleOpenCreateEligibilityModal = (e) => {
        e.preventDefault()
        if(employeeStore.elig_is_opened_form === 1){
            employeeStore.eligResetForm()
        }
        employeeStore.setEligIsOpenedForm(0)
        $("#employee-elig-create-modal").modal('toggle')
    }


    const handleCreateEligibility = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.post('api/employee_elig/', { 
            employee: employee_id,
            eligibility: employeeStore.elig_eligibility,
            level: employeeStore.elig_level,
            rating: defaultValueSetter(employeeStore.elig_rating, "", 0),
            exam_place: employeeStore.elig_exam_place,
            exam_date: employeeStore.elig_exam_date,
            license_no: employeeStore.elig_license_no,
            license_validity: employeeStore.elig_license_validity,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Eligibility Successfully Created!", type: "inverse" 
            });
            employeeStore.eligResetForm()
            employeeStore.retrieve(employee_id)
            SetPageLoader(false);
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setEligErrorFields({
                    eligibility: field_errors.eligibility?.toString(),
                    level: field_errors.level?.toString(),
                    rating: field_errors.rating?.toString(),
                    exam_place: field_errors.exam_place?.toString(),
                    exam_date: field_errors.exam_date?.toString(),
                    license_no: field_errors.license_no?.toString(),
                    license_validity: field_errors.license_validity?.toString(),
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


    const handleOpenEditEligibilityModal = (e, id) => {
        e.preventDefault()
        SetPageLoader(true)
        employeeStore.retrieveElig(id)
        employeeStore.setEligIsOpenedForm(1)
        $("#employee-elig-edit-modal").modal('toggle')
        SetPageLoader(false)
    }


    const handleUpdateEligibility = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.put('api/employee_elig/'+employeeStore.elig_id+'/', { 
            employee: employee_id,
            eligibility: employeeStore.elig_eligibility,
            level: employeeStore.elig_level,
            rating: defaultValueSetter(employeeStore.elig_rating, "", 0),
            exam_place: employeeStore.elig_exam_place,
            exam_date: employeeStore.elig_exam_date,
            license_no: employeeStore.elig_license_no,
            license_validity: employeeStore.elig_license_validity,
        }).then((response) => {
            employeeStore.retrieve(employee_id)
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Eligibility Successfully Updated!", type: "inverse" 
            });
            SetPageLoader(false);
            $("#employee-elig-edit-modal").modal('hide');
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                employeeStore.setEligErrorFields({
                    eligibility: field_errors.eligibility?.toString(),
                    level: field_errors.level?.toString(),
                    rating: field_errors.rating?.toString(),
                    exam_place: field_errors.exam_place?.toString(),
                    exam_date: field_errors.exam_date?.toString(),
                    license_no: field_errors.license_no?.toString(),
                    license_validity: field_errors.license_validity?.toString(),
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


    const handleOpenDeleteEligibilityModal = (e, id) => {
        e.preventDefault()
        employeeStore.setEligId(id)
        $("#employee-elig-delete-modal").modal('toggle')
    }


    const handleDeleteEmployeeEligibility = (e) => {
        e.preventDefault()
        axios.delete('api/employee_elig/'+employeeStore.elig_id+'/')
        .then((response) => {
            employeeStore.retrieve(employee_id)
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Eligibility Successfully Deleted!", type: "inverse" 
            });
            $("#employee-elig-delete-modal").modal('hide');
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
                <h5>Eligibility</h5>
                { dashboardMainStore.checkIfSubrouteExist('employee-edit-eligibility') ?
                <button onClick={ handleOpenCreateEligibilityModal }
                        className="btn btn-sm btn-success btn-outline-success icon-btn float-right">
                    <i className="icofont icofont-plus"></i>
                </button> : <></> 
                }
            </div>
            <div className="card-block">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <tbody>

                            { employeeStore.elig_list.map((val, key) => { 
                                return (
                                    <tr key={key} className={ val.id == employeeStore.elig_id ? "table-info" : "" }>
                                        <td className="align-middle">
                                            <h4>{ val.eligibility }</h4>
                                            <h6>{ val.level }</h6>
                                            <h6>{ defaultValueSetter(numberFormat(val.rating), "0.00", "") }</h6>
                                        </td>
                                        { dashboardMainStore.checkIfSubrouteExist('employee-edit-eligibility') ?
                                            <td className="align-middle">
                                                <a href="" onClick={ e => handleOpenEditEligibilityModal(e, val.id) }>
                                                    <i className="feather icon-edit f-w-1000 f-18 m-r-15 text-c-blue"></i>
                                                </a>
                                                <a href="" onClick={ e => handleOpenDeleteEligibilityModal(e, val.id) }>
                                                    <i className="feather icon-trash-2 f-w-1000 f-18 text-c-red"></i>
                                                </a>
                                            </td>: <td></td> 
                                        }
                                    </tr>
                                ) 
                            }) }
                            { employeeStore.elig_list.length == 0 ?
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
        <div className="modal" id="employee-elig-create-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Add Eligibility</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormEligibility employeeStore={employeeStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleCreateEligibility }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* EDIT MODAL */}
        <div className="modal" id="employee-elig-edit-modal" role="dialog">
            <div className="modal-dialog" role="document" style={{ maxWidth:'1200px' }}>
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Eligibility</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EmployeeFormEligibility employeeStore={employeeStore}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleUpdateEligibility }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
                                                                    
        {/* DELETE MODAL */}
        <div className="modal" id="employee-elig-delete-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Eligibility</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure you want to permanently delete this record?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeleteEmployeeEligibility }>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );

    
});


export default EmployeeDetailsEligibilityCard