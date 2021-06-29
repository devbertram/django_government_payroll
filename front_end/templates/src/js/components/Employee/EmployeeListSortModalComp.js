

import React from 'react'
import { observer } from 'mobx-react'
import { SelectFilter } from '../Utils/Forms/FilterInputs'


const EmployeeListSortModal = observer(({ employeeStore }) => {
    
    const handleSortFieldChange = (values) => {
        employeeStore.setSortField(values)
    }

    const handleSortOrderChange = (values) => {
        employeeStore.setSortOrder(values)
    }

    const handleSortSubmit = (e) => {
        e.preventDefault()
        employeeStore.handleSortSubmit()
        $("#employee-sort-modal").modal('hide')
    }

    return (
        <div className="modal" id="employee-sort-modal" role="dialog">
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
                                value={ employeeStore.sort_field }
                                isDisabled={false}
                                options={ employeeStore.SORT_FIELD_OPTIONS}
                                onChange={ handleSortFieldChange }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="sort_order"
                                label="Sort Order:"
                                value={ employeeStore.sort_order }
                                isDisabled={false}
                                options={ employeeStore.SORT_ORDER_OPTIONS }
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


export default EmployeeListSortModal