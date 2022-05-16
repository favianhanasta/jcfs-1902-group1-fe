import React from 'react';
import { Card, CardBody, CardImg, Input, InputGroup, Button } from 'reactstrap';
import { RiShoppingCartLine, RiSearch2Line } from "react-icons/ri";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct, sortAction } from '../redux/actions'
import { API_URL } from '../helper';
const logo = require('../Assets/pharma.png');
const obat = require('../Assets/obat.png');

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownHarga: false,
            dropdownNama: false,
            page: 1,
            idcategory: null,
            selectedCat: null,
            selectedSort: null
        }
    }

    printProductList = () => {
        let { page } = this.state;
        return this.props.product.slice(page > 1 ? (page - 1) * 9 : page - 1, page * 9).map((val, idx) => {
            return (
                <div className='col-md-4 my-2' key={idx}>
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

    printCategory = () => {
        let { selectedCat } = this.state;
        return this.props.category.map((val, idx) => {
            return (
                <p className={selectedCat === idx ? 'clr-orange' : 'clr-blue'} id='filter-kategori' key={idx} style={{ cursor: 'pointer' }} onClick={() => this.btFilter(val.idcategory, idx)}>{val.category}</p>
            )
        })
    }

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.product.length / 9); i++) {
            btn.push(<button className='bt-pagination mx-2' onClick={() => this.setState({ page: i + 1 })} key={i}>{i + 1}</button>)
        }
        return btn;
    }

    btFilter = async (category, id) => {
        await this.setState({ idcategory: category, selectedCat: id })
        this.props.getProduct({
            nama: this.cariByNama.value,
            category: this.state.idcategory
        })
    }

    btResetSearch = () => {
        this.setState({ idcategory: null, selectedCat: null });
        this.cariByNama.value = null;
        this.props.getProduct()
    }

    btSort = (sort, type, id) => {
        this.setState({ selectedSort: id });
        this.props.sortAction({
            field: sort,
            sortType: type
        })
    }

    render() {
        let { selectedSort } = this.state;
        return (
            <div className='container my-4'>
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
                                    <Button className={selectedSort == 1 ? 'sort-select' : 'sort'} outline onClick={() => this.btSort("harga", "asc", 1)}>Terendah-Tertinggi</Button>
                                    <Button className={selectedSort == 2 ? 'sort-select my-2' : 'sort my-2'} outline onClick={() => this.btSort("harga", "desc", 2)}>Tertinggi-Terendah</Button>
                                </div>
                                <p className='clr-blue'>Nama Obat</p>
                                <div>
                                    <Button className={selectedSort == 3 ? 'sort-select' : 'sort'} outline onClick={() => this.btSort("nama", "asc", 3)}>A-Z</Button>
                                    <Button className={selectedSort == 4 ? 'sort-select mx-2' : 'sort mx-2'} outline onClick={() => this.btSort("nama", "desc", 4)}>Z-A</Button>
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
                        <div style={{ height: '1135px' }}>
                            {
                                this.props.product.length > 0 ?
                                    <div className='row'>
                                        {this.printProductList()}
                                    </div>
                                    :
                                    <div style={{ padding: '20%' }}>
                                        <div style={{ height: '30%', width: '30%', margin: 'auto' }}>
                                            <img src={obat} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                        </div>
                                        <h2 className='clr-orange text-center my-4'>Obat tidak ditemukan.</h2>
                                    </div>
                            }
                        </div>
                        <div className='text-center' style={{ marginTop: '80px' }}>
                            {this.printBtPagination()}
                        </div>
                    </div>
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