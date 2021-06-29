

import React, { useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'

import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'
import MenuListBulkDeleteModal from './MenuListBulkDeleteModalComp'
import MenuListSortModal from './MenuListSortModalComp'


const MenuList = observer(({ menuStore, dashboardMainStore }) => {

    const history = useHistory();

    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            menuStore.fetch()
        }
        return () => {
            is_mounted = false
        } 
    },[])


    const redirectToMenuCreate = useCallback(() => {
        if(menuStore.is_opened_form === 1){
            menuStore.resetForm()
        }
        menuStore.setIsOpenedForm(0)
        history.push('menus/create'), [history]
    });


    const redirectToMenuDetails = useCallback((id) => {
        menuStore.setIsOpenedForm(1)
        history.push('menus/' + id), [history]
    });


    const handleSortClick = (e, id) => {
        e.preventDefault()
        $("#menu-sort-modal").modal('toggle')
    }


    const handleOpenMenuDetails = (e, id) => {
        e.preventDefault()
        redirectToMenuDetails(id)
    }

    
    const handleOpenBulkDeleteModal = (e) => {
        e.preventDefault()
        $("#route-bulk-delete-modal").modal('toggle')
    }


    const tableRowIsChecked = (id) => {
        return menuStore.selected_rows.some(data => {
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
                            <h5>Menus</h5>
                            <span>Manage Menus and Permissions</span>
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
                                Menus
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
                            <div className="col-md-12">
                                <div className="card table-card z-depth-0">

                                    {/* Table Header */}
                                    <div className="card-header p-b-0"> 
                                        <TableHeaderDefault
                                            createButtonClickHandler={ redirectToMenuCreate }
                                            searchInputValue={ menuStore.query }
                                            searchInputHandler={ (e) => menuStore.handleSearch(e) }
                                            sortButton={ true }
                                            sortButtonClickHandler={ handleSortClick }
                                            refreshButtonClickHandler={ (e) => menuStore.handleRefreshClick(e) }
                                            createButton={ dashboardMainStore.checkIfSubrouteExist('menu-create-page') }
                                            deleteButton={ dashboardMainStore.checkIfSubrouteExist('menu-delete') }
                                            deleteButtonDisable= { menuStore.selected_rows.some(data => data.status === true) }
                                            deleteButtonClickHandler={ (e) => handleOpenBulkDeleteModal(e) }
                                            entriesSelect={true}
                                            entriesSelectPageSize={ menuStore.page_size }
                                            entriesSelectChangeHandler={ (e) => menuStore.handlePageSizeClick(e) }
                                            paginationPagePrev={ menuStore.page_prev }
                                            paginationPageNext={ menuStore.page_next }
                                            paginationPageLimit={ menuStore.page_limit }
                                            paginationPrevClickHandler={ (e) => menuStore.handlePaginationClick(e, menuStore.page_prev) }
                                            paginationNextClickHandler={ (e) => menuStore.handlePaginationClick(e, menuStore.page_next) }
                                        />  
                                    </div>
                                    

                                    {/* TABLE BODY */}
                                    <div className="card-block table-border-style pb-0 pt-0">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover">
                                                <thead>
                                                    <tr>
                                                        { dashboardMainStore.checkIfSubrouteExist('menu-delete') ? 
                                                            <th className="p-0">
                                                                <div className="checkbox-fade fade-in-primary ml-3 mt-3">
                                                                    <label>
                                                                        <input type="checkbox" 
                                                                            checked={ menuStore.is_selected_all_rows } 
                                                                            onChange={ e => menuStore.setIsSelectedAllRows(e.target.checked) }/>
                                                                        <span className="cr">
                                                                            <i className="cr-icon icofont icofont-ui-check txt-primary"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </th> : <></>
                                                        }
                                                        <th className="align-middle">Name</th>
                                                        <th className="align-middle">Category</th>
                                                        <th className="align-middle">Is Side Nav.</th>
                                                        <th className="align-middle">Is Side Nav. Dropdown</th>
                                                        <th className="align-middle">Side Nav. Name</th>
                                                        <th className="align-middle">Side Nav. Icon</th>
                                                        <th className="align-middle">Url</th>
                                                        <th className="align-middle">Url Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { menuStore.list.map((val, key) => {
                                                    return (
                                                        <tr key={key} className={ val.id == menuStore.selected_route || tableRowIsChecked(val.id) ? "table-info" : "" }>
                                                            { dashboardMainStore.checkIfSubrouteExist('menu-delete') ? 
                                                                <td className="p-0">
                                                                    <div className="checkbox-fade fade-in-primary ml-3 mt-3">
                                                                        <label>
                                                                            <input key={key}
                                                                                type="checkbox"
                                                                                checked={ tableRowIsChecked(val.id) }
                                                                                onChange={ e => menuStore.setSelectedRowObject(e.target.checked, val.id) }/>
                                                                            <span className="cr">
                                                                                <i className="cr-icon icofont icofont-ui-check txt-primary"></i>
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </td> : <></>
                                                            }
                                                            <th scope="row" className="align-middle">
                                                                <a href="#" onClick={ (e) => handleOpenMenuDetails(e, val.id) }>
                                                                    <ins className="text-info">{ val.name }</ins>
                                                                </a>
                                                            </th>
                                                            <td className="align-middle">{ val.category }</td>
                                                            <td className="align-middle">
                                                                { val.is_menu == true ? 
                                                                    <label className="label label-success">Yes</label> 
                                                                    : <label className="label label-danger">No</label> 
                                                                }
                                                            </td>
                                                            <td className="align-middle">
                                                                { val.is_dropdown == true ? 
                                                                    <label className="label label-success">Yes</label> 
                                                                    : <label className="label label-danger">No</label> 
                                                                }
                                                            </td>
                                                            <td className="align-middle">{ val.nav_name }</td>
                                                            <td className="align-middle"><i className={ val.icon }></i></td>
                                                            <td className="align-middle">{ val.url }</td>
                                                            <td className="align-middle">{ val.url_name }</td>
                                                            
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
                                            counterPageSize={ menuStore.page_size }
                                            counterPageCurrent={ menuStore.page_current }
                                            counterPageLimit={ menuStore.page_limit }
                                            counterTotalRecords={ menuStore.total_records }
                                            paginationPagePrev={ menuStore.page_prev }
                                            paginationPageNext={ menuStore.page_next }
                                            paginationPageLimit={ menuStore.page_limit }
                                            paginationPrevClickHandler={ (e) => menuStore.handlePaginationClick(e, menuStore.page_prev) }
                                            paginationNextClickHandler={ (e) => menuStore.handlePaginationClick(e, menuStore.page_next) }  
                                        />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* BULK DELETE MODAL */}
        { dashboardMainStore.checkIfSubrouteExist('menu-delete') ? 
            <MenuListBulkDeleteModal menuStore={menuStore} /> : <></>
        }

        {/* SORT MODAL */}
        <MenuListSortModal menuStore={menuStore} />

    </div>

    );
    
});


export default MenuList