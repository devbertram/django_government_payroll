import { debounce } from "lodash"
import { makeAutoObservable, runInAction } from "mobx"
import payrollRegularMntStore from "./payrollRegularMntStore"

class PayrollRegularDataStore{
    
    //  list vars
    list = [];
    list_all = [];
    filtered_list_all = [];
    total_records = 0;
    query = "";
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 20;
    page_limit = 0;
	delaySearch = debounce(() => this.fetch(), 500);
    selected_data = "";
    is_opened_form = 0;
    options = [];

    // form vars
    payroll_regular_id = "";
    form_data = {
        employee: { value:"", label:'Select' },
        fullname: '',
        station: { value:"", label:'Select' },
        position: '',
        paygroup: { value:0, label:'Select' },
        salary_grade: '',
        step_increment: '',
        monthly_salary: '',
        plantilla_item: '',
        status: { value:0, label:'Select' },
        atm_account_no: '',
        tin: '',
        gsis: '',
        philhealth: '',
        pagibig: '',
        sss: '',
        is_new: false,
        is_removed: false,
        payrollRegularDataDeduc_payrollRegularData:[],
        payrollRegularDataAllow_payrollRegularData:[],
    };
    error_fields = {};

    // print vars
    print_form_data = {
        paygroup: { value:0, label:'Select' },
    }
    print_error_fields = {};


    constructor(){
        makeAutoObservable(this)
    }


    // Actions
    fetch(){
        axios.get('api/payroll_regular_data', { 
            params: { 
                q: this.query,
                page_size: this.page_size,
                page: this.page_current,
                pr_id: this.payroll_regular_id
            }
        }).then((response) => {
            runInAction(() => {
                this.list = response.data.results
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
            })
        });
    }

    getByPrId(){
        axios.get('api/payroll_regular_data/get_by_payroll_regular_id', { 
            params: { 
                pr_id: this.payroll_regular_id
            }
        }).then((response) => {
            runInAction(() => {
                var prd_options = []; 
                response.data.map(data => {
                    prd_options.push({ value:data.id, label:data.employee_no+" - "+data.fullname },)
                })
                this.options = prd_options;
                this.list_all = response.data;
            })
        });
    }

    retrieve(id){
        this.form_data = {};
        axios.get('api/payroll_regular_data/' + id)
        .then((response) => {
            runInAction(() => {

                // DECLARE ARRAY
                let deductions = [];
                let allowances = [];

                // FIND OPTION OBJ
                const paygroup = payrollRegularMntStore.PAYGROUP_OPTIONS.find(data => data.value == response.data.paygroup)
                const status = payrollRegularMntStore.STATUS_OPTIONS.find(data => data.value == response.data.status)

                // PUSH DEDUCTIONS AND ALLOWANCES INTO DECLARED ARRAY
                response.data.payrollRegularDataDeduc_payrollRegularData.map(data => {
                    deductions.push({ 
                        value: data.deduction.id, 
                        label: data.deduction.code+' - '+data.deduction.name, 
                        code: data.code,
                        amount: data.amount,
                        priority_seq: data.priority_seq,
                    })
                })
                response.data.payrollRegularDataAllow_payrollRegularData.map(data => {
                    allowances.push({ 
                        value: data.allowance.id, 
                        label: data.allowance.code+' - '+data.allowance.name,  
                        code: data.code,
                        amount: data.amount,
                    })
                })
                
                // IF DEDUCTION OR ALLOWANCE EXIST IN MAINTENANCE PUSH TO DECLARED ARRAY
                response.data.payrollRegularMnt_payrollRegularData.map(data_mnt => {
                    if(data_mnt.category === 2){
                        let deduc = deductions.find(data_deduc => data_deduc.code === data_mnt.field)
                        if(!deduc){
                            deductions.push({ 
                                label: data_mnt.field+" - "+data_mnt.field_description, 
                                code: data_mnt.field, 
                                amount: data_mnt.mod_value,
                                priority_seq: data_mnt.deduc_priority_seq,
                            })
                        }
                    }
                    if(data_mnt.category === 3){
                        let allow = allowances.find(data_allow => data_allow.code === data_mnt.field)
                        if(!allow){
                            allowances.push({ 
                                label: data_mnt.field+" - "+data_mnt.field_description, 
                                code: data_mnt.field, 
                                amount: data_mnt.mod_value,
                                
                            })
                        }
                    }
                })

                // SORT DECLARED ARRAYS
                deductions = deductions.sort(
                    function(a, b){
                        if ( Number(a.code.substring(1)) < Number(b.code.substring(1)) ){ return -1;}
                        if ( Number(a.code.substring(1)) > Number(b.code.substring(1)) ){ return 1; }
                        return 0;
                    }
                )
                allowances = allowances.sort(
                    function(a, b){
                        if ( Number(a.code.substring(5)) < Number(b.code.substring(5)) ){ return -1; }
                        if ( Number(a.code.substring(5)) > Number(b.code.substring(5)) ){ return 1; }
                        return 0;
                    }
                )

                // SET FORM DATA
                this.form_data = {
                    id:response.data.id,
                    employee: { value:response.data.employee?.id, label:response.data.fullname},
                    employee_no: response.data.employee_no,
                    station: { value:response.data.station?.id, label:response.data.station?.name },
                    station_id: response.data.station.id,
                    fullname: response.data.fullname,
                    position: response.data.position,
                    paygroup: { value:response.data.paygroup, label:paygroup?.label },
                    salary_grade: response.data.salary_grade,
                    step_increment: response.data.step_increment,
                    monthly_salary: response.data.monthly_salary,
                    plantilla_item: response.data.plantilla_item,
                    status: { value:response.data.status, label:status?.label },
                    atm_account_no: response.data.atm_account_no,
                    tin: response.data.tin,
                    gsis: response.data.gsis,
                    philhealth: response.data.philhealth,
                    pagibig: response.data.pagibig,
                    sss: response.data.sss,
                    is_new:response.data.is_new,
                    is_removed:response.data.is_removed,
                    payrollRegularDataDeduc_payrollRegularData: deductions,
                    payrollRegularDataAllow_payrollRegularData: allowances,
                    payrollRegularMnt_payrollRegularData: response.data.payrollRegularMnt_payrollRegularData,
                };

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

    setQuery(query){
        this.query = query;
    }

    setFilteredListAll(list){
        this.filtered_list_all = list;
    }

    getSelectedDataMaintenanceDetails(field){
        if(this.form_data.payrollRegularMnt_payrollRegularData){
            const mnt = [...this.form_data.payrollRegularMnt_payrollRegularData]
            return mnt.find(data => data.field === field)
        }else{
            return null;
        }
    }


    // Form Setters
    resetForm(){
        this.form_data = {
            employee: { value:'', label:'Select' },
            fullname: '',
            station: { value:'', label:'Select' },
            position: '',
            paygroup: { value:0, label:'Select' },
            salary_grade: '',
            step_increment: '',
            monthly_salary: '',
            plantilla_item: '',
            status: { value:0, label:'Select' },
            atm_account_no: '',
            tin: '',
            gsis: '',
            philhealth: '',
            pagibig: '',
            sss: '',
            payrollRegularDataDeduc_payrollRegularData:[],
            payrollRegularDataAllow_payrollRegularData:[],
        };
        this.error_fields = {};
    }

    setPayrollRegularId(payroll_regular_id){
        this.payroll_regular_id = payroll_regular_id;
    }

    setFormData(value, field){
        switch (field) {
            case "employee":
                this.form_data.employee = value
                break;
            case "fullname":
                this.form_data.fullname = value
                break;
            case "station":
                this.form_data.station = value
                break;
            case "position":
                this.form_data.position = value
                break;
            case "paygroup":
                this.form_data.paygroup = value
                break;
            case "salary_grade":
                this.form_data.salary_grade = value
                break;
            case "step_increment":
                this.form_data.step_increment = value
                break;
            case "monthly_salary":
                this.form_data.monthly_salary = value
                break;
            case "plantilla_item":
                this.form_data.plantilla_item = value
                break;
            case "status":
                this.form_data.status = value
                break;
            case "atm_account_no":
                this.form_data.atm_account_no = value
                break;
            case "tin":
                this.form_data.tin = value
                break;
            case "gsis":
                this.form_data.gsis = value
                break;
            case "philhealth":
                this.form_data.philhealth = value
                break;
            case "pagibig":
                this.form_data.pagibig = value
                break;
            case "sss":
                this.form_data.sss = value
                break;
        default:
                break;
        }
    }

    addDeduction(){
        this.form_data.payrollRegularDataDeduc_payrollRegularData = [
            ...this.form_data.payrollRegularDataDeduc_payrollRegularData, { value:"", label:"", code:"", amount:""}
        ]
    }

    modifyDeduction(index, name, value){
        const list = [...this.form_data.payrollRegularDataDeduc_payrollRegularData];
        if(name === 'value'){
            list[index][name] = value.value;
            list[index]['label'] = value.label;
        }else{
            list[index][name] = value;
        }
        this.form_data.payrollRegularDataDeduc_payrollRegularData = list;
    }

    deleteDeduction(index){
        const list = [... this.form_data.payrollRegularDataDeduc_payrollRegularData];
        list.splice(index, 1);
        this.form_data.payrollRegularDataDeduc_payrollRegularData = list;
    }

    addAllowance(){
        this.form_data.payrollRegularDataAllow_payrollRegularData = [
            ...this.form_data.payrollRegularDataAllow_payrollRegularData, { value:"", label:"", code:"", amount:""}
        ]
    }

    modifyAllowance(index, name, value){
        const list = [...this.form_data.payrollRegularDataAllow_payrollRegularData];
        if(name === 'value'){
            list[index][name] = value.value;
            list[index]['label'] = value.label;
        }else{
            list[index][name] = value;
        }
        this.form_data.payrollRegularDataAllow_payrollRegularData = list;
    }

    deleteAllowance(index){
        const list = [... this.form_data.payrollRegularDataAllow_payrollRegularData];
        list.splice(index, 1);
        this.form_data.payrollRegularDataAllow_payrollRegularData = list;
    }

    setErrorFields(error_fields){
        this.error_fields = error_fields;
    }


    // Print Form Setters
    setPrintFormData(value, field){
        switch (field) {
            case "paygroup":
                this.print_form_data.paygroup = value
                break;
        default:
                break;
        }
    }

    setPrintErrorFields(pef){
        this.print_error_fields = pef;
    }


}

const payrollRegularDataStore = new PayrollRegularDataStore()

export default payrollRegularDataStore