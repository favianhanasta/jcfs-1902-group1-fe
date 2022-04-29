import axios from 'axios';
import React from 'react';
import { Button, Input, Table } from 'reactstrap';
import { API_URL } from '../helper';

class SalesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSalesReport: [],
            dataDateSalesReport: [],
            selectedDate: ""
        }
    }

    componentDidMount() {
        this.getDataSalesReport()
        this.getDateSalesReport()
    }

    getDataSalesReport = async () => {
        console.log("selectedDate", this.state.selectedDate)
        if (this.state.selectedDate) {
            await axios.get(API_URL + `/transaction/getsalesreport?date="${this.state.selectedDate}"`)
                .then((res) => {
                    this.setState({ dataSalesReport: res.data.dataSalesReport })
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            await axios.get(API_URL + '/transaction/getsalesreport')
                .then((res) => {
                    this.setState({ dataSalesReport: res.data.dataSalesReport })
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    getDateSalesReport = async () => {
        await axios.get(API_URL + '/transaction/getdatesalesreport')
            .then((res) => {
                this.setState({ dataDateSalesReport: res.data.dataDateSalesReport })
            }).catch((err) => {
                console.log(err)
            })
    }

    printSalesReport = () => {
        return this.state.dataSalesReport.map((value, index) => {
            return (
                <tbody>
                    <tr>
                        <th scope="row">
                            {value.date}
                        </th>
                        <td>
                            {value.nama}
                        </td>
                        <td>
                            {value.qty}
                        </td>
                        <td>
                            Rp {value.total.toLocaleString()}
                        </td>
                    </tr>
                </tbody>

            )
        })
    }

    printSelectDate = () => {
        return this.state.dataDateSalesReport.map((value, index) => {
            return (
                <option value={value.date} key={index}>{value.date}</option>
            )
        })
    }

    btnFilterDate = async() => {
        await this.setState({ selectedDate: this.inSelectDate.value })
        this.getDataSalesReport()
    }

    render() {
        console.log("dataSalesReport", this.state.dataSalesReport)
        return (
            <div className='container clr-blue'>
                <h1>SALES REPORT</h1>
                <Input type='select' innerRef={(e) => this.inSelectDate = e}>
                    <option value='none' disabled>Pilih Tanggal</option>
                    {this.printSelectDate()}
                </Input>
                <Button onClick={this.btnFilterDate}>Select Date</Button>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Username
                            </th>
                        </tr>
                    </thead>

                    {this.printSalesReport()}
                </Table>
            </div>
        );
    }
}

export default SalesReport;