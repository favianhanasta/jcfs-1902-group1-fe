import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Table, InputGroup } from 'reactstrap';
import { API_URL } from '../helper';
import { RiSearch2Line, RiDeleteBin4Fill } from "react-icons/ri";
import { getProduct } from "../redux/actions";
import { RiShoppingCartLine } from "react-icons/ri";


class CustomOrderResep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            satuan: '',
            qty: 1,
            dataCart: []
        }
    }

    componentDidMount() {
        this.getData()
        this.getDataCart()
    }

    getData = () => {
        let token = localStorage.getItem('data');
        axios.get(API_URL + `/transaction/getorderbyresep${window.location.search}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ data: res.data.dataGetOrder })
            })
            .catch((err) => {
                console.log('error get data', err);
            })
    }

    getDataCart = () => {
        axios.get(API_URL + `/transaction/getcartresep${window.location.search}`)
            .then((res) => {
                this.setState({ dataCart: res.data.dataCartResep });
            })
            .catch((err) => console.log(err))
    }

    printTransaksi = () => {
        return this.state.data.map((val, idx) => {
            return (
                <>
                    <p className='font-price clr-orange2' style={{ fontWeight: 'bold' }} key={idx}>{val.invoice}</p>
                    <p>user : {val.username}</p>
                    <img src={API_URL + val.url} alt="" width='100%' />
                </>
            )
        })
    }

    btnAdd = (data) => {
        let { idorder, iduser } = this.state.data[0]
        let dataIn = {
            idorder: idorder,
            iduser: iduser,
            idproduct: data.idproduct,
            qty: parseInt(this.state.qty),
            idsatuan: this.state.satuan
        }
        axios.post(API_URL + `/transaction/addcartresep`, dataIn)
            .then((res) => {
                console.log('sukses')
                this.getDataCart()
                this.setState({ qty: 1, satuan: null })
            })
            .catch((err) => console.log(err));
    }

    printProduk = () => {
        return this.props.produk.map((val, idx) => {
            return (
                <tr key={idx} className='clr-blue'>
                    <td>
                        <img src={API_URL + val.url} width='100%' />
                    </td>
                    <td>{val.nama}</td>
                    <td>
                        <Input type='number' style={{ width: '50%', margin: 'auto' }} onChange={(e) => this.setState({ qty: e.target.value })} />
                        <Input type='select' className='my-2' onChange={(e) => this.handleSatuan(e, 1)} style={{ width: '50%', margin: 'auto' }}>
                            <option>--Satuan</option>
                            {
                                this.props.satuan.map((val, i) => {
                                    return <option value={val.idsatuan} key={i}>{val.satuan}</option>
                                })
                            }
                        </Input>
                    </td>
                    <td>
                        <Button className='bt-orange' onClick={() => this.btnAdd(val)} >Add</Button>
                    </td>
                </tr>
            )
        })
    }

    btDelete=(id)=>{
        axios.delete(API_URL+`/transaction/deletecartresep/${id}`)
        .then((res)=>{
            this.getDataCart()
            console.log("sukses")
        })
        .catch((err)=>{
            console.log('err',err)
        })
    }

    printCart = () => {
        return this.state.dataCart.map((val, idx) => {
            return (
                <div className='clr-orange2 font-price' style={{ fontSize: '14px' }}>
                    <div className='row'>
                        <div className='col-9'>
                            <p>{val.nama}</p>
                        </div>
                        <div className='col-3'>
                            <p>{val.qty} {val.satuan}</p>
                        </div>
                    </div>
                    <div>
                        <div className='row clr-blue'>
                            <div className='col-7'>
                                <div className='d-flex'>
                                    <p className='float-right'>subtotal : </p>
                                    <p className='clr-orange mx-2'>Rp {
                                        val.idsatuan == 3 ?
                                            Math.ceil((val.harga / 10) * val.qty)
                                            :
                                            val.idsatuan == 4 ?
                                                (val.harga / val.stock[1].qty) * val.qty
                                                :
                                                val.harga * val.qty
                                    }
                                    </p>
                                </div>
                            </div>
                            <div className='col-5'>
                                <RiDeleteBin4Fill className='clr-orange2 mx-3 float-right' style={{fontSize:'21px', color:'grey',cursor:'pointer'}} onClick={()=>this.btDelete(val.idcartresep)}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    handleSatuan = (e) => {
        this.setState({ satuan: parseInt(e.target.value) })
    }

    btFilter = () => {
        this.props.getProduct({
            nama: this.cariByNama.value,
        })
    }

    btReset = () => {
        this.cariByNama.value = null;
        this.props.getProduct()
    }

    render() {
        console.log('get', this.state.dataCart)
        return (
            <div className='container' style={{ marginTop: '1%' }}>
                <div className='row'>
                    <div className='col-md-6 d-flex py-1'>
                        <h5 className='clr-blue'>Halaman Admin</h5>
                        <h5 className='mx-3'>|</h5>
                        <h5 className='clr-orange2'>Manajemen Order By Resep</h5>
                    </div>
                </div>
                <hr />
                <div className='row py-4'>
                    <div className='col-4'>
                        <div className='transaksi-box '>
                            {this.printTransaksi()}
                        </div>
                        {
                            this.state.dataCart.length > 0 &&
                            <div className='transaksi-box my-3 clr-blue'>
                                <div className='row'>
                                    <h5 className='font-price col-6'>Keranjang</h5>
                                    <div className='col-6'>
                                        <RiShoppingCartLine style={{ fontSize: '20px', float: 'right' }} />
                                    </div>
                                </div>
                                {this.printCart()}
                            </div>
                        }
                    </div>
                    <div className='col-8'>
                        <InputGroup style={{ marginBottom: '16px' }}>
                            <Input className='input-blue' type='text' placeholder='Cari Produk atau Obat' innerRef={(e) => this.cariByNama = e} />
                            <Button style={{ background: '#2B2273', borderLeft: 'none', borderRadius: '0' }} onClick={this.btFilter} >
                                <RiSearch2Line />
                            </Button>
                        </InputGroup>
                        <div className='d-flex justify-content-end my-2'>
                            <a className='clr-blue' id="reset-search" style={{ textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }} onClick={this.btReset}>Tampilkan Semua</a>
                        </div>
                        <Table hover responsive className='text-center'>
                            <thead className='clr-blue'>
                                <tr>
                                    <th style={{ width: '20%' }}>Gambar Obat</th>
                                    <th>Nama Obat</th>
                                    <th>Kuantitas</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printProduk()}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        produk: state.productReducer.productList,
        satuan: state.productReducer.satuanList
    }
}

export default connect(mapToProps, { getProduct })(CustomOrderResep);