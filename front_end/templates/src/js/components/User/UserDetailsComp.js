

import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment'
import { observer } from 'mobx-react';
import { Link, useParams, useHistory} from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'



const UserDetails = observer(({ userStore, dashboardMainStore }) => {

    const history = useHistory();
    const { user_id } = useParams();
    const [ page_loader, SetPageLoader ] = useState(false);

    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            userStore.retrieve(user_id)
            userStore.setIsOpenedForm(1)
        }
        return () => { is_mounted = false; } 
    },[])


    const redirectBackToUserList = useCallback(() => {
        history.push('/users'), [history]
    });


    const handleDeleteRouteModal = (e) => {
        e.preventDefault()
        $("#user-delete-modal").modal('toggle')
    }


    const handleDeleteUserSubmit = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        axios.delete('api/user/'+user_id+'/')
             .then((response) => {
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "User has been successfully Deleted!", type: "inverse"
                });
                redirectBackToUserList()
                SetPageLoader(false)
             }).catch((error) => {
                if(error.response.status == 404 || error.response.status == 500){
                    eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                        message: "Error Occured!", type: "danger" 
                    });
                }
                SetPageLoader(false)
            });
        $("#user-delete-modal").modal('hide');
    }


    return (
        
    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Users</h5>
                            <span>Manage Users</span>
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
                                <Link to="/users">Users</Link>
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
                                <div className="card z-depth-0">
                                    <DivLoader type="Circles" loading={page_loader}/>
                                    <div className="card-header">
                                        <h5>User Details</h5>
                                        <Link to="/users" 
                                              className="btn btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                        { dashboardMainStore.checkIfSubrouteExist('user-edit-page') ?
                                            <Link to={`/users/${user_id}/edit`} 
                                                className="btn btn-md btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                                                <i className="fa fa-pencil-square-o"></i> Edit
                                            </Link> : <></> }
                                        { dashboardMainStore.checkIfSubrouteExist('user-reset-password-page') ? 
                                            <Link to={`/users/${user_id}/reset_password`} 
                                                className="btn btn-md btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                                                <i className="fa fa-key"></i> Reset Password
                                            </Link> : <></> }
                                        { dashboardMainStore.checkIfSubrouteExist('user-delete') ? 
                                            <button className="btn btn-md btn-danger btn-outline-danger float-right pt-2 pb-2" 
                                                    onClick={ handleDeleteRouteModal }>
                                                <i className="fa fa-trash"></i> Delete
                                            </button> : <></> }
                                    </div>
                                    <div className="card-block">
                                        {/* Menu */}
                                        <div className="row">
                                            <div className="col-md-2">
                                                <p>Username:</p>
                                                <p>Firstname:</p>
                                                <p>Lastname:</p>
                                                <p>Email Address:</p>
                                                <p>Active Status:</p>
                                                <p>Date Joined:</p>
                                                <p>Last Login:</p>
                                                <p>Modules:</p>
                                                <p>Module Permissions:</p>
                                            </div> 
                                            <div className="col-md-10">
                                                <p>{ userStore.username }{'\u00A0'}</p>
                                                <p>{ userStore.first_name }{'\u00A0'}</p>
                                                <p>{ userStore.last_name }{'\u00A0'}</p>
                                                <p>{ userStore.email }{'\u00A0'}</p>
                                                <p>
                                                    { userStore.is_active === true ? 
                                                        <label className="label label-success">Active</label> :
                                                        <label className="label label-danger">Inactive</label>
                                                    }{'\u00A0'}
                                                </p>
                                                <p>{ moment(userStore.date_joined).format("MM/DD/YYYY hh:mm A") }{'\u00A0'}</p>
                                                <p>{ moment(userStore.last_login).format("MM/DD/YYYY hh:mm A") }{'\u00A0'}</p>
                                                <p>
                                                    { userStore.user_routes.map(
                                                        data => <label key={data.value} className="label label-primary">{data.label}</label>
                                                    )}{'\u00A0'}
                                                </p>
                                                <p>
                                                    { userStore.user_subroutes.map(
                                                        data => <label key={data.value} className="label label-warning">{data.label}</label>
                                                    )}{'\u00A0'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                                                    
                            {/* DELETE MODAL */}
                            <div className="modal" id="user-delete-modal" role="dialog">
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
                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeleteUserSubmit }>Delete</button>
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


export default UserDetails