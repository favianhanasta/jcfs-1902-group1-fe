import axios from 'axios';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import { Badge, Button, Input } from 'reactstrap';
import ModalProdukTransaksi from '../Components/ModalProdukTransaksi';
import ModalDetailPembayaran from '../Components/ModulDetailPembayaran';
import { API_URL } from '../helper';
import swal from 'sweetalert';
import PastTransactionUser from '../Components/PastTransactionUser';
import OrderByResepUser from './OrderByResepUser';
const cartempty = require('../Assets/empty.png');

class TransaksiPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inImage: [``],
            dataTransaksi: [],
            openModProduk: false,
            openModPembayaran: false,
            dataModProduk: {},
            dataModPembayaran: {},
            key: 'ongoing',
            selectedId: null,
            pastTransaksi: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    handleImage = (e) => {
        let temp = [...this.state.inImage]
        temp[0] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({
            inImage: temp
        })
    }

    btnUpload = (idtransaction) => {
        let dataUpload = {
            idtransaction: idtransaction,
            image: this.state.inImage[0].file
        }
        let formData = new FormData();
        formData.append('dataUpload', JSON.stringify(dataUpload));
        formData.append('images', this.state.inImage[0].file)
        console.log("dataCheckout", dataUpload)
        swal({
            title: 'Simpan Bukti Pembayaran ?',
            icon: 'warning',
            buttons: true
        })
            .then((accept) => {
                if (accept) {
                    if (this.state.inImage[0].file) {
                        let token = localStorage.getItem('data');
                        axios.patch(`${API_URL}/users/uploadpayment/${idtransaction}`, formData, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then((res) => {
                                axios.patch(API_URL + `/transaction/adminaction/${idtransaction}`, { idstatus: 8 })
                                    .then((res) => {
                                        this.getData()
                                    })
                                    .catch((err) => {
                                        console.log('error bt action', err)
                                    })
                                swal("Berhasil Upload","","success")
                            }).catch((err) => {
                                console.log("btnUpload err", err)
                            })
                    } else {
                        swal("upload bukti telebih dahulu")
                    }
                }
            })
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
        axios.get(API_URL + '/transaction/gettransaction?idstatus=6', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ pastTransaksi: res.data.dataTransaksi })
            })
    }

    btnSelesai = (idtransaction) => {
        swal({
            title: "Pastikan Barang Telah Sampai ke Alamat Anda!",
            icon: "warning",
            buttons: true,
        })
            .then((accept) => {
                if (accept) {
                    axios.patch(API_URL + `/transaction/adminaction/${idtransaction}`, { idstatus: 6 })
                        .then((res) => {
                            this.setState({ key: "past" });
                            this.getData()
                        })
                        .catch((err) => {
                            console.log('error bt action', err)
                        })
                }
            })
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
        if (this.state.dataTransaksi.length > 0) {
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
                        <div className='col-4'>
                            <div className='clr-blue'>
                                <p className='clr-orange2 lead' style={{ fontWeight: '600' }}>Total</p>
                                <h2 className='font-price'>Rp{val.totalpembayaran}</h2>
                                <a className='text-muted' style={{ cursor: 'pointer' }} onClick={() => this.onClickDetailPembayaran(val)}>Detail Pembayaran</a>
                            </div>
                            <div className='my-3'>
                                {
                                    val.url_payment === "0"
                                        ?
                                        <>
                                            <Button className='bt-orange' style={{ cursor: 'pointer' }} onClick={() => this.setState({ selectedId: i })}>Upload Bukti Pembayaran</Button>
                                            {
                                                this.state.selectedId == i ?
                                                    <div className='my-2'>
                                                        <Input placeholder={``} type='file' onChange={(e) => this.handleImage(e)} className='my-2' />
                                                        <Button className='bt-orange' style={{ background: 'green' }} onClick={() => this.btnUpload(val.idtransaction)}>Save</Button>
                                                        <Button className='bt-orange mx-2' style={{ background: 'red' }} onClick={() => this.setState({ selectedId: null })}>Cancel</Button>
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            {/* {
                                        } */}
                                        </>
                                        :
                                        <>
                                            <p className='clr-orange'>sudah upload bukti pembayaran</p>
                                        </>
                                }
                                <div style={{ marginTop: '16px', color: 'white' }}>
                                    <Badge className='p-1'
                                        color={val.idstatus == 4 ? 'secondary' : val.idstatus == 6 ? 'success' : val.idstatus == 7 ? 'danger' : 'primary'}>
                                        {val.status}
                                    </Badge>
                                </div>
                                {
                                    val.idstatus == 5 &&
                                    <Button className='my-3' color='success' onClick={() => this.btnSelesai(val.idtransaction)}>Pesanan Selesai</Button>
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        console.log('transaksi', this.state.dataTransaksi)
        return (
            <div style={{ minHeight: '100%',height:'1000px' }}>
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
                                {
                                    this.state.dataTransaksi.length > 0 ?
                                        this.printTransaksi()
                                        :
                                        <div className='text-center transaksi-box' style={{ padding: '10%' }}>
                                            <div className='d-flex justify-content-center'>
                                                <img src={cartempty} />
                                            </div>
                                            <h1 className='clr-orange'>Belum Ada Transaksi</h1>
                                        </div>
                                }
                            </div>
                        </Tab>
                        <Tab eventKey="past" title="History Transaksi">
                            <div className='p-1'>
                                <PastTransactionUser data={this.state.pastTransaksi} />
                            </div>
                        </Tab>
                        <Tab eventKey="resep" title="Waiting List Order Melalui Resep">
                            <OrderByResepUser />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default TransaksiPage;
