import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, Input, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

class ModalRestock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty:0
        }
    }

    handleStock = (event) => {
        this.setState({ qty: parseInt(event.target.value) })
    }

    printStock = () => {
        if (this.props.data.length > 0) {
            let { idstock, idsatuan, qty, satuan } = this.props.data[0]
            return (
                <>
                    <div className="d-flex">
                        <Input className='text-center col-4' onChange={(event) => this.handleStock(event)} defaultValue={qty} type='number' />
                        <h5 className='my-1 mx-4'>{satuan}</h5>
                    </div>
                </>
            )
        }
    }

    btSimpan =()=>{
        let data = {
            stock : this.props.data,
            qtyIn : this.state.qty ? this.state.qty : this.props.data[0].qty
        }
        console.log(data)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.props.toggle} centered size='m'>
                    <ModalHeader className='clr-blue'>Edit Stock</ModalHeader>
                    <ModalBody >
                        <div className='font-price'>
                            <h5 style={{ marginBottom: '16px' }} className='clr-orange'>Stock per Item</h5>
                            {this.printStock()}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='bt-orange' onClick={this.btSimpan}>Simpan</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        satuan: state.productReducer.satuanList
    }
}

export default connect(mapToProps)(ModalRestock);