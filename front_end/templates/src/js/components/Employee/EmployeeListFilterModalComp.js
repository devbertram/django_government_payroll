

import React, {useEffect} from 'react'

import { observer } from 'mobx-react'

import eventBus from '../Utils/EventBus'
import { SelectFilter, DateRangePicker } from '../Utils/Forms/FilterInputs'


const EmployeeListFilterModal = observer(({ employeeStore }) => {


    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            employeeStore.setStationOptions()
        }
        return () => {
            is_mounted = false;
        } 
    },[])

    const handleFilterSubmit = (e) => {
        e.preventDefault()
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true })
        employeeStore.handleFilterSubmit()
        $("#employee-filter-modal").modal('hide')
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true })
    }


    return (

        <div className="modal" id="employee-filter-modal" role="dialog">
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
                                name="filter_is_active"
                                label="Active Status:"
                                value={ employeeStore.filter_is_active }
                                isDisabled={false}
                                options={ [{value:"", label:"Select"}, {value:1, label:'Active'}, {value:0, label:'Inactive'} ] }
                                onChange={ (value) => employeeStore.setFilterIsActive(value) }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="station"
                                label="Station:"
                                value={ employeeStore.filter_station }
                                isDisabled={false}
                                options={ employeeStore.station_options }
                                onChange={ (value) => employeeStore.setFilterStation(value) }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="sex"
                                label="Sex:"
                                value={ employeeStore.filter_sex }
                                isDisabled={false}
                                options={ employeeStore.SEX_OPTIONS }
                                onChange={ (value) => employeeStore.setFilterSex(value) }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="civil_status"
                                label="Civil Status:"
                                value={ employeeStore.filter_civil_status }
                                isDisabled={false}
                                options={ employeeStore.CIVIL_STATUS_OPTIONS }
                                onChange={ (value) => employeeStore.setFilterCivilStatus(value) }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="application_status"
                                label="Application Status:"
                                value={ employeeStore.filter_application_status }
                                isDisabled={false}
                                options={ employeeStore.APPLICATION_STATUS_OPTIONS }
                                onChange={ (value) => employeeStore.setFilterApplicationStatus(value) }
                            />

                            <SelectFilter
                                divColumn="col-md-6"
                                name="level"
                                label="Level:"
                                value={ employeeStore.filter_level }
                                isDisabled={false}
                                options={ employeeStore.LEVEL_OPTIONS }
                                onChange={ (value) => employeeStore.setFilterLevel(value) }
                            />

                            <DateRangePicker 
                                divColumn="col-md-12"
                                label="Firstday in Government:"
                                fromValue={ employeeStore.filter_fd_gov_from }
                                fromSetter={ e => employeeStore.setFilterFdGovFrom(e.target.value) }
                                toValue={ employeeStore.filter_fd_gov_to }
                                toSetter={ e => employeeStore.setFilterFdGovTo(e.target.value) }
                            />

                            <DateRangePicker 
                                divColumn="col-md-12"
                                label="Firstday in SRA:"
                                fromValue={ employeeStore.filter_fd_sra_from }
                                fromSetter={ e => employeeStore.setFilterFdSRAFrom(e.target.value) }
                                toValue={ employeeStore.filter_fd_sra_to }
                                toSetter={ e => employeeStore.setFilterFdSRATo(e.target.value) }
                            />

                            <DateRangePicker 
                                divColumn="col-md-12"
                                label="First Appointment:"
                                fromValue={ employeeStore.filter_first_appt_from }
                                fromSetter={ e => employeeStore.setFilterFirstApptFrom(e.target.value) }
                                toValue={ employeeStore.filter_first_appt_to }
                                toSetter={ e => employeeStore.setFilterFirstApptTo(e.target.value) }
                            />

                            <DateRangePicker 
                                divColumn="col-md-12"
                                label="Last Appointment:"
                                fromValue={ employeeStore.filter_last_appt_from }
                                fromSetter={ e => employeeStore.setFilterLastApptFrom(e.target.value) }
                                toValue={ employeeStore.filter_last_appt_to }
                                toSetter={ e => employeeStore.setFilterLastApptTo(e.target.value) }
                            />

                            <DateRangePicker 
                                divColumn="col-md-12"
                                label="Last Step Increment:"
                                fromValue={ employeeStore.filter_last_si_from }
                                fromSetter={ e => employeeStore.setFilterLastSiFrom(e.target.value) }
                                toValue={ employeeStore.filter_last_si_to }
                                toSetter={ e => employeeStore.setFilterLastSiTo(e.target.value) }
                            />

                            <DateRangePicker 
                                divColumn="col-md-12"
                                label="Last Adjustment:"
                                fromValue={ employeeStore.filter_last_adj_from }
                                fromSetter={ e => employeeStore.setFilterLastAdjFrom(e.target.value) }
                                toValue={ employeeStore.filter_last_adj_to }
                                toSetter={ e => employeeStore.setFilterLastAdjTo(e.target.value) }
                            />

                            <DateRangePicker 
                                divColumn="col-md-12"
                                label="Last Promotion:"
                                fromValue={ employeeStore.filter_last_prom_from }
                                fromSetter={ e => employeeStore.setFilterLastPromFrom(e.target.value) }
                                toValue={ employeeStore.filter_last_prom_to }
                                toSetter={ e => employeeStore.setFilterLastPromTo(e.target.value) }
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


export default EmployeeListFilterModal