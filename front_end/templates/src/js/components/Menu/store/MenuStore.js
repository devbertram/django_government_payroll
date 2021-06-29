
import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class MenuStore{

    // List
    list = [];
    total_records = 0;
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
    query = "";
    sort_field = "";
    sort_order = "";

	delaySearch = debounce(() => this.fetch(), 500); // search delay
    selected_route = 0; // selected menu id after create or update
    is_opened_form = 0; // 0 = create form, 1 = update form
    is_selected_all_rows = false; // is all checkbox selected
    selected_rows = []; // rows that are selected via checkbox

    // Form
    category = "";
    name = "";
    is_menu = null;
    is_dropdown = null;
    nav_name = "";
    icon = "";
    url = "";
    url_name = "";
    subroutes = [];
    error_fields = {};


    constructor(){
        makeAutoObservable(this)
    }


    fetch(){
        this.is_selected_all_rows = false;
        this.selected_rows = [];
        axios.get('api/route', { 
            params: { 
                q: this.query, 
                page_size: this.page_size, 
                page: this.page_current, 
                sort_field: this.sort_field.value,
                sort_order: this.sort_order.value, 
            }
        }).then((response) => {
            runInAction(() => {
                const routes = response.data.results;
                let array = [];
                this.list = routes
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
                routes.forEach(data => array.push({id:data.id, status:false}))
                this.selected_rows = array;
            })
        });
    }

    retrieve(id){
        axios.get('api/route/' + id)
        .then((response) => {
            runInAction(() => {
                const res_subroutes = response.data.subroute_route;
                let subroutes = [];
                this.category = response.data.category
                this.name = response.data.name
                this.is_menu = response.data.is_menu
                this.is_dropdown = response.data.is_dropdown
                this.nav_name = response.data.nav_name
                this.icon= response.data.icon
                this.url = response.data.url
                this.url_name = response.data.url_name
                // Set Subroutes
                res_subroutes.forEach(data => {
                    subroutes.push({
                        id: data.id,
                        is_nav: data.is_nav, 
                        name: data.name, 
                        nav_name: data.nav_name, 
                        url: data.url, 
                        url_name: data.url_name, 
                        is_from_query: true, 
                    })
                });
                this.subroutes = subroutes;
                this.error_fields = {};
            })
        });
    }

    
    // List Setters
    setSelectedRoute(selected_route){
        this.selected_route = selected_route;
    }

    setIsOpenedForm(is_opened_form){
        this.is_opened_form = is_opened_form;
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
        this.category = "";
        this.name = "";
        this.nav_name = "";
        this.is_menu = null;
        this.is_dropdown = null;
        this.icon = "";
        this.url = "";
        this.url_name = "";
        this.subroutes = [];
        this.error_fields = {};
    }

    setCategory(cat){
        this.category = cat;
    }

    setName(name){
        this.name = name;
    }

    setIsMenu(is_menu){
        this.is_menu = is_menu;
    }

    setIsDropdown(is_dropdown){
        this.is_dropdown = is_dropdown;
    }

    setNavName(nav_name){
        this.nav_name = nav_name;
    }

    setIcon(icon){
        this.icon = icon;
    }

    setUrl(url){
        this.url = url;
    }

    setUrlName(url_name){
        this.url_name = url_name;
    }

    addSubroutes(){
        this.subroutes = [...this.subroutes, { name:"", is_nav:"", nav_name:"", url:"", url_name:"" }]
    }

    modifySubroutes(index, e){
        const list = [...this.subroutes];
        list[index][e.target.name] = e.target.value;
        this.subroutes = list;
    }

    deleteSubroutes(index){
        const list = [...this.subroutes];
        list.splice(index, 1);
        this.subroutes = list;
    }

    setSubroutes(subroutes){
        this.subroutes = subroutes;
    }

    findSubrouteById(value){
        const subroutes = this.subroutes;
        subroutes.find((data)=>{
            return data.id === value;
        })
        return subroutes;
    }

    findSubrouteByKey(key){
        const subroutes = this.subroutes;
        return subroutes[key];
    }

    setErrorFields(obj){
        this.error_fields = obj;
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
        this.sort_field = "";
        this.sort_order = "";
        this.selected_route = 0;
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


}

const menuStore = new MenuStore()

export default menuStore