
import React, { useState, useRef } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { numberFormat } from '../Utils/DataFilters'
import PayrollRegularFormMntComp from './PayrollRegularFormMntComp'
import { PayrollRegularMntReport } from './printables/PayrollRegularMntReport';

const PayrollRegularMntDetails = observer(({ payrollRegularStore, payrollRegularDataStore, payrollRegularMntStore }) => {

    const { payroll_regular_id } = useParams();
    const componentRef = useRef();
    const[page_loader, SetPageLoader] = useState(false);

    const handleOpenCreatePayrollRegularMntModal = (e) => {
        e.preventDefault()
        if(payrollRegularMntStore.is_opened_form === 1){
            payrollRegularMntStore.resetForm()
        }
        payrollRegularMntStore.setIsOpenedForm(0)
        $("#payroll-regular-mnt-create-modal").modal("toggle")
    }


    const handleCreatePayrollRegularMnt = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        var mod_value = "";
        if(payrollRegularMntStore.SELECT_FORM_FIELDS.includes(payrollRegularMntStore.field?.value)){
            mod_value = payrollRegularMntStore.mod_value.value;
        }else{
            mod_value = payrollRegularMntStore.mod_value;
        }
        axios.post('api/payroll_regular_mnt/', {
            pr_id : payroll_regular_id,
            prd_id : payrollRegularMntStore.payroll_regular_data?.value,
            category : payrollRegularMntStore.field?.category,
            field : payrollRegularMntStore.field?.value,
            field_description : payrollRegularMntStore.field?.description,
            deduc_priority_seq : payrollRegularMntStore.field?.deduc_priority_seq,
            mod_value : mod_value.toString(),
            remarks : payrollRegularMntStore.remarks
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Maintenance Successfully Created!", type: "inverse" 
            });
            payrollRegularMntStore.fetch()
            payrollRegularMntStore.resetForm()
            payrollRegularMntStore.setPayrollRegularMntId(response.data.id)
            SetPageLoader(false);
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                payrollRegularMntStore.setErrorFields({
                    payroll_regular_data: field_errors.prd_id?.toString(),
                    category: field_errors.category?.toString(), 
                    field: field_errors.field?.toString(), 
                    mod_value: field_errors.mod_value?.toString(), 
                    remarks: field_errors.remarks?.toString(),
                    non_field_errors: field_errors.non_field_errors?.toString(),
                });
            }
            if(error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Error occurred!", type: "danger" 
                });
            }
            SetPageLoader(false);
        })
    }


    const handleOpenEditPayrollRegularMntModal = (e, id) =>{
        e.preventDefault()
        payrollRegularMntStore.retrieve(id)
        payrollRegularMntStore.setIsOpenedForm(1)
        $("#payroll-regular-mnt-edit-modal").modal("toggle")
    }

    
    const handleUpdatePayrollRegularMnt = (e) =>{
        e.preventDefault()
        SetPageLoader(true)
        var mod_value = "";
        if(payrollRegularMntStore.SELECT_FORM_FIELDS.includes(payrollRegularMntStore.field?.value)){
            mod_value = payrollRegularMntStore.mod_value.value;
        }else{
            mod_value = payrollRegularMntStore.mod_value;
        }
        axios.put('api/payroll_regular_mnt/'+payrollRegularMntStore.payroll_regular_mnt_id+'/', {
            pr_id : payroll_regular_id,
            prd_id : payrollRegularMntStore.payroll_regular_data?.value,
            category : payrollRegularMntStore.field?.category,
            field : payrollRegularMntStore.field?.value,
            field_description : payrollRegularMntStore.field?.description,
            mod_value : mod_value.toString(),
            remarks : payrollRegularMntStore.remarks,
            deduc_priority_seq : payrollRegularMntStore.field?.deduc_priority_seq,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Maintenance Successfully Updated!", type: "inverse" 
            });
            payrollRegularMntStore.fetch()
            payrollRegularMntStore.resetForm()
            payrollRegularMntStore.setPayrollRegularMntId(response.data.id)
            SetPageLoader(false);
            $("#payroll-regular-mnt-edit-modal").modal("hide")
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                payrollRegularMntStore.setErrorFields({
                    payroll_regular_data: field_errors.prd_id?.toString(),
                    category: field_errors.category?.toString(), 
                    field: field_errors.field?.toString(), 
                    mod_value: field_errors.mod_value?.toString(), 
                    remarks: field_errors.remarks?.toString(),
                    non_field_errors: field_errors.non_field_errors?.toString(),
                });
            }
            if(error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Error occurred!", type: "danger" 
                });
            }
            SetPageLoader(false);
        })
    }


    const handleOpenDeletePayrollRegularMntModal = (e, id) =>{
        e.preventDefault()
        payrollRegularMntStore.setPayrollRegularMntId(id)
        $("#payroll-regular-mnt-delete-modal").modal("toggle")
    } 


    const handleDeletePayrollRegularMnt = (e) => {
        e.preventDefault()
        axios.delete('api/payroll_regular_mnt/'+payrollRegularMntStore.payroll_regular_mnt_id+'/')
        .then((response) => {
            payrollRegularMntStore.fetch()
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Maintenance Successfully Deleted!", type: "inverse" 
            });
            $("#payroll-regular-mnt-delete-modal").modal("hide")
        }).catch((error) => {
            if(error.response.status == 404 || error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Error Occured!", type: "danger" 
                });
            }
        });
    }  


    const tableRowChanges = (category, field, mod_value) =>{
        var data = "";
        if(category === 1){
            switch (field) {
                case "paygroup":
                    data =  (
                        <> { payrollRegularMntStore.getParamOptionsLabel(field) }:
                            <span style={{ fontWeight:'bold', }}>
                                { ' ' + payrollRegularMntStore.getPaygroupOptionsLabel(mod_value) }
                            </span> 
                        </>
                    )
                    break;
                case "station":
                    data = (
                        <> { payrollRegularMntStore.getParamOptionsLabel(field) }:
                            <span style={{ fontWeight:'bold', }}>
                                { ' ' + payrollRegularMntStore.getStationOptionsLabel(mod_value) }
                            </span> 
                        </>
                    )
                    break;
                case "status":
                    data = (
                        <> { payrollRegularMntStore.getParamOptionsLabel(field) }:
                            <span style={{ fontWeight:'bold', }}>
                                { ' ' + payrollRegularMntStore.getStatusOptionsLabel(mod_value) }
                            </span> 
                        </>
                    )
                    break;
                case "monthly_salary":
                    data = (
                        <> { payrollRegularMntStore.getParamOptionsLabel(field) }:
                            <span style={{ fontWeight:'bold', }}>
                                { ' ' +  numberFormat(Number(mod_value), 2) }
                            </span> 
                        </>
                    )
                    break;
                default:
                    data = (
                        <> { payrollRegularMntStore.getParamOptionsLabel(field) }:
                            <span style={{ fontWeight:'bold', }}>
                                { ' ' + mod_value }
                            </span> 
                        </>
                    )
                    break;
            }
        }
        if(category === 2 || category === 3){
            data = (
                <> { payrollRegularMntStore.getParamOptionsLabel(field) }:
                    <span style={{ fontWeight:'bold', }}>
                        { ' ' + numberFormat(Number(mod_value), 2) }
                    </span> 
                </>
            )
        }
        return data;
    }


    const handleMntPrint = useReactToPrint({
        content: () => componentRef.current,
        removeAfterPrint: true,
    });


    return (
    <>

        <div className="col-md-5">
            <div className="card z-depth-0">
                <div className="card-header">
                    <h5>Maintenance / Changes</h5>
                    <div className="float-right">
                        <button onClick={ handleOpenCreatePayrollRegularMntModal }
                                className="btn btn-sm btn-success btn-outline-success icon-btn float-right">
                            <i className="icofont icofont-plus"></i>
                        </button>
                        <button onClick={ handleMntPrint }
                                className="btn btn-sm btn-success btn-outline-success icon-btn float-right mr-2">
                            PRINT <i className="icofont icofont-print"></i>
                        </button>
                    </div>
                </div>
                <div className="card-block pb-0">
                    <div className="table-responsive">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search .." 
                            value={ payrollRegularMntStore.query } 
                            onChange={ e => payrollRegularMntStore.handleSearch(e) }   
                            style={{ maxWidth:'40%' }}  
                        />
                        <table className="table table-sm table-hover mt-3">
                            <thead>
                                <tr>
                                    <th className="align-middle">Changes</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { payrollRegularMntStore.list.map((val, key) => { 
                                    return (
                                        <tr key={key} className={ val.id == payrollRegularMntStore.payroll_regular_mnt_id ? "table-info" : "" }>
                                            { val.category === 1 || val.category === 2 || val.category === 3 ? 
                                                <>
                                                    <td className="align-middle">
                                                        { val.payroll_regular_data?.employee_no +" - "+ val.payroll_regular_data?.fullname}
                                                        <p className="m-0 p-0">{ tableRowChanges(val.category, val.field, val.mod_value) }</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <a href="" onClick={ e => handleOpenEditPayrollRegularMntModal(e, val.id) }>
                                                            <i className="feather icon-edit f-w-1000 f-18 m-r-15 text-c-blue"></i>
                                                        </a>
                                                        <a href="" onClick={ e => handleOpenDeletePayrollRegularMntModal(e, val.id) }>
                                                            <i className="feather icon-trash-2 f-w-1000 f-18 text-c-red"></i>
                                                        </a>
                                                    </td>
                                                </> : <></>
                                            }

                                            { val.category == 4 ?
                                                <>
                                                    <td className="align-middle">
                                                        { val.payroll_regular_data?.employee_no +" - "+ val.payroll_regular_data?.fullname}
                                                        <p className="m-0 p-0 text-success">{ val.field_description }</p>
                                                    </td>
                                                    <td className="align-middle"></td>
                                                </> : <></>
                                            }

                                            { val.category == 5 ?
                                                <>
                                                    <td className="align-middle">
                                                        { val.payroll_regular_data?.employee_no +" - "+ val.payroll_regular_data?.fullname}
                                                        <p className="m-0 p-0 text-danger">{ val.field_description }</p>
                                                    </td>
                                                    <td className="align-middle"></td>
                                                </> : <></>
                                            }

                                        </tr>
                                    ) 
                                }) }
                                { payrollRegularMntStore.list.length == 0 ?
                                    <tr>
                                        <td className="align-middle">No Data Encoded!</td>
                                    </tr> : <></>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Create Maintenance */}
        <div className="modal" id="payroll-regular-mnt-create-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Add Maintenance</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <PayrollRegularFormMntComp 
                            payrollRegularDataStore={payrollRegularDataStore}
                            payrollRegularMntStore={payrollRegularMntStore}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleCreatePayrollRegularMnt }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Edit Maintenance */}
        <div className="modal" id="payroll-regular-mnt-edit-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Maintenance</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <PayrollRegularFormMntComp 
                            payrollRegularDataStore={payrollRegularDataStore}
                            payrollRegularMntStore={payrollRegularMntStore}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleUpdatePayrollRegularMnt }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
                                                                    
        {/* Delete Maintenance */}
        <div className="modal" id="payroll-regular-mnt-delete-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Maintenance</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure you want to permanently delete this record?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeletePayrollRegularMnt }>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Print Maintenance */}
        <div style={{ display: "none" }}>
            <PayrollRegularMntReport 
                ref={componentRef} 
                payrollRegularStore={payrollRegularStore} 
                payrollRegularMntStore={payrollRegularMntStore}    
            />
        </div>
                
    </>
    );

    
});


export default PayrollRegularMntDetails