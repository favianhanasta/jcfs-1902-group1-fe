import axios from 'axios';
import React from 'react';
import { Button, Input, Table } from 'reactstrap';
import { API_URL } from '../helper';

class SalesRevenue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSalesRevenue: [],
            bulan: [
                {
                    "namaBulan": "January",
                    "valueBulan": "01"
                },
                {
                    "namaBulan": "February",
                    "valueBulan": "02"
                },
                {
                    "namaBulan": "Maret",
                    "valueBulan": "03"
                },
                {
                    "namaBulan": "April",
                    "valueBulan": "04"
                },
                {
                    "namaBulan": "May",
                    "valueBulan": "05"
                },
                {
                    "namaBulan": "June",
                    "valueBulan": "06"
                },
                {
                    "namaBulan": "July",
                    "valueBulan": "07"
                },
                {
                    "namaBulan": "August",
                    "valueBulan": "08"
                },
                {
                    "namaBulan": "September",
                    "valueBulan": "09"
                },
                {
                    "namaBulan": "October",
                    "valueBulan": "10"
                },
                {
                    "namaBulan": "November",
                    "valueBulan": "11"
                },
                {
                    "namaBulan": "December",
                    "valueBulan": "12"
                }
            ],
            tahun: [2022, 2023],
            selectedMonth: "",
            selectedYear: "",
            startDate: "",
            endDate: ""
        }
    }


    getSalesRevenueMonthly = async () => {
        let d = new Date()
        console.log("selectedMonth", this.state.selectedMonth)
        if (this.state.selectedMonth) {
            await axios.get(API_URL + `/transaction/getsalesrevenuemonthly?year=${this.state.selectedYear}&month=${this.state.selectedMonth}`)
                .then((res) => {
                    this.setState({ dataSalesRevenue: res.data.dataSalesRevenueMonthly })
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    getSalesRevenueInterval = async () => {
        if (this.state.startDate && this.state.endDate) {
            await axios.get(API_URL + `/transaction/getsalesrevenueinterval?startDate=${this.state.startDate}&endDate=${this.state.endDate}`)
                .then((res) => {
                    this.setState({ dataSalesRevenue: res.data.dataSalesRevenueInterval })
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    printTotalSalesReport = () => {
        let total = 0
        this.state.dataSalesRevenue.forEach((value, index) => {
            total += value.total
        })
        return total
    }

    btnFilterInterval = async () => {
        await this.setState({ startDate: this.inSelectStartDate.value, endDate: this.inSelectEndDate.value })
        this.getSalesRevenueInterval()
    }

    btnFilter = async () => {
        await this.setState({ selectedMonth: this.inSelectMonth.value, selectedYear: this.inSelectYear.value })
        this.getSalesRevenueMonthly()
    }

    btnReset = async () => {
        await this.setState({ selectedMonth: "", selectedYear: "", startDate: "", endDate: "", dataSalesRevenue: [] })
        this.getSalesRevenueMonthly()
    }

    render() {
        return (
            <div className='container clr-blue'>
                <div className='row'>
                    <div className='col-md-6 d-flex py-1'>
                        <h5 className='clr-blue'>Halaman Admin</h5>
                        <h5 className='mx-3'>|</h5>
                        <h5 className='clr-orange2'>Sales Revenue</h5>
                    </div>
                </div>
                <div >
                    <div style={{ display: "flex", justifyContent:"space-evenly" }}>
                        <div className='border m-5 p-5'>
                            <div>
                                <h5>Awal Tanggal</h5>
                                <Input type='date' innerRef={(e) => this.inSelectStartDate = e} />
                            </div>
                            <div>
                                <h5>Akhir Tanggal</h5>
                                <Input type='date' innerRef={(e) => this.inSelectEndDate = e} />
                            </div>
                            <div className='m-3' style={{ textAlign: "center" }}>
                                <Button className='bt-orange' onClick={this.btnFilterInterval}>Filter</Button>
                                <Button className='bt-blue' onClick={this.btnReset}>Reset</Button>
                            </div>
                        </div>
                        <div className='border m-5 p-5'>
                            <div>
                                <h5>Bulan</h5>
                                <Input style={{ height: 38 }} type='select' innerRef={(e) => this.inSelectMonth = e}>
                                    {
                                        this.state.bulan.map((value, index) => {
                                            return <option value={value.valueBulan}>{value.namaBulan}</option>
                                        })
                                    }
                                </Input>
                            </div>
                            <div>
                                <h5>Tahun</h5>
                                <Input style={{ height: 38 }} type='select' innerRef={(e) => this.inSelectYear = e}>
                                    {
                                        this.state.tahun.map((value, index) => {
                                            return <option value={value}>{value}</option>
                                        })
                                    }
                                </Input>
                            </div>
                            <div className='m-3' style={{ textAlign: "center" }}>
                                <Button className='bt-orange' onClick={this.btnFilter}>Filter</Button>
                                <Button className='bt-blue' onClick={this.btnReset}>Reset</Button>
                            </div>
                        </div>
                    </div>

                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Total Revenue
                            </th>
                            <th>

                            </th>
                            <th>

                            </th>
                            <th>
                                Rp. {this.printTotalSalesReport().toLocaleString()}
                            </th>
                        </tr>
                    </thead>
                </Table>
            </div>
        );
    }
}

export default SalesRevenue;