

import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'
import { Link, useHistory } from "react-router-dom"
import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'
import eventBus from '../Utils/EventBus'


const PayrollRegularList = observer(({ payrollRegularStore, dashboardMainStore }) => {

    const history = useHistory();
    const [is_create_generate, SetIsCreateGenerate] = useState(true);


    useEffect(()=>{
        let is_mounted = true;
        if(is_mounted = true){
            payrollRegularStore.fetch()
        }
        return () => { is_mounted = false; } 
    }, [])


    const redirectToPayrollRegularDetails = useCallback((id) => {
        payrollRegularStore.setIsOpenedForm(1)
        history.push('/payroll/payroll_regular/' + id), [history]
    });

    const handleOpenPayrollRegularDetails = (e, id) => {
        e.preventDefault()
        redirectToPayrollRegularDetails(id)
    }


    const handleCreateButtonClick = (e) => {
        e.preventDefault();
        $('#payroll-regular-create-select-method').modal('toggle')
    }


    const handleCreateSelectMethodSubmit = (e) => {
        e.preventDefault()
        console.log(is_create_generate)
        $('#payroll-regular-create-select-method').modal('hide')
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", {
             is_loading: true, 
             is_dashboard: true,
             content: <p style={{ marginLeft:-15 }}>Generating Payroll ... </p>
        })
        if(is_create_generate == true){
            axios.post('api/payroll_regular/create_generate_from_last/')
            .then((response) => {
                eventBus.dispatch("SHOW_FULLPAGE_LOADER", { 
                    is_loading: false, is_dashboard: true 
                })
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Payroll Successfully Generated!!", type: "inverse" 
                })
                redirectToPayrollRegularDetails(response.data.id)
            }).catch((error) => {
                if(error.response.status == 404 || error.response.status == 500){
                    eventBus.dispatch("SHOW_TOAST_NOTIFICATION", { 
                        message: "Error Occured!", type: "danger" 
                    })
                    eventBus.dispatch("SHOW_FULLPAGE_LOADER", { 
                        is_loading: false, is_dashboard: true 
                    })
                }
            });
        }else{
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Invalid Method!", type: "danger" 
            })
            eventBus.dispatch("SHOW_FULLPAGE_LOADER", { 
                is_loading: false, is_dashboard: true 
            })
        }
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
                            <span>Manage / Generate Regular Monthly Payroll.</span>
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
                                Payroll Regular
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

                                    {/* Table Header */}
                                    <div className="card-header"> 
                                        <TableHeaderDefault
                                            searchInputValue={ payrollRegularStore.query }
                                            searchInputHandler={ e => payrollRegularStore.handleSearch(e ) }
                                            refreshButtonClickHandler={ (e) => payrollRegularStore.handleRefreshClick(e) }
                                            filterButton={false}
                                            sortButton={false}
                                            deleteButton={false}
                                            createButton={ dashboardMainStore.checkIfSubrouteExist('payroll-payroll_regular-create') }
                                            createButtonClickHandler={ handleCreateButtonClick }
                                            entriesSelect={true}
                                            entriesSelectPageSize={ payrollRegularStore.page_size }
                                            entriesSelectChangeHandler={ (e) => payrollRegularStore.handlePageSizeClick(e) }
                                            paginationPagePrev={ payrollRegularStore.page_prev }
                                            paginationPageNext={ payrollRegularStore.page_next }
                                            paginationPageLimit={ payrollRegularStore.page_limit }
                                            paginationPrevClickHandler={ (e) => payrollRegularStore.handlePaginationClick(e, payrollRegularStore.page_prev) }
                                            paginationNextClickHandler={ (e) => payrollRegularStore.handlePaginationClick(e, payrollRegularStore.page_next) }
                                        /> 
                                    </div>

                                    {/* TABLE BODY */}
                                    <div className="card-block table-border-style pb-0 pt-0">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="align-middle">Date</th>
                                                        <th className="align-middle">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { payrollRegularStore.list.map((val, key) => {
                                                    return (
                                                        <tr key={key} className={ val.id == payrollRegularStore.selected_data ? "table-info" : "" }>
                                                            <td className="align-middle">
                                                                <a href="#" onClick={ (e) => handleOpenPayrollRegularDetails(e, val.id) }>
                                                                    <ins className="text-info">{ moment(val.process_date).format("MMM D, YYYY") }</ins>
                                                                </a>
                                                            </td>
                                                            <td className="align-middle">{ val.description }</td>
                                                        </tr>
                                                    )
                                                }) }
                                                { payrollRegularStore.list.length == 0 ? 
                                                    <tr>
                                                        <td className="align-middle">No Data Encoded!!</td>
                                                    </tr> : <></>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Table Footer */}
                                    <div className="card-footer">
                                        <TableFooterDefault
                                            counterPageSize={ payrollRegularStore.page_size }
                                            counterPageCurrent={ payrollRegularStore.page_current }
                                            counterPageLimit={ payrollRegularStore.page_limit }
                                            counterTotalRecords={ payrollRegularStore.total_records }
                                            paginationPagePrev={ payrollRegularStore.page_prev }
                                            paginationPageNext={ payrollRegularStore.page_next }
                                            paginationPageLimit={ payrollRegularStore.page_limit }
                                            paginationPrevClickHandler={ (e) => payrollRegularStore.handlePaginationClick(e, payrollRegularStore.page_prev) }
                                            paginationNextClickHandler={ (e) => payrollRegularStore.handlePaginationClick(e, payrollRegularStore.page_next) }  
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* SELECT CREATE METHOD MODAL */}
        <div className="modal" id="payroll-regular-create-select-method" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Select method</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group row">
                                    <label className="col-sm-12 col-form-label">Method:</label>
                                    <div className="col-sm-12 form-radio">
                                        <div className="radio">
                                            <label>
                                                <input type="radio" 
                                                    value={ true } 
                                                    name="is_create_generate" 
                                                    onChange={ e => SetIsCreateGenerate(e.target.value) }
                                                    defaultChecked={ is_create_generate === true }/>
                                                <i className="helper"></i> Generate from Latest Payroll
                                            </label>
                                            <label>
                                                <input type="radio" 
                                                    value={ false } 
                                                    name="is_create_generate" 
                                                    onChange={ e => SetIsCreateGenerate(e.target.value) }
                                                    defaultChecked={ is_create_generate === false }/>
                                                <i className="helper"></i> Create Custom Payroll
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleCreateSelectMethodSubmit }>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </div>

    );
     

});


export default PayrollRegularList