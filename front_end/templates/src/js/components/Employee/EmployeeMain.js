require('../../config')

import React from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import { observer } from 'mobx-react'

import EmployeeList from './EmployeeListComp.js'
import EmployeeCreate from './EmployeeCreateComp.js'
import EmployeeDetails from './EmployeeDetailsComp.js'
import NotFoundPage from '../ErrorPages/NotFoundPageComp'

const EmployeeMain = observer(({ employeeStore, dashboardMainStore }) => {

    return (
        <HashRouter>
            <Switch>

                {/* LIST */}
                <Route exact path="/employees">
                    { dashboardMainStore.checkIfSubrouteExist('employee-manage-page') ? 
                        <EmployeeList employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* CREATE */}
                <Route exact path="/employees/create">
                    { dashboardMainStore.checkIfSubrouteExist('employee-create-page') ? 
                        <EmployeeCreate employeeStore={employeeStore}/> : <NotFoundPage/> }
                </Route>

                {/* DETAILS */}
                <Route exact path="/employees/:employee_id">
                    { dashboardMainStore.checkIfSubrouteExist('employee-details-page') ? 
                        <EmployeeDetails employeeStore={employeeStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>
    
                {/* Page not found */}
                <Route exact path="/employees/*">
                    <NotFoundPage/>
                </Route>

            </Switch>
        </HashRouter>

    )

})

export default EmployeeMain