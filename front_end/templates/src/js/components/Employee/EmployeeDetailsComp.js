

import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Link, useParams, useHistory} from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import EmployeeDetailsPersonalCard from './EmployeeDetailsPersonalCardComp'
import EmployeeDetailsEducationalBackgroundCard from './EmployeeDetailsEducationalBackgroundCardComp'
import EmployeeDetailsEligibilityCard from './EmployeeDetailsEligibilityCardComp'
import EmployeeDetailsAppointmentCard from './EmployeeDetailsAppointmentCardComp'


const EmployeeDetails = observer(({ employeeStore, dashboardMainStore }) => {

    const history = useHistory();
    const { employee_id } = useParams();
    const [ page_loader, SetPageLoader ] = useState(false);

    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            employeeStore.retrieve(employee_id)
            employeeStore.setIsOpenedForm(1)
        }
        return () => { is_mounted = false; } 
    },[])


    const redirectBackToEmployeeList = useCallback(() => {
        history.push('/employees'), [history]
    });


    const handleDeleteRouteModal = (e) => {
        e.preventDefault()
        $("#employee-delete-modal").modal('toggle')
    }


    const handleDeleteEmployeeSubmit = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.delete('api/employee/'+employee_id+'/')
             .then((response) => {
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Employee has been successfully Deleted!", type: "inverse"
                });
                SetPageLoader(false)
                redirectBackToEmployeeList()
             }).catch((error) => {
                if(error.response.status == 404 || error.response.status == 500){
                    eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                        message: "Error Occured!", type: "danger" 
                    });
                }
                SetPageLoader(false)
            });
        $("#employee-delete-modal").modal('hide');
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
                                Details
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
                                <DivLoader type="Circles" loading={page_loader}/>
                                <div className="row mb-3 pl-2 pr-2">
                                    <div className="col-md-6 pt-1">
                                        <h3>{ employeeStore.fullname }</h3>
                                        <span>{ employeeStore.position }</span>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/employees" 
                                                className="btn btn-primary float-right ml-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                        { dashboardMainStore.checkIfSubrouteExist('employee-delete') ? 
                                            <button className="btn btn-md btn-danger btn-danger float-right ml-2" 
                                                    onClick={ handleDeleteRouteModal }>
                                                <i className="fa fa-trash"></i> Delete
                                            </button> : <></> 
                                        }
                                    </div>
                                </div>

                                {/* PERSONAL DETAILS */}
                                <EmployeeDetailsPersonalCard employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/>
                                
                                {/* EDUCATIONAL BACKGROUND */}
                                <EmployeeDetailsEducationalBackgroundCard employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/>
                                
                                {/* ELIGIBILITY */}
                                <EmployeeDetailsEligibilityCard employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/>
                                
                                {/* APPOINTMENT DETAILS */}
                                <EmployeeDetailsAppointmentCard employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/>
                                

                            </div>

                                                                    
                            {/* DELETE MODAL */}
                            <div className="modal" id="employee-delete-modal" role="dialog">
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Delete Menu</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <h4>Are you sure you want to permanently delete this record?</h4>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeleteEmployeeSubmit }>Delete</button>
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


export default EmployeeDetails