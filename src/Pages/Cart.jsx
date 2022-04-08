import React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import { API_URL } from '../helper';
import { getCart, plusQtyCart, minusQtyCart } from '../redux/actions/userAction';
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import swal from 'sweetalert';

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
        this.props.plusQtyCart(temp[index].idcart, temp[index].idstock, temp[index].idproduct)
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
            this.props.minusQtyCart(temp[index].idcart, temp[index].idstock, temp[index].idproduct)
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
        axios.patch(`${API_URL}/users/cart/${idcart}`, dataDeleteCart
        ).then((res) => {
            swal("1 Barang telah berhasil terhapus")
            this.props.getCart();
        }).catch((err) => {
            console.log(err)
        })
    }

    printCartList = () => {
        return this.props.cartList.map((value, index) => {
            return (
                <>
                    {/* {
                        value.qty <= 0 ?
                            swal("tidak bisa mengurangi lagi")
                            :
                            <></>
                    } */}
                    <div className='row' style={{ padding: 20 }}>
                        <div className='col-4'>
                            <img style={{ width: "100%" }} src={API_URL + value.url} />
                        </div>
                        <div className='col-8'>
                            <p style={{ fontSize: 20 }}>{value.nama}</p>
                            <h5 style={{ fontWeight: "bolder" }}>Rp {value.harga.toLocaleString()}</h5>
                            <div style={{ display: "flex", justifyContent: "end", marginTop: 60 }}>
                                <FaRegTrashAlt onClick={() => this.onBtRemoveCart(index, value.idcart, value)} style={{ fontSize: 30 }} />
                                <AiOutlineMinusCircle style={{ fontSize: 30 }} onClick={() => this.onBtDec(index)} />
                                <Input style={{ width: "15%" }} type='number' value={value.qty} innerRef={(e) => this.inQty = e} />
                                <AiOutlinePlusCircle style={{ fontSize: 30 }} onClick={() => this.onBtInc(index, value)} />
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
            <div className='container clr-blue'>
                <h1 style={{ fontWeight: "bolder" }}>Keranjang</h1>
                <div className='row'>
                    <div className='col-9'>
                        {this.printCartList()}
                    </div>
                    <div className='col-3 shadow' style={{ padding: 20, height: "100%" }}>
                        <p style={{ fontWeight: "bolder" }}>Ringkasan Belanja</p>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total Harga</p>
                            <p>Rp {this.printTotalPayment().toLocaleString()}</p>
                        </div>
                        <Button className='bt-orange' style={{ width: "100%", margin: "auto" }}>BELI</Button>
                    </div>
                </div>
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