
import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Link, useHistory } from 'react-router-dom'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'

import PayrollRegularFormDetails from './PayrollRegularFormDetailsComp'
import PayrollRegularFormContent from './PayrollRegularFormContentComp'



const PayrollRegularCreate = observer(({ payrollRegularStore, employeeStore, dashboardMainStore }) => {
    
    const history = useHistory();
    const [page_loader, SetPageLoader] = useState(false);


    const redirectBackToTemplateList = useCallback(() => {
        history.push('/template'), [history]
    });


    const handleResetForm = (e) =>{
        e.preventDefault()
        payrollRegularStore.resetForm()
    }


    const handleCreate = (e, is_save_another) => {
        e.preventDefault()
        SetPageLoader(true)
        // axios.post('api/template/', { 
        //     name: payrollRegularStore.name, 
        //     description: payrollRegularStore.description, 
        //     process_date: payrollRegularStore.process_date, 
        //     template_data: payrollRegularStore.template_data, 
        // }).then((response) => {
        //     eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //         message: "Template Successfully Created!", type: "inverse" 
        //     });
        //     payrollRegularStore.fetch();
        //     payrollRegularStore.setSelectedTemplate(response.data.id);
        //     payrollRegularStore.resetForm()
        //     if (is_save_another == 0){
        //         redirectBackToTemplateList()
        //     }
        //     SetPageLoader(false);
        // }).catch((error) => {
        //     if(error.response.status == 400){
        //         let field_errors = error.response.data;
        //         payrollRegularStore.setErrorFields({
        //             // Personal Details
        //             name: field_errors.name?.toString(), 
        //             description: field_errors.description?.toString(), 
        //             process_date: field_errors.process_date?.toString(), 
        //             template_data: field_errors.template_data?.toString(), 
        //             non_field_errors: field_errors.non_field_errors?.toString(),
        //         });
        //     }
        //     if(error.response.status == 404 || error.response.status == 500){
        //         eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //             message: "Error Occured!", type: "danger" 
        //         });
        //     }
        //     SetPageLoader(false);
        // });
    }
    

    return (
        
    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Payroll Regular</h5>
                            <span>Create Regular Payroll</span>
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
                                <Link to="/payroll/payroll_regular">Payroll Regular</Link>
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
                                        <h5>Create Regular Payroll</h5>
                                        <Link to="/payroll/payroll_regular" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                    </div>

                                    <div className="card-block">
                                        <div className="row">
                                            
                                            {/* Template Details */}
                                            <div className="col-sm-12 mb-5">
                                                <h4 className="sub-title">Template Details</h4>
                                                <PayrollRegularFormDetails payrollRegularStore={payrollRegularStore} />
                                            </div>
                                            
                                            {/* Template Data */}
                                            <PayrollRegularFormContent payrollRegularStore={payrollRegularStore} employeeStore={employeeStore}/>

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


export default PayrollRegularCreate