require('../../config')

import React from "react"
import {Link} from "react-router-dom"


const NotFoundPage = () => {

    return (

    <div className="pcoded-content">
        <div id="pcoded" className="pcoded">
            <div className="pcoded-overlay-box"></div>
            <section className="login-block offline-404">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card auth-box z-depth-0">
                                <div className="card-block text-center">
                                    <h1 className="text-warning">404</h1> 
                                    <h2 className="m-b-15 text-muted">Oops! Page not found!</h2>
                                    <Link to="/" className="btn btn-inverse m-t-30">Back to Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

    )

}

export default NotFoundPage