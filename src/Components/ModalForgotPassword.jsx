import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Label, Input } from 'reactstrap';
import { API_URL } from '../helper';

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
                alert("success send mail")
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
                    <ModalHeader toggle={this.props.toggleModalForgotPassword}>
                        Modal title
                    </ModalHeader>
                    <ModalBody>
                        <Label>Input Email for Confirmation</Label>
                        <Input innerRef={(element) => this.emailConfirmation = element} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.btSendEmail}>Send</Button>
                        {' '}
                        <Button onClick={this.props.toggleModalForgotPassword}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalForgotPassword;