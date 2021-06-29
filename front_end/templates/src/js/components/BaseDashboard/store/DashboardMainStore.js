import { makeAutoObservable, runInAction } from "mobx"


class DashboardMainStore{

    // List
    current_user = {};
    current_user_routes = [];
    current_user_subroutes = [];

    constructor(){
        makeAutoObservable(this)
    }

    // setters
    setCurrentUser(user){
        this.current_user = user;
    }

    setCurrentUserRoutes(user_routes){
        this.current_user_routes = user_routes;
    }

    setCurrentUserSubroutes(user_subroutes){
        this.current_user_subroutes = user_subroutes;
    }

    // getters
    checkIfRouteExist(route_name) {
        return this.current_user_routes.some(data => data.route.name === route_name)
    }

    checkIfSubrouteExist(subroute_name) {
        return this.current_user_subroutes.some(data => data.subroute.name === subroute_name)
    }

}

const dashboardMainStore = new DashboardMainStore()

export default dashboardMainStore