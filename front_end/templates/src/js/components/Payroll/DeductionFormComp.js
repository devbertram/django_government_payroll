

import React from 'react'
import { observer } from 'mobx-react'
import { InputText } from '../Utils/Forms/DefaultInputs'


const DeductionForm = observer(({ deductionStore }) => {


    return (
        
    <div className="row">

        <InputText 
            col="col-sm-6"
            type="text"
            label="Code"
            placeholder="Code"
            errorField={ deductionStore.error_fields.code }
            value={ deductionStore.code }
            setter={ e => deductionStore.setCode(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Name"
            placeholder="Name"
            errorField={ deductionStore.error_fields.name }
            value={ deductionStore.name }
            setter={ e => deductionStore.setName(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Priority Sequence"
            placeholder="Priority Sequence"
            errorField={ deductionStore.error_fields.priority_seq }
            value={ deductionStore.priority_seq }
            setter={ e => deductionStore.setPrioritySeq(e.target.value) }
        />

        <InputText 
            col="col-sm-6"
            type="text"
            label="Description"
            placeholder="Description"
            errorField={ deductionStore.error_fields.description }
            value={ deductionStore.description }
            setter={ e => deductionStore.setDescription(e.target.value) }
        />


    </div>

);

    
});


export default DeductionForm