
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner'
import eventBus from "./EventBus";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function FullPageLoader(props){

    const [is_loading, setIsLoading] = useState(false)
    const [is_dashboard, setIsDashboard] = useState(false)
    const [content, setContent] = useState("")
    
    const parent_style = {
        display: is_loading == true ? "" : "none",
        opacity:"0.9",
        backgroundColor:"white",
        position:"fixed",
        width:"100%",
        height:"100%",
        top:"0px",
        left:"0px",
        zIndex:"1000",
    }
    
    const spinner_style_wp = {
        position:"absolute",
        top:"37%",
        left:"47%",
    }
    
    const spinner_style_db = {
        position:"absolute",
        top:"45%",
        left:"55%",
    }

    useEffect(() => {
        
        eventBus.on("SHOW_FULLPAGE_LOADER", (data) => {
            setIsLoading(data.is_loading)
            setIsDashboard(data.is_dashboard)
            setContent(data.content)
        });

        return () => {
            eventBus.remove("SHOW_FULLPAGE_LOADER");
        }

    });

    return (
        <div style={parent_style}>
            <div style={is_dashboard == true ? spinner_style_db : spinner_style_wp}>
                { content }
                <Loader type="Circles" color="#00BFFF" height={100} width={100}/>
            </div>
        </div>

    );

}

ReactDOM.render(<FullPageLoader/>, document.getElementById('fullpage_loader'));