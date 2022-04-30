import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import ModalAdd from '../Components/ModalAdd';
import ModalEdit from '../Components/ModalEdit';
import { API_URL } from '../helper';
import { getProduct } from '../redux/actions';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import ModalRestock from '../Components/ModalRestock';


class ManajemenProduk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAdd: false,
            page: 1,
            handle: 8,
            modalEdit: false,
            dataForEdit: {},
            modalRestock: false,
            dataForRestock: [],
            qty:null
        }
    }

    printProduct = () => {
        let { page, handle } = this.state;
        return this.props.product.slice(page > 1 ? (page - 1) * handle : page - 1, page * handle).map((val, idx) => {
            return (
                <tr className='text-center' key={idx}>
                    <td>{page > 1 ? (page - 1) * handle + idx + 1 : idx + 1}</td>
                    <td style={{ width: '40%' }}>
                        <img src={API_URL + val.url} style={{ width: '30%' }} />
                    </td>
                    <td>{val.nama}</td>
                    <td className='font-price' style={{ width: '20%' }}>Rp. {((val.harga).toLocaleString('ID-id'))}</td>
                    <td>
                        <div className='d-flex'>
                            <Button style={{ background: '#2B2273', border: 'none', marginRight: '10px' }} onClick={() => this.btOnEdit(val)}>Edit</Button>
                            <Button color='danger' onClick={() => this.btnDelete(val.idproduct)}>Delete</Button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    btnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.product.length / 8); i++) {
            btn.push(<button className='bt-pagination mx-2' key={i} onClick={() => this.setState({ page: i + 1 })}>{i + 1}</button>)
        }
        return btn;
    }

    btnDelete = (i) => {
        axios.delete(`${API_URL}/product/${i}`)
            .then((res) => {
                this.props.getProduct()
            })
            .catch((err) => {
                console.log('delete error', err)
            })
    }

    btOnEdit = (data) => {
        this.setState({
            dataForEdit: data,
            modalEdit: !this.state.modalEdit,
            qty: data.stock[0].qty
        })
    }

    render() {
        return (
            <>
                <ModalAdd open={this.state.modalAdd} toggle={() => this.setState({ modalAdd: !this.state.modalAdd })} />
                <ModalEdit openEdit={this.state.modalEdit} data={this.state.dataForEdit} toggleEdit={() => this.setState({ modalEdit: !this.state.modalEdit })} stock={this.state.qty}/>
                <div className='container utama'>
                    <div className='row'>
                        <div className='col-md-6 d-flex py-1'>
                            <h5 className='clr-blue'>Halaman Admin</h5>
                            <h5 className='mx-3'>|</h5>
                            <h5 className='clr-orange2'>Manajemen Produk</h5>
                        </div>
                        <div className='col-md-6 d-flex justify-content-end'>
                            <Button className='bt-orange' onClick={() => this.setState({ modalAdd: !this.state.modalAdd })}>Tambah Produk <AiOutlinePlusSquare style={{ fontSize: '20px' }} /></Button>
                        </div>
                    </div>
                    <div style={{height:'1150px'}}>
                        <Table hover responsive className='my-4'>
                            <thead>
                                <tr className='text-center'>
                                    <th>No</th>
                                    <th>Gambar</th>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printProduct()}
                            </tbody>
                        </Table>
                    </div>
                    <div className='text-center'>
                        {this.btnPagination()}
                    </div>
                </div>
            </>
        );
    }
}

const mapToProps = (state) => {
    return {
        product: state.productReducer.productList
    }
}

export default connect(mapToProps, { getProduct })(ManajemenProduk);
