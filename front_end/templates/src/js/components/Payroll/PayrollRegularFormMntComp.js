

import React from 'react'
import { observer } from 'mobx-react'
import { InputText, SelectInput, InputNumeric } from '../Utils/Forms/DefaultInputs'


const PayrollRegularFormMntComp = observer(({ payrollRegularDataStore, payrollRegularMntStore }) => {

    const modValueInput = () =>{

        if(payrollRegularMntStore.field){

            if(payrollRegularMntStore.CHAR_FORM_FIELDS.includes(payrollRegularMntStore.field.value)){
                return (
                    <InputText 
                        col="col-sm-12 p-0 m-0"
                        type="text"
                        label="Value:"
                        placeholder="Value"
                        errorField={ payrollRegularMntStore.error_fields.mod_value }
                        value={ payrollRegularMntStore.mod_value }
                        setter={ e => payrollRegularMntStore.setModValue(e.target.value) }
                    />
                )
            }

            if(payrollRegularMntStore.NUMERIC_FORM_FIELDS.includes(payrollRegularMntStore.field.value)){
                return(
                    <InputText 
                        col="col-sm-12 p-0 m-0"
                        type="number"
                        label="Value:"
                        placeholder="Value"
                        errorField={ payrollRegularMntStore.error_fields.mod_value }
                        value={ payrollRegularMntStore.mod_value }
                        setter={ e => payrollRegularMntStore.setModValue(e.target.value) }
                    />
                )
            }

            if(payrollRegularMntStore.MONEYFORMAT_FORM_FIELDS.includes(payrollRegularMntStore.field.value) 
               || payrollRegularMntStore.field.category === 2 
               || payrollRegularMntStore.field.category === 3){
                return(
                    <InputNumeric
                        col="col-sm-12 p-0 m-0"
                        label="Value:"
                        placeholder="Value"
                        errorField={ payrollRegularMntStore.error_fields.mod_value }
                        value={ payrollRegularMntStore.mod_value }
                        setter={ values => payrollRegularMntStore.setModValue(values.value) }
                    />
                )
            }

            if(payrollRegularMntStore.SELECT_FORM_FIELDS.includes(payrollRegularMntStore.field.value)){
                var options = [];
                switch (payrollRegularMntStore.field.value) {
                    case "station":
                        options = [...payrollRegularMntStore.station_options];
                        break;
                    case "paygroup":
                        options = [...payrollRegularMntStore.PAYGROUP_OPTIONS];
                        break;
                    case "status":
                        options = [...payrollRegularMntStore.STATUS_OPTIONS];
                        break;
                    default:
                        options = [];
                        break;
                }
                return(
                    <SelectInput
                        col="col-md-12 p-0 m-0"
                        name="value"
                        label="Value:"
                        value={ payrollRegularMntStore.mod_value }
                        isDisabled={ false }
                        options={ options }
                        onChange={ (value) => payrollRegularMntStore.setModValue(value) }
                        errorField={ payrollRegularMntStore.error_fields.mod_value }
                    />
                )
            }

        }

    }

    return (
            
        <div className="row">

            <SelectInput
                col="col-md-6"
                name="employee"
                label="Employee:"
                value={ payrollRegularMntStore.payroll_regular_data }
                isDisabled={ false }
                options={ payrollRegularDataStore.options }
                onChange={ (value) => payrollRegularMntStore.setPayrollRegularData(value) }
                errorField={ payrollRegularMntStore.error_fields.payroll_regular_data }
            />

            <SelectInput
                col="col-md-6"
                name="field"
                label="Field:"
                value={ payrollRegularMntStore.field }
                isDisabled={ false }
                options={ payrollRegularMntStore.param_options }
                onChange={ (value) => payrollRegularMntStore.setField(value) }
                errorField={ payrollRegularMntStore.error_fields.field }
            />

            <div className="col-sm-6 no-padding">
                { modValueInput() }
            </div>

            <InputText 
                col="col-sm-6"
                type="text"
                label="Remarks:"
                placeholder="Remarks"
                errorField={ payrollRegularMntStore.error_fields.remarks }
                value={ payrollRegularMntStore.remarks }
                setter={ e => payrollRegularMntStore.setRemarks(e.target.value) }
            />

        </div>
    );

    
});


export default PayrollRegularFormMntComp