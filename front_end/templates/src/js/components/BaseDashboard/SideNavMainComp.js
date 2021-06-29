
import React from "react"
import { NavLink, useLocation} from "react-router-dom"
import { observer } from 'mobx-react'

import SideNavMenu from "./SideNavMenuComp"
import SideNavMenuWithLevel from "./SideNavMenuWithLevelComp"

const SideNavMain = observer(({ dashboardMainStore }) => {

    const location = useLocation();

    const getMenus = (category) => {
        const admin_menus = [];
        if(dashboardMainStore.current_user_routes.length > 0){
            dashboardMainStore.current_user_routes.forEach((val, key) => {
                if(val.route.category == category) {
                    if(val.route.is_menu == true){
                        if(val.route.is_dropdown == false){
                            admin_menus.push(
                                <SideNavMenu 
                                    key={key} 
                                    menu_name={val.route.nav_name} 
                                    menu_icon={val.route.icon} 
                                    url={val.route.url}
                                />
                            )
                        }else{
                            admin_menus.push(
                                <SideNavMenuWithLevel 
                                    key={key}
                                    url_name={val.route.url_name}
                                    menu_name={val.route.nav_name} 
                                    menu_icon={val.route.icon} 
                                    submenus={val.userSubroute_userRoute}
                                    current_path={location.pathname}
                                />
                            )
                        }
                    }
                }
            })
        }
        return admin_menus
    }
    

    return (
        <nav className="pcoded-navbar">
            <div className="nav-list">
                <div className="pcoded-inner-navbar main-menu">

                    <div className="pcoded-navigation-label">App</div>
                    <ul className="pcoded-item pcoded-left-item">
                        <li className={ location.pathname === "/" ? "active" : "" } key={0}>
                            <NavLink to="/" className="waves-effect waves-dark">
                                <span className="pcoded-micon">
                                    <i className="ti-home"></i>
                                </span>
                                <span className="pcoded-mtext">Home</span>
                            </NavLink>
                        </li>
                    </ul>

                    { getMenus('ADM').length > 0 ?
                        <>
                            <div className="pcoded-navigation-label" style={{ color:'#f1f7ff' }}>Admin</div>
                            <ul className="pcoded-item pcoded-left-item">
                                { getMenus('ADM') }
                            </ul>
                        </> : ""
                    }

                    { getMenus('HR').length > 0 ?
                        <>
                            <div className="pcoded-navigation-label" style={{ color:'#f1f7ff' }}>HR</div>
                            <ul className="pcoded-item pcoded-left-item">
                                { getMenus('HR') }
                            </ul>
                        </> : ""
                    }

                    { getMenus('ACCTG').length > 0 ?
                        <>
                            <div className="pcoded-navigation-label" style={{ color:'#f1f7ff' }}>ACCOUNTING</div>
                            <ul className="pcoded-item pcoded-left-item">
                                { getMenus('ACCTG') }
                            </ul>
                        </> : ""
                    }

                </div>
            </div>
        </nav>
    );
})

export default SideNavMain;