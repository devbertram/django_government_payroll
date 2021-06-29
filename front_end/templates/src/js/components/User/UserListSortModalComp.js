

import React from 'react'
import { observer } from 'mobx-react'
import { SelectFilter } from '../Utils/Forms/FilterInputs'


const UserListSortModal = observer(({ userStore }) => {

    
    const handleSortFieldChange = (values) => {
        userStore.setSortField(values)
    }


    const handleSortOrderChange = (values) => {
        userStore.setSortOrder(values)
    }


    const handleSortSubmit = (e) => {
        e.preventDefault()
        userStore.handleSortSubmit()
        $("#user-sort-modal").modal('hide')
    }


    return (
        <div className="modal" id="user-sort-modal" role="dialog">
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
                                value={ userStore.sort_field }
                                isDisabled={false}
                                options={ [
                                    {value : "", label : "Select"},
                                    {value : "username", label : "Username"},
                                    {value : "first_name", label : "Firstname"},
                                    {value : "last_name", label : "Lastname"},
                                    {value : "is_active", label : "Status"},
                                    {value : "last_login", label : "Last Login"},
                                    {value : "date_joined", label : "Date Joined"},
                                ] }
                                onChange={ handleSortFieldChange }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="sort_order"
                                label="Sort Order:"
                                value={userStore.sort_order}
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


export default UserListSortModal