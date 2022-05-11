import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { getAddress, keepAction } from '../redux/actions/userAction';
import ModalTambahAlamat from '../Components/ModalTambahAlamat';
import axios from 'axios';
import { API_URL } from '../helper';
import swal from 'sweetalert';

class DaftarAlamatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalTambahAlamat: false
        }
    }

    componentDidMount() {
        this.props.getAddress()
    }

    onBtPilih = (idaddress) => {
        let valueAddress = {
            idaddress: idaddress
        }
        let token = localStorage.getItem("data");
        axios.patch(`${API_URL}/users/address/${this.props.iduser}`, valueAddress, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(async (res) => {
            await swal("Berhasil Pilih Alamat")
            this.props.keepAction();
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtRemove = (idaddress) => {
        let token = localStorage.getItem("data");
        axios.delete(`${API_URL}/users/${idaddress}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            swal("Berhasil Hapus Alamat")
            this.props.getAddress();
        }).catch((err) => {
            console.log(err)
        })
    }

    printAddressList = () => {
        return this.props.addressList.map((value, index) => {
            return (
                <div>
                    {
                        value.idaddress === this.props.idaddress
                            ?
                            <div style={{ padding: 50, borderRadius: 20, marginTop: 50, border: "10px solid", borderColor: "#FFB000", backgroundColor: "#fde7b7" }}>
                                <div className='row'>
                                    <div className='col-10'>
                                        <h4>{value.nama_penerima}</h4>
                                        <h4>{value.phone}</h4>
                                        <p>{value.address}, {value.kecamatan}, {value.kota}, {value.provinsi}</p>
                                        <p>{value.kode_pos}</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div style={{ padding: 50, borderRadius: 20, marginTop: 50, border: "1px solid" }}>
                                <div className='row'>
                                    <div className='col-10'>
                                        <h4>{value.nama_penerima}</h4>
                                        <h4>{value.phone}</h4>
                                        <p>{value.address}, {value.kecamatan}, {value.kota}, {value.provinsi}</p>
                                        <p>{value.kode_pos}</p>
                                    </div>
                                    <div className='col-2' style={{ display: "flex", justifyContent: "space-around" }}>
                                        <Button onClick={() => this.onBtPilih(value.idaddress)} className='bt-orange' style={{ borderRadius: 10 }}>Pilih</Button>
                                        <Button onClick={() => this.onBtRemove(value.idaddress)} className='bt-blue' style={{ borderRadius: 10 }}>Hapus</Button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            )
        })
    }

    render() {
        console.log("addressList", this.props.addressList)
        console.log("idaddress", this.props.idaddress)
        return (
            <div className='container clr-blue' style={{height:'100vh'}}>
                <ModalTambahAlamat
                    openModalTambahAlamat={this.state.openModalTambahAlamat}
                    toggleModalTambahAlamat={() => this.setState({ openModalTambahAlamat: !this.state.openModalTambahAlamat })}
                />
                <div style={{ textAlign: "center", marginTop: "5%" }}>
                    <h1 style={{ fontWeight: "bolder" }}>Daftar Alamat Anda</h1>
                </div>
                <div style={{ textAlign: "end", marginTop: "5%" }}>
                    <Button onClick={() => this.setState({ openModalTambahAlamat: !this.state.openModalTambahAlamat })} className='bt-orange' style={{ borderRadius: 10, fontSize: "20px" }}>Tambah Alamat</Button>
                </div>
                <div>
                    {this.printAddressList()}
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser,
        addressList: state.userReducer.addressList,
        idaddress: state.userReducer.idaddress
    }
}

export default connect(mapToProps, { getAddress, keepAction })(DaftarAlamatPage);