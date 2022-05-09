import React from 'react';
import { Card, CardBody, CardImg, Input, InputGroup, Button } from 'reactstrap';
import { RiShoppingCartLine, RiSearch2Line } from "react-icons/ri";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct, sortAction } from '../redux/actions'
import { API_URL } from '../helper';
import axios from 'axios';
import { IoIosArrowRoundBack } from "react-icons/io";
const logo = require('../Assets/pharma.png')

class ProductByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownHarga: false,
            dropdownNama: false,
            page: 1,
            idcategory: null,
            product: []
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/product${window.location.search}`)
            .then((res) => {
                this.setState({ product: res.data.dataProduct })
            })
            .catch((err) => {
                console.log('err', err)
            })
    }



    printProductList = () => {
        let { page } = this.state;
        return this.state.product.slice(page > 1 ? (page - 1) * 9 : page - 1, page * 9).map((val, idx) => {
            return (
                <div className='col-md-3 my-2' key={idx}>
                    <Link to={`/product-detail?idproduct=${val.idproduct}`} style={{ textDecoration: 'none' }}>
                        <Card className='card'>
                            <CardImg src={API_URL + val.url} top width='100%' style={{ height: '200px' }} />
                            <CardBody style={{ height: '160px' }}>
                                <div style={{ height: '95px' }}>
                                    <p className='clr-blue' style={{ fontSize: '15px', fontWeight: '500' }}>{val.nama}</p>
                                    <p className='font-price text-muted' style={{ fontSize: '15px' }}>IDR {(val.harga).toLocaleString('ID-id')}/{val.stock[0].satuan}</p>
                                </div>
                                <RiShoppingCartLine style={{ color: '#2A2172', float: 'right', marginTop: '10%', fontSize: '18px', cursor: 'pointer' }} />
                            </CardBody>
                        </Card>
                    </Link>
                </div>
            )
        })
    }

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.product.length / 9); i++) {
            btn.push(<button className='bt-pagination mx-2' onClick={() => this.setState({ page: i + 1 })} key={i}>{i + 1}</button>)
        }
        return btn;
    }

    btFilter = async (category) => {
        await this.setState({ idcategory: category })
        this.props.getProduct({
            nama: this.cariByNama.value,
            category: this.state.idcategory
        })
    }

    btResetSearch = () => {
        this.setState({ idcategory: null });
        this.cariByNama.value = null;
        this.props.getProduct()
    }

    btSort = (sort, type) => {
        this.props.sortAction({
            field: sort,
            sortType: type
        })
    }

    kategori = () => {
        let id = window.location.search;
        id = id.split('=');
        id = parseInt(id[1]);
        return this.props.category.map((val, idx) => {
            if (id == val.idcategory) {
                return (
                    <h1 className='clr-orange2' style={{ fontWeight: '400', fontWeight: '700' }}>{val.category}</h1>
                )
            }
        })
    }

    render() {
        console.log(this.state.product)
        return (
            <div className='container my-4'>
                <Link to='/'>
                    <div className='clr-orange' style={{ marginTop: '2%', display: 'flex' }}>
                        <IoIosArrowRoundBack style={{ fontSize: '55px' }} />
                    </div>
                </Link>
                <div className=' bg-light text-center my-2' style={{ marginBottom: '2%', padding: '3%', borderRadius: '15px' }}>
                    {this.kategori()}
                </div>
                <div className='py-3'>
                    <div className='p-3'>
                        <div className='row my-2'>
                            <div className='col-6'>
                                <img src={logo} style={{ width: '40%' }} />
                            </div>
                            <div className='col-6'>
                                <h5 className='clr-orange my-1' style={{ float: 'right' }}>| Produk </h5>
                            </div>
                        </div>
                        <InputGroup className='my-2'>
                            <Input className='input-blue' type='text' placeholder='Cari Produk atau Obat' innerRef={(e) => this.cariByNama = e} />
                            <Button style={{ background: '#2B2273', borderLeft: 'none', borderRadius: '0' }} onClick={this.btFilter} >
                                <RiSearch2Line />
                            </Button>
                        </InputGroup>
                        <div className='d-flex justify-content-end'>
                            <Link to='/product-page'>
                                <a className='clr-blue' id="reset-search" style={{ textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>ke Halaman Produk</a>
                            </Link>
                        </div>
                        <div style={{ height: '1135px' }}>
                            <div className='row'>
                                {this.printProductList()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    {this.printBtPagination()}
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        product: state.productReducer.productList,
        category: state.productReducer.categoryList
    }
}

export default connect(mapToProps, { getProduct, sortAction })(ProductByCategory);