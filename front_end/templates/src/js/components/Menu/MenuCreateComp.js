

import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react';
import { Link, useHistory} from 'react-router-dom'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { InputTextInline, RadioButtonInline } from '../Utils/Forms/InlineInputs'



const MenuCreate = observer(({ menuStore }) => {

    const history = useHistory();
    const [is_page_loading, SetIsPageLoading] = useState(false);


    const redirectBackToMenuList = useCallback(() => {
        history.push('/menus'), [history]
    });


    const getSubrouteInputField = (name, value, placeholder, key) => {
        return(
            <input 
                name={ name } 
                value={ value }
                className="form-control" 
                placeholder={ placeholder }
                onChange={ (e) => menuStore.modifySubroutes(key, e) }
            />
        )
    };


    const getSubrouteFieldError = (key, field_name) => {
        if(menuStore.error_fields.subroutes){
            let errors = [...menuStore.error_fields.subroutes];
            if(errors[key]){
                return (
                    <div className="col-form-label">
                        <p className="text-danger">{ errors[key][field_name] }</p>
                    </div>
                )
            }else{ return ""; }
        }else{ return ""; }
    };


    const handleCreate = (e, isa) => {
        e.preventDefault();
        SetIsPageLoading(true)
        axios.post('api/route/', { 
            category : menuStore.category,
            name : menuStore.name,
            nav_name : menuStore.nav_name,
            url : menuStore.url,
            url_name : menuStore.url_name,
            icon : menuStore.icon,
            is_menu : menuStore.is_menu,
            is_dropdown : menuStore.is_dropdown,
            subroutes : menuStore.subroutes,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Menu / Permission Successfully Created!", type: "inverse" 
            });
            menuStore.resetForm()
            menuStore.setSelectedRoute(response.data.id)
            if(isa === 0){ redirectBackToMenuList() }
            SetIsPageLoading(false);
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
                    subroutes: field_errors.subroutes,
                });
            }
            if(error.response.status == 404 || error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Error Occured!", type: "danger" 
                });
            }
            SetIsPageLoading(false);
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
                                Create
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

                                    <DivLoader type="Circles" loading={is_page_loading}/>
                                    <div className="card-header">
                                        <h5>Create Menu and Permissions</h5>
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


                                        {/* PERMISSIONS */}
                                        <div className="col-md-12 mt-5">
                                            <h5 className="sub-title">Permissions</h5>
                                            <div className="table-responsive">
                                                <button className="btn btn-md btn-success btn-outline-success float-right mb-2  pt-2 pb-2" 
                                                    onClick={ () => menuStore.addSubroutes() }>
                                                    <i className="fa fa-plus"></i> Add Permission
                                                </button>

                                                <table className="table table-de">
                                                    <thead>
                                                        <tr>
                                                            <th>Permission Name</th>
                                                            <th>Type</th>
                                                            <th>Subitem Name</th>
                                                            <th>Url</th>
                                                            <th>Url Name</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    { menuStore.subroutes.map((val, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>
                                                                    { getSubrouteInputField('name', val.name, 'Ex: Can View User List', key) }
                                                                    { getSubrouteFieldError(key, 'name') }
                                                                </td>
                                                                <td>
                                                                    <select name="is_nav" 
                                                                            value={val.is_nav} 
                                                                            className="form-control form-control-primary" 
                                                                            onChange={(e) => menuStore.modifySubroutes(key, e)}>
                                                                        <option value="">Select</option>
                                                                        <option value={false}>Page / API</option>
                                                                        <option value={true}>Nav Subitem</option>
                                                                    </select>
                                                                    { getSubrouteFieldError(key, 'is_nav') }
                                                                </td>
                                                                <td>
                                                                    { getSubrouteInputField('nav_name', val.nav_name, 'Ex: User Manage', key) }
                                                                    { getSubrouteFieldError(key, 'nav_name') }
                                                                </td>
                                                                <td>
                                                                    { getSubrouteInputField('url', val.url, 'Ex: /user/list/', key) }
                                                                    { getSubrouteFieldError(key, 'url') }
                                                                </td>
                                                                <td>
                                                                    { getSubrouteInputField('url_name', val.url_name, 'Ex: user_list', key) }
                                                                    { getSubrouteFieldError(key, 'url_name') }
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-sm btn-danger" 
                                                                            type="button" 
                                                                            onClick={ () => menuStore.deleteSubroutes(key) }>
                                                                        <i className="fa fa-trash ml-1"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) }
                                                    </tbody>
                                                </table>
                                            </div>
                                            
                                        </div>


                                        {/* BUTTON / FOOTERS */}
                                        <div className="form-group row mt-4">
                                            <div className="col-sm-12">
                                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ (e) => handleCreate(e, 0)}>
                                                    Save
                                                </button>
                                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ (e) => handleCreate(e, 1)}>
                                                    Save and add another
                                                </button>
                                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ () => menuStore.resetForm()}>
                                                    Reset
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


export default MenuCreate