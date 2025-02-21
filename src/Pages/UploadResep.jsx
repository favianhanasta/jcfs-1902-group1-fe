import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import swal from 'sweetalert';
import { API_URL } from '../helper';
import moment from 'moment';
const logo = require('../Assets/pharma.png')



class UploadResep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upload: [``],
            redirect: false
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
            invoice: `INVOBR${d.getTime()}`,
            date: moment().format("YYYY-MM-DD")
        }
        let form = new FormData();
        form.append('data', JSON.stringify(data));
        this.state.upload.forEach(val => {
            form.append('images', val.file)
        });
        swal({
            title: 'Simpan Resep?',
            icon: 'warning',
            buttons: true
        })
            .then((accept) => {
                if (accept) {
                    axios.post(`${API_URL}/transaction/uploadresep`, form)
                        .then((res) => {
                            this.setState({ upload: [``] });
                            swal("Upload Berhasil", "Transaksi anda segera kami proses!", "success");
                            this.setState({ redirect: true });
                        })
                        .catch((err) => {
                            console.log('upload', err);
                        })
                }
            })
    }

    halamanProteksi = () => {
        return (
            <div>
                <img src={logo} width='50%' />
                <hr style={{ borderWidth: 5, borderRadius: 10, width: "100%", backgroundColor: "#2B2273" }} />
                <div className='clr-blue lead'>
                    <p>Silahkan login Terlebih Dahulu</p>
                    <p>Untuk menggunakan layanan transaksi dengan resep dokter</p>
                </div>
                <div style={{ width: "40%", margin: "auto" }}>
                    <Link to='/login'>
                        <Button className='bt-orange' type='button'>Ke Halaman Login</Button>
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to='/halaman-transaksi' />
        }
        return (
            <div className='container my-4' style={{ height: '80vh' }}>
                <div className='row' style={{ marginBottom: '3%' }}>
                    <div className='col-6'>
                        <h5 className='clr-blue'>Halaman Transaksi</h5>
                    </div>
                    <div className='col-6'>
                        <h5 className='clr-orange my-1' style={{ float: 'right' }}>| Order dengan Resep</h5>
                    </div>
                </div>
                {
                    this.props.iduser ?
                        <div id='input-file'>
                            <h4 className='text-center my-4 clr-orange2'>Upload File Resep Anda</h4>
                            <p className='text-muted' style={{ marginTop: '-2%' }}>(PNG,JPG,JPEG)</p>
                            {
                                this.state.upload[0].file ?
                                    <>
                                        <div className='text-center my-4'>
                                            <img src={URL.createObjectURL(this.state.upload[0].file)} width='50%' />
                                        </div>
                                        <div className='d-flex'>
                                            <Button className='bt-orange mx-2' style={{ backgroundColor: '#2B2273' }} onClick={this.btSave}>Upload</Button>
                                            <Button className='bt-orange mx-2' onClick={() => this.setState({ upload: [``] })}>Cancel</Button>
                                        </div>
                                    </>
                                    :
                                    <input type='file' onChange={e => this.handleImage(e)} />
                            }
                        </div>
                        :
                        <div className='text-center' id='input-file'>
                            {this.halamanProteksi()}
                        </div>
                }
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