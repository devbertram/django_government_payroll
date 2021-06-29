
import React, { useState } from "react";

import eventBus from "../Utils/EventBus";
import { InputTextInline } from "../Utils/Forms/InlineInputs";

function ProfilePasswordForm(props){ 
    
    const [current_password, setCurrentPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [re_new_password, setReNewPassword] = useState("");
    const [error_fields, setErrorFields] = useState({ 
        current_password: "", 
        new_password: "", 
        re_new_password: "", 
        non_field_errors: "" 
    });
    
    
    const handleSubmit = (event) => {
        event.preventDefault()
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true })
        axios.post('auth/users/set_password/', {
                current_password: current_password,
                new_password: new_password,
                re_new_password: re_new_password,
            })
            .then((response) => {
                if (response.status == 204) {
                    setCurrentPassword("")
                    setNewPassword("")
                    setReNewPassword("")
                    setErrorFields({})
                    logoutUser()
                }
            })
            .catch((error) => {
                setErrorFields({
                    current_password : error.response.data.current_password?.toString(),
                    new_password : error.response.data.new_password?.toString(),
                    re_new_password : error.response.data.re_new_password?.toString(),
                    non_field_errors : error.response.data.non_field_errors?.toString()
                })
                eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: false })
            });
    }


    const logoutUser = () => {
        axios.post('logout/')
            .then((response) => {
                if (response.status == 200) {
                    localStorage.clear()
                    location.replace(window.location.origin + '/set_password_logout')
                    eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true });
                }
            });
    }


    return (

    <div className="card">
        <div className="card-header">
            <h5>Change Password</h5>
        </div>
        <div className="card-block">
            <div className="alert alert-warning background-warning">
                <strong><i className="fa fa-warning"></i>  Warning!</strong> You will be ask to login again after you change your password.
            </div>

            <form onSubmit={handleSubmit}>

                <InputTextInline 
                    type="password"
                    label="Current Password:"
                    placeholder="Current Password"
                    errorField={ error_fields.current_password }
                    value={ current_password }
                    setter={ e => setCurrentPassword(e.target.value) }
                />

                <InputTextInline 
                    type="password"
                    label="New Password:"
                    placeholder="New Password"
                    errorField={ error_fields.new_password }
                    value={ new_password }
                    setter={ e => setNewPassword(e.target.value) }
                />

                <InputTextInline 
                    type="password"
                    label="Retype New Password:"
                    placeholder="Retype New Password"
                    errorField={ error_fields.re_new_password }
                    value={ re_new_password }
                    setter={ e => setReNewPassword(e.target.value) }
                />

                <div className="form-group row">
                    <label className="col-sm-2"></label>
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary m-b-0">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
        
    );
}

export default ProfilePasswordForm;