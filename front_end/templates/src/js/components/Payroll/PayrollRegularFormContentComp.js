import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { SelectInput, InputText, InputNumeric } from '../Utils/Forms/DefaultInputs'
import employeeStore from '../Employee/store/EmployeeStore'
import payrollRegularMntStore from './store/payrollRegularMntStore'


const PayrollRegularFormContent = observer(({ payrollRegularDataStore }) => {

    useEffect(() => { 
        let is_mounted = true;
        if(is_mounted = true){
            employeeStore.getAll()
            payrollRegularMntStore.setStationOptions()
            payrollRegularMntStore.setDeductionOptions()
            payrollRegularMntStore.setAllowanceOptions()
        }
        return () => { is_mounted = false; } 

    }, [])


    const handleSelectEmployeeChange = (value) => {
        payrollRegularDataStore.setFormData(value, "employee")
        axios.get('api/employee/' + value.value)
        .then((response) => {
            let station = payrollRegularMntStore.station_options.find(data => data.value == response.data.station_link)
            let status = payrollRegularMntStore.STATUS_OPTIONS.find(data => data.value == response.data.application_status)
            payrollRegularDataStore.setFormData(response.data.fullname, "fullname")
            if(station){
                payrollRegularDataStore.setFormData({ value:response.data.station_link, label:station?.label }, "station")
            }
            payrollRegularDataStore.setFormData(response.data.position, "position")
            payrollRegularDataStore.setFormData(response.data.salary_grade, "salary_grade")
            payrollRegularDataStore.setFormData(response.data.step_increment, "step_increment")
            payrollRegularDataStore.setFormData(response.data.monthly_salary, "monthly_salary")
            payrollRegularDataStore.setFormData(response.data.plantilla_item, "plantilla_item")
            if(status){
                payrollRegularDataStore.setFormData({ value:response.data.application_status, label:status?.label }, "status")
            }
            payrollRegularDataStore.setFormData(response.data.tin, "tin")
            payrollRegularDataStore.setFormData(response.data.gsis, "gsis")
            payrollRegularDataStore.setFormData(response.data.philhealth, "philhealth")
            payrollRegularDataStore.setFormData(response.data.pagibig, "pagibig")
            payrollRegularDataStore.setFormData(response.data.sss, "sss")
        });
    }


    return (
        
    <div className="row">

        <SelectInput
            col="col-md-3"
            name="employee"
            label="Employee:"
            value={ payrollRegularDataStore.form_data.employee }
            isDisabled={ false }
            options={ employeeStore.employee_options }
            onChange={ (value) => handleSelectEmployeeChange(value) }
            errorField={ payrollRegularDataStore.error_fields.employee }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="Fullname"
            placeholder="Fullname"
            value={ payrollRegularDataStore.form_data.fullname }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "fullname") }
            errorField={ payrollRegularDataStore.error_fields.fullname }
        />

        <SelectInput
            col="col-md-3"
            name="station"
            label="Station:"
            value={ payrollRegularDataStore.form_data.station }
            isDisabled={ false }
            options={ payrollRegularMntStore.station_options }
            onChange={ (value) => payrollRegularDataStore.setFormData(value, "station") }
            errorField={ payrollRegularDataStore.error_fields.station }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="Position"
            placeholder="Position"
            value={ payrollRegularDataStore.form_data.position }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "position") }
            errorField={ payrollRegularDataStore.error_fields.position }
        />

        <SelectInput
            col="col-md-3"
            name="paygroup"
            label="Paygroup:"
            value={ payrollRegularDataStore.form_data.paygroup }
            isDisabled={ false }
            options={ payrollRegularMntStore.PAYGROUP_OPTIONS }
            onChange={ (value) => payrollRegularDataStore.setFormData(value, "paygroup") }
            errorField={ payrollRegularDataStore.error_fields.paygroup }
        />

        <InputText 
            col="col-sm-3"
            type="number"
            label="Salary Grade:"
            placeholder="Salary Grade"
            value={ payrollRegularDataStore.form_data.salary_grade }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "salary_grade") }
            errorField={ payrollRegularDataStore.error_fields.salary_grade }
        />

        <InputText 
            col="col-sm-3"
            type="number"
            label="Step Increment:"
            placeholder="Step Increment"
            value={ payrollRegularDataStore.form_data.step_increment }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "step_increment") }
            errorField={ payrollRegularDataStore.error_fields.step_increment }
        />
                
        <InputNumeric
            col="col-sm-3"
            label="Monthly Salary"
            placeholder="Monthly Salary"
            value={ payrollRegularDataStore.form_data.monthly_salary }
            setter={ values => payrollRegularDataStore.setFormData(values.value, "monthly_salary") }
            errorField={ payrollRegularDataStore.error_fields.monthly_salary }
        />

        <InputText 
            col="col-sm-3"
            type="number"
            label="Plantilla Item:"
            placeholder="Plantilla Item"
            value={ payrollRegularDataStore.form_data.plantilla_item }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "plantilla_item") }
            errorField={ payrollRegularDataStore.error_fields.plantilla_item }
        />

        <SelectInput
            col="col-md-3"
            name="status"
            label="Status:"
            value={ payrollRegularDataStore.form_data.status }
            isDisabled={ false }
            options={ payrollRegularMntStore.STATUS_OPTIONS }
            onChange={ (value) => payrollRegularDataStore.setFormData(value, "status") }
            errorField={ payrollRegularDataStore.error_fields.status }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="ATM Account No.:"
            placeholder="ATM Account No."
            value={ payrollRegularDataStore.form_data.atm_account_no }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "atm_account_no") }
            errorField={ payrollRegularDataStore.error_fields.atm_account_no }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="TIN:"
            placeholder="TIN"
            value={ payrollRegularDataStore.form_data.tin }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "tin") }
            errorField={ payrollRegularDataStore.error_fields.tin }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="GSIS:"
            placeholder="GSIS"
            value={ payrollRegularDataStore.form_data.gsis }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "gsis") }
            errorField={ payrollRegularDataStore.error_fields.gsis }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="Philhealth:"
            placeholder="Philhealth"
            value={ payrollRegularDataStore.form_data.philhealth }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "philhealth") }
            errorField={ payrollRegularDataStore.error_fields.philhealth }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="PAGIBIG:"
            placeholder="PAGIBIG"
            value={ payrollRegularDataStore.form_data.pagibig }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "pagibig") }
            errorField={ payrollRegularDataStore.error_fields.pagibig }
        />

        <InputText 
            col="col-sm-3"
            type="text"
            label="SSS:"
            placeholder="SSS"
            value={ payrollRegularDataStore.form_data.sss }
            setter={ e => payrollRegularDataStore.setFormData(e.target.value, "sss") }
            errorField={ payrollRegularDataStore.error_fields.sss }
        />


        {/* DEDUCTIONS */}
        <div className="col-md-6 mt-5">
            <h5 className="sub-title">Deductions</h5>
            <div className="table-responsive" style={{overflow:'visible'}}>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th style={{maxWidth:'250px'}}>Deduction</th>
                            <th style={{maxWidth:'150px'}}>Amount</th>
                            <th style={{maxWidth:'70px'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { payrollRegularDataStore.form_data.payrollRegularDataDeduc_payrollRegularData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className="align-middle pt-0 pb-0" style={{maxWidth:'250px'}}>
                                    <SelectInput
                                        col="col-md-12 m-0 p-0"
                                        name="deduction_id"
                                        value={ val }
                                        isDisabled={ false }
                                        options={ payrollRegularMntStore.deduction_options }
                                        onChange={ (value) => payrollRegularDataStore.modifyDeduction(key, "value", value) }
                                    />
                                </td>
                                <td className="align-middle pt-0 pb-0" style={{maxWidth:'150px'}}>
                                    <InputNumeric
                                        col="col-sm-12 m-0 p-0"
                                        placeholder="Amount"
                                        value={ val.amount }
                                        setter={ values => payrollRegularDataStore.modifyDeduction(key, "amount", values.value) }
                                    />
                                </td>
                                <td className="align-middle" style={{maxWidth:'70px'}}>
                                    <button className="btn btn-sm btn-danger"
                                            onClick={ () => payrollRegularDataStore.deleteDeduction(key) }>
                                        <i className="fa fa-trash ml-1"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    }) }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style={{maxWidth:'250px'}}></td>
                            <td style={{maxWidth:'150px'}}></td>
                            <td style={{maxWidth:'70px'}}>
                                <button className="btn btn-sm btn-success btn-outline-success mb-2 pt-2 pb-2" 
                                        onClick={ () => payrollRegularDataStore.addDeduction() }>
                                    <i className="fa fa-plus ml-1"></i>
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        

        {/* ALLOWANCES */}
        <div className="col-md-6 mt-5">
            <h5 className="sub-title">Allowances</h5>
            <div className="table-responsive" style={{overflow:'visible'}}>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th style={{maxWidth:'250px'}}>Allowance</th>
                            <th style={{maxWidth:'150px'}}>Amount</th>
                            <th style={{maxWidth:'70px'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { payrollRegularDataStore.form_data.payrollRegularDataAllow_payrollRegularData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className="align-middle pt-0 pb-0" style={{maxWidth:'250px'}}>
                                    <SelectInput
                                        col="col-md-12 m-0 p-0"
                                        name="allowance_id"
                                        value={ val }
                                        isDisabled={ false }
                                        options={ payrollRegularMntStore.allowance_options }
                                        onChange={ (value) => payrollRegularDataStore.modifyAllowance(key, "value", value) }
                                    />
                                </td>
                                <td className="align-middle pt-0 pb-0" style={{maxWidth:'150px'}}>
                                    <InputNumeric
                                        col="col-sm-12 m-0 p-0"
                                        placeholder="Amount"
                                        value={ val.amount }
                                        setter={ values => payrollRegularDataStore.modifyAllowance(key, "amount", values.value) }
                                    />
                                </td>
                                <td className="align-middle" style={{maxWidth:'70px'}}>
                                    <button className="btn btn-sm btn-danger" 
                                            onClick={ () => payrollRegularDataStore.deleteAllowance(key) }>
                                        <i className="fa fa-trash ml-1"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    }) }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style={{maxWidth:'250px'}}></td>
                            <td style={{maxWidth:'150px'}}></td>
                            <td style={{maxWidth:'70px'}}>
                                <button className="btn btn-sm btn-success btn-outline-success mb-2 pt-2 pb-2" 
                                        onClick={ () => payrollRegularDataStore.addAllowance() }>
                                    <i className="fa fa-plus ml-1"></i>
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    );

    
});


export default PayrollRegularFormContent