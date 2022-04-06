import React from 'react';
import { Input, FormGroup, Label, Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { AiOutlinePlusSquare } from "react-icons/ai";
import imgupload from '../Assets/imageupload.svg'
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../helper';
import { getProduct } from '../redux/actions'

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inStock: [],
            inImage: ['']
        }
    }

    handleImage = (e) => {
        let temp = [...this.state.inImage]
        temp[0] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({
            inImage: temp
        })
    }

    
    btnSave = () => {
        let data = {
            idcategory: parseInt(this.kategori.value),
            nama: this.namaProduk.value,
            harga: parseInt(this.harga.value),
            deskripsi: this.deskripsi.value,
            kemasan: this.kemasan.value,
            url: this.props.data.url
        }
        console.log("datain", data);
        let formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (this.state.inImage[0]) {
            this.state.inImage.forEach(val => {
                formData.append('images', val.file)
            });
        }
        let token = localStorage.getItem('data');
        axios.patch(`${API_URL}/product/${this.props.data.idproduct}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ inImage: [``] })
                this.props.getProduct();
                this.props.toggleEdit();
            })
            .catch((err) => {
                console.log("add error error", err);
            })
    }

    btToggle = () => {
        this.setState({ inImage: [``] });
        this.props.toggleEdit();
    }

    render() {
        let { nama, harga, idcategory, deskripsi, kemasan, url, stock } = this.props.data;
        return (
            <div>
                <Modal isOpen={this.props.openEdit} toggle={this.btToggle} centered size='lg'>
                    <ModalHeader className='clr-blue' style={{ fontWeight: 'bold' }}>
                        Edit Produk
                    </ModalHeader>
                    <ModalBody>
                        <div className='row' >
                            <FormGroup className='col-md-4'>
                                <Label for='nama' className='clr-blue'>
                                    Nama Produk / Obat
                                </Label>
                                <Input id='nama' type='text' innerRef={(e) => this.namaProduk = e} defaultValue={nama} />
                            </FormGroup>
                            <FormGroup className='col-md-4'>
                                <Label for='harga' className='clr-blue'>
                                    Harga
                                </Label>
                                <Input id='harga' type='text' innerRef={(e) => this.harga = e} defaultValue={harga} />
                            </FormGroup>
                            <FormGroup className='col-md-4 clr-blue'>
                                <p>Kategori Obat/Produk</p>
                                <Input id='kategori' type='select' innerRef={(e) => this.kategori = e} style={{ padding: '1%' }} defaultValue={idcategory}>
                                    <option value='none' disabled>Pilih Kategori</option>
                                    {
                                        this.props.category.map((val, idx) => {
                                            return (
                                                <option value={val.idcategory} key={idx}>{val.category}</option>
                                            )
                                        })
                                    }
                                </Input>
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Label for='kemasan'>Kemasan</Label>
                            <Input id='kemasan' type='text' innerRef={(e) => this.kemasan = e} defaultValue={kemasan} />
                        </FormGroup>
                        <div className='row'>
                            <FormGroup className='col-5'>
                                <p className='clr-blue'>Upload Gambar Produk</p>
                                <div className="m-4" style={{ width: '60%' }}>
                                    {
                                        this.state.inImage[0].file ?
                                            <img src={URL.createObjectURL(this.state.inImage[0].file)} width="100%" />
                                            :
                                            <img src={API_URL + url} width="100%" />
                                    }
                                </div>
                                <Input placeholder={``} type="file" onChange={(e) => this.handleImage(e)} style={{ width: '50%' }} />
                            </FormGroup>
                            <FormGroup className='col-7'>
                                <Label for='deskripsi' className='clr-blue'>Deskripsi</Label>
                                <Input id='deskripsi' type='textarea' innerRef={(e) => this.deskripsi = e} defaultValue={deskripsi} style={{height:'80%'}}/>
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='bt-orange' onClick={this.btnSave} >
                            Save
                        </Button>
                        <Button onClick={this.btnSave} color="danger" outline style={{ borderRadius: 0 }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        category: state.productReducer.categoryList,
        satuan: state.productReducer.satuanList
    }
}

export default connect(mapToProps, { getProduct })(ModalEdit);
