

import React, { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory, useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { InputTextInline, RadioButtonInline } from '../Utils/Forms/InlineInputs'



const MenuEdit = observer(({ menuStore }) => {

    const history = useHistory();
    const { menu_id } = useParams();
    const [page_loader, SetPageLoader] = useState(false);
    
    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            menuStore.setIsOpenedForm(1)
            menuStore.retrieve(menu_id)
        }
        return () => {
            is_mounted = false;
        } 
    },[])


    const redirectBackToMenuList = useCallback(() => {
        history.push('/menus'), [history]
    });


    const handleSave = (e, btl) => {
        e.preventDefault();
        SetPageLoader(true)
        axios.put('api/route/'+menu_id+'/', { 
            category : menuStore.category,
            name : menuStore.name,
            nav_name : menuStore.nav_name,
            url : menuStore.url,
            url_name : menuStore.url_name,
            icon : menuStore.icon,
            is_menu : menuStore.is_menu,
            is_dropdown : menuStore.is_dropdown,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Menu Details Successfully Updated!", type: "inverse" 
            });
            menuStore.setSelectedRoute(response.data.id)
            if(btl === 1){ redirectBackToMenuList() }
            SetPageLoader(false);
        }).catch((error) => {
            if(error.response.status === 400){
                let field_errors = error.response.data;
                menuStore.setErrorFields({
                    category: field_errors.category?.toString(),
                    name: field_errors.name?.toString(),
                    nav_name: field_errors.nav_name?.toString(),
                    url: field_errors.url?.toString(),
                    url_name: field_errors.url_name?.toString(),
                    icon: field_errors.icon?.toString(),
                    is_menu: field_errors.is_menu?.toString(),
                    is_dropdown: field_errors.is_dropdown?.toString(),
                    subroutes: field_errors.subroutes?.toString(),
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
    

    return (

    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Menus</h5>
                            <span>Manage Menus and Permissions</span>
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
                                <Link to="/menus">Menus</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={`/menus/${ menu_id }`}>Details</Link>
                            </li>
                            <li className="breadcrumb-item">
                                Edit
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
                                        <h5>Edit Menu </h5>
                                        <Link to={`/menus/${menu_id}`} className="btn btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                                            <i className="fa fa-arrow-left"></i> Back
                                        </Link>
                                        <Link to="/menus" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                                            <i className="fa fa-arrow-left"></i> Back to List
                                        </Link>
                                    </div>

                                    <div className="card-block">


                                        {/* MENU DETAILS */}
                                        <div className="col-md-12">
                                            <h4 className="sub-title">Menu Details</h4>

                                            <InputTextInline 
                                                type="text"
                                                label="Category:"
                                                placeholder="Category"
                                                errorField={ menuStore.error_fields.category }
                                                value={ menuStore.category }
                                                setter={ e => menuStore.setCategory(e.target.value) }
                                            />

                                            <InputTextInline 
                                                type="text"
                                                label="Name:"
                                                placeholder="Name"
                                                errorField={ menuStore.error_fields.name }
                                                value={ menuStore.name }
                                                setter={ e => menuStore.setName(e.target.value) }
                                            />

                                            <RadioButtonInline
                                                label="Is Side Navigation:"
                                                name="is_menu"
                                                value={ menuStore.is_menu }
                                                options={ [{value:true, label:"Yes"}, {value:false, label:"No"}] }
                                                onChange={ (e) => menuStore.setIsMenu(e.target.value) }
                                                errorField={ menuStore.error_fields.is_menu }
                                            />

                                            <RadioButtonInline
                                                label="Is Side Navigation Dropdown"
                                                name="is_dropdown"
                                                value={ menuStore.is_dropdown }
                                                options={ [{value:true, label:"Yes"}, {value:false, label:"No"}] }
                                                onChange={ (e) => menuStore.setIsDropdown(e.target.value) }
                                                errorField={ menuStore.error_fields.is_dropdown }
                                            />

                                            <InputTextInline 
                                                type="text"
                                                label="Side Navigation Name:"
                                                placeholder="Side Navigation Name"
                                                errorField={ menuStore.error_fields.nav_name }
                                                value={ menuStore.nav_name }
                                                setter={ e => menuStore.setNavName(e.target.value) }
                                            />

                                            <InputTextInline 
                                                type="text"
                                                label="Side Navigation Icon:"
                                                placeholder="Side Navigation Icon"
                                                errorField={ menuStore.error_fields.icon }
                                                value={ menuStore.icon }
                                                setter={ e => menuStore.setIcon(e.target.value) }
                                            />

                                            <InputTextInline 
                                                type="text"
                                                label="Url / Main Path:"
                                                placeholder="Url / Main Path"
                                                errorField={ menuStore.error_fields.url }
                                                value={ menuStore.url }
                                                setter={ e => menuStore.setUrl(e.target.value) }
                                            />

                                            <InputTextInline 
                                                type="text"
                                                label="Url Name:"
                                                placeholder="(Django Route Name)"
                                                errorField={ menuStore.error_fields.url_name }
                                                value={ menuStore.url_name }
                                                setter={ e => menuStore.setUrlName(e.target.value) }
                                            />

                                        </div>


                                        {/* BUTTON / FOOTERS */}
                                        <div className="form-group row mt-4">
                                            <div className="col-sm-12">
                                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ (e) => handleSave(e, 0) }>
                                                    Save
                                                </button>
                                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ (e) => handleSave(e, 1) }>
                                                    Save and back to list
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


export default MenuEdit