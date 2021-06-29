require('../../config')

import { Link } from "react-router-dom"
import { observer } from 'mobx-react'

import ProfileUsernameForm from "./ProfileUsernameFormComp";
import ProfilePasswordForm from "./ProfilePasswordFormComp";


const ProfileMain = observer(({ dashboardMainStore }) => {

    return (
    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>User Profile</h5>
                            <span>Manage your Account</span>
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
                                User Profile
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
                                <div className="card">
                                    <div className="card-header">
                                        <h5>User Info</h5>
                                    </div>
                                    <div className="card-block">
                                        <p className="lead m-t-0">
                                            Name : { dashboardMainStore.current_user.fullname ? dashboardMainStore.current_user.fullname : "N/A"  }
                                        </p>
                                        <p className="lead m-t-0">
                                            Username : { dashboardMainStore.current_user.username }
                                        </p>
                                        <p className="lead m-t-0">
                                            Email : { dashboardMainStore.current_user.email ? dashboardMainStore.current_user.email : "N/A" }
                                        </p>
                                    </div>
                                </div>
                                <ProfileUsernameForm/>
                                <ProfilePasswordForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

})

export default ProfileMain