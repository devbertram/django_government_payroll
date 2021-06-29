

import React, { useEffect, useCallback } from 'react'

import moment from 'moment'
import { observer } from 'mobx-react'
import { Link, useHistory } from "react-router-dom"

import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'
import EmployeeListFilterBadge from './EmployeeListFilterBadgeComp'
import EmployeeListFilterModal from './EmployeeListFilterModalComp'
import EmployeeListSortModal from './EmployeeListSortModalComp'
import EmployeeListBulkDeleteModal from './EmployeeListBulkDeleteModalComp'


const EmployeeList = observer(({ employeeStore, dashboardMainStore }) => {

    const history = useHistory();

    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            employeeStore.fetch()
        }
        return () => {
            is_mounted = false;
        } 
    },[])

    const redirectToEmployeeCreate = useCallback(() => {
        history.push('/employees/create'), [history]
    });

    const redirectToEmployeeDetails = useCallback((id) => {
        employeeStore.setIsOpenedForm(1)
        history.push('employees/' + id), [history]
    });

    const handleCreateButtonClick = (e) => {
        e.preventDefault()
        if(employeeStore.is_opened_form === 1){
            employeeStore.resetForm()
        }
        redirectToEmployeeCreate()
        employeeStore.setIsOpenedForm(0)
    }

    const handleOpenEmployeeDetails = (e, id) => {
        e.preventDefault()
        redirectToEmployeeDetails(id)
    }

    const handleFilterButtonClick = (e) => {
        e.preventDefault()
        $("#employee-filter-modal").modal('toggle')
    }

    const handleSortButtonClick = (e) => {
        e.preventDefault()
        $("#employee-sort-modal").modal('toggle')
    }

    const handleDeleteButtonClick = (e) => {
        e.preventDefault()
        $("#employee-bulk-delete-modal").modal('toggle')
    }

    const tableRowIsChecked = (id) => {
        return employeeStore.selected_rows.some(data => {
            return data.id === id && data.status === true;
        })
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
                                Employees
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
                                <div className="card table-card z-depth-0">


                                    {/* Table Header */}
                                    <div className="card-header"> 

                                        <TableHeaderDefault
                                            createButtonClickHandler={ handleCreateButtonClick }
                                            searchInputValue={ employeeStore.query }
                                            searchInputHandler={ (e) => employeeStore.handleSearch(e) }
                                            filterButton={true}
                                            filterButtonClickHandler={ handleFilterButtonClick }
                                            sortButton={ true }
                                            sortButtonClickHandler={ handleSortButtonClick }
                                            refreshButtonClickHandler={ (e) => employeeStore.handleRefreshClick(e) }
                                            deleteButton={ dashboardMainStore.checkIfSubrouteExist('employee-delete') }
                                            deleteButtonDisable= { employeeStore.selected_rows.some(data => data.status === true) }
                                            deleteButtonClickHandler={ handleDeleteButtonClick }
                                            createButton={dashboardMainStore.checkIfSubrouteExist('employee-create-page')}
                                            entriesSelect={true}
                                            entriesSelectPageSize={ employeeStore.page_size }
                                            entriesSelectChangeHandler={ (e) => employeeStore.handlePageSizeClick(e) }
                                            paginationPagePrev={ employeeStore.page_prev }
                                            paginationPageNext={ employeeStore.page_next }
                                            paginationPageLimit={ employeeStore.page_limit }
                                            paginationPrevClickHandler={ (e) => employeeStore.handlePaginationClick(e, employeeStore.page_prev) }
                                            paginationNextClickHandler={ (e) => employeeStore.handlePaginationClick(e, employeeStore.page_next) }
                                        /> 
                                        
                                        <EmployeeListFilterBadge employeeStore={employeeStore}/>

                                    </div>

                                    {/* TABLE BODY */}
                                    <div className="card-block table-border-style pb-0 pt-0">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover">
                                                <thead>
                                                    <tr>
                                                        { dashboardMainStore.checkIfSubrouteExist('employee-delete') ? 
                                                            <th className="p-0">
                                                                <div className="checkbox-fade fade-in-primary ml-3 mt-3">
                                                                    <label>
                                                                        <input type="checkbox" 
                                                                            checked={ employeeStore.is_selected_all_rows } 
                                                                            onChange={ e => employeeStore.setIsSelectedAllRows(e.target.checked) }/>
                                                                        <span className="cr">
                                                                            <i className="cr-icon icofont icofont-ui-check txt-primary"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </th> : <></>
                                                        }
                                                        <th className="align-middle">Employee No.</th>
                                                        <th className="align-middle">Name</th>
                                                        <th className="align-middle">Position</th>
                                                        <th className="align-middle">Status</th>
                                                        <th className="align-middle">Station</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { employeeStore.list.map((val, key) => {
                                                    return (
                                                        <tr key={key} className={ val.id == employeeStore.selected_employee || tableRowIsChecked(val.id) ? "table-info" : "" }>
                                                            { dashboardMainStore.checkIfSubrouteExist('employee-delete') ? 
                                                                <td className="p-0">
                                                                    <div className="checkbox-fade fade-in-primary ml-3 mt-3">
                                                                        <label>
                                                                            <input key={key}
                                                                                type="checkbox"
                                                                                checked={ tableRowIsChecked(val.id) }
                                                                                onChange={ e => employeeStore.setSelectedRowObject(e.target.checked, val.id) }/>
                                                                            <span className="cr">
                                                                                <i className="cr-icon icofont icofont-ui-check txt-primary"></i>
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </td> : <></>
                                                            }
                                                            <td className="align-middle">
                                                                <a href="#" onClick={ (e) => handleOpenEmployeeDetails(e, val.id) }>
                                                                    <ins className="text-info">{ val.employee_id }</ins>
                                                                </a>
                                                            </td>
                                                            <td className="align-middle">{ val.fullname }</td>
                                                            <td className="align-middle">{ val.position }</td>
                                                            <td className="align-middle">
                                                                { val.is_active == true ? 
                                                                    <label className="label label-success">active</label> 
                                                                    : <label className="label label-danger">inactive</label> 
                                                                }
                                                            </td>
                                                            <td className="align-middle">{ val.station_link?.name }</td>
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
                                            counterPageSize={ employeeStore.page_size }
                                            counterPageCurrent={ employeeStore.page_current }
                                            counterPageLimit={ employeeStore.page_limit }
                                            counterTotalRecords={ employeeStore.total_records }
                                            paginationPagePrev={ employeeStore.page_prev }
                                            paginationPageNext={ employeeStore.page_next }
                                            paginationPageLimit={ employeeStore.page_limit }
                                            paginationPrevClickHandler={ (e) => employeeStore.handlePaginationClick(e, employeeStore.page_prev) }
                                            paginationNextClickHandler={ (e) => employeeStore.handlePaginationClick(e, employeeStore.page_next) }  
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Filter Modal */}
        <EmployeeListFilterModal employeeStore={ employeeStore } />
        
        {/* Sort Modal */}
        <EmployeeListSortModal employeeStore={ employeeStore } />

        {/* Bulk Delete Modal */}
        { dashboardMainStore.checkIfSubrouteExist('employee-delete') ? <EmployeeListBulkDeleteModal employeeStore={ employeeStore } /> : <></> }

    </div>
    );
    

});


export default EmployeeList