import React from 'react';
import moment from 'moment';
import { numberFormat } from '../../Utils/DataFilters'

export class PayrollRegularMntReport extends React.Component {

    tableModValue(category, field, mod_value){
      var data = "";
      if(category === 1){
          switch (field) {
              case "paygroup":
                  data = <>{ this.props.payrollRegularMntStore.getPaygroupOptionsLabel(mod_value) }</>
                  break;
              case "station":
                data = <>{ this.props.payrollRegularMntStore.getStationOptionsLabel(mod_value) }</>
                break;
              case "status":
                data = <>{ this.props.payrollRegularMntStore.getStatusOptionsLabel(mod_value) }</>
                break;
              case "monthly_salary":
                  data = <>{ numberFormat(Number(mod_value), 2) }</>
                  break;
              default:
                  data = <>{ mod_value }</>
                  break;
          }
      }
      if(category === 2 || category === 3){
          data = <>{ numberFormat(Number(mod_value), 2) }</>
      }
      return data;
    }

    render() {
      return (
        <div style={{ margin:40 }}>

          <div className="mb-4 text-center">
            <h5 className="m-0 p-0">Sugar Regulatory Administration</h5>
            <p className="m-0 p-0">Sugar Center Bldg., North Avenue, Diliman, Quezon City</p>
            <h5 className="m-0 p-0">MAINTENANCE PAYROLL</h5>
            <p className="m-0 p-0">As of { moment(this.props.payrollRegularStore.process_date).format('MMMM, YYYY') }</p>
          </div>

          <table className="table table-xs" style={{ fontSize:'12px' }}>
            <thead>
              <tr>
                  <th className="p-1">Employee</th>
                  <th className="p-1">Field</th>
                  <th className="p-1">Description</th>
              </tr>
            </thead>
            <tbody>
              { this.props.payrollRegularMntStore.list.map(data => {
                  if(data.category === 1 || data.category === 2 || data.category === 3){
                    return (
                        <tr key={data.id}>
                            <td className="p-1">{ data.payroll_regular_data?.employee_no } - { data.payroll_regular_data?.fullname }</td>
                            <td className="p-1">{ this.props.payrollRegularMntStore.getParamOptionsLabel(data.field) }</td>
                            <td className="p-1">{ this.tableModValue(data.category, data.field, data.mod_value) }</td>
                        </tr>
                    )
                  }
                  if(data.category == 4){
                    return (
                        <tr key={data.id}>
                            <td className="p-1">{ data.payroll_regular_data?.employee_no } - { data.payroll_regular_data?.fullname }</td>
                            <td className="p-1"></td>
                            <td className="p-1"><p className="m-0 p-0 text-success" style={{ fontSize:'12px' }}>New Employee</p></td>
                        </tr>
                    )
                  }
                  if(data.category == 5){
                    return (
                        <tr key={data.id}>
                            <td className="p-1">{ data.payroll_regular_data?.employee_no } - { data.payroll_regular_data?.fullname }</td>
                            <td className="p-1"></td>
                            <td className="p-1"><p className="m-0 p-0 text-danger" style={{ fontSize:'12px' }}>Removed Employee</p></td>
                        </tr>
                    )
                  }
              })
              }
            </tbody>
          </table>
        </div>
      );
    }
  }