

import React, { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory, useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { InputTextInline } from '../Utils/Forms/InlineInputs'



const UserResetPassword = observer(({ userStore }) => {

    const history = useHistory();
    const { user_id } = useParams();
    const [loader, SetLoader] = useState(false);
    
    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            userStore.setIsOpenedForm(1)
            userStore.retrieve(user_id)
        }
        return () => {
            is_mounted = false;
        } 
    },[])


    const redirectBackToUserList = useCallback(() => {
        history.push('/users'), [history]
    });


    const handleReset = (e, btl) => {
        e.preventDefault()
        SetLoader(true)
        axios.post('api/user/reset_password/', {
            id : user_id,
            new_password : userStore.new_password,
            new_password_confirm : userStore.new_password_confirm,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", { 
                message: "Password successfully changed!", type: "inverse"
            });
            if(btl === 1){ 
                userStore.setSelectedUser(user_id);
                redirectBackToUserList() 
            }
            userStore.resetForm()
            SetLoader(false);
        }).catch((error) => {
            if(error.response.status == 400){
                let field_errors = error.response.data;
                userStore.setErrorFields({
                    new_password: field_errors.new_password?.toString(),
                    new_password_confirm: field_errors.new_password_confirm?.toString(),
                });
            }
            if(error.response.status == 404 || error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Error Occured!", type: "danger" 
                });
            }
            SetLoader(false);
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
                                <Link to={`/users/${ user_id }`}>Details</Link>
                            </li>
                            <li className="breadcrumb-item">
                                Reset Password
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

                                    <DivLoader type="Circles" loading={loader}/>
                                    <div className="card-header">
                                        <h5>Reset Password</h5>
                                        <Link to={`/users/${user_id}`} className="btn btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                                            <i className="fa fa-arrow-left"></i> Back
                                        </Link>
                                        <Link to="/users" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                    </div>

                                    <div className="card-block">
                                        <div className="col-md-12">

                                            <InputTextInline 
                                                secureTextEntry
                                                type="password"
                                                label="New Password:"
                                                placeholder="New Password"
                                                errorField={ userStore.error_fields.new_password }
                                                value={ userStore.new_password }
                                                setter={ e => userStore.setNewPassword(e.target.value) }
                                            />

                                            <InputTextInline 
                                                type="password"
                                                label="Confirm New Password:"
                                                placeholder="Confirm New Password"
                                                errorField={ userStore.error_fields.new_password_confirm }
                                                value={ userStore.new_password_confirm }
                                                setter={ e => userStore.setNewPasswordConfirm(e.target.value) }
                                            />

                                        </div>


                                        {/* BUTTON / FOOTERS */}
                                        <div className="form-group row mt-2">
                                            <div className="col-sm-12">
                                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ (e) => handleReset(e, 0) }>
                                                    Reset
                                                </button>
                                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ (e) => handleReset(e, 1) }>
                                                    Reset and Back to List
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


export default UserResetPassword