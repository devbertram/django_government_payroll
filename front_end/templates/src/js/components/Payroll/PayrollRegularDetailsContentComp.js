
import React, { useCallback, useRef } from 'react'
import { observer } from 'mobx-react'
import { useReactToPrint } from 'react-to-print';
import { useHistory, useParams } from "react-router-dom"

import { TableFooterDefault } from '../Utils/Table/TableFooters'
import { SelectInput } from '../Utils/Forms/DefaultInputs'
import PayrollRegularContentShow from './PayrollRegularDetailsContentShowComp'
import { PayrollRegularDataReport } from './printables/PayrollRegularDataReport';



const PayrollRegularContentDetails = observer(({ payrollRegularStore, payrollRegularDataStore, payrollRegularMntStore }) => {

    const history = useHistory();
    const componentRef = useRef();
    const { payroll_regular_id } = useParams();

    const printContent = useReactToPrint({
        content: () => componentRef.current,
        removeAfterPrint: true,
    });

    const redirectToPayrollRegularCreate = useCallback(() => {
        history.push('/payroll/payroll_regular/'+ payroll_regular_id +'/create'), [history]
    });

    const handleCreatePayrollRegularRedirect = (e) => {
        e.preventDefault()
        payrollRegularDataStore.resetForm()
        redirectToPayrollRegularCreate()
    }
    
    const handleClickContentDetails = (e, id) => {
        e.preventDefault()
        payrollRegularDataStore.setSelectedData(id)
        payrollRegularDataStore.retrieve(id)
        $("#payroll-regular-content-details").modal('toggle')
    }

    const handleOpenContentPrintModal = (e) => {
        e.preventDefault()
        $('#payroll-regular-content-print-modal').modal('toggle')
    }

    const handleContentPrint = (e) => {
        e.preventDefault()
        let filtered_list = [];
        filtered_list = payrollRegularDataStore.list_all.filter(data => {
            return data.paygroup==payrollRegularDataStore.print_form_data.paygroup?.value;
        })
        payrollRegularDataStore.setFilteredListAll(filtered_list)
        setTimeout(function(){
            printContent()
        }, 3000) 
    }

    return (
    <>
        <div className="col-md-7">
            <div className="card z-depth-0">
                <div className="card-header">
                    <h5>Content</h5>
                    <div className="float-right">
                        <button onClick={ handleCreatePayrollRegularRedirect }
                                className="btn btn-sm btn-success btn-outline-success icon-btn float-right">
                            <i className="icofont icofont-plus"></i>
                        </button>
                        <button onClick={ handleOpenContentPrintModal }
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
                            value={ payrollRegularDataStore.query } 
                            onChange={ e => payrollRegularDataStore.handleSearch(e) } 
                            style={{ maxWidth:'40%' }}    
                        />
                        <table className="table table-sm table-hover mt-3">
                            <thead>
                                <tr>
                                    <th className="align-middle">Employee</th>
                                    <th className="align-middle">Position</th>
                                    <th className="align-middle"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { payrollRegularDataStore.list.map((val, key) => { 
                                    return (
                                        <tr key={key} className={ val.id == payrollRegularDataStore.selected_data ? "table-info" : "" }>
                                            <td className="align-middle">
                                                { val.is_removed == true ? 
                                                    <del>{ val.employee_no } - { val.fullname }</del> :
                                                    <>{ val.employee_no } - { val.fullname }</>
                                                }
                                                { val.is_new == true ?
                                                    <label class="label label-success ml-3">new</label> : <></>
                                                }
                                            </td>
                                            <td className="align-middle">
                                                { val.is_removed == true ? 
                                                    <del>{ val.position }</del> :
                                                    <>{ val.position }</>
                                                }
                                            </td>
                                            <td className="align-middle">
                                                <a href="#" onClick={ e => handleClickContentDetails(e, val.id) }>
                                                    <ins className="text-info">View Details</ins>
                                                </a>
                                            </td>
                                        </tr>
                                    ) 
                                }) }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer">
                    <TableFooterDefault
                        counterPageSize={ payrollRegularDataStore.page_size }
                        counterPageCurrent={ payrollRegularDataStore.page_current }
                        counterPageLimit={ payrollRegularDataStore.page_limit }
                        counterTotalRecords={ payrollRegularDataStore.total_records }
                        paginationPagePrev={ payrollRegularDataStore.page_prev }
                        paginationPageNext={ payrollRegularDataStore.page_next }
                        paginationPageLimit={ payrollRegularDataStore.page_limit }
                        paginationPrevClickHandler={ (e) => payrollRegularDataStore.handlePaginationClick(e, payrollRegularDataStore.page_prev) }
                        paginationNextClickHandler={ (e) => payrollRegularDataStore.handlePaginationClick(e, payrollRegularDataStore.page_next) }  
                    />
                </div>
            </div>
        </div>


        {/* Show Modal */}                        
        <PayrollRegularContentShow 
            payrollRegularDataStore={payrollRegularDataStore} 
            payrollRegularMntStore={payrollRegularMntStore}    
        />


        {/* Print Modal */}
        <div className="modal" id="payroll-regular-content-print-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Print Payroll</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <SelectInput
                            col="col-md-6 p-0 m-0"
                            name="paygroup"
                            label="Paygroup:"
                            value={ payrollRegularDataStore.print_form_data?.paygroup }
                            isDisabled={ false }
                            options={ payrollRegularMntStore.PAYGROUP_PRINT_OPTIONS }
                            onChange={ (value) => payrollRegularDataStore.setPrintFormData(value, 'paygroup') }
                            errorField={ payrollRegularDataStore.print_error_fields?.paygroup }
                        />                 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-success waves-effect waves-light" onClick={handleContentPrint}>
                            Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        
        {/* Print Content */}
        <div style={{ display: "none" }}>
            <PayrollRegularDataReport 
                ref={componentRef} 
                payrollRegularStore={payrollRegularStore}
                payrollRegularDataStore={payrollRegularDataStore}
                payrollRegularMntStore={payrollRegularMntStore}    
            />
        </div>

    </>
    );

    
});


export default PayrollRegularContentDetails