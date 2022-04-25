import React from 'react';
import { Card, CardBody, CardImg, Input, InputGroup, Button } from 'reactstrap';
import { RiShoppingCartLine, RiSearch2Line } from "react-icons/ri";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct, sortAction } from '../redux/actions'
import { API_URL } from '../helper';
const logo = require('../Assets/pharma.png')

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownHarga: false,
            dropdownNama: false,
            page: 1,
            idcategory: null
        }
    }

    printProductList = () => {
        let { page } = this.state;
        return this.props.product.slice(page > 1 ? (page - 1) * 12 : page - 1, page * 12).map((val, idx) => {
            return (
                <div className='col-md-3 my-2' key={idx}>
                    <Link to={`/product-detail?idproduct=${val.idproduct}`} style={{ textDecoration: 'none' }}>
                        <Card className='card'>
                            <CardImg src={API_URL + val.url} top width='100%' style={{ height: '140px' }} />
                            <CardBody style={{ height: '160px' }}>
                                <div style={{ height: '95px' }}>
                                    <p className='clr-blue' style={{ fontSize: '15px', fontWeight: '500' }}>{val.nama}</p>
                                    <p className='font-price text-muted' style={{ fontSize: '15px' }}>IDR {val.harga}</p>
                                </div>
                                <RiShoppingCartLine style={{ color: '#2A2172', float: 'right', marginTop: '10%', fontSize: '18px', cursor: 'pointer' }} />
                            </CardBody>
                        </Card>
                    </Link>
                </div>
            )
        })
    }

    printCategory = () => {
        return this.props.category.map((val, idx) => {
            return (
                <p className='clr-blue' id='filter-kategori' key={idx} style={{ cursor: 'pointer' }} onClick={() => this.btFilter(val.idcategory)}>{val.category}</p>
            )
        })
    }

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.product.length / 12); i++) {
            btn.push(<Button className='bt-pagination' onClick={() => this.setState({ page: i + 1 })} key={i}>{i + 1}</Button>)
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



    render() {
        return (
            <div className='container'>
                <div className=' bg-light text-center my-2' style={{ marginBottom: '2%', padding: '3%', borderRadius: '15px' }}>
                    <p className='clr-blue' style={{ fontWeight: '400', fontSize: '18px' }}>Dapatkan obat anda melalui resep dokter dengan klik tombol dibawah !</p>
                    <Link to='/uploadresep-page'>
                        <Button className='bt-orange'>Upload Resep!</Button>
                    </Link>
                </div>
                <div className='row py-3'>
                    <div className='col-md-3'>
                        {/* Butuh getCategory pada database */}
                        <div className='my-2 p-3 bg-light' style={{ borderRadius: '15px' }}>
                            <h4 className='clr-blue'>Kategori</h4>
                            <div className='mx-4'>
                                {this.printCategory()}
                            </div>
                            <h4 className='clr-blue'>Sort</h4>
                            <div className='px-4'>
                                <p className='clr-blue'>Harga</p>
                                <div>
                                    <Button className='sort' outline onClick={() => this.btSort("harga", "asc")}>Terendah-Tertinggi</Button>
                                    <Button className='sort my-2' outline onClick={() => this.btSort("harga", "desc")}>Tertinggi-Terendah</Button>
                                </div>
                                <p className='clr-blue'>Nama Obat</p>
                                <div>
                                    <Button className='sort' outline onClick={() => this.btSort("nama", "asc")}>A-Z</Button>
                                    <Button className='sort mx-2' outline onClick={() => this.btSort("nama", "desc")}>Z-A</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-9 p-3'>
                        <div className='row my-2'>
                            <div className='col-6'>
                                <img src={logo} style={{ width: '40%' }} />
                            </div>
                            <div className='col-6'>
                                <h5 className='clr-orange my-1' style={{ float: 'right' }}>| Produk</h5>
                            </div>
                        </div>
                        <InputGroup className='my-2'>
                            <Input className='input-blue' type='text' placeholder='Cari Produk atau Obat' innerRef={(e) => this.cariByNama = e} />
                            <Button style={{ background: '#2B2273', borderLeft: 'none', borderRadius: '0' }} onClick={this.btFilter} >
                                <RiSearch2Line />
                            </Button>
                        </InputGroup>
                        <div className='d-flex justify-content-end'>
                            <a className='clr-blue' id="reset-search" style={{ textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }} onClick={this.btResetSearch}>Tampilkan Semua</a>
                        </div>
                        <div className='row'>
                            {this.printProductList()}
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

export default connect(mapToProps, { getProduct, sortAction })(ProductPage);