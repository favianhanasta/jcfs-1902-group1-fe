import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import ModalAdd from '../Components/ModalAdd';


class ManajemenProduk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAdd: false
        }
    }

    printProduct = ()=>{
        return this.props.product.map((val,idx)=>{
            return (
                <div></div>
            )
        })
    }

    render() {
        return (
            <>
                <ModalAdd open={this.state.modalAdd} toggle={() => this.setState({ modalAdd: !this.state.modalAdd })} />
                <div className='container utama'>
                    <div className='row'>
                        <div className='col-md-6 d-flex py-1'>
                            <h5 className='clr-blue'>Halaman Admin</h5>
                            <h5 className='mx-3'>|</h5>
                            <h5 className='clr-orange2'>Manajemen Produk</h5>
                        </div>
                        <div className='col-md-6 d-flex justify-content-end'>
                            <Button className='bt-orange' onClick={() => this.setState({ modalAdd: !this.state.modalAdd })}>Tambah Produk</Button>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const mapToProps =(state)=>{
    return {
        product : state.productReducer.productList
    }
}

export default connect(mapToProps) (ManajemenProduk);