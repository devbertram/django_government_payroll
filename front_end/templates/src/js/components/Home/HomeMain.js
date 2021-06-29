require('../../config')

import React from "react"


const HomeMain = () => {

    return (

    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Welcome User!</h5>
                            <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="page-header-breadcrumb">
                        <ul className=" breadcrumb breadcrumb-title">
                            <li className="breadcrumb-item">
                                <a href="#"><i className="feather icon-home"></i></a>
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
                                        <h5>Hello card</h5>
                                        <div className="card-header-right">
                                            <ul className="list-unstyled card-option">
                                                <li className="first-opt"><i
                                                        className="feather icon-chevron-left open-card-option"></i>
                                                </li>
                                                <li><i className="feather icon-maximize full-card"></i></li>
                                                <li><i className="feather icon-minus minimize-card"></i>
                                                </li>
                                                <li><i className="feather icon-refresh-cw reload-card"></i>
                                                </li>
                                                <li><i className="feather icon-trash close-card"></i></li>
                                                <li><i
                                                        className="feather icon-chevron-left open-card-option"></i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-block">
                                        <p>
                                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor
                                            in reprehenderit in voluptate velit esse cillum dolore eu
                                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident, sunt in culpa qui officia deserunt mollit anim id
                                            est laborum."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )

}

export default HomeMain