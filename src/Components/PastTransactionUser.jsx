import axios from 'axios';
import React from 'react';
import { Badge } from 'reactstrap';
import { API_URL } from '../helper';
const cartempty = require('../Assets/empty.png');

class PastTransactionUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTransaksi: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        let token = localStorage.getItem('data');
        axios.get(API_URL + '/transaction/gettransaction?idstatus=6', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ dataTransaksi: res.data.dataTransaksi })
            })
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
                        <p className='clr-orange2' style={{ fontWeight: 'bold' }}>Pengiriman</p>
                        <div className='d-flex'>
                            <p>Penerima :</p>
                            <p className='mx-2' style={{ fontWeight: '600' }}>{val.username}</p>
                        </div>
                        <p>Alamat : </p>
                        <p style={{ marginTop: '-5%', fontWeight: '600' }}>{val.address}</p>
                    </div>
                    <div className='col-4 '>
                        <div className='clr-blue'>
                            <p className='clr-orange2 lead' style={{ fontWeight: '600' }}>Total Pembayaran</p>
                            <h2 className='font-price'>Rp{val.totalpembayaran}</h2>
                            <a className='text-muted' style={{ cursor: 'pointer' }} onClick={() => this.onClickDetailPembayaran(val)}>Detail Pembayaran</a>
                        </div>
                        <div style={{ marginTop: '16px', color: 'white' }} className='d-flex justify-content-end'>
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
        return (
            <div>
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
        );
    }
}

export default PastTransactionUser;