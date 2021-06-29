
function numberFormat(dec, dec_point){
    if(dec){
        dec = dec_point ? Number(dec).toFixed(dec_point) : dec;
        var parts = dec.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }else{
        return "";
    }
}


function defaultValueSetter(value, condition, default_value){
    return value === condition ? default_value : value;
}


export { numberFormat, defaultValueSetter}