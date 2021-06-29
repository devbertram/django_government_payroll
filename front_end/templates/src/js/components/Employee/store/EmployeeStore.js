
import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"
import moment from 'moment';
import { defaultValueSetter } from '../../Utils/DataFilters'

class EmployeeStore{

    // Static Values
    SEX_OPTIONS = [
        { value:0, label:"Select" },
        { value:1, label:"Male" },
        { value:2, label:"Female" },
    ]
    CIVIL_STATUS_OPTIONS = [
        { value:0, label:"Select" },
        { value:1, label:"Single" },
        { value:2, label:"Married" },
        { value:3, label:"Widow" },
    ]
    APPLICATION_STATUS_OPTIONS = [
        { value:0, label:"Select" },
        { value:1, label:"Permanent" },
        { value:2, label:"COS" },
    ]
    LEVEL_OPTIONS = [
        { value:0, label:"Select" },
        { value:1, label:"First" },
        { value:2, label:"Second" },
        { value:3, label:"RA1080" },
    ]
    SORT_FIELD_OPTIONS = [
        {value : "", label : "Select"},
        {value : "employee_id", label : "Employee No."},
        {value : "firstname", label : "Firstname"},
        {value : "lastname", label : "Lastname"},
        {value : "position", label : "Position"},
        {value : "birthdate", label : "Birthdate"},
        {value : "no_of_children", label : "Number of Children"},
        {value : "weight", label : "Weight"},
        {value : "height", label : "Height"},
        {value : "salary_grade", label : "Salary Grade"},
        {value : "monthly_salary", label : "Monthly Salary"},
        {value : "firstday_gov", label : "Firstday in Government"},
        {value : "firstday_sra", label : "Firstday in SRA"},
        {value : "first_appointment", label : "First Appointment"},
        {value : "last_appointment", label : "Last Appointment"},
        {value : "last_step_increment", label : "Last Step Increment"},
        {value : "last_adjustment", label : "Last Adjustment"},
        {value : "last_promotion", label : "Last Promotion"},
        {value : "original_appointment", label : "Original Appointment"},
        {value : "adjustment_date", label : "Adjustment Date"},
    ]
    SORT_ORDER_OPTIONS = [
        {value:"", label:"Select"}, 
        {value:"asc", label:'Ascending'}, 
        {value:"desc", label:'Descending'}
    ]


    // List Values
    list = [];
    total_records = 0;
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
    query = "";
    selected_employee = 0;
    is_opened_form = 0;
    is_selected_all_rows = false;
    selected_rows = [];
    table_badge = [];
	delaySearch = debounce(() => this.fetch(), 500);
    employee_options = [];
    
    // Filter Values
    filter_is_active = { value:"", label:"Select" };
    filter_station = { value:"", label:"Select" };
    filter_sex = { value:"", label:"Select" };
    filter_civil_status = { value:"", label:"Select" };
    filter_application_status = { value:"", label:"Select" };
    filter_level = { value:"", label:"Select" };
    filter_fd_gov_from = "";
    filter_fd_gov_to = "";
    filter_fd_sra_from = "";
    filter_fd_sra_to = "";
    filter_first_appt_from = "";
    filter_first_appt_to = "";
    filter_last_appt_from = "";
    filter_last_appt_to = "";
    filter_last_si_from = "";
    filter_last_si_to = "";
    filter_last_adj_from = "";
    filter_last_adj_to = "";
    filter_last_prom_from = "";
    filter_last_prom_to = "";
    sort_field = { value:"", label:"Select" };
    sort_order = { value:"", label:"Select" };
    station_options = [ { value:"", label:"Select" } ];

    // Form Values
    // - Personal Details
    fullname = "";
    firstname = "";
    middlename = "";
    lastname = "";
    suffixname = "";
    address_present = "";
    address_permanent = "";
    birthdate = "";
    place_of_birth = "";
    sex = 0;
    civil_status = { value:0, label:"Select" };
    tel_no = "";
    cell_no = "";
    email_address = "";
    spouse_name = "";
    spouse_occupation = "";
    no_of_children = "";
    height = "";
    weight = "";
    religion = "";
    blood_type = "";
    // - Appointment Details
    employee_id = "";
    position = "";
    is_active = null;
    salary_grade = "";
    step_increment = "";
    application_status = 0;
    tax_status = "";
    monthly_salary = "";
    firstday_gov = "";
    firstday_sra = "";
    first_appointment = "";
    last_appointment = "";
    last_step_increment = "";
    last_adjustment = "";
    last_promotion = "";
    original_appointment = "";
    adjustment_date = "";
    tin = "";
    gsis = "";
    philhealth = "";
    pagibig = "";
    sss = "";
    error_fields = {};


    // Educational Background List Values
    educ_bg_list = [];
    educ_bg_id = "";
    educ_bg_is_opened_form = 0;

    // Educational Background Form Values
    educ_bg_level = "";
    educ_bg_school = "";
    educ_bg_course = "";
    educ_bg_date_from = "";
    educ_bg_date_to = "";
    educ_bg_units = "";
    educ_bg_graduate_year = "";
    educ_bg_scholarship = "";
    educ_bg_honor = "";
    educ_bg_error_fields = {};


    // Eligibility List Values
    elig_list = [];
    elig_id = "";
    elig_is_opened_form = 0;

    // Eligibility Form Values
    elig_eligibility = "";
    elig_level = "";
    elig_rating = "";
    elig_exam_place = "";
    elig_exam_date = "";
    elig_license_no = "";
    elig_license_validity = "";
    elig_error_fields = {};




    constructor(){
        makeAutoObservable(this)
    }


    // Employee Actions
    fetch(){
        this.is_selected_all_rows = false;
        this.selected_rows = [];
        this.table_badge = [];
        axios.get('api/employee', { 
            params: { 
                q: this.query, 
                ia: this.filter_is_active.value, 
                st: this.filter_station.value, 
                se: this.filter_sex.value, 
                cs: this.filter_civil_status.value,
                as: this.filter_application_status.value,
                l: this.filter_level.value, 
                fd_g_f: this.filter_fd_gov_from, 
                fd_g_t: this.filter_fd_gov_to, 
                fd_s_f: this.filter_fd_sra_from, 
                fd_s_t: this.filter_fd_sra_to, 
                f_appt_f: this.filter_first_appt_from,
                f_appt_t: this.filter_first_appt_to,
                l_appt_f: this.filter_last_appt_from,
                l_appt_t: this.filter_last_appt_to,
                l_si_f: this.filter_last_si_from,
                l_si_t: this.filter_last_si_to,
                l_adj_f: this.filter_last_adj_from,
                l_adj_t: this.filter_last_adj_to,
                l_prom_f: this.filter_last_prom_from,
                l_prom_t: this.filter_last_prom_to,
                page_size: this.page_size, 
                page: this.page_current, 
                sort_field: this.sort_field.value,
                sort_order: this.sort_order.value, 
            }
        }).then((response) => {
            runInAction(() => {
                const employees = response.data.results;
                let array = [];
                this.list = employees
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
                employees.forEach(data => array.push({id:data.id, status:false}))
                this.selected_rows = array;
                this.setTableBadge()
            })
        });
    }

    retrieve(id){
        axios.get('api/employee/' + id)
        .then((response) => {
            runInAction(() => {
                // - Personal Details
                this.fullname = response.data.fullname;
                this.firstname = response.data.firstname;
                this.middlename = response.data.middlename;
                this.lastname = response.data.lastname;
                this.suffixname = response.data.suffixname;
                this.address_present = response.data.address_present;
                this.address_permanent = response.data.address_permanent;
                this.birthdate = defaultValueSetter(response.data.birthdate, null, "");
                this.place_of_birth = response.data.place_of_birth
                this.sex = response.data.sex;
                this.civil_status = this.CIVIL_STATUS_OPTIONS.find(data => data.value == response.data.civil_status);
                this.tel_no = response.data.tel_no;
                this.cell_no = response.data.cell_no;
                this.email_address = response.data.email_address;
                this.spouse_name = response.data.spouse_name;
                this.spouse_occupation = response.data.spouse_occupation;
                this.no_of_children = defaultValueSetter(response.data.no_of_children, 0, "");
                this.height = response.data.height;
                this.weight = response.data.weight;
                this.religion = response.data.religion;
                this.blood_type = response.data.blood_type;
                // - Appointment Details
                this.employee_id = response.data.employee_id;
                this.position = response.data.position;
                this.is_active = response.data.is_active;
                this.salary_grade = defaultValueSetter(response.data.salary_grade, 0, "");
                this.step_increment = defaultValueSetter(response.data.step_increment, 0, "");
                this.application_status = response.data.application_status;
                this.tax_status = response.data.tax_status;
                this.monthly_salary = defaultValueSetter(response.data.monthly_salary, 0, "");
                this.firstday_gov = defaultValueSetter(response.data.firstday_gov, null, "");
                this.firstday_sra = defaultValueSetter(response.data.firstday_sra, null, "");
                this.first_appointment = defaultValueSetter(response.data.first_appointment, null, "");
                this.last_appointment = defaultValueSetter(response.data.last_appointment, null, "");
                this.last_step_increment = defaultValueSetter(response.data.last_step_increment, null, "");
                this.last_adjustment = defaultValueSetter(response.data.last_adjustment, null, "");
                this.last_promotion = defaultValueSetter(response.data.last_promotion, null, "");
                this.original_appointment = defaultValueSetter(response.data.original_appointment, null, "");
                this.adjustment_date = defaultValueSetter(response.data.adjustment_date, null, "");
                this.tin = response.data.tin;
                this.gsis = response.data.gsis;
                this.philhealth = response.data.philhealth;
                this.pagibig = response.data.pagibig;
                this.sss = response.data.sss;
                this.error_fields = {};
                this.educ_bg_list = response.data.employeeEB_employee
                this.educ_bg_error_fields = {};
                this.elig_list = response.data.employeeELIG_employee
                this.elig_error_fields = {};
            })
        });
    }

    getAll(){
        this.employee_options = [];
        axios.get('api/employee/get_all')
        .then((response) => {
            runInAction(() => {
                response.data.map(data => {
                    this.employee_options.push({value:data.id, label:data.fullname})
                })
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

    handleFilterSubmit(){
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.fetch();
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
        this.filter_is_active = { value:"", label:"Select" };
        this.filter_station = { value:"", label:"Select" };
        this.filter_sex = { value:"", label:"Select" };
        this.filter_civil_status = { value:"", label:"Select" };
        this.filter_application_status = { value:"", label:"Select" };
        this.filter_level = { value:"", label:"Select" };
        this.filter_fd_gov_from = "", 
        this.filter_fd_gov_to = "", 
        this.filter_fd_sra_from = "", 
        this.filter_fd_sra_to = "", 
        this.filter_first_appt_from = "",
        this.filter_first_appt_to = "",
        this.filter_last_appt_from = "",
        this.filter_last_appt_to = "",
        this.filter_last_si_from = "",
        this.filter_last_si_to = "",
        this.filter_last_adj_from = "",
        this.filter_last_adj_to = "",
        this.filter_last_prom_from = "",
        this.filter_last_prom_to = "",
        this.sort_field = "";
        this.sort_order = "";
        this.selected_employee = 0;
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
    

    // Options Getters
    getSexLabel(){
        let sex_obj = { value:"", label:"" }
        if(this.sex != 0){
            sex_obj = this.SEX_OPTIONS.find(data => data.value == this.sex );
        }
        return sex_obj.label;
    }

    getCivilStatusLabel(){
        let cs_obj = { value:"", label:"" }
        if(this.civil_status.value != 0){
            cs_obj = this.CIVIL_STATUS_OPTIONS.find(data => data.value == this.civil_status.value);
        }
        return cs_obj.label;
    }

    getApplicationStatusLabel(){
        let appl_obj = { value:"", label:"" }
        if(this.application_status != 0){
            appl_obj = this.APPLICATION_STATUS_OPTIONS.find(data => data.value == this.application_status);
        }
        return appl_obj.label;
    }


    // List Values Setters
    setFilterIsActive(is_active){
        this.filter_is_active = is_active;
    }

    setFilterStation(station){
        this.filter_station = station;
    }

    setFilterSex(sex){
        this.filter_sex = sex;
    }

    setFilterCivilStatus(civil_status){
        this.filter_civil_status = civil_status;
    }

    setFilterApplicationStatus(application_status){
        this.filter_application_status = application_status;
    }

    setFilterLevel(level){
        this.filter_level = level;
    }

    setFilterFdGovFrom(from){
        this.filter_fd_gov_from = from;
    }

    setFilterFdGovTo(to){
        this.filter_fd_gov_to = to;
    }

    setFilterFdSRAFrom(from){
        this.filter_fd_sra_from = from;
    }

    setFilterFdSRATo(to){
        this.filter_fd_sra_to = to;
    }

    setFilterFirstApptFrom(from){
        this.filter_first_appt_from = from;
    }

    setFilterFirstApptTo(to){
        this.filter_first_appt_to = to;
    }

    setFilterLastApptFrom(from){
        this.filter_last_appt_from = from;
    }

    setFilterLastApptTo(to){
        this.filter_last_appt_to = to;
    }

    setFilterLastSiFrom(from){
        this.filter_last_si_from = from;
    }

    setFilterLastSiTo(to){
        this.filter_last_si_to = to;
    }

    setFilterLastAdjFrom(from){
        this.filter_last_adj_from = from;
    }

    setFilterLastAdjTo(to){
        this.filter_last_adj_to = to;
    }

    setFilterLastPromFrom(from){
        this.filter_last_prom_from = from;
    }

    setFilterLastPromTo(to){
        this.filter_last_prom_to = to;
    }

    setSortField(sort_field){
        this.sort_field = sort_field;
    }

    setSortOrder(sort_order){
        this.sort_order = sort_order;
    }

    setTableBadge(){
        if(this.filter_is_active.value !== ""){
            let is_active_string = this.filter_is_active.value === 1 ? "Active" : "Inactive"
            this.table_badge.push({label:"Status:", value:is_active_string, field:"filter_is_active"})
        }
        if(this.filter_station.value !== ""){
            let station_obj = this.station_options.findIndex(data => data.value === this.filter_station.value)
            this.table_badge.push({label:"Station:", value:this.station_options[station_obj].label, field:"filter_station"})
        }
        if(this.filter_sex.value !== ""){
            let sex_obj = this.SEX_OPTIONS.findIndex(data => data.value === this.filter_sex.value)
            this.table_badge.push({label:"Sex:", value:this.SEX_OPTIONS[sex_obj].label, field:"filter_sex"})
        }
        if(this.filter_civil_status.value !== ""){
            let cs_obj = this.CIVIL_STATUS_OPTIONS.findIndex(data => data.value === this.filter_civil_status.value)
            this.table_badge.push({label:"Civil Status:", value:this.CIVIL_STATUS_OPTIONS[cs_obj].label, field:"filter_civil_status"})
        }
        if(this.filter_application_status.value !== ""){
            let as_obj = this.APPLICATION_STATUS_OPTIONS.findIndex(data => data.value === this.filter_application_status.value)
            this.table_badge.push({label:"Application Status:", value:this.APPLICATION_STATUS_OPTIONS[as_obj].label, field:"filter_application_status"})
        }
        if(this.filter_level.value !== ""){
            let as_obj = this.LEVEL_OPTIONS.findIndex(data => data.value === this.filter_level.value)
            this.table_badge.push({label:"Level:", value:this.LEVEL_OPTIONS[as_obj].label, field:"filter_level"})
        }
        if(this.filter_fd_gov_from != "" && this.filter_fd_gov_to){
            let fd_gov = moment(this.filter_fd_gov_from).format("MM/DD/YYYY") +" to "+ moment(this.filter_fd_gov_to).format("MM/DD/YYYY");
            this.table_badge.push({label:"Firstday Gov:", value:fd_gov, field:"filter_fd_gov"})
        }
        if(this.filter_fd_sra_from != "" && this.filter_fd_sra_to){
            let fd_sra = moment(this.filter_fd_sra_from).format("MM/DD/YYYY") +" to "+ moment(this.filter_fd_sra_to).format("MM/DD/YYYY");
            this.table_badge.push({label:"Firstday SRA:", value:fd_sra, field:"filter_fd_sra"})
        }
        if(this.filter_first_appt_from != "" && this.filter_first_appt_to){
            let fd_f_appt = moment(this.filter_first_appt_from).format("MM/DD/YYYY") +" to "+ moment(this.filter_first_appt_to).format("MM/DD/YYYY");
            this.table_badge.push({label:"First Appointment:", value:fd_f_appt, field:"filter_first_appt"})
        }
        if(this.filter_last_appt_from != "" && this.filter_last_appt_to){
            let fd_last_appt = moment(this.filter_last_appt_from).format("MM/DD/YYYY") +" to "+ moment(this.filter_last_appt_to).format("MM/DD/YYYY");
            this.table_badge.push({label:"Last Appointment:", value:fd_last_appt, field:"filter_last_appt"})
        }
        if(this.filter_last_si_from != "" && this.filter_last_si_to){
            let fd_last_si = moment(this.filter_last_si_from).format("MM/DD/YYYY") +" to "+ moment(this.filter_last_si_to).format("MM/DD/YYYY");
            this.table_badge.push({label:"Last Step Inc.:", value:fd_last_si, field:"filter_last_si"})
        }
        if(this.filter_last_adj_from != "" && this.filter_last_adj_to){
            let fd_last_adj = moment(this.filter_last_adj_from).format("MM/DD/YYYY") +" to "+ moment(this.filter_last_adj_to).format("MM/DD/YYYY");
            this.table_badge.push({label:"Last Adjustment:", value:fd_last_adj, field:"filter_last_adj"})
        }
        if(this.filter_last_prom_from != "" && this.filter_last_prom_to){
            let fd_last_prom = moment(this.filter_last_prom_from).format("MM/DD/YYYY") +" to "+ moment(this.filter_last_prom_to).format("MM/DD/YYYY");
            this.table_badge.push({label:"Last Promotion:", value:fd_last_prom, field:"filter_last_prom"})
        }
        if(this.sort_field.value != "" && this.sort_order.value != ""){
            let sort_field_obj = this.SORT_FIELD_OPTIONS.findIndex(data => data.value === this.sort_field.value)
            let sort_order_obj = this.SORT_ORDER_OPTIONS.findIndex(data => data.value === this.sort_order.value)
            let sort_text = this.SORT_FIELD_OPTIONS[sort_field_obj].label +", "+ this.SORT_ORDER_OPTIONS[sort_order_obj].label
            this.table_badge.push({label:"Sort:", value:sort_text, field:"sort"})
        }
    }

    setSelectedEmployee(selected_employee){
        this.selected_employee = selected_employee;
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

    setStationOptions(){
        axios.get('api/station/get_all')
             .then((response) => {
                runInAction(() => {
                    let stations = response.data;
                    if(stations.length > 0){
                        stations.forEach(data => {
                            this.station_options.push({ value:data.station_id, label:data.name });
                        });
                    }
                })
        });
    }


    // Form Values Setters
    resetForm(){
        this.firstname = "";
        this.middlename = "";
        this.lastname = "";
        this.suffixname = "";
        this.address_present = "";
        this.address_permanent = "";
        this.birthdate = "";
        this.place_of_birth = "";
        this.sex = 0;
        this.civil_status = { value:0, label:"Select" };
        this.tel_no = "";
        this.cell_no = "";
        this.email_address = "";
        this.spouse_name = "";
        this.spouse_occupation = "";
        this.no_of_children = "";
        this.height = "";
        this.weight = "";
        this.religion = "";
        this.blood_type = "";
        // - Appointment Details
        this.employee_id = "";
        this.position = "";
        this.is_active = "";
        this.salary_grade = "";
        this.step_increment = "";
        this.application_status = 0;
        this.tax_status = "";
        this.monthly_salary = "";
        this.firstday_gov = "";
        this.firstday_sra = "";
        this.first_appointment = "";
        this.last_appointment = "";
        this.last_step_increment = "";
        this.last_adjustment = "";
        this.last_promotion = "";
        this.original_appointment = "";
        this.adjustment_date = "";
        this.tin = "";
        this.gsis = "";
        this.philhealth = "";
        this.pagibig = "";
        this.sss = "";
        this.error_fields = {};
    }

    setFirstname(firstname){
        this.firstname = firstname;
    }

    setMiddlename(middlename){
        this.middlename = middlename;
    }

    setLastname(lastname){
        this.lastname = lastname;
    }

    setSuffixname(suffixname){
        this.suffixname = suffixname;
    }

    setAddressPresent(address_present){
        this.address_present = address_present;
    }

    setAddressPermanent(address_permanent){
        this.address_permanent = address_permanent;
    }

    setBirthdate(birthdate){
        this.birthdate = birthdate;
    }

    setPlaceOfBirth(place_of_birth){
        this.place_of_birth = place_of_birth;
    }

    setSex(sex){
        this.sex = sex;
    }

    setCivilStatus(civil_status){
        this.civil_status = civil_status;
    }

    setTelNo(tel_no){
        this.tel_no = tel_no;
    }

    setCellNo(cell_no){
        this.cell_no = cell_no;
    }

    setEmailAddress(email_address){
        this.email_address = email_address;
    }

    setSpouseName(spouse_name){
        this.spouse_name = spouse_name;
    }

    setSpouseOccupation(spouse_occupation){
        this.spouse_occupation = spouse_occupation;
    }

    setNoOfChildren(no_of_children){
        this.no_of_children = no_of_children;
    }

    setHeight(height){
        this.height = height;
    }

    setWeight(weight){
        this.weight = weight;
    }

    setReligion(religion){
        this.religion = religion;
    }

    setBloodType(blood_type){
        this.blood_type = blood_type;
    }

    setEmployeeId(employee_id){
        this.employee_id = employee_id;
    }

    setPosition(position){
        this.position = position;
    }

    setIsActive(is_active){
        this.is_active = is_active;
    }

    setSalaryGrade(salary_grade){
        this.salary_grade = salary_grade;
    }

    setStepIncrement(step_increment){
        this.step_increment = step_increment;
    }

    setApplicationStatus(application_status){
        this.application_status = application_status;
    }

    setTaxStatus(tax_status){
        this.tax_status = tax_status;
    }

    setMonthlySalary(monthly_salary){
        this.monthly_salary = monthly_salary;
    }

    setFirstdayGov(firstday_gov){
        this.firstday_gov = firstday_gov;
    }

    setFirstdaySRA(firstday_sra){
        this.firstday_sra = firstday_sra;
    }

    setFirstAppointment(first_appointment){
        this.first_appointment = first_appointment;
    }

    setLastAppointment(last_appointment){
        this.last_appointment = last_appointment;
    }

    setLastStepIncrement(last_step_increment){
        this.last_step_increment = last_step_increment;
    }

    setLastAdjustment(last_adjustment){
        this.last_adjustment = last_adjustment;
    }

    setLastAdjustment(last_adjustment){
        this.last_adjustment = last_adjustment;
    }

    setLastPromotion(last_promotion){
        this.last_promotion = last_promotion;
    }

    setOriginalAppointment(original_appointment){
        this.original_appointment = original_appointment;
    }

    setAdjustmentDate(adjustment_date){
        this.adjustment_date = adjustment_date;
    }

    setTin(tin){
        this.tin = tin;
    }

    setGsis(gsis){
        this.gsis = gsis;
    }

    setPhilhealth(philhealth){
        this.philhealth = philhealth;
    }

    setPagibig(pagibig){
        this.pagibig = pagibig;
    }

    setSss(sss){
        this.sss = sss;
    }

    setErrorFields(error_fields){
        this.error_fields = error_fields;
    }


    // Educational Background Actions
    retrieveEducBg(id){
        this.educBgResetForm();
        axios.get('api/employee_educ_bg/' + id)
        .then((response) => {
            runInAction(() => {
                this.educ_bg_id = response.data.id;
                this.educ_bg_level = response.data.level;
                this.educ_bg_school = response.data.school;
                this.educ_bg_course = response.data.course;
                this.educ_bg_date_from = response.data.date_from;
                this.educ_bg_date_to = response.data.date_to;
                this.educ_bg_units = defaultValueSetter(response.data.units, "0.00", "")
                this.educ_bg_graduate_year = response.data.graduate_year;
                this.educ_bg_scholarship = response.data.scholarship;
                this.educ_bg_honor = response.data.honor;
            })
        });
    }    


    // Educational Background List Values Setters
    setEducBgIsOpenedForm(is_opened_form){
        this.educ_bg_is_opened_form = is_opened_form;
    }


    // Educational Background Form Setters
    educBgResetForm(){
        this.educ_bg_id = "";
        this.educ_bg_level = "";
        this.educ_bg_school = "";
        this.educ_bg_course = "";
        this.educ_bg_date_from = "";
        this.educ_bg_date_to = "";
        this.educ_bg_units = "";
        this.educ_bg_graduate_year = "";
        this.educ_bg_scholarship = "";
        this.educ_bg_honor = "";
        this.educ_bg_error_fields = {};
    }

    setEducBgId(id){
        this.educ_bg_id = id;
    }

    setEducBgLevel(level){
        this.educ_bg_level = level;
    }

    setEducBgSchool(school){
        this.educ_bg_school = school;
    }

    setEducBgCourse(course){
        this.educ_bg_course = course;
    }

    setEducBgDateFrom(date_from){
        this.educ_bg_date_from = date_from;
    }

    setEducBgDateTo(date_to){
        this.educ_bg_date_to = date_to;
    }

    setEducBgUnits(units){
        this.educ_bg_units = units;
    }

    setEducBgGraduateYear(graduate_year){
        this.educ_bg_graduate_year = graduate_year;
    }

    setEducBgScholarship(scholarship){
        this.educ_bg_scholarship = scholarship;
    }

    setEducBgHonor(honor){
        this.educ_bg_honor = honor;
    }

    setEducBgErrorFields(error_fields){
        this.educ_bg_error_fields = error_fields;
    }


    // Eligibility Actions
    retrieveElig(id){
        this.eligResetForm();
        axios.get('api/employee_elig/' + id)
        .then((response) => {
            runInAction(() => {
                this.elig_id = response.data.id;
                this.elig_eligibility = response.data.eligibility;
                this.elig_level = response.data.level;
                this.elig_rating = defaultValueSetter(response.data.rating, "0.00", "");
                this.elig_exam_place = response.data.exam_place;
                this.elig_exam_date = response.data.exam_date;
                this.elig_license_no = response.data.license_no;
                this.elig_license_validity = response.data.license_validity;
                this.educ_bg_scholarship = response.data.scholarship;
                this.educ_bg_honor = response.data.honor;
            })
        });
    } 

    // Eligibility List Values Setters
    setEligIsOpenedForm(is_opened_form){
        this.elig_is_opened_form = is_opened_form;
    }

    // Eligibility Form Value Setters
    eligResetForm(){
        this.elig_id = "";
        this.elig_eligibility = "";
        this.elig_level = "";
        this.elig_rating = "";
        this.elig_exam_place = "";
        this.elig_exam_date = "";
        this.elig_license_no = "";
        this.elig_license_validity = "";
        this.elig_error_fields = {};
    }

    setEligId(id){
        this.elig_id = id;
    }

    setEligEligibility(eligibility){
        this.elig_eligibility = eligibility;
    }

    setEligLevel(level){
        this.elig_level = level;
    }

    setEligRating(rating){
        this.elig_rating = rating;
    }

    setEligExamPlace(exam_place){
        this.elig_exam_place = exam_place;
    }

    setEligExamDate(exam_date){
        this.elig_exam_date = exam_date;
    }

    setEligLicenseNo(license_no){
        this.elig_license_no = license_no;
    }

    setEligLicenseValidity(license_validity){
        this.elig_license_validity = license_validity;
    }

    setEligErrorFields(error_fields){
        this.elig_error_fields = error_fields;
    }


}

const employeeStore = new EmployeeStore()
export default employeeStore