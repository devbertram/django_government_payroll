

import React from 'react'
import { observer } from 'mobx-react'


const EmployeeListFilterBadge = observer(({ employeeStore }) => {



    const handleBadgeClose = (field) => {

        switch(field) {
            case "filter_is_active":
                employeeStore.setFilterIsActive({value:"", label:"Select"})
              break;
            case "filter_station":
                employeeStore.setFilterStation({value:"", label:"Select"})
              break;
            case "filter_sex":
                employeeStore.setFilterSex({value:"", label:"Select"})
                break;
            case "filter_civil_status":
                employeeStore.setFilterCivilStatus({value:"", label:"Select"})
                break;
            case "filter_application_status":
                employeeStore.setFilterApplicationStatus({value:"", label:"Select"})
                break;
            case "filter_level":
                employeeStore.setFilterLevel({value:"", label:"Select"})
                break;
            case "filter_fd_gov":
                employeeStore.setFilterFdGovFrom("")
                employeeStore.setFilterFdGovTo("")
                break;
            case "filter_fd_sra":
                employeeStore.setFilterFdSRAFrom("")
                employeeStore.setFilterFdSRATo("")
                break;
            case "filter_first_appt":
                employeeStore.setFilterFirstApptFrom("")
                employeeStore.setFilterFirstApptTo("")
                break;
            case "filter_last_appt":
                employeeStore.setFilterLastApptFrom("")
                employeeStore.setFilterLastApptTo("")
                break;
            case "filter_last_si":
                employeeStore.setFilterLastSiFrom("")
                employeeStore.setFilterLastSiTo("")
                break;
            case "filter_last_adj":
                employeeStore.setFilterLastAdjFrom("")
                employeeStore.setFilterLastAdjTo("")
                break;
            case "filter_last_prom":
                employeeStore.setFilterLastPromFrom("")
                employeeStore.setFilterLastPromTo("")
                break;
            case "sort":
                employeeStore.setSortField("")
                employeeStore.setSortOrder("")
                break;
                
            default:
              
          }

        employeeStore.fetch()

    }



    return (

        <div>
            Filters: {' '}
            { employeeStore.table_badge.map(data => 
                (<>
                    <label className="badge badge-md badge-primary" key={data.field}>
                        {data.label} { data.value } {' '}
                        <a onClick={ () => handleBadgeClose(data.field)}>
                            <i className="fa fa-times"></i>
                        </a>
                    </label>{' '}
                </>)
            )
            }
        </div>
    );

    
});


export default EmployeeListFilterBadge