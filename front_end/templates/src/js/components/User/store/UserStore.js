
import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class UserStore{

    // List
    list = [];
    total_records = 0;
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
    query = "";
    filter_online_status = { value:"", label:"Select" }; // filter
    filter_su_status = { value:"", label:"Select" }; // filter
    sort_field = "";
    sort_order = "";
    
	delaySearch = debounce(() => this.fetch(), 500); // search delay
    selected_user = 0; // selected user id after create or update
    is_opened_form = 0; // 0 = create form, 1 = update form
    is_selected_all_rows = false; // is all checkbox selected
    selected_rows = []; // rows that are selected via checkbox

    // Form
    user_id = "";
    first_name = "";
    last_name = "";
    email = "";
    username = "";
    is_active = false;
    date_joined = "";
    last_login = "";
    password = "";
    password_confirm = "";
    new_password = "";
    new_password_confirm = "";
    error_fields = {};
    user_routes = [];
    user_subroutes = [];

    route_options = [];
    subroute_options = [];

    constructor(){
        makeAutoObservable(this)
    }


    fetch(){
        this.is_selected_all_rows = false;
        this.selected_rows = [];
        axios.get('api/user', { 
            params: { 
                q: this.query, 
                page_size: this.page_size, 
                page: this.page_current, 
                os: this.filter_online_status.value,
                sus: this.filter_su_status.value,
                sort_field: this.sort_field.value,
                sort_order: this.sort_order.value, 
            }
        }).then((response) => {
            runInAction(() => {
                const users = response.data.results;
                let array = [];
                this.list = users;
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
                users.forEach(data => array.push({id:data.id, status:false}))
                this.selected_rows = array;
            })
        });
    }


    retrieve(user_id){
        this.resetForm();
        if(user_id != ""){
            axios.get('api/user/' + user_id)
                .then((response) => {
                    let r = response.data.userRoute_user;
                    let user_r = [];
                    let user_sr = [];
                    r.forEach( data_r => {
                        let sr = data_r.userSubroute_userRoute;
                        // set subroute options
                        axios.get('api/route/' + data_r.route.id)
                            .then((response) => {
                                let subroutes = response.data.subroute_route;
                                if(subroutes.length > 0){
                                    subroutes.forEach(data_subroute => {
                                        this.subroute_options.push({ value:data_subroute.id, label:data_subroute.name });
                                    });
                                }
                            });
                        // push user route
                        user_r.push({ 
                            value: data_r.route.id, 
                            label:data_r.route.name 
                        })
                        // push user subroute
                        sr.forEach(data_sr => {
                            user_sr.push({
                                value:data_sr.subroute.id, 
                                label:data_sr.subroute.name
                            })
                        })
                    })
                    // set form values
                    runInAction(() => {
                        this.username = response.data.username;
                        this.first_name = response.data.first_name;
                        this.last_name = response.data.last_name;
                        this.email = response.data.email;
                        this.is_active = response.data.is_active;
                        this.date_joined = response.data.date_joined;
                        this.last_login = response.data.last_login;
                        this.user_routes = user_r;
                        this.user_subroutes = user_sr;
                    })
                });
        }
    }


    // List Setters
    setFilterOnlineStatus(online_status){
        this.filter_online_status = online_status;
    }


    setFilterSUStatus(su_status){
        this.filter_su_status = su_status;
    }

    
    setSelectedUser(id){
        this.selected_user = id;
    }

    
    setIsOpenedForm(int){
        this.is_opened_form = int;
    }

    setIsSelectedAllRows(bool){
        this.is_selected_all_rows = bool;
        this.selected_rows.map(data => {
            this.setSelectedRowObject(bool, data.id)
        })
    }

    setSelectedRowObject(status, id){
        let obj_index = this.selected_rows.findIndex(data => data.id === id)
        this.selected_rows[obj_index].status = status;
    }


    // Form
    resetForm(){
        this.first_name = "";
        this.last_name = "";
        this.email = "";
        this.username = "";
        this.password = "";
        this.password_confirm = "";
        this.new_password = "";
        this.new_password_confirm = "";
        this.error_fields = {};
        this.user_routes = [];
        this.user_subroutes = [];
        this.subroute_options = [];
    }

    
    setUserId(user_id){
        this.user_id = user_id;
    }

    
    setFirstname(first_name){
        this.first_name = first_name;
    }


    setLastname(last_name){
        this.last_name = last_name;
    }


    setEmail(email){
        this.email = email;
    }


    setUsername(username){
        this.username = username;
    }


    setPassword(password){
        this.password = password;
    }


    setPasswordConfirm(password_confirm){
        this.password_confirm = password_confirm;
    }


    setNewPassword(new_password){
        this.new_password = new_password;
    }


    setNewPasswordConfirm(new_password_confirm){
        this.new_password_confirm = new_password_confirm;
    }


    setErrorFields(error_fields){
        this.error_fields = error_fields;
    }


    // User Routes
    setUserRoutes(array){
        let existing = this.getUserRouteValues();
        let passed = this.getUserRoutePassedValues(array);
        let diff = [];
        if(existing.length < passed.length ){
            diff = passed.filter(x => !existing.includes(x));
            if(diff.length === 1){
                axios.get('api/route/' + diff.toString())
                    .then((response) => {
                        let subroutes = response.data.subroute_route;
                        if(subroutes.length > 0){
                            subroutes.forEach(data_subroute => {
                                this.subroute_options.push({ value:data_subroute.id, label:data_subroute.name });
                            });
                        }
                    });
            }
        }
        if(existing.length > passed.length ){
            diff = existing.filter(x => !passed.includes(x));
            if(diff.length === 1){
                axios.get('api/route/' + diff.toString())
                    .then((response) => {
                        let subroutes = response.data.subroute_route;
                        if(subroutes.length > 0){
                            subroutes.forEach(data_subroute => {
                                this.removeObjectFromSubrouteOptions(data_subroute.id)
                                this.removeObjectFromUserSubroutes(data_subroute.id)
                            });
                        }
                    });
            }
        }
        this.user_routes = array;
    }


    getUserRouteValues(){
        let array = [];
        this.user_routes.forEach(data => array.push(data.value))
        return array;
    }


    getUserRoutePassedValues(values){
        let array = [];
        values.forEach(data => array.push(data.value))
        return array;
    }


    // User Subroutes
    setUserSubroutes(array){
        this.user_subroutes = array;
    }


    removeObjectFromUserSubroutes(value){
        let user_subroutes = [];
        this.user_subroutes.forEach(data => {
            user_subroutes.push({value:data.value, label:data.label})
        })
        for (var i=0; i < user_subroutes.length; i++){
            if (user_subroutes[i].value === value) {
                user_subroutes.splice(i, 1);
                break;
            }
        }
        this.user_subroutes = user_subroutes;
    }


    // Route Options
    setRouteOptions(){
        axios.get('api/route/get_all')
             .then((response) => {
                let routes = response.data; 
                let array = [];
                if(routes.length > 0){
                    routes.forEach(data => {
                        array.push({value:data.id, label:data.name})
                    });
                }
                runInAction(() => {
                    this.route_options = array;
                })
             });
    }


    // Subroute Options
    setSubrouteOptions(array){
        this.subroute_options = array;
    }


    removeObjectFromSubrouteOptions(value){
        for (var i=0; i < this.subroute_options.length; i++){
            if (this.subroute_options[i].value === value) {
                this.subroute_options.splice(i, 1);
                break;
            }
        }
    }


    // List Handlers
    setSortField(sort_field){
        this.sort_field = sort_field;
    }

    setSortOrder(sort_order){
        this.sort_order = sort_order;
    }

    handleSearch(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.query = e.target.value;
        this.delaySearch();
    }

    handleSortSubmit(){
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.fetch();
    }

    handleRefreshClick(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.page_size = 10;
        this.query = "";
        this.filter_online_status = "";
        this.filter_su_status = "";
        this.sort_field = "";
        this.sort_order = "";
        this.selected_user = 0;
        this.fetch();
    }

    handlePageSizeClick(e){
        e.preventDefault()
        if(e.target.value > 0){
            this.page_prev = 0;
            this.page_current = 1;
            this.page_next = 2;
            this.page_size = e.target.value;
            this.fetch();
        }
    }

    handlePaginationClick(e, page_current){
        e.preventDefault()
        if(page_current > 0 && page_current <= this.page_limit){
            this.page_prev = page_current - 1;
            this.page_current = page_current;
            this.page_next = page_current + 1;
            this.fetch();
        }
    }

    handleFilterSubmit(){
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.fetch();
    }


}

const userStore = new UserStore()

export default userStore