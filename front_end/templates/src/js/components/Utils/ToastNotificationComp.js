
import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import eventBus from "./EventBus";

function ToastNotification(props){ 

    useEffect(() => {
        
        eventBus.on("SHOW_TOAST_NOTIFICATION", (data) => {

            let icon = "";

            switch (data.type) {
                case "success":
                    icon = "fa fa-check"
                    break;
                case "danger":
                    icon = "fa fa-ban"
                    break;
                case "warning":
                    icon = "fa fa-warning"
                    break;
                case "info":
                    icon = "fa fa-info-circle"
                    break;
                default:
                    icon = ""
                    break;
            }

            $.growl(
                { 
                    icon: icon,
                    title: " ",
                    message: data.message 
                },
                {
                    type: data.type,
                    allow_dismiss: true,
                    placement: { from: "top", align: "right" },
                    offset: { x: 30, y: 30 },
                    spacing: 10,
                    z_index: 999999,
                    delay: 4500,
                    mouse_over: false,
                    animate: { enter: "animated fadeInRight", exit: "animated fadeOutRight" },
                    icon_type: "class",
                }
            );
            
        });

        return () => {
            eventBus.remove("SHOW_TOAST_NOTIFICATION");
        }

    });
    

    return (null)


}


ReactDOM.render(<ToastNotification />, document.getElementById('toast'));