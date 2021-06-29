
import React from "react";
import Select from "react-select";
import NumberFormat from 'react-number-format';



function InputText(props){ 
    return (
        <div className={ props.col }>
            <div className={ props.errorField ? "form-group row has-danger" : "form-group row"}>
                <label className="col-sm-12 col-form-label">{ props.label }</label>
                <div className="col-sm-12">
                    <input type={props.type} 
                        className={ props.errorField ? "form-control form-control-danger" : "form-control"}
                        placeholder={ props.placeholder } 
                        value={props.value} 
                        onChange={ props.setter }
                    />
                    <div className="col-form-label" style={ props.errorField ? {} : {display:"none"} }> 
                        { props.errorField ? props.errorField : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}



function InputNumeric(props){ 
    return (
        <div className={ props.col }>
            <div className={ props.errorField ? "form-group row has-danger" : "form-group row"}>
                <label className="col-sm-12 col-form-label">{ props.label }</label>
                <div className="col-sm-12">
                    <NumberFormat 
                        value={props.value} 
                        className={ props.errorField ? "form-control form-control-danger" : "form-control" }
                        placeholder={props.placeholder} 
                        displayType={'input'}
                        thousandSeparator={true}
                        onValueChange={props.setter}  
                        allowedDecimalSeparators={ ['.'] } 
                    />
                    <div className="col-form-label" style={ props.errorField ? {} : {display:"none"} }> 
                        { props.errorField ? props.errorField : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}


function SelectMulti(props){ 
    return (
        <div className={ props.col }>
            <div className={ props.errorField ? "form-group row has-danger" : "form-group row"}>
                <label className="col-sm-12 col-form-label">{ props.label }</label>
                <div className="col-sm-12">
                    <Select 
                        isMulti
                        name={ props.name }
                        options={props.options} 
                        value={ props.value }
                        onChange={ props.onChange }
                        closeMenuOnSelect={props.closeMenuOnSelect}
                        defaultMenuIsOpen={props.defaultMenuIsOpen}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        captureMenuScroll={false}
                    />
                    <div className="col-form-label" style={ props.errorField ? {} : {display:"none"} }> 
                        { props.errorField ? props.errorField : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}



function RadioButton(props){ 
    return (
        <div className={ props.col }>
            <div className={ props.errorField ? "form-group row has-danger" : "form-group row"}>
                <label className="col-sm-12 col-form-label">{ props.label }</label>
                <div className="col-sm-12 form-radio">
                    {
                        props.options.map((val, key) => {
                            var isChecked = (val.value.toString() === props.value?.toString());
                            return (
                                <div className="radio radio-inline" key={key}>
                                    <label>
                                        <input type="radio" 
                                            value={ val.value } 
                                            name={ props.name } 
                                            onChange={ props.onChange }
                                            checked={ isChecked }/>
                                        <i className="helper"></i> { val.label }
                                    </label>
                                </div>
                            )
                        })
                    }
                    <div className="col-form-label" style={ props.errorField ? {} : {display:"none"} }> 
                        { props.errorField ? props.errorField : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}



function DatePicker(props){ 
    return (
        <div className={ props.col }>
            <div className={ props.errorField ? "form-group row has-danger" : "form-group row"}>
                <label className="col-sm-12 col-form-label">{ props.label }</label>
                <div className="col-sm-12">
                    <input type="date" 
                           className={ props.errorField ? "form-control form-control-danger" : "form-control"}
                           value={props.value}
                           onChange={props.setter}
                    />  
                    <div className="col-form-label" style={ props.errorField ? {} : {display:"none"} }> 
                        { props.errorField ? props.errorField : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}


function SelectInput(props){ 

    return(
        <div className={ props.col }>
            <div className={ props.errorField ? "form-group row has-danger" : "form-group row"}>
                <label className="col-sm-12 col-form-label">{ props.label }</label>
                <div className="col-sm-12">
                    <Select
                        name={props.name}
                        value={props.value}
                        isDisabled={props.isDisabled}
                        options={props.options}
                        onChange={props.onChange}
                        className="basic-single"
                        classNamePrefix="Select"
                        isClearable={false}
                        isSearchable={true}
                    />
                    <div className="col-form-label" style={ props.errorField ? {} : {display:"none"} }> 
                        { props.errorField ? props.errorField : ""}
                    </div>
                </div>
            </div>
        </div>
    );
    
}


export { InputText, InputNumeric, SelectMulti, RadioButton, DatePicker, SelectInput };