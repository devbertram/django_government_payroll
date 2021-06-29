

import React from 'react'

import { observer } from 'mobx-react'

import eventBus from '../Utils/EventBus'
import { SelectFilter } from '../Utils/Forms/FilterInputs'


const UserListFilterModal = observer(({ userStore }) => {


    const handleOnlineStatusSelectChange = (values) => {
        userStore.setFilterOnlineStatus(values)
    }


    const handleSUSelectChange = (values) => {
        userStore.setFilterSUStatus(values)
    }


    const handleFilterSubmit = (e) => {
        e.preventDefault()
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true })
        userStore.handleFilterSubmit()
        $("#user-filter-modal").modal('hide')
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true })
    }


    return (

        <div className="modal" id="user-filter-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Filter Records</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group row">

                            <SelectFilter
                                divColumn="col-md-6"
                                name="filter_online_status"
                                label="Online Status:"
                                value={ userStore.filter_online_status }
                                isDisabled={false}
                                options={ [{value:"", label:"Select"}, {value:1, label:'Online'}, {value:0, label:'Offline'} ] }
                                onChange={ handleOnlineStatusSelectChange }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="filter_su_status"
                                label="Super User Status:"
                                value={userStore.filter_su_status}
                                isDisabled={false}
                                options={ [{value:"", label:"Select"}, {value:1, label:'Super User'}, {value:0, label:'Normal User'} ] }
                                onChange={ handleSUSelectChange }
                            />
                            
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleFilterSubmit }>Filter</button>
                    </div>

                </div>
            </div>
        </div>
    );

    
});


export default UserListFilterModal