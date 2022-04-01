import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import swal from 'sweetalert';
import { newPassword } from '../redux/actions/userAction';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passText: "Show",
            redirect: false
        }
    }

    showHidePassword = () => {
        if (this.state.passType === "password") {
            this.setState({
                passType: "text",
                passText: "Hide"
            })
        } else if (this.state.passType === "text") {
            this.setState({
                passType: "password",
                passText: "Show"
            })
        }
    }

    newPasswordFunc = async () => {
        try {
            if (this.newPassword.value === this.confNewPassword.value) {

                await this.props.newPassword(this.newPassword.value)
                this.setState({ redirect: true })
            } else {
                swal("Password tidak sama")
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" />
        }
        return (
            <div className='container clr-blue'>
                <div style={{ textAlign: "center", marginTop: "10%" }}>
                    <h1 style={{ fontWeight: "bolder" }}>Masukan Password Baru Anda</h1>
                </div>
                <Form className='mt-5'>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <h4>Password Baru</h4>
                            <InputGroup>
                                <Input type={this.state.passType} style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} innerRef={(element) => this.newPassword = element} />
                                <InputGroupText onClick={this.showHidePassword} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                    {
                                        this.state.passText === 'Show'
                                            ?
                                            <BsEyeSlash />
                                            :
                                            <BsEye />
                                    }
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='col-6'>
                        <h4>Konfirmasi Password</h4>
                            <InputGroup>
                                <Input type={this.state.passType} style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} innerRef={(element) => this.confNewPassword = element} />
                                <InputGroupText onClick={this.showHidePassword} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                    {
                                        this.state.passText === 'Show'
                                            ?
                                            <BsEyeSlash />
                                            :
                                            <BsEye />
                                    }
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className='mt-5'>
                        <Button className='bt-orange py-2' style={{ width: "100%", borderRadius: 20, fontSize: "20px" }} onClick={this.newPasswordFunc}>Submit</Button>
                    </div>
                </Form>
            </div>
        );
    }
}


export default connect(null, { newPassword })(ResetPasswordPage);