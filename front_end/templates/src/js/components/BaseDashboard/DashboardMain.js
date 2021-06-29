require('../../config')

import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { HashRouter, Switch, Route, Link} from "react-router-dom"
import { observer } from 'mobx-react'
import eventBus from "../Utils/EventBus"

// Modules
import NotFoundPage from '../ErrorPages/NotFoundPageComp'
import SideNavMain from './SideNavMainComp'
import ProfileMain from '../Profile/ProfileMain'
import HomeMain from '../Home/HomeMain'
import UserMain from '../User/UserMain'
import MenuMain from '../Menu/MenuMain'
import EmployeeMain from '../Employee/EmployeeMain'
import PayrollMain from '../Payroll/PayrollMain'

// Stores
import dashboardMainStore from './store/DashboardMainStore'
import userStore from '../User/store/UserStore'
import menuStore from '../Menu/store/MenuStore'
import employeeStore from '../Employee/store/EmployeeStore'

const DashboardMain = observer(({ dashboardMainStore }) => {


    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            axios.get('api/user/current_user').then(response => {
                let user_routes = [];
                let user_subroutes = [];
                // Set User
                dashboardMainStore.setCurrentUser({
                    id: response.data.id,
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    fullname: response.data.fullname,
                    email: response.data.email,
                    is_active: response.data.is_active,
                    date_joined: response.data.date_joined,
                    last_login: response.data.last_login,
                })
                // Set User Routes
                if(response.data.userRoute_user){
                    response.data.userRoute_user.map(data_route => {
                        user_routes.push(data_route)
                        // Set User Suboutes
                        if(data_route.userSubroute_userRoute){
                            data_route.userSubroute_userRoute.map(data_subroute => {
                                user_subroutes.push(data_subroute)
                            })
                        }
                    })
                }
                dashboardMainStore.setCurrentUserRoutes(user_routes)
                dashboardMainStore.setCurrentUserSubroutes(user_subroutes)
            });
        }
        return () => {
            is_mounted = false;
        } 
    }, []);


    const handleLogout = (event) => {
        event.preventDefault();
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true});
        axios.post('logout/')
            .then((response) => {
                if (response.status == 200) {
                    localStorage.clear();
                    location.replace(window.location.origin + '/')
                    eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true });
                }
            });
    }


    const getProfileName = () => {
        let profile_name = "";
        if(dashboardMainStore.current_user){
            if(dashboardMainStore.current_user.first_name){
                profile_name = dashboardMainStore.current_user.first_name;
            }else{
                profile_name = dashboardMainStore.current_user.username;
            }
        }
        return profile_name;
    }

    return (
    <HashRouter>
        <div id="pcoded" className="pcoded">
            <div className="pcoded-overlay-box"></div>
            <div className="pcoded-container navbar-wrapper">
                <nav className="navbar header-navbar pcoded-header">
                    <div className="navbar-wrapper">
                        <div className="navbar-logo">
                            <Link to="/" style={{fontSize:'20px', fontWeight:'bold'}}>
                                SRA-AFD
                            </Link>
                            <a className="mobile-menu" id="mobile-collapse" href="#">
                                <i className="feather icon-menu icon-toggle-right"></i>
                            </a>
                            <a className="mobile-options waves-effect waves-light">
                                <i className="feather icon-more-horizontal"></i>
                            </a>
                        </div>
                        <div className="navbar-container container-fluid">
                            <ul className="nav-right">
                                <li className="user-profile header-notification">
                                    <div className="dropdown-primary dropdown">
                                        <div className="dropdown-toggle" data-toggle="dropdown">
                                            <img src={`${window.location.origin}/static/images/user_avatar.jpeg`} className="img-radius" alt="User-Profile-Image"/>
                                            <span>{ getProfileName() }</span>
                                            <i className="feather icon-chevron-down"></i>
                                        </div>
                                        <ul className="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                                            <li>
                                                <Link to="/profile">
                                                    <i className="feather icon-user"></i> Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="#" onClick={ handleLogout }>
                                                    <i className="feather icon-log-out"></i> Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="pcoded-main-container">
                    <div className="pcoded-wrapper">
    
                        <SideNavMain dashboardMainStore={dashboardMainStore}/>
    
                        <Switch>
    
                            {/* HOME */}
                            <Route exact path="/">
                                <HomeMain/>
                            </Route>
    
                            {/* Profile */}
                            <Route path="/profile">
                                <ProfileMain dashboardMainStore={dashboardMainStore}/>
                            </Route>
    
                            {/* Users */}
                            <Route path="/users">
                                { dashboardMainStore.checkIfRouteExist('user-module') ? 
                                    <UserMain userStore={userStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/>
                                }
                            </Route> 
    
                            {/* Menu */}
                            <Route path="/menus">
                                { dashboardMainStore.checkIfRouteExist('menu-module') ?
                                    <MenuMain menuStore={menuStore} dashboardMainStore={dashboardMainStore}/>: <NotFoundPage/>
                                }
                            </Route>
    
                            {/* Employee */}
                            <Route path="/employees">
                                { dashboardMainStore.checkIfRouteExist('employee-module') ?
                                    <EmployeeMain employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/>: <NotFoundPage/>
                                }
                            </Route>
    
                            {/* Payroll */}
                            <Route path="/payroll">
                                { dashboardMainStore.checkIfRouteExist('payroll-module') ?
                                    <PayrollMain employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/>: <NotFoundPage/>
                                }
                            </Route>
    
                            {/* Page not found */}
                            <Route path="*">
                                <NotFoundPage/>
                            </Route>
    
                        </Switch>
    
                    </div>
                </div>  
            </div>
        </div>
    </HashRouter>
    )

})


ReactDOM.render( 
    <DashboardMain dashboardMainStore={dashboardMainStore}/>, 
    document.getElementById('root')
);