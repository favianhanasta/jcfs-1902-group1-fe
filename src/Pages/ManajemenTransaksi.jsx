import axios from 'axios';
import React from 'react';
import { Badge, Input, InputGroup, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import ModalProdukTransaksi from '../Components/ModalProdukTransaksi';
import ModalDetailPembayaran from '../Components/ModulDetailPembayaran';
import { API_URL } from '../helper';
import { RiSearch2Line } from "react-icons/ri";
import { getTransactionAdmin } from '../redux/actions'
import { connect } from 'react-redux';
import swal from 'sweetalert';
const cartempty = require('../Assets/empty.png');


class ManajemenTransaksi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModProduk: false,
            openModPembayaran: false,
            dataModProduk: {},
            dataModPembayaran: {},
            idstatus: null,
            selectedId: 0,
            modalGambar: false,
            status: [
                "",
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
                {
                    status: 'Batal',
                    value: 7
                }
            ],
            onConfirm: false
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

    btCariInvoice = () => {
        this.props.getTransactionAdmin({
            invoice: this.cariInvoice.value,
        })
    }

    btFilter = async (i, idx) => {
        await this.setState({ idstatus: i, selectedId: idx })
        this.props.getTransactionAdmin({
            username: this.cariByNama.value,
            idstatus: this.state.idstatus
        })
    }

    btSemua = () => {
        this.setState({ idstatus: null, selectedId: 0 });
        this.cariByNama.value = null;
        this.cariInvoice.value = null;
        this.props.getTransactionAdmin()
    }

    btAction = (id, status) => {
        swal("Konfirmasi untuk Action yang dilakukan", {
            buttons: ["Cancel", "Confirm"]
        })
            .then((accept) => {
                if (accept) {
                    axios.patch(API_URL + `/transaction/adminaction/${id}`, { idstatus: status })
                        .then((res) => {
                            this.props.getTransactionAdmin()
                        })
                        .catch((err) => {
                            console.log('error bt action', err)
                        })
                }
            })
    }

    btConfirm = (id) => {
        swal("Apakah anda yakin untuk konfirmasi transaksi User ?", {
            buttons: ["Cancel", "Confirm"],
        })
            .then((accept) => {
                if (accept) {
                    axios.patch(API_URL + `/transaction/adminaction/${id}`, { idstatus: 3 })
                        .then((res) => {
                            this.props.getTransactionAdmin()
                            this.setState({ onReject: true })
                        })
                        .catch((err) => {
                            console.log('error bt action', err)
                        })
                }
            })

    }

    printTransaksi = () => {
        return this.props.transaction.map((val, i) => {
            return (
                <div key={i} className='row transaksi-box my-4'>
                    <div className='col-4 transaksi-item'>
                        <div className='d-flex'>
                            <p className='font-price clr-orange2 mr-2' style={{ fontWeight: 'bold' }}>{val.invoice}</p>
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
                    <div className='col-4'>
                        <div className='row'>
                            <div className='clr-blue col-7'>
                                <p className='clr-orange2 lead' style={{ fontWeight: '600' }}>Total</p>
                                <h2 className='font-price'>Rp{val.totalpembayaran}</h2>
                                <a className='text-muted' style={{ cursor: 'pointer' }} onClick={() => this.onClickDetailPembayaran(val)}>Detail Pembayaran</a>
                            </div>
                            <div className='col-5' style={{ color: 'white', float: 'right' }}>
                                <Badge className='p-1'
                                    color={val.idstatus == 4 ? 'secondary' : val.idstatus == 6 ? 'success' : val.idstatus == 7 ? 'danger' : 'primary'} >
                                    {val.status}
                                </Badge>
                            </div>
                        </div>
                        <div className='px-3' style={{ marginBottom: '16px' }}>
                            {
                                val.url_payment == "0" ?
                                    <p style={{ color: 'red' }}>User belum upload bukti pembayaran</p>
                                    :
                                    <>
                                        <a className='clr-orange my-2' style={{ cursor: 'pointer' }} onClick={() => this.setState({ modalGambar: !this.state.modalGambar })}>Lihat Bukti Pembayaran</a>
                                        <Modal isOpen={this.state.modalGambar} toggle={() => this.setState({ modalGambar: !this.state.modalGambar })} centered size='lg'>
                                            <ModalBody>
                                                <div className='d-flex justify-content-center'>
                                                    <img src={API_URL + val.url_payment} width="80%" />
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button className='mx-2' color='danger' outline style={{ border: 'none' }} onClick={() => this.setState({ modalGambar: !this.state.modalGambar })}>Cancel</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </>
                            }
                        </div>
                        <p className='clr-blue lead' style={{ fontWeight: '600' }}>Action</p>
                        <div className='text-center d-flex' style={{ marginTop: '-16px' }}>
                            {
                                val.idstatus == 8 ?
                                    <>
                                        <Button color='primary' outline style={{ border: 'none' }} onClick={() => this.btConfirm(val.idtransaction)}>Confirm</Button>
                                        <Button className='mx-2' color='danger' outline style={{ border: 'none' }} disabled={this.state.onReject} onClick={() => this.btAction(val.idtransaction, 7)}>Reject</Button>
                                    </>
                                    :
                                    val.idstatus == 3 ?
                                        <Button color='secondary mx-1' outline style={{ border: 'none' }} onClick={() => this.btAction(val.idtransaction, 5)}>Dikirim</Button>
                                        :
                                        val.idstatus == 9 &&
                                        <Button color='success' outline style={{ border: 'none' }} onClick={() => this.btAction(val.idtransaction, 6)}>Selesai</Button>
                            }
                        </div>
                    </div>

                </div>
            )
        })
    }

    printStatus = () => {
        return this.state.status.map((val, idx) => {
            if (idx > 0) {
                return (
                    <Button key={idx} className={this.state.selectedId == idx ? 'mx-2 btn-status-click' : 'mx-2 btn-status'} type='button' onClick={() => this.btFilter(val.value, idx)} >{val.status}</Button>
                )
            }
        })
    }

    render() {
        return (
            <>
                <ModalProdukTransaksi open={this.state.openModProduk} toggle={() => this.setState({ openModProduk: !this.state.openModProduk })} data={this.state.dataModProduk} />
                <ModalDetailPembayaran open={this.state.openModPembayaran} toggle={() => this.setState({ openModPembayaran: !this.state.openModPembayaran })} data={this.state.dataModPembayaran} />
                <div className='container' style={{ marginTop: "3%", minHeight: '100%' }}>
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
                    <div className='clr-blue' style={{ float: 'right' }}>
                        <p onClick={this.btSemua} style={{ cursor: 'pointer' }}>Tampilkan semua transaksi</p>
                    </div>
                    <div className='d-flex my-4'>
                        <Button className={this.state.selectedId == 0 ? 'mx-2 btn-status-click' : 'mx-2 btn-status'} type='button' onClick={this.btSemua} >Semua</Button>
                        {this.printStatus()}
                    </div>
                    {
                        this.props.transaction.length > 0 ?
                            <div style={{ marginTop: '21px', paddingLeft: '10px', paddingRight: '10px', marginBottom: '20%' }}>
                                {this.printTransaksi()}
                            </div>
                            :
                            <div className='text-center transaksi-box' style={{ padding: '10%' }}>
                                <div className='d-flex justify-content-center'>
                                    <img src={cartempty} />
                                </div>
                                <h1 className='clr-orange'>Belum Ada Transaksi dari user</h1>
                            </div>
                    }
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