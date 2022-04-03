import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Label, Input, InputGroup, InputGroupText, Form, FormGroup } from 'reactstrap';
import { API_URL } from '../helper';
import { RiErrorWarningLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import swal from 'sweetalert';

class ModalForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    btSendEmail = () => {
        console.log(this.emailConfirmation.value)
        axios.post(`${API_URL}/users/forgot`, { email: this.emailConfirmation.value })
            .then(res => {
                console.log("res.data", res.data)
                swal("Kami sudah mengirimkan link melalui email, silahkan periksa email anda")
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.openModalForgotPassword}
                    toggle={this.props.toggleModalForgotPassword}
                >
                    {/* <ModalHeader toggle={this.props.toggleModalForgotPassword}>
                        Modal title
                    </ModalHeader> */}
                    <ModalBody className='clr-blue' style={{ margin: "auto", textAlign: "center" }}>
                        <RiErrorWarningLine style={{ display: "block", width: "30%", height: "30%", margin: "auto" }} />
                        <Label style={{ fontWeight: "bolder", marginTop: 20 }}>Lupa Password</Label>
                        <p>Masukan Email Anda dan kami akan mengirimkan link untuk reset password anda</p>
                        <InputGroup>
                            <InputGroupText style={{ marginTop: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, color: "#2B2273" }}>
                                <MdEmail />
                            </InputGroupText>
                            <Input style={{ marginTop: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }} innerRef={(element) => this.emailConfirmation = element} />
                        </InputGroup>
                        <div>
                            <Button className='bt-orange' style={{ borderRadius: 10, marginTop: 30, width: "100%" }} onClick={this.btSendEmail}>Send</Button>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <p onClick={this.props.toggleModalForgotPassword}>Kembali ke halaman Login</p>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalForgotPassword;