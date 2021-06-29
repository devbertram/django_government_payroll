import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class PayrollRegularStore{
    
    //  list vars
    list = [];
    total_records = 0;
    query = "";
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
	delaySearch = debounce(() => this.fetch(), 500);
    selected_data = "";
    is_opened_form = 0;

    // form vars
    payroll_regular_id = "";
    process_date = "";
    description = "";
    remarks = "";
    payroll_regular_data = [];
    error_fields = {};


    constructor(){
        makeAutoObservable(this)
    }


    // Actions
    fetch(){
        axios.get('api/payroll_regular', { 
            params: { 
                q: this.query, 
                page_size: this.page_size, 
                page: this.page_current, 
            }
        }).then((response) => {
            runInAction(() => {
                this.list = response.data.results
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
            })
        });
    }

    retrieve(id){
        axios.get('api/payroll_regular/' + id)
        .then((response) => {
            runInAction(() => {
                this.payroll_id = response.data.id;
                this.process_date = response.data.process_date;
                this.description = response.data.description;
                this.remarks = response.data.remarks;
                this.error_fields = {};
            })
        });
    }   

    handleSearch(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.query = e.target.value;
        this.delaySearch();
    }

    handleRefreshClick(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.page_size = 10;
        this.query = "";
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



    // List Setters
    setIsOpenedForm(is_opened_form){
        this.is_opened_form = is_opened_form;
    }

    setSelectedData(id){
        this.selected_data = id;
    }


    // Form Setters
    resetForm(){
        this.payroll_regular_id = "";
        this.description = "";
        this.remarks = "";
        this.process_date = "";
        this.error_fields = {};
    }

    setPayrollRegularId(payroll_regular_id){
        this.payroll_regular_id = payroll_regular_id;
    }

    setDescription(description){
        this.description = description;
    }

    setRemarks(remarks){
        this.remarks = remarks;
    }

    setProcessDate(process_date){
        this.process_date = process_date;
    }

    setErrorFields(ef){
        this.error_fields = ef;
    }


}

const payrollRegularStore = new PayrollRegularStore()
export default payrollRegularStore