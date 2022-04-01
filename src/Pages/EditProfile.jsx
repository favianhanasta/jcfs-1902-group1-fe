import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className='container clr-blue'>
                <div style={{ textAlign: "center", marginTop: "5%" }}>
                    <h1 style={{ fontWeight: "bolder" }}>Edit Akun Anda</h1>
                </div>
                <Form className='mt-5'>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <h4>Username</h4>
                            <Input className='input-radius' />
                            <h4 className='mt-4'>Email</h4>
                            <Input className='input-radius' />
                            <h4 className='mt-4'>Alamat</h4>
                            <Input className='input-radius' />
                            <h4 className='mt-4'>Profile Picture</h4>
                            <Input className='input-radius' />
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <h4>Full Name</h4>
                            <Input className='input-radius' />
                            <h4 className='mt-4'>No. Handphone</h4>
                            <Input className='input-radius' />
                            <h4 className='mt-4'>Jenis Kelamin</h4>
                            <Input className='input-radius' />
                            <h4 className='mt-4'>Umur</h4>
                            <Input className='input-radius' />
                        </FormGroup>
                    </div>
                    <div className='mt-5'>
                        <Button className='bt-orange' style={{ width: "100%", borderRadius: 20, fontSize: "20px" }}>Simpan</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default EditProfilePage;