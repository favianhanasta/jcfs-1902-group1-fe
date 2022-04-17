import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { API_URL } from '../helper';
import { getAddress, getCart } from '../redux/actions/userAction';
import axios from 'axios';
import swal from 'sweetalert';
import ModalGantiAlamat from '../Components/ModalGantiAlamat';

class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inImage: [``],
            handleShipping: 2000,
            handleTax: (10 / 100),
            openModalGantiAlamat: false
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
            date: `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`,
            shipping: handleShipping,
            tax: handleTax,
            totalpembayaran: this.printTotalPayment() + handleShipping + handleTax,
            image: this.state.inImage[0].file,
            detail: this.props.cartList
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('images', this.state.inImage[0].file)
        console.log("dataCheckout", data)
        axios.post(`${API_URL}/users/checkout`, formData)
            .then((res) => {
                swal("Berhasil Checkout")
                this.props.getCart();
                this.setState({ inImage: [``] })
            }).catch((err) => {
                console.log("btnCheckout err", err)
            })
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
                                <h5 style={{ fontWeight: "bolder" }}>Rp {value.harga.toLocaleString()} x {value.qty}</h5>
                            </div>
                        </div>

                        <div style={{ marginTop: 60, display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <h5>Subtotal</h5>
                            <h5>Rp {(value.harga * value.qty).toLocaleString()}</h5>
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
        console.log("this.props.cartList", this.props.cartList)
        return (
            <div className='container clr-blue'>
                <ModalGantiAlamat
                    openModalGantiAlamat={this.state.openModalGantiAlamat}
                    toggleModalGantiAlamat={() => this.setState({ openModalGantiAlamat: !this.state.openModalGantiAlamat })}
                />
                <div className='row'>
                    <div className='col-8'>
                        <h1 style={{ fontWeight: "bolder" }}>Checkout</h1>
                        <h5 style={{ fontWeight: "bolder" }}>Alamat Pengiriman</h5>
                        <hr />
                        {this.printAlamat()}
                        <hr />
                        <Button className='bt-orange' onClick={() => this.setState({ openModalGantiAlamat: !this.state.openModalGantiAlamat })}>Pilih Alamat Lain</Button>
                        <hr />
                        {this.printCartList()}
                    </div>
                    <div className='col-4 shadow' style={{ padding: 20, height: "100%" }}>
                        <p style={{ fontWeight: "bolder" }}>Ringkasan Belanja</p>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Harga</p>
                            <p>Rp {this.printTotalPayment().toLocaleString()}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Shipping</p>
                            <p>Rp {(this.state.handleShipping).toLocaleString()}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Tax</p>
                            <p>Rp {(this.printTotalPayment() * this.state.handleTax).toLocaleString()}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Yang Harus Dibayar</p>
                            <p>Rp {(this.printTotalPayment() + this.state.handleShipping + (this.printTotalPayment() * this.state.handleTax)).toLocaleString()}</p>
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