import React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import { API_URL } from '../helper';
import { getCart, plusQtyCart, minusQtyCart } from '../redux/actions/userAction';
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
const cartempty = require('../Assets/empty.png');

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getCart()
    }

    printTotalPayment = () => {
        let total = 0
        this.props.cartList.forEach((val) => {
            total += val.harga * val.qty
        });
        return total
    }

    // handleInput = (value, propState) => {
    //     console.log(value, propState)
    //     this.setState({ [propState]: value })
    // }

    onBtInc = (index) => {
        // let temp = [...this.props.cartList];
        // temp[index].qty += 1
        // this.props.updateUserCart(temp[index].idcart, temp[index].qty)
        let temp = [...this.props.cartList];
        console.log("temp", temp[index].qty)
        this.props.plusQtyCart(temp[index].idcart)
    }

    onBtDec = async (index) => {
        // let temp = [...this.props.cartList];
        // temp[index].qty -= 1
        // this.props.updateUserCart(temp[index].idcart, temp[index].qty)
        let temp = [...this.props.cartList];
        console.log("temp", temp[index].qty)
        if (temp[index].qty - 1 === 0) {
            swal("Barang tidak dapat kosong")
        } else {
            this.props.minusQtyCart(temp[index].idcart)
        }
    }

    onBtRemoveCart = (index, idcart, data) => {
        let temp = [...this.props.cartList];
        let dataDeleteCart = {
            idproduct: temp[index].idproduct,
            idstock: data.stock[0].idstock,
            qty: data.stock[0].qty
        }
        console.log("onBtRemoveCart data", data.stock[0])
        console.log("dataDeleteCart", dataDeleteCart)
        console.log("temp", temp[index].nama)
        swal({
            text: `Anda yakin akan menghapus ${temp[index].nama} dari Keranjang`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.patch(`${API_URL}/users/cart/${idcart}`, dataDeleteCart
                    ).then((res) => {
                        swal(`Barang ${temp[index].nama} telah terhapus dari Keranjang`, {
                            icon: "success",
                        });
                        this.props.getCart();
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    swal(`Barang ${temp[index].nama} tetap berada di Keranjang`);
                }
            });
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
                            <h5 className='font-price' style={{ fontWeight: "bolder" }}>Rp {value.harga.toLocaleString()}</h5>
                            <div style={{ display: "flex", justifyContent: "end", marginTop: 60 }}>
                                <FaRegTrashAlt onClick={() => this.onBtRemoveCart(index, value.idcart, value)} style={{ fontSize: 30 }} />
                                <AiOutlineMinusCircle style={{ fontSize: 30 }} onClick={() => this.onBtDec(index)} />
                                <Input style={{ width: "15%" }} type='number' value={value.qty} innerRef={(e) => this.inQty = e} />
                                <AiOutlinePlusCircle style={{ fontSize: 30 }} onClick={() => this.onBtInc(index)} />
                            </div>
                        </div>
                    </div>
                    <hr />
                </>
            )
        })
    }

    render() {
        console.log("this.props.cartList", this.props.cartList)
        return (
            <div className='container clr-blue' style={{ marginTop: '42px' }}>
                <div className='row my-2'>
                    <div className='col-6'>
                        <h4 className='clr-blue' style={{ fontWeight: 'bolder' }}>Keranjang</h4>
                    </div>
                    <div className='col-6 clr-orange2'>
                        <BsCartFill className='float-right' style={{ fontSize: '26px' }} />
                    </div>
                </div>
                <hr />
                {
                    this.props.cartList.length > 0 ?
                        <div className='row'>
                            <div className='col-8'>
                                {this.printCartList()}
                            </div>
                            <div className='col-4 transaksi-box' style={{ padding: 20, height: "100%" }}>
                                <p style={{ fontWeight: "bolder" }}>Ringkasan Belanja</p>
                                <hr />
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>Total Harga</p>
                                    <p className='font-price'>Rp {this.printTotalPayment().toLocaleString()}</p>
                                </div>
                                <Link to="/checkout">
                                    <Button className='bt-orange' style={{ width: "100%", margin: "auto" }}>BELI</Button>
                                </Link>
                            </div>
                        </div>
                        :
                        <div className='text-center transaksi-box' style={{ padding: '10%' }}>
                            <div className='d-flex justify-content-center'>
                                <img src={cartempty} />
                            </div>
                            <h1 className='clr-orange'>Keranjang Anda Kosong</h1>
                        </div>
                }
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        cartList: state.userReducer.cartList
    }
}

export default connect(mapToProps, { getCart, plusQtyCart, minusQtyCart })(CartPage);