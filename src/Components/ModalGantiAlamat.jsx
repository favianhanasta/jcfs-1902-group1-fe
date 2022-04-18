import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';
import { API_URL } from '../helper';
import { getAddress, keepAction } from '../redux/actions/userAction';

class ModalGantiAlamat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getAddress()
    }

    onBtPilih = (idaddress) => {
        let valueAddress = {
            idaddress: idaddress
        }
        let token = localStorage.getItem("data");
        axios.patch(`${API_URL}/users/address/${this.props.iduser}`, valueAddress, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(async (res) => {
            await swal("Berhasil Pilih Alamat")
            this.props.toggleModalGantiAlamat();
            this.props.keepAction();
            // window.location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }

    printAddressList = () => {
        return this.props.addressList.map((value, index) => {
            return (
                <div>
                    {
                        value.idaddress === this.props.idaddress
                            ?
                            <div style={{ padding: 50, borderRadius: 20, marginTop: 50, border: "10px solid", borderColor: "#FFB000", backgroundColor: "#fde7b7" }}>
                                <div className='row'>
                                    <div className='col-10'>
                                        <h4>{value.nama_penerima}</h4>
                                        <h4>{value.phone}</h4>
                                        <p>{value.address}, {value.kecamatan}, {value.kota}, {value.provinsi}</p>
                                        <p>{value.kode_pos}</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div style={{ padding: 50, borderRadius: 20, marginTop: 50, border: "1px solid" }}>
                                <div className='row'>
                                    <div className='col-10'>
                                        <h4>{value.nama_penerima}</h4>
                                        <h4>{value.phone}</h4>
                                        <p>{value.address}, {value.kecamatan}, {value.kota}, {value.provinsi}</p>
                                        <p>{value.kode_pos}</p>
                                    </div>
                                    <div className='col-2' style={{ display: "flex", justifyContent: "space-around" }}>
                                        <Button onClick={() => this.onBtPilih(value.idaddress)} className='bt-orange' style={{ borderRadius: 10 }}>Pilih</Button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.openModalGantiAlamat}
                    toggle={this.props.toggleModalGantiAlamat}
                >
                    <ModalHeader>
                        PILIH ALAMAT LAIN
                    </ModalHeader>
                    <ModalBody>
                        {this.printAddressList()}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser,
        addressList: state.userReducer.addressList,
        idaddress: state.userReducer.idaddress
    }
}

export default connect(mapToProps, { getAddress, keepAction })(ModalGantiAlamat);