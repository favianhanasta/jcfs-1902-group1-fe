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
            inImage: ['']
        }
    }

    handleImages = (e) => {
        let temp = [...this.state.inImage]
        temp[0] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({
            inImage: temp
        })
    }

    btSimpan = () => {
        let token = localStorage.getItem("data");
        let dataBaru = {
            username: this.inUsername.value,
            fullname: this.inFullname.value,
            email: this.inEmail.value,
            phone: this.inPhone.value,
            gender: this.inGender.value,
            age: this.inAge.value,
            url: this.props.profile_image
        }
        let formData = new FormData();
        console.log("TESTING SAVE : ", dataBaru)
        formData.append('dataBaru', JSON.stringify(dataBaru));
        formData.append('images', this.state.inImage[0].file)
        axios.patch(`${API_URL}/users/${this.props.iduser}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            swal("Berhasil Merubah Data")
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        let { username, fullname, email, phone, gender, age, profile_image } = this.props
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
                            <h4 className='mt-4'>Profile Picture</h4>
                            <Input type='file' onChange={(e) => this.handleImages(e)} innerRef={(e) => this.inProfilePicture = e} className='input-radius' />
                            {
                                this.state.inImage[0].file ?
                                    <img src={URL.createObjectURL(this.state.inImage[0].file)} alt='...' style={{ width: "500px" }} />
                                    :
                                    <img src={API_URL + profile_image} alt='...' style={{ width: "500px" }} />
                            }

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
    let { iduser, username, fullname, email, phone, gender, age, profile_image } = state.userReducer
    return {
        iduser: iduser,
        username: username,
        fullname: fullname,
        email: email,
        phone: phone,
        gender: gender,
        age: age,
        profile_image: profile_image
    }
}

export default connect(mapToProps)(EditProfilePage);