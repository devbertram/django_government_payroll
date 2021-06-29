require('../../config')

import React from "react"
import { observer } from 'mobx-react'
import { HashRouter, Switch, Route } from "react-router-dom"

import UserList from './UserListComp'
import UserCreate from './UserCreateComp'
import UserDetails from './UserDetailsComp'
import UserEdit from './UserEditComp'
import UserResetPassword from './UserResetPasswordComp'
import NotFoundPage from '../ErrorPages/NotFoundPageComp'

const UserMain = observer(({ userStore, dashboardMainStore }) => {

    const checkIfSubmoduleExist = (route_name) => {
        return dashboardMainStore.current_user_subroutes.some(data => data.subroute.name === route_name)
    }

    return (
        <HashRouter>
            <Switch>

                {/* LIST */}
                <Route exact path="/users">
                    { checkIfSubmoduleExist('user-manage-page') ? 
                        <UserList userStore={ userStore } dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* CREATE */}
                <Route exact path="/users/create">
                    { checkIfSubmoduleExist('user-create-page') ? 
                        <UserCreate userStore={ userStore }/> : <NotFoundPage/> }
                </Route>

                {/* DETAILS */}
                <Route exact path="/users/:user_id">
                    { checkIfSubmoduleExist('user-details-page') ? 
                        <UserDetails userStore={ userStore } dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* EDIT */}
                <Route exact path="/users/:user_id/edit">
                    { checkIfSubmoduleExist('user-edit-page') ? 
                        <UserEdit userStore={ userStore }/> : <NotFoundPage/> }
                </Route>

                {/* RESET PASSWORD */}
                <Route exact path="/users/:user_id/reset_password">
                    { checkIfSubmoduleExist('user-reset-password-page') ? 
                        <UserResetPassword userStore={ userStore }/> : <NotFoundPage/> }
                </Route>
    
                {/* Page not found */}
                <Route path="/users/*">
                    <NotFoundPage/>
                </Route>

            </Switch>
        </HashRouter>
    )

})

export default UserMain