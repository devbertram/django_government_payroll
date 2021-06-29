
require('../../config');

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import eventBus from "../Utils/EventBus";


function LoginFormMain(props){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error_fields, setErrorFields] = useState({ username: "", password: "", non_field_errors: "" });


    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            window.localStorage.clear()
        }
        return () => {
            is_mounted = false;
        } 
    }, []);
  

    const handleSubmit = (event) => {
        event.preventDefault()
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: false })
        axios.post('auth/token/login/', {
                username: username,
                password: password,
            })
            .then((response) => {
                const auth_user = {};
                if (response.status == 200) {
                    auth_user.token = response.data.auth_token
                    window.localStorage.setItem('auth_user', JSON.stringify(auth_user))
                    eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: false })
                    location.replace(window.location.origin + '/dashboard')
                }
            })
            .catch((error) => {
                setErrorFields({
                    username : error.response.data.username?.toString(),
                    password : error.response.data.password?.toString(),
                    non_field_errors : error.response.data.non_field_errors?.toString()
                })
                eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: false })
            });
    }


    return (

        <form className="md-float-material form-material" onSubmit={handleSubmit}>

            <div className="auth-box card">
                <div className="card-block">

                    <div className="row m-b-20">
                        <div className="col-md-12">
                            <h3 className="text-center txt-primary">Sign in</h3>
                        </div>
                    </div>

                    <p className="text-muted text-center p-b-5">Sign in with your regular account</p>

                    <div className={ error_fields.username || error_fields.non_field_errors ? "form-group form-danger has-danger" : "form-group form-primary"}>
                        <input type="text" className="form-control" value={username} onChange={ e => setUsername(e.target.value)}/>
                        <span className="form-bar"></span>
                        <label className="float-label">Username</label>
                        <div className="col-form-label">
                            { error_fields.username ? error_fields.username : ""}
                            { error_fields.non_field_errors ? error_fields.non_field_errors : ""}
                        </div>
                    </div>

                    <div className={ error_fields.password? "form-group form-danger has-danger" : "form-group form-primary"}>
                        <input type="password" className="form-control" value={password} onChange={ e => setPassword(e.target.value)}/>
                        <span className="form-bar"></span>
                        <label className="float-label">Password</label>
                        <div className="col-form-label">
                            { error_fields.password ? error_fields.password : ""}
                        </div>
                    </div>

                    <div className="row m-t-25 text-left">
                        <div className="col-12">
                            <div className="checkbox-fade fade-in-primary">
                                <label>
                                    <input type="checkbox" value=""/>
                                    <span className="cr"><i className="cr-icon icofont icofont-ui-check txt-primary"></i></span>
                                    <span className="text-inverse">Remember me</span>
                                    </label>
                            </div>
                        </div>
                    </div>

                    <div className="row m-t-30">
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">
                                LOGIN
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>

        </form>
        
    );
}


ReactDOM.render( <LoginFormMain/>, document.getElementById('login'));