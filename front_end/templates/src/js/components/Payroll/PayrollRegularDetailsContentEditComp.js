
import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Link, useHistory, useParams } from 'react-router-dom'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { defaultValueSetter } from '../Utils/DataFilters'
import PayrollRegularFormContent from './PayrollRegularFormContentComp'


const PayrollRegularDetailsContentEdit = observer(({ payrollRegularStore, payrollRegularDataStore}) => {
    
    const history = useHistory();
    const { payroll_regular_data_id } = useParams();
    const { payroll_regular_id } = useParams();
    const [page_loader, SetPageLoader] = useState(false);


    const redirectBackToPayrollRegularDetails = useCallback(() => {
        history.push('/payroll/payroll_regular/'+payroll_regular_id), [history]
    });


    const handleUpdate = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        let deductions = []
        let allowances = []
        if(payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData){
            payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData.map(data => {
                deductions.push({id: data.value, amount: data.amount})
            })
        }
        if(payrollRegularDataStore.form_data.payrollRegularDataAllow_payrollRegularData){
            payrollRegularDataStore.form_data.payrollRegularDataAllow_payrollRegularData.map(data => {
                allowances.push({id: data.value, amount: data.amount})
            })
        }
        axios.put('api/payroll_regular_data/'+payroll_regular_data_id+'/', {
            payroll_regular: payroll_regular_id,
            employee: payrollRegularDataStore.form_data.employee.value,
            station: payrollRegularDataStore.form_data.station.value,
            paygroup: payrollRegularDataStore.form_data.paygroup.value,
            fullname: payrollRegularDataStore.form_data.fullname,
            position: payrollRegularDataStore.form_data.position,
            salary_grade: defaultValueSetter(payrollRegularDataStore.form_data.salary_grade, "", 0),
            step_increment: defaultValueSetter(payrollRegularDataStore.form_data.step_increment, "", 0),
            monthly_salary: defaultValueSetter(payrollRegularDataStore.form_data.monthly_salary, "", 0),
            plantilla_item: payrollRegularDataStore.form_data.plantilla_item,
            status: payrollRegularDataStore.form_data.status.value,
            is_atm: payrollRegularDataStore.form_data.atm_account_no ? 1 : 0,
            atm_account_no: payrollRegularDataStore.form_data.atm_account_no,
            tin: payrollRegularDataStore.form_data.tin,
            gsis: payrollRegularDataStore.form_data.gsis,
            philhealth: payrollRegularDataStore.form_data.philhealth,
            pagibig: payrollRegularDataStore.form_data.pagibig,
            sss: payrollRegularDataStore.form_data.sss,
            payrollRegularDataDeduc_payrollRegularData: deductions,
            payrollRegularDataAllow_payrollRegularData: allowances,
        })
        .then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Payroll Content Successfully Updated!", type: "inverse" 
            });
            payrollRegularDataStore.fetch();
            payrollRegularDataStore.setSelectedData(response.data.id);
            payrollRegularDataStore.resetForm()
            SetPageLoader(false);
            redirectBackToPayrollRegularDetails()
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                payrollRegularDataStore.setErrorFields({
                    payroll_regular: field_errors.payroll_regular_id?.toString(),
                    employee: field_errors.employee?.toString(),
                    station: field_errors.station?.toString(),
                    paygroup: field_errors.paygroup?.toString(),
                    fullname: field_errors.fullname?.toString(),
                    position: field_errors.position?.toString(),
                    salary_grade: field_errors.salary_grade?.toString(),
                    step_increment: field_errors.step_increment?.toString(),
                    monthly_salary: field_errors.monthly_salary?.toString(),
                    plantilla_item: field_errors.plantilla_item?.toString(),
                    status: field_errors.status?.toString(),
                    is_atm: field_errors.is_atm?.toString(),
                    atm_account_no: field_errors.atm_account_no?.toString(),
                    tin: field_errors.tin?.toString(),
                    gsis: field_errors.gsis?.toString(),
                    philhealth: field_errors.philhealth?.toString(),
                    pagibig: field_errors.pagibig?.toString(),
                    sss: field_errors.sss?.toString(),
                    payrollRegularDataDeduc_payrollRegularData: field_errors.payrollRegularDataDeduc_payrollRegularData?.toString(),
                    payrollRegularDataDeduc_payrollRegularData: field_errors.payrollRegularDataAllow_payrollRegularData?.toString(),
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
                            <h5>Payroll Regular Details</h5>
                            <span>Edit Payroll Regular Content</span>
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
                                <Link to={"/payroll/payroll_regular/"+payroll_regular_id}>Details</Link>
                            </li>
                            <li className="breadcrumb-item">
                                Edit Content
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
                                        <h5>Edit Payroll Content</h5>
                                        <Link to={"/payroll/payroll_regular/"+payroll_regular_id} className="btn btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                                            <i className="fa fa-arrow-left"></i> Back to Details
                                        </Link>
                                        <Link to="/payroll/payroll_regular" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                    </div>

                                    <div className="card-block">
                                            
                                        <PayrollRegularFormContent payrollRegularDataStore={payrollRegularDataStore} />

                                        <div className="form-group row mt-2">
                                            <div className="col-sm-12">
                                                <button type="button" className="btn btn-primary float-right mr-2" onClick={ handleUpdate}>
                                                    Save and back to list
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


export default PayrollRegularDetailsContentEdit