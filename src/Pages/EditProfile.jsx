import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import swal from 'sweetalert';
import { API_URL } from '../helper';

class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    btSimpan = () => {
        let dataBaru = {
            username: this.inUsername.value,
            fullname: this.inFullname.value,
            email: this.inEmail.value,
            phone: this.inPhone.value,
            address: this.inAlamat.value,
            gender: this.inGender.value,
            age: this.inAge.value,
            profile_image: this.inProfilePicture.value
        }
        console.log("TESTING SAVE : ", dataBaru)
        axios.patch(`${API_URL}/users/${this.props.iduser}`, dataBaru)
            .then((res) => {
                swal("Berhasil Merubah Data")
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        let { username, fullname, email, phone, address, gender, age, profile_image } = this.props
        return (
            <div className='container clr-blue'>
                <div style={{ textAlign: "center", marginTop: "5%" }}>
                    <h1 style={{ fontWeight: "bolder" }}>Edit Akun Anda</h1>
                </div>
                <Form className='mt-5'>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <h4>Username</h4>
                            <Input className='input-radius' innerRef={elemen => this.inUsername = elemen} defaultValue={username} />
                            <h4 className='mt-4'>Email</h4>
                            <Input className='input-radius' innerRef={elemen => this.inEmail = elemen} defaultValue={email} />
                            <h4 className='mt-4'>Alamat</h4>
                            <Input className='input-radius' innerRef={elemen => this.inAlamat = elemen} defaultValue={address} />
                            <h4 className='mt-4'>Profile Picture</h4>
                            <Input className='input-radius' innerRef={elemen => this.inProfilePicture = elemen} defaultValue={profile_image} />
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <h4>Full Name</h4>
                            <Input className='input-radius' innerRef={elemen => this.inFullname = elemen} defaultValue={fullname} />
                            <h4 className='mt-4'>No. Handphone</h4>
                            <Input className='input-radius' innerRef={elemen => this.inPhone = elemen} defaultValue={phone} />
                            <h4 className='mt-4'>Jenis Kelamin</h4>
                            <Input type='select' style={{ width: "100%", height: "10%" }} innerRef={elemen => this.inGender = elemen} defaultValue={gender} >
                                <option>...</option>
                                <option>Pria</option>
                                <option>Wanita</option>
                            </Input>
                            <h4 className='mt-4'>Umur</h4>
                            <Input className='input-radius' innerRef={elemen => this.inAge = elemen} defaultValue={age} />
                        </FormGroup>
                    </div>
                    <div className='mt-5'>
                        <Button onClick={this.btSimpan} className='bt-orange' style={{ width: "100%", borderRadius: 20, fontSize: "20px" }}>Simpan</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapToProps = (state) => {
    let { iduser, username, fullname, email, phone, address, gender, age, profile_image } = state.userReducer
    return {
        iduser: iduser,
        username: username,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        gender: gender,
        age: age,
        profile_image: profile_image
    }
}

export default connect(mapToProps)(EditProfilePage);