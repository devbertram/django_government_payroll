
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom"

function SideNavMenuWithLevel(props){

    const location = useLocation();
    const [is_menu_open, SetIsMenuOpen] = useState(false);
    
    
    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            // check active path onload
            props.submenus.forEach((val, key) => {
                if(props.current_path.includes(val.subroute.url)){
                    SetIsMenuOpen(true);
                }
            })
        }
        return () => { is_mounted = false } 
    }, []);


    const getSubmenus = () => {
        const submenus = [];
        if(props.submenus.length > 0){
            props.submenus.forEach((val, key) => {
                if(val.subroute.is_nav == true){
                    submenus.push(
                        <li className={ hasActiveSubmenuPath(val.subroute.url) ? 'active' : '' } key={key}>
                            <NavLink to={val.subroute.url} className="waves-effect waves-dark">
                                <span className="pcoded-mtext">{ val.subroute.nav_name }</span>
                            </NavLink>
                        </li>
                    )
                }
            })
        }
        return submenus
    }


    const hasActiveSubmenuPath = (url) => {
        return url === location.pathname;
    }


    const hasActiveMenuPath = () => {
        return is_menu_open === true || location.pathname.includes(props.url_name);
    }

    
    const handleOpen = (e) =>{
        e.preventDefault()
        if(is_menu_open == false){
            SetIsMenuOpen(true)
        }else{
            SetIsMenuOpen(false)
        }
    }


    return (
        <li className={ hasActiveMenuPath() ? "pcoded-hasmenu active pcoded-trigger" : "pcoded-hasmenu"} dropdown-icon="style1" subitem-icon="style1" onClick={ handleOpen }>
            <NavLink to="#" onClick={ e => e.preventDefault()  } className="waves-effect waves-dark">
                <span className="pcoded-micon"><i className={ props.menu_icon }></i></span>
                <span className="pcoded-mtext">{ props.menu_name }</span>
            </NavLink>
            <ul className="pcoded-submenu" style={ hasActiveMenuPath() ? {display:''} : {display:'none'} }>
                { getSubmenus() }
            </ul>
        </li>
    );


}


export default SideNavMenuWithLevel;