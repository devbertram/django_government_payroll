

import React from 'react'
import { observer } from 'mobx-react'
import { SelectFilter } from '../Utils/Forms/FilterInputs'


const MenuListSortModal = observer(({ menuStore }) => {

    
    const handleSortFieldChange = (values) => {
        menuStore.setSortField(values)
    }


    const handleSortOrderChange = (values) => {
        menuStore.setSortOrder(values)
    }


    const handleSortSubmit = (e) => {
        e.preventDefault()
        menuStore.handleSortSubmit()
        $("#menu-sort-modal").modal('hide')
    }


    return (
        <div className="modal" id="menu-sort-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sort Records</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group row">

                            <SelectFilter
                                divColumn="col-md-6"
                                name="sort_field"
                                label="Sort Field:"
                                value={ menuStore.sort_field }
                                isDisabled={false}
                                options={ [
                                    {value : "", label : "Select"},
                                    {value : "name", label : "Name"},
                                    {value : "category", label : "Category"},
                                    {value : "is_menu", label : "Is Side Nav."},
                                    {value : "is_dropdown", label : "Is Side Nav. Dropdown"},
                                    {value : "url", label : "Url"},
                                    {value : "url_name", label : "Url Name"},
                                ] }
                                onChange={ handleSortFieldChange }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="sort_order"
                                label="Sort Order:"
                                value={menuStore.sort_order}
                                isDisabled={false}
                                options={ [{value:"", label:"Select"}, {value:"asc", label:'Ascending'}, {value:"desc", label:'Descending'} ] }
                                onChange={ handleSortOrderChange }
                            />

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleSortSubmit }>Sort</button>
                    </div>
                </div>
            </div>
        </div>
    );

    
});


export default MenuListSortModal