import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalHeader, InputGroup, FormGroup, Label } from 'reactstrap';
import swal from 'sweetalert';
import { API_URL } from '../helper';
import { getAddress } from '../redux/actions/userAction';

class ModalTambahAlamat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinsi: [],
            kota: [],
            idprovinsi: null
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        try {
            let res = await axios.get(`${API_URL}/rajaongkir/provinsi`)
            if (res.data.success) {
                this.setState({
                    provinsi: res.data.dataProvinsi
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    printProvinsi = () => {
        if (this.state.provinsi.length > 0) {
            return this.state.provinsi.map((item, index) => {
                return (
                    <option value={item.province_id}>{item.province}</option>
                )
            })
        }
    }
    handleKota = async (event) => {
        let res = await axios.get(`${API_URL}/rajaongkir/kota/${event.target.value}`)
        if (res.data.success) {
            this.setState({
                kota: res.data.dataKota
            })
        }
        this.setState({
            idprovinsi: event.target.value
        })
    }
    printKota = () => {
        if (this.state.kota.length > 0) {
            return this.state.kota.map((item, index) => {
                return (
                    <option value={item.city_id}>{item.city_name}</option>
                )
            })
        }
    }

    btSimpan = () => {
        let dataNewAddress = {
            iduser: this.props.iduser,
            idprovinsi: parseInt(this.state.idprovinsi),
            idkota: parseInt(this.inKota.value),
            idstatus: 2,
            nama_penerima: this.inNamaPenerima.value,
            address: this.alamatBaru.value,
            phone: this.inPhone.value,
            kecamatan: this.inKecamatan.value,
            kode_pos: this.inKodePos.value
        }
        console.log("dataNewAddress", dataNewAddress)
        axios.post(`${API_URL}/users/newaddress`, dataNewAddress)
            .then((res) => {
                swal("Berhasil Tambah Alamat")
                this.props.toggleModalTambahAlamat();
                this.props.getAddress();
            }).catch((error) => {
                console.log("error btnSimpan ModalTambahAlamat", error)
            })
    }

    render() {
        return (
            <div>
                <Modal
                    style={{ marginTop: "15%" }}
                    isOpen={this.props.openModalTambahAlamat}
                    toggle={this.props.toggleModalTambahAlamat}
                >
                    <ModalHeader style={{ margin: "auto" }}>
                        Tambah Alamat
                    </ModalHeader>
                    <ModalBody>
                        <InputGroup className='d-flex justify-content-between '>
                            <FormGroup style={{ width: '400px' }}>
                                <Label>Provinsi</Label>
                                <Input type='select' placeholder='Provinsi' onChange={(event) => this.handleKota(event)}>
                                    <option value='Provinsi' selected>Pilih Provinsi</option>
                                    {this.printProvinsi()}
                                </Input>
                            </FormGroup>
                            <FormGroup style={{ width: '300px' }}>
                                <Label>Kota</Label>
                                <Input type='select' placeholder='Kota' innerRef={(element) => this.inKota = element}>
                                    <option value='Kota' selected>Pilih Kota</option>
                                    {this.printKota()}
                                </Input>
                            </FormGroup>
                        </InputGroup>
                        <Label>Nama Penerima</Label>
                        <Input innerRef={(element) => this.inNamaPenerima = element} />
                        <Label>Alamat</Label>
                        <Input type='textarea' innerRef={(element) => this.alamatBaru = element} />
                        <Label>No.Hp Nama Penerima</Label>
                        <Input innerRef={(element) => this.inPhone = element} />
                        <Label>Kecamatan</Label>
                        <Input innerRef={(element) => this.inKecamatan = element} />
                        <Label>Kode Pos</Label>
                        <Input innerRef={(element) => this.inKodePos = element} />
                        <div style={{ float: "right", marginTop: 20 }}>
                            <Button onClick={this.btSimpan} style={{ borderRadius: 10 }} className='bt-orange'>
                                Simpan
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.iduser
    }
}

export default connect(mapToProps, { getAddress })(ModalTambahAlamat);