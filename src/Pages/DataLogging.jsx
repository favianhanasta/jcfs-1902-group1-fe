import axios from 'axios';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Table } from 'reactstrap';
import { API_URL } from '../helper';


class DataLogging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLogIn: [],
            dataLogOut: [],
            key: 'masuk'
        }
    }

    componentDidMount() {
        this.getDataLogIn();
        this.getDataLogOut();
    }

    getDataLogIn = () => {
        axios.get(API_URL + '/product/datalogmasuk')
            .then((res) => {
                this.setState({ dataLogIn: res.data.dataLogIn });
            })
            .catch(error => console.log('error datalog in', error));
    }

    getDataLogOut = () => {
        axios.get(API_URL + '/product/datalogkeluar')
            .then((res) => {
                this.setState({ dataLogOut: res.data.dataLogOut });
            })
            .catch(error => console.log('error datalog out', error));
    }

    printDataMasuk =()=>{
        return this.state.dataLogIn.map((value,idx)=>{
            return(
                <tr className='text-center font-price'>
                    <td style={{width:'20%'}}>
                        <img src={API_URL+value.url} style={{width:'70%'}} />
                    </td>
                    <td style={{width:'220px'}}>{value.nama}</td>
                    <td style={{width:'220px'}}>
                        {value.qty} {value.satuan}
                    </td>
                </tr>
            )
        })
    }

    printDataKeluar =()=>{
        return this.state.dataLogOut.map((value,idx)=>{
            return(
                <tr className='text-center font-price'>
                    <td style={{width:'20%'}}>
                        <img src={API_URL+value.url} style={{width:'70%'}} />
                    </td>
                    <td style={{width:'220px'}}>{value.nama}</td>
                    <td style={{width:'220px'}}>
                        {value.qty} {value.satuan}
                    </td>
                </tr>
            )
        })
    }

    render() {
        console.log('dtlog in', this.state.dataLogIn);
        console.log('dtlog out', this.state.dataLogOut);
        return (
            <div className='container'>
                <div className='d-flex py-1'>
                    <h5 className='clr-blue'>Halaman Admin</h5>
                    <h5 className='mx-3'>|</h5>
                    <h5 className='clr-orange2'>Data Log</h5>
                </div>
                <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={(k) => this.setState({ key: k })} className='mt-3'>
                    <Tab title='Data Masuk' eventKey='masuk'>
                        <div className='py-2 d-flex justify-content-center'>
                            <Table bordered style={{width:'50vw'}} className='my-3'>
                                <thead className='text-center clr-blue'>
                                    <tr>
                                        <th>Gambar</th>
                                        <th>Produk</th>
                                        <th>Qty stock masuk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.printDataMasuk()}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab title='Data Keluar' eventKey='keluar'>
                    <div className='py-2 d-flex justify-content-center'>
                            <Table bordered style={{width:'50vw'}} className='my-3'>
                                <thead className='text-center clr-blue'>
                                    <tr>
                                        <th>Gambar</th>
                                        <th>Produk</th>
                                        <th>Qty stock Keluar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.printDataKeluar()}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                </Tabs >
            </div >
        );
    }
}

export default DataLogging;