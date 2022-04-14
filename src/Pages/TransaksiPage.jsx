import axios from 'axios';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import { Badge, Button } from 'reactstrap';
import ModalProdukTransaksi from '../Components/ModalProdukTransaksi';
import ModalDetailPembayaran from '../Components/ModulDetailPembayaran';
import { API_URL } from '../helper';
import OrderByResepPage from './OrderByResepUser';

class TransaksiPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTransaksi: [],
            openModProduk: false,
            openModPembayaran: false,
            dataModProduk: {},
            dataModPembayaran: {},
            key: 'ongoing'
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        let token = localStorage.getItem('data');
        axios.get(API_URL + `/transaction/gettransaction`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ dataTransaksi: res.data.dataTransaksi })
            })
            .catch((err) => console.log('error getdata', err));
    }

    onClickDetailProduk = (data) => {
        this.setState({ dataModProduk: data });
        this.setState({ openModProduk: !this.state.openModProduk });
    }

    onClickDetailPembayaran = (data) => {
        this.setState({ dataModPembayaran: data });
        this.setState({ openModPembayaran: !this.state.openModPembayaran });
    }

    printTransaksi = () => {
        return this.state.dataTransaksi.map((val, i) => {
            return (
                <div key={i} className='row transaksi-box my-4'>
                    <div className='col-4 transaksi-item'>
                        <p className='font-price clr-orange2' style={{ fontWeight: 'bold' }}>{val.invoice}</p>
                        <div className='d-flex'>
                            <img src={API_URL + val.detail[0].url} alt="" width='50%' />
                            <div className='mx-2 clr-blue'>
                                <p>{val.detail[0].nama}</p>
                                <p className='font-price'>{val.detail[0].qty} x Rp. {val.detail[0].harga_persatuan}</p>
                                {
                                    val.detail.length > 1 ?
                                        <a className='text-muted' style={{ cursor: 'pointer' }} onClick={() => this.onClickDetailProduk(val.detail)}>{val.detail.length - 1} produk lainnya</a>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-4 clr-blue transaksi-item'>
                        <p>{val.date}</p>
                        <p className='clr-orange2' style={{ fontWeight: 'bold' }}>Pengiriman</p>
                        <div className='d-flex'>
                            <p>Penerima :</p>
                            <p className='mx-2' style={{ fontWeight: '600' }}>{val.username}</p>
                        </div>
                        <p>Alamat : </p>
                        <p style={{ marginTop: '-5%', fontWeight: '600' }}>{val.address}</p>
                    </div>
                    <div className='col-4 row'>
                        <div className='clr-blue col-7'>
                            <p className='clr-orange2 lead' style={{ fontWeight: '600' }}>Total</p>
                            <h2 className='font-price'>Rp{val.totalpembayaran}</h2>
                            <a className='text-muted' style={{ cursor: 'pointer' }} onClick={() => this.onClickDetailPembayaran(val)}>Detail Pembayaran</a>
                        </div>
                        <div style={{ color: 'white' }} className='col-5'>
                            <Badge className='p-1'
                                color={val.idstatus == 4 ? 'secondary' : val.idstatus == 6 ? 'success' : val.idstatus == 7 ? 'danger' : 'primary'}>
                                {val.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.state.dataTransaksi)
        return (
            <>
                <ModalProdukTransaksi open={this.state.openModProduk} toggle={() => this.setState({ openModProduk: !this.state.openModProduk })} data={this.state.dataModProduk} />
                <ModalDetailPembayaran open={this.state.openModPembayaran} toggle={() => this.setState({ openModPembayaran: !this.state.openModPembayaran })} data={this.state.dataModPembayaran} />
                <div className='container' style={{ marginTop: "3%" }}>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <h5 className='clr-blue'>Halaman Transaksi</h5>
                        </div>
                        <div className='col-6'>
                            <h5 className='clr-orange' style={{ float: 'right' }}>| Transaksi Saya</h5>
                        </div>
                    </div>
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={(k) => this.setState({ key: k })} className='mb-3'>
                        <Tab eventKey="ongoing" title="Transaksi Berlangsung">
                            <div className='p-1'>
                                {this.printTransaksi()}
                            </div>
                        </Tab>
                        <Tab eventKey="past" title="History Transaksi">
                            <div className='p-1'>
                                // untuk past Transaction
                            </div>
                        </Tab>
                        <Tab eventKey="resep" title="Order Melalui Resep">
                            <OrderByResepPage />
                        </Tab>
                    </Tabs>
                </div>
            </>
        );
    }
}

export default TransaksiPage;
