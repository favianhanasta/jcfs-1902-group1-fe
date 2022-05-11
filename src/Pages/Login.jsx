import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import ModalForgotPassword from '../Components/ModalForgotPassword';
import { loginAction } from '../redux/actions/userAction';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { Link, Navigate } from 'react-router-dom';
import swal from 'sweetalert';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalForgotPassword: false,
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

    btLogin = async () => {
        try {
            let res = await this.props.loginAction(this.emailLogin.value, this.passwordLogin.value)
            if (this.emailLogin.value === "" || this.passwordLogin.value === "") {
                swal("Email atau Password Tidak Boleh Kosong");
            } else {
                if (res) {
                    swal("Berhasil Masuk")
                    await this.setState({ redirect: true })
                } else {
                    swal("Akun Tidak Ditemukan")
                }
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
                <ModalForgotPassword
                    openModalForgotPassword={this.state.openModalForgotPassword}
                    toggleModalForgotPassword={() => this.setState({ openModalForgotPassword: !this.state.openModalForgotPassword })}
                />
                <div style={{ textAlign: "center", marginTop: "10%" }}>
                    <h1 style={{ fontWeight: "bolder" }}>Masuk Akun</h1>
                    <h4>Selamat Datang di Pharma</h4>
                </div>
                <Form className="mt-5">
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <h4>Email</h4>
                            <Input style={{ borderRadius: 10 }} innerRef={(element) => this.emailLogin = element} />
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <h4>Password</h4>
                            <InputGroup>
                                <Input type={this.state.passType} style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} innerRef={(element) => this.passwordLogin = element} />
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
                            <div className="mt-5" style={{ float: "right" }}>
                                <h5 onClick={() => this.setState({ openModalForgotPassword: !this.state.openModalForgotPassword })} style={{cursor:'pointer'}}>Lupa Kata Sandi?</h5>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="mt-5">
                        <Button className='bt-orange py-2' style={{ width: "100%", borderRadius: 20, fontSize: "20px" }} onClick={this.btLogin}>
                            Masuk
                        </Button>
                    </div>
                    <div className="mt-3" style={{ textAlign: "center" }}>
                        <h4>Atau</h4>
                    </div>
                    <div className="mt-3">
                        <Link to="/register">
                            <Button id="btregis" outline style={{ width: "100%", borderRadius: 20, borderColor: "#2B2273", borderWidth: "3px", fontSize: "20px" }}>
                                Register
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

export default connect(null, { loginAction })(LoginPage);