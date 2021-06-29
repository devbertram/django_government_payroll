
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'

import eventBus from '../Utils/EventBus'
import { useHistory, useParams } from "react-router-dom"
import { numberFormat } from '../Utils/DataFilters'



const PayrollRegularContentShow = observer(({ payrollRegularDataStore, payrollRegularMntStore }) => {

    const history = useHistory();
    const { payroll_regular_id } = useParams();

    const redirectToPayrollRegularEdit = useCallback((payroll_regular_data_id) => {
        history.push('/payroll/payroll_regular/'+ payroll_regular_id +'/edit/'+payroll_regular_data_id), [history]
    });

    const handleUpdateContentIsRemoved = (e, id, value) => {
        e.preventDefault()
        axios.patch('api/payroll_regular_data/'+id+'/', {
            pt: 'update_is_removed',
            is_removed: value,
        }).then((response) => {
            if(value === true){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Payroll content successfully removed from list!", type: "inverse" 
                });
            }else{
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Payroll content successfully restored in list!", type: "inverse"
                });
            }
            payrollRegularDataStore.fetch();
            payrollRegularMntStore.fetch();
            payrollRegularDataStore.setSelectedData(response.data.id);
            $("#payroll-regular-content-details").modal('hide')
        }).catch((error) => {
            if(error.response.status == 404 || error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Error Occured!", type: "danger" 
                });
            }
        });
    }

    const handleEditContent = (e, id) => {
        e.preventDefault()
        $("#payroll-regular-content-details").modal('hide')
        redirectToPayrollRegularEdit(id)
    }

    const getDeductionRecords = () => {
        let rows = [];
        if(payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData){
            payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData.map((data) => {
                if(Number(data.amount) > 0){
                    if(payrollRegularDataStore.getSelectedDataMaintenanceDetails(data.code)){
                        rows.push(
                            <tr key={data.code} style={{color:'#4099ff'}}>
                                <td className="align-middle">{ data.label }</td>
                                <td className="align-middle">
                                    { numberFormat(payrollRegularDataStore.getSelectedDataMaintenanceDetails(data.code).mod_value, 2) }
                                </td>
                            </tr>   
                        )
                    }else{
                        rows.push(
                            <tr key={data.code}>
                                <td className="align-middle">{ data.label }</td>
                                <td className="align-middle">{ numberFormat(data.amount, 2) }</td>
                            </tr>
                        )
                    }
                }
            })

        }else{
            rows.push(<tr key={0}><td className="align-middle">No Data Encoded!</td></tr>)
        }
        return rows;
    }

    const getAllowanceRecords = () => {
        let rows = [];
        if(payrollRegularDataStore.form_data.payrollRegularDataAllow_payrollRegularData){
            payrollRegularDataStore.form_data.payrollRegularDataAllow_payrollRegularData.map((data) => {
                if(Number(data.amount) > 0){
                    if(payrollRegularDataStore.getSelectedDataMaintenanceDetails(data.code)){
                        rows.push(
                            <tr key={data.code} style={{color:'#4099ff'}}>
                                <td className="align-middle">{ data.label }</td>
                                <td className="align-middle">
                                    { numberFormat(payrollRegularDataStore.getSelectedDataMaintenanceDetails(data.code).mod_value, 2) }
                                </td>
                            </tr>   
                        )
                    }else{
                        rows.push(
                            <tr key={data.code}>
                                <td className="align-middle">{ data.label }</td>
                                <td className="align-middle">{ numberFormat(data.amount, 2) }</td>
                            </tr>
                        )
                    }
                }
            })

        }else{
            rows.push(<tr key={0}><td className="align-middle">No Data Encoded!</td></tr>)
        }
        return rows;
    }

    const getDeductionSortByPriority = () => {
        if(payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData){
            let deductions = [...payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData]
            return deductions.sort((a,b) => (a.priority_seq > b.priority_seq) ? 1 : ((b.priority_seq > a.priority_seq) ? -1 : 0))
        }else{
            return [];
        }
    }

    const getTotalDeducNet = () => {
        const deduc_sort_by_priority = getDeductionSortByPriority();
        let total_deduc = 0;
        let max_deduc = 5000;
        deduc_sort_by_priority.map(data => {
            if(data.priority_seq > 0 && max_deduc > 0){
                if(max_deduc > Number(data.amount)){
                    max_deduc-=Number(data.amount)
                    total_deduc+=Number(data.amount);
                }else{
                    total_deduc+=max_deduc;
                    max_deduc = 0;
                }
            }
        })
        return Number(total_deduc);
    }

    const getTotalDeduc = () => {
        let total_deduc = 0;
        if(payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData){
            payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData.map((data) => {
                if(Number(data.amount) > 0){
                    if(payrollRegularDataStore.getSelectedDataMaintenanceDetails(data.code)){
                        total_deduc+=Number(payrollRegularDataStore.getSelectedDataMaintenanceDetails(data.code).mod_value)
                    }else{
                        total_deduc+=Number(data.amount)
                    }
                }
            })

        }
        return Number(total_deduc);
    }

    const getTotalAllow = () => {
        let total_allow = 0;
        if(payrollRegularDataStore.form_data.payrollRegularDataAllow_payrollRegularData){
            payrollRegularDataStore.form_data.payrollRegularDataAllow_payrollRegularData.map((data) => {
                if(Number(data.amount) > 0){
                    if(payrollRegularDataStore.getSelectedDataMaintenanceDetails(data.code)){
                        total_allow+=Number(payrollRegularDataStore.getSelectedDataMaintenanceDetails(data.code).mod_value)
                    }else{
                        total_allow+=Number(data.amount)
                    }
                }
            })

        }
        return Number(total_allow);
    }

    const getNetAmount = () => {
        let monthly_salary = 0;
        const allow = getTotalAllow();
        const deduc = getTotalDeducNet();
        if(payrollRegularDataStore.getSelectedDataMaintenanceDetails('monthly_salary')){
            monthly_salary = payrollRegularDataStore.getSelectedDataMaintenanceDetails('monthly_salary').mod_value;
        }else{
            monthly_salary = payrollRegularDataStore.form_data.monthly_salary
        }
        return (Number(monthly_salary) + allow) - deduc
    }


    return (                             
    <div className="modal" id="payroll-regular-content-details" role="dialog">
        <div className="modal-dialog modal-lg" role="document" style={{ maxWidth:'1200px' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title mt-2">Content Details</h4>
                    <div className="float-right">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="close ml-3">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        { payrollRegularDataStore.form_data.is_new === true && payrollRegularDataStore.form_data.is_removed === false? 
                            <button className="btn btn-md btn-primary float-right ml-2" 
                                    onClick={ e => handleEditContent(e, payrollRegularDataStore.form_data.id) }>
                                <i className="fa fa-edit"></i> Edit
                            </button> : <></>
                        }
                        { payrollRegularDataStore.form_data.is_removed === false ? 
                            <button className="btn btn-md btn-warning float-right ml-2" 
                                    onClick={ e => handleUpdateContentIsRemoved(e, payrollRegularDataStore.form_data.id, true) }>
                                <i className="fa fa-trash"></i> Remove from list
                            </button> :
                            <button className="btn btn-md btn-success float-right ml-2"
                                    onClick={ e => handleUpdateContentIsRemoved(e, payrollRegularDataStore.form_data.id, false) }>
                                <i className="fa fa-refresh"></i> Restore
                            </button>
                        }
                    </div>
                </div>
                <div className="modal-body">

                    <div className="row">

                        <div className="col-md-3">
                            <span> Employee No: {'\n'} </span>
                            <h5>{ payrollRegularDataStore.form_data.employee_no }</h5>
                        </div>

                        <div className="col-md-3">
                            <span> Fullname: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('fullname') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('fullname').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.fullname }</h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> Station: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('station') ? 
                                <h5 style={{ color:'#4099ff' }}>
                                    { payrollRegularMntStore.getStationOptionsLabel(payrollRegularDataStore.getSelectedDataMaintenanceDetails('station').mod_value) }
                                </h5> :
                                <h5>
                                    { payrollRegularMntStore.getStationOptionsLabel(payrollRegularDataStore.form_data.station_id) }
                                </h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> Position: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('position') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('position').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.position }</h5>
                            }
                        </div>

                        <div className="col-md-12 mt-4">{' '}</div>

                        <div className="col-md-3">
                            <span> Paygroup: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('paygroup') ? 
                                <h5 style={{ color:'#4099ff' }}>
                                    { payrollRegularMntStore.getPaygroupOptionsLabel(payrollRegularDataStore.getSelectedDataMaintenanceDetails('paygroup').mod_value) }
                                </h5> :
                                <h5>
                                    { payrollRegularDataStore.form_data.paygroup?.label }
                                </h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> Salary Grade: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('salary_grade') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('salary_grade').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.salary_grade }</h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> Step Increment: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('step_increment') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('step_increment').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.step_increment }</h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> Monthly Salary: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('monthly_salary') ? 
                                <h5 style={{ color:'#4099ff' }}>
                                    { numberFormat(payrollRegularDataStore.getSelectedDataMaintenanceDetails('monthly_salary').mod_value, 2) }
                                </h5> : 
                                <h5>
                                    { numberFormat(payrollRegularDataStore.form_data.monthly_salary, 2) }
                                </h5>
                            }
                        </div>

                        <div className="col-md-12 mt-4">{' '}</div>

                        <div className="col-md-3">
                            <span> Plantilla Item: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('plantilla_item') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('plantilla_item').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.plantilla_item }</h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> Status: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('status') ? 
                                <h5 style={{ color:'#4099ff' }}>
                                    { payrollRegularMntStore.getStatusOptionsLabel(payrollRegularDataStore.getSelectedDataMaintenanceDetails('status').mod_value) }
                                </h5> :
                                <h5>
                                    { payrollRegularDataStore.form_data.status?.label }
                                </h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> ATM Account No.: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('atm_account_no') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('atm_account_no').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.atm_account_no }</h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> TIN: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('tin') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('tin').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.tin }</h5>
                            }
                        </div>

                        <div className="col-md-12 mt-4">{' '}</div>

                        <div className="col-md-3">
                            <span> GSIS: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('gsis') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('gsis').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.gsis }</h5>
                            }
                        </div>
                    
                        <div className="col-md-3">
                            <span> Philhealth: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('philhealth') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('philhealth').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.philhealth }</h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> Pagibig: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('pagibig') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('pagibig').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.pagibig }</h5>
                            }
                        </div>

                        <div className="col-md-3">
                            <span> SSS: {'\n'} </span>
                            { payrollRegularDataStore.getSelectedDataMaintenanceDetails('sss') ? 
                                <h5 style={{ color:'#4099ff' }}>{ payrollRegularDataStore.getSelectedDataMaintenanceDetails('sss').mod_value }</h5>: 
                                <h5>{ payrollRegularDataStore.form_data.sss }</h5>
                            }
                        </div>

                        <div className="col-md-12 mt-4">{' '}</div>

                        <div className="col-md-6 mt-4">
                            <div className="table-responsive">
                                <h5>Allowances</h5>
                                <table className="table table-sm table-bordered table-hover mt-2">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">Allowance Code</th>
                                            <th className="align-middle">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { getAllowanceRecords() }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="align-middle" style={{ fontWeight:'bold' }}>Total</td>
                                            <td className="align-middle" style={{ fontWeight:'bold' }}>{ numberFormat(getTotalAllow(), 2) }</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="table-responsive">
                                <h5>Net Amount</h5>
                                <table className="table table-sm table-bordered table-hover mt-2">
                                    <tbody>
                                        <tr>
                                            <td className="align-middle">Monthly Salary</td>
                                            <td className="align-middle">
                                                { payrollRegularDataStore.getSelectedDataMaintenanceDetails('monthly_salary') ? 
                                                    <> { numberFormat(payrollRegularDataStore.getSelectedDataMaintenanceDetails('monthly_salary').mod_value, 2) }</> : 
                                                    <> { numberFormat(payrollRegularDataStore.form_data.monthly_salary, 2) } </>
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">Allowance</td>
                                            <td className="align-middle">{ numberFormat(getTotalAllow(), 2) }</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">Deductions</td>
                                            <td className="align-middle">{ numberFormat(getTotalDeducNet(), 2) }</td>
                                        </tr>
                                        <tr style={{ fontWeight:'bold'}}>
                                            <td className="align-middle">Net</td>
                                            <td className="align-middle">{ numberFormat(getNetAmount(), 2) }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-md-6 mt-4">
                            <div className="table-responsive">
                                <h5>Deductions</h5>
                                <table className="table table-sm table-bordered table-hover mt-2">
                                    <thead>
                                        <tr>
                                            <th className="align-middle" style={{ width:20 }}>Deduction Code</th>
                                            <th className="align-middle" style={{ width:20 }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { getDeductionRecords() }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="align-middle" style={{ fontWeight:'bold' }}>Total</td>
                                            <td className="align-middle" style={{ fontWeight:'bold' }}>{ numberFormat(getTotalDeduc(), 2) }</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                    </div>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div> 
    );
    
});


export default PayrollRegularContentShow