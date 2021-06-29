
import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Link, useHistory } from 'react-router-dom'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { InputTextInline, SelectMultiInline } from '../Utils/Forms/InlineInputs'



const UserCreate = observer(({ userStore }) => {
    
    const history = useHistory();
    const [page_loader, SetPageLoader] = useState(false);


    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            userStore.setRouteOptions()
        }
        return () => {
            is_mounted = false;
        } 
    },[])


    const redirectBackToUserList = useCallback(() => {
        history.push('/users'), [history]
    });


    const handleUserRouteMultiSelectChange = (values) => {
        userStore.setUserRoutes(values)
    }
    

    const handleUserSubrouteMultiSelectChange = (values) => {
        userStore.setUserSubroutes(values)
    }


    const handleResetForm = (e) =>{
        e.preventDefault()
        userStore.resetForm()
    }


    const handleCreate = (e, is_save_another) => {
        e.preventDefault()
        SetPageLoader(true)
        if(userStore.password != userStore.password_confirm){
            userStore.setErrorFields({ password : "Password doesn't match!" })
            SetPageLoader(false)
        }else{
            axios.post('api/user/', { 
                first_name : userStore.first_name,
                last_name : userStore.last_name,
                email : userStore.email,
                username : userStore.username, 
                password : userStore.password, 
                user_routes : userStore.user_routes,
                user_subroutes : userStore.user_subroutes,
            }).then((response) => {
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "User Successfully Created!", type: "inverse" 
                });
                userStore.fetch();
                userStore.setSelectedUser(response.data.id);
                userStore.resetForm()
                if (is_save_another == 0){
                    redirectBackToUserList()
                }
                SetPageLoader(false);
            }).catch((error) => {
                if(error.response.status == 400){
                    let field_errors = error.response.data;
                    userStore.setErrorFields({
                        firstname: field_errors.first_name?.toString(),
                        lastname: field_errors.last_name?.toString(),
                        email: field_errors.email?.toString(),
                        username: field_errors.username?.toString(),
                        password: field_errors.password?.toString(),
                        user_routes: field_errors.user_routes?.toString(),
                        user_subroutes: field_errors.user_subroutes?.toString(),
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
                                        <h5>Create User</h5>
                                        <Link to="/users" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                    </div>

                                    <div className="card-block">

                                        <div className="row">

                                            <div className="col-sm-6">
                                                <h4 className="sub-title">User Details</h4>

                                                <InputTextInline 
                                                    type="text"
                                                    label="Firstname:"
                                                    placeholder="Firstname"
                                                    errorField={ userStore.error_fields.firstname }
                                                    value={ userStore.first_name }
                                                    setter={ e => userStore.setFirstname(e.target.value) }
                                                />

                                                <InputTextInline 
                                                    type="text"
                                                    label="Lastname:"
                                                    placeholder="Lastname"
                                                    errorField={ userStore.error_fields.lastname }
                                                    value={ userStore.last_name }
                                                    setter={ e => userStore.setLastname(e.target.value) }
                                                />

                                                <InputTextInline 
                                                    type="text"
                                                    label="Email:"
                                                    placeholder="Email"
                                                    errorField={ userStore.error_fields.email }
                                                    value={ userStore.email }
                                                    setter={ e => userStore.setEmail(e.target.value) }
                                                />

                                                <InputTextInline 
                                                    type="text"
                                                    label="Username:"
                                                    placeholder="Username"
                                                    errorField={ userStore.error_fields.username }
                                                    value={ userStore.username }
                                                    setter={ e => userStore.setUsername(e.target.value) }
                                                />

                                                <InputTextInline 
                                                    secureTextEntry
                                                    type="password"
                                                    label="Password:"
                                                    placeholder="Password"
                                                    errorField={ userStore.error_fields.password }
                                                    value={ userStore.password }
                                                    setter={ e => userStore.setPassword(e.target.value) }
                                                />

                                                <InputTextInline 
                                                    type="password"
                                                    label="Confirm Password:"
                                                    placeholder="Confirm Password"
                                                    errorField={ userStore.error_fields.password_confirm }
                                                    value={ userStore.password_confirm }
                                                    setter={ e => userStore.setPasswordConfirm(e.target.value) }
                                                />

                                            </div>

                                            <div className="col-sm-6">
                                                <h4 className="sub-title">User Modules and Module Permissions</h4>

                                                <SelectMultiInline 
                                                    label="Modules:"
                                                    name="user_routes"
                                                    value={userStore.user_routes}
                                                    errorField={ userStore.error_fields.user_routes }
                                                    options={userStore.route_options}
                                                    onChange={handleUserRouteMultiSelectChange}
                                                    closeMenuOnSelect={false}
                                                    defaultMenuIsOpen={false}

                                                />

                                                <SelectMultiInline 
                                                    label="Permissions:"
                                                    name="user_subroutes"
                                                    value={userStore.user_subroutes}
                                                    errorField={ userStore.error_fields.user_subroutes }
                                                    options={userStore.subroute_options}
                                                    onChange={handleUserSubrouteMultiSelectChange}
                                                    closeMenuOnSelect={false}
                                                    defaultMenuIsOpen={false}
                                                />

                                            </div>

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


export default UserCreate