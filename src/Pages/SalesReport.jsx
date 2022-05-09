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
        this.printTotalSalesReport()
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
                            {value.qty} {value.satuan}
                        </td>
                        <td>
                            {value.keterangan}
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

    printTotalSalesReport = () => {
        let total = 0
        this.state.dataSalesReport.forEach((value, index) => {
            total += value.total
        })
        return total
    }

    btnFilterDate = async () => {
        await this.setState({ selectedDate: this.inSelectDate.value })
        this.getDataSalesReport()
    }
    btnResetDate = async () => {
        await this.setState({ selectedDate: "" })
        this.getDataSalesReport()
    }

    render() {
        console.log("dataSalesReport", this.state.dataSalesReport)
        return (
            <div className='container clr-blue'>
                <div className='row'>
                    <div className='col-md-6 d-flex py-1'>
                        <h5 className='clr-blue'>Halaman Admin</h5>
                        <h5 className='mx-3'>|</h5>
                        <h5 className='clr-orange2'>Sales Report</h5>
                    </div>
                </div>
                <Input type='select' innerRef={(e) => this.inSelectDate = e}>
                    <option value='none' disabled>Pilih Tanggal</option>
                    {this.printSelectDate()}
                </Input>
                <Button className='bt-orange mx-3' onClick={this.btnFilterDate}>Select Date</Button>
                <Button className='bt-blue mx-3' onClick={this.btnResetDate}>Reset</Button>
                <Table className='mt-3'>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Keterangan
                            </th>
                            <th>
                                Total
                            </th>
                        </tr>
                    </thead>
                    {this.printSalesReport()}
                    <tbody>
                        <tr>
                            <th>
                                Total Sales
                            </th>
                            <th>

                            </th>
                            <th>

                            </th>
                            <th>

                            </th>
                            <th>
                                Rp. {this.printTotalSalesReport().toLocaleString()}
                            </th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default SalesReport;