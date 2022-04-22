import axios from 'axios';
import React from 'react';
import { Button, Input, Label } from 'reactstrap';
import { API_URL } from '../helper';
import { BsCartPlusFill } from "react-icons/bs";
import swal from 'sweetalert';
import { connect } from 'react-redux';


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            qty: 1
        }
    }
    componentDidMount() {
        axios.get(`${API_URL}/product${window.location.search}`)
            .then((res) => {
                this.setState({ data: res.data.dataProduct[0] })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onBtAddtoCart = () => {
        console.log("data product yang akan di add to cart", this.state.data)
        console.log("this.state.data.stock", this.state.data.stock[1].idstock)
        console.log("total qty yang akan di add to cart", this.totalQty.value)
        let token = localStorage.getItem("data");
        let { idproduct, idcategory, nama, harga, url, category, kemasan, stock } = this.state.data
        let dataAddToCart = {
            iduser: this.props.iduser,
            idproduct: idproduct,
            idcategory: idcategory,
            idstock: stock[0].idstock,
            nama: nama,
            harga: harga,
            url: url,
            category: category,
            kemasan: kemasan,
            qty: parseInt(this.totalQty.value),
            qtyStock: stock[0].qty - parseInt(this.totalQty.value),
            qtyTotal: (stock[0].qty - parseInt(this.totalQty.value)) * stock[1].qty*10,
            idstockTotal: stock[2].idstock
        }
        console.log("dataAddToCart", dataAddToCart)
        axios.post(`${API_URL}/users/addtocart`, dataAddToCart, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            swal("Berhasil Add To Cart")
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        let { data } = this.state;
        return (
            <div style={{ paddingTop: '5%' }}>
                <div className='container'>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <h5 className='clr-blue'>Halaman Produk</h5>
                        </div>
                        <div className='col-6'>
                            <h5 className='clr-orange my-1' style={{ float: 'right' }}>| Produk Detail</h5>
                        </div>
                    </div>
                    <hr />
                    <div className='row p-4'>
                        <div className='col-6 p-4'>
                            <div>
                                <img src={API_URL + data.url} width="100%" />
                            </div>
                        </div>
                        <div className='col-6 clr-blue py-4' style={{ paddingLeft: '5%' }}>
                            <h2 className='font-price' style={{ fontWeight: 'bold' }}>{data.nama}</h2>
                            <h4 className='font-price'>Rp. {data.harga}</h4>
                            <p className='text-muted my-4'>{data.deskripsi}</p>
                            <div className='d-flex'>
                                <div>
                                    <h5 className='clr-blue'>Kemasan</h5>
                                    <p className='text-muted '>{data.kemasan}</p>
                                </div>
                                <div style={{ marginLeft: '20%' }}>
                                    <h5 className='clr-blue'>Kategori</h5>
                                    <p className='text-muted'>{data.category}</p>
                                </div>
                            </div>
                            <h5>Kuantitas</h5>
                            <div className='row'>
                                <div className='col-3'>
                                    <Input type="number" defaultValue={this.state.qty} innerRef={(element) => this.totalQty = element} />
                                </div>
                                <div className='col-9'>
                                    <Button onClick={this.onBtAddtoCart} className='bt-orange' style={{ width: '100%' }}>Tambahkan Ke Keranjang <BsCartPlusFill className='mx-2' style={{ fontSize: '18px' }} /> </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser
    }
}


export default connect(mapToProps)(ProductDetail);