import React from 'react';
import { Input, FormGroup, Label, Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { AiOutlineClose } from "react-icons/ai";
import imgupload from '../Assets/imageupload.svg'
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../helper';
import { getProduct } from '../redux/actions';
import { Tab, Tabs } from 'react-bootstrap';
import swal from 'sweetalert';
import { VStack } from '@chakra-ui/react';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inStock: [],
            inImage: [''],
            key: 'product',
            qty: 0,
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
        axios.patch(`${API_URL}/product/editproduct/${this.props.data.idproduct}`, formData, {
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
        this.setState({ inImage: [``], qty: 0 });
        this.props.toggleEdit();
    }

    handleStock = (event) => {
        this.setState({ qty: parseInt(event.target.value) })
    }

    btSimpan = () => {
        let data = {
            stock: this.props.data.stock,
            qtyIn: this.state.qty ? this.state.qty : this.props.data.stock[0].qty
        }
        let token = localStorage.getItem('data');
        axios.patch(API_URL + '/product/editstock', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                swal("Edit Stock Success!", "", "success");
                this.btToggle();
            })
            .catch((err) => { console.log(err) })
    }

    render() {
        let { nama, harga, idcategory, deskripsi, kemasan, url,stock } = this.props.data;
        console.log('stock',stock)
        return (
            <div>
                <Modal isOpen={this.props.openEdit} toggle={this.btToggle} centered size='lg'>
                    <ModalHeader className='clr-blue' style={{ fontWeight: 'bold' }} >
                        Edit Produk
                    </ModalHeader>
                    <ModalBody>
                        <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={(k) => this.setState({ key: k })} className='mb-3'>
                            <Tab eventKey="product" title="Edit Product">
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
                                        <Input id='deskripsi' type='textarea' innerRef={(e) => this.deskripsi = e} defaultValue={deskripsi} style={{ height: '80%' }} />
                                    </FormGroup>
                                </div>
                                <div className='d-flex justify-content-end py-2'>
                                    <Button className='bt-orange mx-3' onClick={this.btnSave} >
                                        Save
                                    </Button>
                                    <Button onClick={this.btnSave} color="danger" outline style={{ borderRadius: 0 }}>
                                        Cancel
                                    </Button>
                                </div>
                            </Tab>
                            <Tab eventKey="stock" title="Edit Stock" onClick={() => console.log("test")}>
                                <div className='font-price' >
                                    <h5 style={{ marginBottom: '16px' }} className='clr-orange'>Stock per Item</h5>
                                    <div className="d-flex" style={{ height: '10vh' }}>
                                        <Input className='text-center col-4' onChange={(event) => this.handleStock(event)} type='number' defaultValue={this.props.stock}/>
                                        <h5 className='my-1 mx-4'></h5>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end py-2'>
                                    <Button className='bt-orange mx-3' onClick={this.btSimpan}>Simpan</Button>
                                    <Button onClick={this.btnSave} color="danger" outline style={{ borderRadius: 0 }}>Cancel</Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </ModalBody>
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
