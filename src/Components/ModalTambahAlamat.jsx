import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';
import { API_URL } from '../helper';
import { getAddress } from '../redux/actions/userAction';

class ModalTambahAlamat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    btSimpan = () => {
        let dataNewAddress = {
            iduser: this.props.iduser,
            address: this.alamatBaru.value
        }
        console.log("dataNewAddress", dataNewAddress)
        axios.post(`${API_URL}/users/newaddress`, dataNewAddress)
            .then((res) => {
                swal("Berhasil Tambah Alamat")
                this.props.toggleModalTambahAlamat();
                this.props.getAddress();
            }).catch((error) => {
                console.log("error btnSimpan ModalTambahAlamat", error)
            })
    }

    render() {
        return (
            <div>
                <Modal
                    style={{ marginTop: "15%" }}
                    isOpen={this.props.openModalTambahAlamat}
                    toggle={this.props.toggleModalTambahAlamat}
                >
                    <ModalHeader style={{ margin: "auto" }}>
                        Tambah Alamat
                    </ModalHeader>
                    <ModalBody>
                        <Input type='textarea' innerRef={(element) => this.alamatBaru = element} />
                        <div style={{ float: "right", marginTop: 20 }}>
                            <Button onClick={this.btSimpan} style={{ borderRadius: 10 }} className='bt-orange'>
                                Simpan
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser
    }
}

export default connect(mapToProps, {getAddress})(ModalTambahAlamat);