import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

class ModalDetailPembayaran extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log('data mod', this.props.data)
        return (
            <Modal isOpen={this.props.open} toggle={this.props.toggle} className='clr-blue' >
                <ModalHeader >
                    Detail Produk yang Dibeli
                </ModalHeader>
                <ModalBody>
                    <p style={{ fontWeight: 'bold' }}>Pesanan Anda</p>
                    <div>
                        {
                            this.props.data.idtransaction &&
                            this.props.data.detail.map((val, i) => {
                                return (
                                    <div className='row' key={i}>
                                        <div className='col-6'>
                                            <p>{val.nama}</p>
                                        </div>
                                        <div className='col-6'>
                                            <p className='font-price text-muted'>{val.qty} x Rp{val.harga_persatuan}</p>
                                            <p className='font-price clr-orange2'>Rp{val.totalperproduct}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='row'>
                        <p className='col-6' style={{ fontWeight: 'bold' }}>Tax</p>
                        <p className='font-price col-6 clr-orange2'>Rp{this.props.data.tax}</p>
                    </div>
                    <div className='row'>
                        <p className='col-6' style={{ fontWeight: 'bold' }}>Shipping</p>
                        <p className='font-price col-6 clr-orange2'>Rp{this.props.data.shipping}</p>
                    </div>
                    <hr />
                    <div className='row'>
                        <p className='col-6' style={{ fontWeight: 'bold' }}>Total Pembayaran</p>
                        <h4 className='font-price col-6 clr-orange2'>Rp{this.props.data.totalpembayaran}</h4>
                    </div>
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

export default ModalDetailPembayaran;