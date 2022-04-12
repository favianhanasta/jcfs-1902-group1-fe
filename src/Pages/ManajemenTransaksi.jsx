import axios from 'axios';
import React from 'react';
import { Badge, Input, InputGroup, Button } from 'reactstrap';
import ModalProdukTransaksi from '../Components/ModalProdukTransaksi';
import ModalDetailPembayaran from '../Components/ModulDetailPembayaran';
import { API_URL } from '../helper';
import { RiSearch2Line } from "react-icons/ri";
import { getTransactionAdmin } from '../redux/actions'
import { connect } from 'react-redux';


class ManajemenTransaksi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModProduk: false,
            openModPembayaran: false,
            dataModProduk: {},
            dataModPembayaran: {},
            idstatus: null,
            status: [
                {
                    status: 'Diproses',
                    value: 3
                },
                {
                    status: 'Menunggu Pembayaran',
                    value: 4
                },
                {
                    status: 'Dikirim',
                    value: 5
                },
                {
                    status: 'Selesai',
                    value: 6
                },
            ]
        }
    }

    componentDidMount() {
        this.props.getTransactionAdmin()
    }

    onClickDetailProduk = (data) => {
        this.setState({ dataModProduk: data });
        this.setState({ openModProduk: !this.state.openModProduk });
    }

    onClickDetailPembayaran = (data) => {
        this.setState({ dataModPembayaran: data });
        this.setState({ openModPembayaran: !this.state.openModPembayaran });
    }

    btCari = () => {
        this.props.getTransactionAdmin({
            username: this.cariByNama.value,
            idstatus: this.state.idstatus
        })
    }
    
    btCariInvoice=()=>{
        this.props.getTransactionAdmin({
            invoice: this.cariInvoice.value,
        })
    }

    btFilter = async (i) => {
        await this.setState({ idstatus: i })
        this.props.getTransactionAdmin({
            username: this.cariByNama.value,
            idstatus: this.state.idstatus
        })
    }

    btSemua = () => {
        this.setState({ idstatus: null });
        this.cariByNama.value = null;
        this.cariInvoice.value = null;
        this.props.getTransactionAdmin()
    }

    printTransaksi = () => {
        return this.props.transaction.map((val, i) => {
            return (
                <div key={i} className='row transaksi-box my-4'>
                    <div className='col-4 transaksi-item'>
                        <div className='d-flex'>
                            <p className='font-price clr-orange2' style={{ fontWeight: 'bold' }}>{val.invoice}</p>
                            <p style={{ fontWeight: 'bold', marginLeft: 'auto' }}>user : {val.username}</p>
                        </div>
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
                        <p>{val.date}</p>
                        <p>Alamat : </p>
                        <p style={{ marginTop: '-5%', fontWeight: '600' }}>{val.address}</p>
                    </div>
                    <div className='col-4 '>
                        <div className='clr-blue row'>
                            <div className='col-8'>
                                <p className='clr-orange2 lead' style={{ fontWeight: '600' }}>Total Pembayaran</p>
                                <h2 className='font-price'>Rp{val.totalpembayaran}</h2>
                                <a className='text-muted' style={{ cursor: 'pointer' }} onClick={() => this.onClickDetailPembayaran(val)}>Detail Pembayaran</a>
                            </div>
                            <div className='col-4'>
                                <p className='lead'>Action</p>
                            </div>
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

    printStatus = () => {
        return this.state.status.map((val, idx) => {
            return (
                <Button className='mx-2 btn-status' type='button' onClick={() => this.btFilter(val.value)} >{val.status}</Button>
            )
        })
    }

    render() {
        return (
            <>
                <ModalProdukTransaksi open={this.state.openModProduk} toggle={() => this.setState({ openModProduk: !this.state.openModProduk })} data={this.state.dataModProduk} />
                <ModalDetailPembayaran open={this.state.openModPembayaran} toggle={() => this.setState({ openModPembayaran: !this.state.openModPembayaran })} data={this.state.dataModPembayaran} />
                <div className='container' style={{ marginTop: "3%" }}>
                    <div className='row'>
                        <div className='col-md-6 d-flex py-1'>
                            <h5 className='clr-blue'>Halaman Admin</h5>
                            <h5 className='mx-3'>|</h5>
                            <h5 className='clr-orange2'>Manajemen Transaksi</h5>
                        </div>
                    </div>
                    <div className='row'>
                        <InputGroup className='my-2 col-6'>
                            <Input className='input-blue' type='text' placeholder='Cari Transaksi by User' innerRef={(e) => this.cariByNama = e} />
                            <Button style={{ background: '#2B2273', borderLeft: 'none', borderRadius: '0' }} onClick={this.btCari} >
                                <RiSearch2Line />
                            </Button>
                        </InputGroup>
                        <InputGroup className='my-2 col-6'>
                            <Input className='input-blue' type='text' placeholder='Cari Transaksi by INVOICE' innerRef={(e) => this.cariInvoice = e} />
                            <Button style={{ background: '#2B2273', borderLeft: 'none', borderRadius: '0' }} onClick={this.btCariInvoice} >
                                <RiSearch2Line />
                            </Button>
                        </InputGroup>
                    </div>
                    <div className='d-flex my-4 justify-content-center'>
                        <Button className='mx-2 btn-status' type='button' onClick={this.btSemua} >Semua</Button>
                        {this.printStatus()}
                    </div>
                    <div style={{ marginTop: '21px', paddingLeft: '10px', paddingRight: '10px' }}>
                        {this.printTransaksi()}
                    </div>
                </div>
            </>
        );
    }
}

const mapToProps = (state) => {
    return {
        transaction: state.transactionReducer.transactionList
    }
}

export default connect(mapToProps, { getTransactionAdmin })(ManajemenTransaksi);