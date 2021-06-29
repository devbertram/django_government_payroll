
import React from "react";
import Loader from 'react-loader-spinner'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function DivLoader(props){
    
    const parent_style = {
        display: props.loading == true ? "" : "none",
        opacity:"0.9",
        backgroundColor:"white",
        position:"absolute",
        width:"100%",
        height:"100%",
        top:"0px",
        left:"0px",
        zIndex:"1000",
    }
    
    const spinner_style = {
        position:"absolute",
        top:"37%",
        left:"47%",
    }

    return (
        <div style={ parent_style }>
            <div style={ spinner_style }>
                <Loader type={props.type} color="#00BFFF" height={100} width={100}/>
            </div>
        </div>

    );

}

export default DivLoader