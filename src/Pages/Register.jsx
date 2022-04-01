import axios from 'axios';
import React from 'react';
import { Form, FormGroup, Input, Button, InputGroup, InputGroupText } from 'reactstrap';
import { API_URL } from '../helper';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passText: "Show"
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

    btRegis = () => {
        let dataRegis = {
            idrole: 2,
            idstatus: 1,
            email: this.emailRegis.value,
            username: this.usernameRegis.value,
            password: this.passwordRegis.value,
            phone: 0,
            profile_image: "https://media.istockphoto.com/photos/mr-who-picture-id619400810?k=20&m=619400810&s=612x612&w=0&h=TpStSri-iDsSaBcniqzLQz8100MdEw0hQh8cIw16T6s="
        }
        if (this.passwordRegis.value === this.confPasswordRegis.value) {
            console.log(dataRegis)
            axios.post(`${API_URL}/users/regis`, dataRegis)
            alert("Register berhasil")
            window.location = "http://localhost:3000/"
        } else {
            alert("password tidak sama")
        }
    }

    render() {
        return (
            <div className='container clr-blue'>
                <div style={{ textAlign: "center", marginTop: "10%" }}>
                    <h1 style={{ fontWeight: "bolder" }}>Buat Akun</h1>
                    <h4>Gunakan Email aktif kamu</h4>
                </div>
                <Form className='mt-5'>
                    <div className='row'>
                        <div className='col-6'>
                            <FormGroup>
                                <h4>Email</h4>
                                <Input style={{ borderRadius: 10 }} innerRef={(element) => this.emailRegis = element} />
                            </FormGroup>
                            <FormGroup>
                                <h4>Username</h4>
                                <Input style={{ borderRadius: 10 }} innerRef={(element) => this.usernameRegis = element} />
                            </FormGroup>
                        </div>
                        <div className='col-6'>
                            <FormGroup>
                                <h4>Password</h4>
                                <InputGroup>
                                    <Input type={this.state.passType} style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} innerRef={(element) => this.passwordRegis = element} />
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
                            <FormGroup>
                                <h4>Confirm Password</h4>
                                <InputGroup>
                                    <Input type={this.state.passType} style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} innerRef={(element) => this.confPasswordRegis = element} />
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
                    </div>
                    <div>
                        <Button onClick={this.btRegis}>
                            Register
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default RegisterPage;