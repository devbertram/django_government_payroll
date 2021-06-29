

import React, { useState, useEffect } from 'react'

import { observer } from 'mobx-react'
import { Link } from "react-router-dom"
import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'
import { defaultValueSetter } from '../Utils/DataFilters'
import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'

import PayrollRegularAllowanceForm from './AllowanceFormComp'


const PayrollRegularAllowanceList = observer(({ allowanceStore, dashboardMainStore }) => {

    const [page_loader, SetPageLoader] = useState(false);


    useEffect(()=>{
        let is_mounted = true;
        if(is_mounted = true){
            allowanceStore.fetch()
        }
        return () => { is_mounted = false; } 
    }, [])


    const handleCreateButtonClick = (e) => {
        e.preventDefault();
        if(allowanceStore.is_opened_form === 1){
            allowanceStore.resetForm()
        }
        allowanceStore.setIsOpenedForm(0)
        $("#allowance-create-modal").modal('toggle')
    }


    const handleCreateSubmit = (e) => {
        e.preventDefault();
        SetPageLoader(true);
        axios.post('api/allowance/', {
            code: allowanceStore.code, 
            name: allowanceStore.name, 
            description: allowanceStore.description, 
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Allowance Successfully Created!", type: "inverse" 
            });
            allowanceStore.fetch()
            allowanceStore.setSelectedAllowance(response.data.id)
            allowanceStore.resetForm()
            SetPageLoader(false);
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                allowanceStore.setErrorFields({
                    code: field_errors.code?.toString(), 
                    name: field_errors.name?.toString(), 
                    description: field_errors.description?.toString(),
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


    const handleOpenEditModal = (e, id) => {
        e.preventDefault();
        allowanceStore.resetForm()
        allowanceStore.setIsOpenedForm(1)
        allowanceStore.retrieve(id)
        $("#allowance-edit-modal").modal('toggle')
    }


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        SetPageLoader(true);
        axios.put('api/allowance/'+ allowanceStore.allowance_id +'/', {
            code: allowanceStore.code, 
            name: allowanceStore.name, 
            description: allowanceStore.description, 
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Allowance Successfully Updated!", type: "inverse" 
            });
            allowanceStore.fetch()
            allowanceStore.setSelectedAllowance(response.data.id)
            SetPageLoader(false);
            $("#allowance-edit-modal").modal('hide');
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                allowanceStore.setErrorFields({
                    code: field_errors.code?.toString(), 
                    name: field_errors.name?.toString(), 
                    description: field_errors.description?.toString(),
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


    const handleOpenDeleteModal = (e, id) => {
        e.preventDefault();
        allowanceStore.setAllowanceId(id)
        $("#allowance-delete-modal").modal('toggle')
    }


    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        SetPageLoader(true);
        axios.delete('api/allowance/'+ allowanceStore.allowance_id +'/')
        .then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Allowance Successfully Removed!", type: "inverse" 
            });
            allowanceStore.fetch()
            SetPageLoader(false);
            $("#allowance-delete-modal").modal('hide');
        }).catch((err) => {
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
                            <h5>Allowances</h5>
                            <span>Manage Allowance Parameters which are related in generating payroll.</span>
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
                                Allowances
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
                                            searchInputValue={ allowanceStore.query }
                                            searchInputHandler={ e => allowanceStore.handleSearch(e ) }
                                            refreshButtonClickHandler={ (e) => allowanceStore.handleRefreshClick(e) }
                                            filterButton={false}
                                            sortButton={false}
                                            deleteButton={false}
                                            createButton={ dashboardMainStore.checkIfSubrouteExist('payroll-allowance-create') }
                                            createButtonClickHandler={ handleCreateButtonClick }
                                            entriesSelect={true}
                                            entriesSelectPageSize={ allowanceStore.page_size }
                                            entriesSelectChangeHandler={ (e) => allowanceStore.handlePageSizeClick(e) }
                                            paginationPagePrev={ allowanceStore.page_prev }
                                            paginationPageNext={ allowanceStore.page_next }
                                            paginationPageLimit={ allowanceStore.page_limit }
                                            paginationPrevClickHandler={ (e) => allowanceStore.handlePaginationClick(e, allowanceStore.page_prev) }
                                            paginationNextClickHandler={ (e) => allowanceStore.handlePaginationClick(e, allowanceStore.page_next) }
                                        /> 
                                    </div>

                                    {/* TABLE BODY */}
                                    <div className="card-block table-border-style pb-0 pt-0">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="align-middle">Code</th>
                                                        <th className="align-middle">Name</th>
                                                        <th className="align-middle">Description</th>
                                                        <th className="align-middle">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { allowanceStore.list.map((val, key) => {
                                                return (
                                                    <tr key={key} className={ val.id == allowanceStore.selected_allowance ? "table-info" : "" }>
                                                        <td className="align-middle">{ val.code }</td>
                                                        <td className="align-middle">{ val.name }</td>
                                                        <td className="align-middle">{ val.description }</td>
                                                        <td className="align-middle">
                                                        { dashboardMainStore.checkIfSubrouteExist('payroll-allowance-edit') ? 
                                                            (
                                                                <a href="" onClick={ e => handleOpenEditModal(e, val.id) }>
                                                                    <i className="feather icon-edit f-w-1000 f-18 m-r-15 text-c-blue"></i>
                                                                </a>
                                                            ) : <></>
                                                        }
                                                        { dashboardMainStore.checkIfSubrouteExist('payroll-allowance-delete') ? 
                                                            (
                                                                <a href="" onClick={ e => handleOpenDeleteModal(e, val.id) }>
                                                                    <i className="feather icon-trash-2 f-w-1000 f-18 text-c-red"></i>
                                                                </a>
                                                            ) : <></>
                                                        }   
                                                        </td>
                                                    </tr>
                                                )
                                                }) }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Table Footer */}
                                    <div className="card-footer">
                                        <TableFooterDefault
                                            counterPageSize={ allowanceStore.page_size }
                                            counterPageCurrent={ allowanceStore.page_current }
                                            counterPageLimit={ allowanceStore.page_limit }
                                            counterTotalRecords={ allowanceStore.total_records }
                                            paginationPagePrev={ allowanceStore.page_prev }
                                            paginationPageNext={ allowanceStore.page_next }
                                            paginationPageLimit={ allowanceStore.page_limit }
                                            paginationPrevClickHandler={ (e) => allowanceStore.handlePaginationClick(e, allowanceStore.page_prev) }
                                            paginationNextClickHandler={ (e) => allowanceStore.handlePaginationClick(e, allowanceStore.page_next) }  
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* CREATE MODAL */}
        <div className="modal" id="allowance-create-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Add Allowance</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <PayrollRegularAllowanceForm allowanceStore={ allowanceStore }/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleCreateSubmit }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* EDIT MODAL */}
        <div className="modal" id="allowance-edit-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Allowance</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <PayrollRegularAllowanceForm allowanceStore={ allowanceStore }/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleUpdateSubmit }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
                                                                    
        {/* DELETE MODAL */}
        <div className="modal" id="allowance-delete-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Allowance</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure you want to permanently delete this record?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeleteSubmit }>Delete</button>
                    </div>
                </div>
            </div>
        </div>


    </div>

    );
    

});


export default PayrollRegularAllowanceList