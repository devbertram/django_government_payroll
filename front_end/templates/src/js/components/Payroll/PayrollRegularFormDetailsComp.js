

import React from 'react'
import { observer } from 'mobx-react'
import { InputText} from '../Utils/Forms/DefaultInputs'


const PayrollRegularFormDetails = observer(({ payrollRegularStore }) => {


    return (
        
    <div className="row">

        <InputText 
            col="col-sm-4"
            type="text"
            label="Name"
            placeholder="Name"
            errorField={ payrollRegularStore.error_fields.name }
            value={ payrollRegularStore.name }
            setter={ e => payrollRegularStore.setName(e.target.value) }
        />

        <InputText 
            col="col-sm-8"
            type="text"
            label="Description"
            placeholder="Description"
            errorField={ payrollRegularStore.error_fields.description }
            value={ payrollRegularStore.description }
            setter={ e => payrollRegularStore.setDescription(e.target.value) }
        />

    </div>

);

    
});


export default PayrollRegularFormDetails