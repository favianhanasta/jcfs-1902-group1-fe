import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import swal from 'sweetalert';
import { API_URL } from '../helper';



class UploadResep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upload: [``]
        }
    }

    handleImage = (e) => {
        let temp = [...this.state.upload]
        temp[0] = { name: e.target.files[0].name, file: e.target.files[0] };
        this.setState({
            upload: temp
        })
    }

    btSave = () => {
        let d = new Date();
        let data = {
            iduser: this.props.iduser,
            invoice: `INVOBR${d.getTime()}`
        }
        let form = new FormData();
        form.append('data', JSON.stringify(data));
        this.state.upload.forEach(val => {
            form.append('images', val.file)
        });
        axios.post(`${API_URL}/transaction/uploadresep`, form)
            .then((res) => {
                this.setState({ upload: [``] });
                swal("Upload Berhasil","Transaksi anda segera kami proses!","success")
            })
            .catch((err) => {
                console.log('upload', err);
            })

    }

    render() {
        return (
            <div className='container my-4'>
                <div className='row' style={{ marginBottom: '3%' }}>
                    <div className='col-6'>
                        <h5 className='clr-blue'>Halaman Transaksi</h5>
                    </div>
                    <div className='col-6'>
                        <h5 className='clr-orange my-1' style={{ float: 'right' }}>| Order dengan Resep</h5>
                    </div>
                </div>
                <div id='input-file'>
                    <h4 className='text-center my-4 clr-orange2'>Upload File Resep Anda</h4>
                    <p className='text-muted' style={{marginTop:'-2%'}}>(PNG,JPG,JPEG)</p>
                    {
                        this.state.upload[0].file ?
                            <div className='text-center my-4'>
                                <img src={URL.createObjectURL(this.state.upload[0].file)} width='50%' />
                            </div>
                            :
                            <>
                                <input type='file' onChange={e => this.handleImage(e)} />
                            </>
                    }
                    <Button className='bt-orange' style={{ backgroundColor: '#2B2273' }} onClick={this.btSave}>Upload</Button>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser,
        idrole: state.userReducer.idrole,
    }
}

export default connect(mapToProps)(UploadResep);