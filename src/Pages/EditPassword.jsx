import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { API_URL } from '../helper';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import swal from 'sweetalert';
import { keepAction } from '../redux/actions';
import { Navigate } from 'react-router-dom';

class EditPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passText: "Show",
            checkOldPassword: false,
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

    btCheckOldPassword = () => {
        let token = localStorage.getItem('data')
        axios.post(`${API_URL}/users/confirmoldpassword`, { password: this.oldPassword.value }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(async (res) => {
            if (res.data.success) {
                await swal('Password Sudah Sesuai')
                this.setState({ checkOldPassword: true })
            } else {
                swal('Password Anda Tidak Sesuai')
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    btChangeNewPassword = async () => {
        let dataPassword = {
            newPassword: this.newPassword.value
        }
        if (this.newPassword.value === "" || this.confNewPassword.value === "") {
            swal("Kolom Password dan Konfirmasi Password Tidak Boleh Kosong")
        } else {
            try {
                let token = localStorage.getItem('data')
                if (this.newPassword.value === this.confNewPassword.value) {
                    swal({
                        title: "Anda Yakin akan Merubah Password?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then(async (willDelete) => {
                        if (willDelete) {
                            axios.patch(`${API_URL}/users/changepass`, dataPassword, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            await swal("Password anda berhasil diubah, anda akan redirect ke home", {
                                icon: "success"
                            })
                            this.props.keepAction()
                            this.setState({ redirect: true })
                        } else {
                            swal("Gagal Merubah Password");
                        }
                    });

                } else {
                    swal("Password tidak sama")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" />
        }
        return (
            <div className='container clr-blue'>
                <div style={{ textAlign: "center", marginTop: "10%" }}>
                    <h1 style={{ fontWeight: "bolder" }}>Ubah Password Anda</h1>
                </div>
                <Form className='mt-5'>
                    {
                        this.state.checkOldPassword === false ?
                            <>
                                <h4>Masukan Password anda yang Sekarang</h4>
                                <InputGroup>
                                    <Input type={this.state.passType} style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} innerRef={(element) => this.oldPassword = element} />
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
                                <Button onClick={this.btCheckOldPassword}>Check Password</Button>
                            </>
                            :
                            <>
                                <div className='row'>
                                    <FormGroup className='col-6'>
                                        <h4>Password</h4>
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
                                    <Button className='bt-orange py-2' style={{ width: "100%", borderRadius: 20, fontSize: "20px" }} onClick={this.btChangeNewPassword}>Submit</Button>
                                </div>
                            </>
                    }

                </Form>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        password: state.userReducer.password,
        email: state.userReducer.email
    }
}

export default connect(mapToProps, { keepAction })(EditPasswordPage);