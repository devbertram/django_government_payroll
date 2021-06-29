import React from 'react';
import {observer} from "mobx-react";
import moment from 'moment';
import { numberFormat } from '../../Utils/DataFilters'

@observer 
class PayrollRegularDataReport extends React.Component {

  render() {
    return (
      <div style={{ margin:40 }}>

        <div className="mb-4 text-center">
          <h5 className="m-0 p-0">Sugar Regulatory Administration</h5>
          <p className="m-0 p-0">Sugar Center Bldg., North Avenue, Diliman, Quezon City</p>
          <h5 className="m-0 p-0">PAYROLL</h5>
          {/* <p className="m-0 p-0">As of { moment(this.props.payrollRegularStore.process_date).format('MMMM, YYYY') }</p> */}
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
            { this.props.payrollRegularDataStore.filtered_list_all.map(data => {
              return (
                <tr key={data.id}>
                  <td className="p-1">{ data.fullname }</td>
                  <td className="p-1">TEST</td>
                  <td className="p-1">TEST</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    );
  }

}

export { PayrollRegularDataReport };