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
            key: 'masuk',
            pageIn: 1,
            handleIn: 8,
            pageOut: 1,
            handleOut: 8,
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

    printDataMasuk = () => {
        let { pageIn, handleIn } = this.state;
        return this.state.dataLogIn.slice(pageIn > 1 ? (pageIn - 1) * handleIn : pageIn - 1, pageIn * handleIn).map((value, idx) => {
            return (
                <tr className='text-center font-price'>
                    <td style={{ width: '20%' }}>
                        <img src={API_URL + value.url} style={{ width: '70%' }} />
                    </td>
                    <td style={{ width: '220px' }}>{value.nama}</td>
                    <td style={{ width: '220px' }}>
                        {value.qty} {value.satuan}
                    </td>
                    <td>{value.date}</td>
                    <td>{value.keterangan}</td>
                </tr>
            )
        })
    }

    btnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.dataLogIn.length / 8); i++) {
            btn.push(<button className='bt-pagination mx-2' key={i} onClick={() => this.setState({ pageIn: i + 1 })}>{i + 1}</button>)
        }
        return btn;
    }

    btnPaginationOut = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.dataLogOut.length / 8); i++) {
            btn.push(<button className='bt-pagination mx-2' key={i} onClick={() => this.setState({ pageOut: i + 1 })}>{i + 1}</button>)
        }
        return btn;
    }

    printDataKeluar = () => {
        let { pageOut, handleOut } = this.state;
        return this.state.dataLogOut.slice(pageOut > 1 ? (pageOut - 1) * handleOut : pageOut - 1, pageOut * handleOut).map((value, idx) => {
            return (
                <tr className='text-center font-price'>
                    <td style={{ width: '20%' }}>
                        <img src={API_URL + value.url} style={{ width: '70%' }} />
                    </td>
                    <td style={{ width: '220px' }}>{value.nama}</td>
                    <td style={{ width: '220px' }}>
                        {value.qty} {value.satuan}
                    </td>
                    <td>{value.date}</td>
                    <td>{value.transaksi}</td>
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
                        <div style={{ height: '925px' }}>
                            <div className='py-2 d-flex justify-content-center' >
                                <Table bordered className='my-3'>
                                    <thead className='text-center clr-blue'>
                                        <tr>
                                            <th>Gambar</th>
                                            <th>Produk</th>
                                            <th>Qty stock masuk</th>
                                            <th>Date</th>
                                            <th>Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.printDataMasuk()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className='text-center'>
                            {this.btnPagination()}
                        </div>
                    </Tab>
                    <Tab title='Data Keluar' eventKey='keluar'>
                        <div style={{ height: '925px' }}>
                            <div className='py-2 d-flex justify-content-center'>
                                <Table bordered style={{ width: '50vw' }} className='my-3'>
                                    <thead className='text-center clr-blue'>
                                        <tr>
                                            <th>Gambar</th>
                                            <th>Produk</th>
                                            <th>Qty stock Keluar</th>
                                            <th>Date</th>
                                            <th>Transaksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.printDataKeluar()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className='text-center'>
                            {this.btnPaginationOut()}
                        </div>
                    </Tab>
                </Tabs >
            </div >
        );
    }
}

export default DataLogging;