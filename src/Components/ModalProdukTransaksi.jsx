import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { API_URL } from '../helper';




class ModalProdukTransaksi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log('data', this.props.data[0].url)
        return (
            <Modal isOpen={this.props.open} toggle={this.props.toggle} >
                <ModalHeader >
                    Detail Produk yang Dibeli
                </ModalHeader>
                <ModalBody>
                    {
                        this.props.data.map((val, i) => {
                            return (
                                <div key={i} className='row' style={{padding:'10%'}}>
                                    <img className='col-6' src={API_URL + val.url} width='40%' />
                                    <div className='col-6'>
                                        <p>{val.nama}</p>
                                        <p className='font-price'>{val.qty} x Rp{val.harga_persatuan}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ModalBody>
                <ModalFooter>
                    <Button className='bt-orange' onClick={this.props.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        );
    }
}

export default ModalProdukTransaksi;