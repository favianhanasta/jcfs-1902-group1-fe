import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { API_URL } from '../helper';
import { getAddress, getCart } from '../redux/actions/userAction';
import axios from 'axios';
import swal from 'sweetalert';
import ModalGantiAlamat from '../Components/ModalGantiAlamat';
import { RiBillLine } from 'react-icons/ri';
import { GoLocation } from "react-icons/go";
import moment from 'moment';
import { Link, Navigate } from 'react-router-dom';

class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inImage: [``],
            handleShipping: 2000,
            handleTax: (10 / 100),
            openModalGantiAlamat: false,
            redirect: false
        }
    }

    componentDidMount() {
        this.props.getCart()
        this.props.getAddress()
    }

    handleImage = (e) => {
        let temp = [...this.state.inImage]
        temp[0] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({
            inImage: temp
        })
    }

    btnCheckout = () => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date();
        let handleShipping = 2000
        let handleTax = this.printTotalPayment() * (10 / 100)
        let data = {
            iduser: this.props.iduser,
            idaddress: this.props.idaddress,
            idstatus: 4,
            invoice: `INV${this.props.iduser}${d.getDay()}${d.getDate()}${d.getMonth()}${d.getFullYear()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`,
            date: moment().format("YYYY-MM-DD"),
            shipping: handleShipping,
            tax: handleTax,
            totalpembayaran: this.printTotalPayment() + handleShipping + handleTax,
            // image: this.state.inImage[0].file,
            detail: this.props.cartList
        }
        console.log("dataCheckout", data)
        if (this.props.idaddress == 1) {
            swal("Anda Belum Memiliki Alamat")
        } else {
            swal({
                text: "Anda yakin akan Checkout semua barang di keranjang anda?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.post(`${API_URL}/users/checkout`, data)
                            .then((res) => {
                                swal("Berhasil Checkout", {
                                    icon:"success",
                                })
                                this.props.getCart();
                                this.setState({ inImage: [``], redirect: true })
                            }).catch((err) => {
                                console.log("btnCheckout err", err)
                            })
                    } else {
                        swal("Gagal Checkout");
                    }
                });

        }
    }

    printTotalPayment = () => {
        let totalPayment = 0
        this.props.cartList.forEach((val) => {
            totalPayment += val.harga * val.qty
        });
        return totalPayment
    }

    printCartList = () => {
        return this.props.cartList.map((value, index) => {
            return (
                <>
                    <div className='row' style={{ padding: 20 }}>
                        <div className='col-4'>
                            <img style={{ width: "100%" }} src={API_URL + value.url} />
                        </div>
                        <div className='col-8'>
                            <p style={{ fontSize: 20 }}>{value.nama}</p>
                            <div>
                                <h5 className='font-price' style={{ fontWeight: "bolder" }}>Rp {value.harga.toLocaleString()} x {value.qty}</h5>
                            </div>
                        </div>
                        <div className='clr-orange' style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: '3%' }}>
                            <h5>Subtotal</h5>
                            <h5 className='font-price'>Rp {(value.harga * value.qty).toLocaleString()}</h5>
                        </div>
                    </div>
                    <hr />
                </>
            )
        })
    }

    printAlamat = () => {
        return (
            <div>
                {this.props.addressList.map((value) => {
                    if (value.idaddress === this.props.idaddress) {
                        return (
                            <>
                                <h4>{value.nama_penerima}</h4>
                                <h5>{value.phone}</h5>
                                <p>{value.address}, {value.kecamatan}, {value.kota}, {value.provinsi}</p>
                                <p>{value.kode_pos}</p>
                            </>
                        )
                    }
                })}
            </div>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to='/halaman-transaksi' />
        }
        return (
            <div className='container clr-blue'>
                <ModalGantiAlamat
                    openModalGantiAlamat={this.state.openModalGantiAlamat}
                    toggleModalGantiAlamat={() => this.setState({ openModalGantiAlamat: !this.state.openModalGantiAlamat })}
                />
                <div className='row my-2'>
                    <div className='col-6'>
                        <h4 className='clr-blue' style={{ fontWeight: 'bolder' }}>Checkout</h4>
                    </div>
                    <div className='col-6 clr-orange'>
                        <RiBillLine className='float-right' style={{ fontSize: '26px' }} />
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-7'>
                        <div className='transaksi-box' style={{ marginBottom: '16px' }}>
                            <div className='row'>
                                <div className='col-6'>
                                    <h5 style={{ fontWeight: "bolder" }} className='clr-orange2'>Alamat Pengiriman</h5>
                                </div>
                                <div className='col-6'>
                                    <GoLocation className='float-right' style={{ fontSize: '22px' }} />
                                </div>
                            </div>
                            {
                                this.props.idaddress === 1 ?
                                    <>
                                        <p>Anda Belum Mendaftarkan Alamat Utama</p>
                                        <Link to="/daftaralamat">
                                            <Button className='bt-orange'>Daftarkan Alamat</Button>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        {this.printAlamat()}
                                        <Button className='bt-orange' onClick={() => this.setState({ openModalGantiAlamat: !this.state.openModalGantiAlamat })}>Pilih Alamat Lain</Button>
                                    </>
                            }
                        </div>
                        {this.printCartList()}
                    </div>
                    <div className='col-5 transaksi-box' style={{ height: "100%", padding: 30 }}>
                        <p style={{ fontWeight: "bolder" }}>Ringkasan Belanja</p>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Harga</p>
                            <p className='font-price'>Rp {this.printTotalPayment().toLocaleString()}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Shipping</p>
                            <p className='font-price'>Rp {(this.state.handleShipping).toLocaleString()}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Tax</p>
                            <p className='font-price'>Rp {(this.printTotalPayment() * this.state.handleTax).toLocaleString()}</p>
                        </div>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Yang Harus Dibayar</p>
                            <p className='font-price'>Rp {(this.printTotalPayment() + this.state.handleShipping + (this.printTotalPayment() * this.state.handleTax)).toLocaleString()}</p>
                        </div>
                        <Button onClick={this.btnCheckout} className='bt-orange' style={{ width: "100%", margin: "auto" }}>Checkout</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser,
        idaddress: state.userReducer.idaddress,
        cartList: state.userReducer.cartList,
        fullname: state.userReducer.fullname,
        phone: state.userReducer.phone,
        address: state.userReducer.address,
        addressList: state.userReducer.addressList
    }
}

export default connect(mapToProps, { getCart, getAddress })(CheckoutPage);