import React from 'react';
import { Input, FormGroup, Label, Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { AiOutlinePlusSquare } from "react-icons/ai";
import imgupload from '../Assets/imageupload.svg'
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../helper';
import { getProduct } from '../redux/actions'

class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inStock: [
                {
                    id: null,
                    idsatuan: null,
                    qty: null,
                    isnetto : 0
                },
                {
                    id: null,
                    idsatuan: null,
                    qty: null,
                    isnetto : 1
                },
                {
                    id: null,
                    idsatuan: null,
                    qty: null,
                    isnetto : 0
                }
            ],
            inImage: [``]
        }
    }

    printInStock = () => {
        return (
            <>
                <div className='col-6'>
                    <p>Input Stok Item</p>
                    <Input placeholder='Satuan' type='select' className='my-1' onChange={(e) => this.handleSatuan(e, 0)}>
                        <option>Pilih Satuan</option>
                        {
                            this.props.satuan.map((val, i) => {
                                return <option value={val.idsatuan} key={i}>{val.satuan}</option>
                            })
                        }
                    </Input>
                    <Input placeholder='qty' className='my-1' onChange={(e) => this.handleQty(e, 0)} />
                </div>
                <div>
                    <p>Input Netto/Item</p>
                    <Input placeholder='Satuan' type='select' className='my-1' onChange={(e) => this.handleSatuan(e, 1)}>
                        <option>Pilih Satuan</option>
                        {
                            this.props.satuan.map((val, i) => {
                                return <option value={val.idsatuan} key={i}>{val.satuan}</option>
                            })
                        }
                    </Input>
                    <Input placeholder='qty' className='my-1' onChange={(e) => this.handleQty(e, 1)} />
                </div>
            </>
        )
    }

    handleImage = (e) => {
        let temp = [...this.state.inImage]
        temp[0] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({
            inImage: temp
        })
    }

    handleSatuan = (e, index) => {
        let temp = [...this.state.inStock];
        temp[index].idsatuan = parseInt(e.target.value);
        this.setState({ inStock: temp })
    }

    handleQty = (e, index) => {
        let temp = [...this.state.inStock];
        temp[index].qty = parseInt(e.target.value)
        this.setState({ inStock: temp })
    }

    btnSave = () => {
        let temp = [...this.state.inStock];
        temp[2].qty = this.state.inStock[0].qty * this.state.inStock[1].qty*10;
        temp[2].idsatuan = this.state.inStock[1].idsatuan;
        this.setState({ inStock: temp });
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date();
        let data = {
            idcategory: parseInt(this.kategori.value),
            nama: this.namaProduk.value,
            harga: parseInt(this.harga.value),
            deskripsi: this.deskripsi.value,
            kemasan: this.kemasan.value,
            stock: this.state.inStock,
            idsatuan: this.state.inStock[0].idsatuan,
            qty: this.state.inStock[0].qty,
            date: `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(data));
        this.state.inImage.forEach(val => {
            formData.append('images', val.file)
        });
        let token = localStorage.getItem('data');
        axios.post(`${API_URL}/product/addproduct`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.props.getProduct();
                this.props.toggle();
            })
            .catch((err) => {
                console.log("add error fe", err);
            })
        console.log('datain', data);
    }

    deleteStock = (i) => {
        let temp = [...this.state.inStock];
        temp.splice(i, 1);
        this.setState({ inStock: temp })
    }

    btToggle = () => {
        this.setState({ inImage: [``] })
        this.props.toggle()
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.btToggle} centered size='xl'>
                    <ModalHeader className='clr-blue' style={{ fontWeight: 'bold' }}>
                        Tambah Produk
                    </ModalHeader>
                    <ModalBody>
                        <div className='row' >
                            <FormGroup className='col-md-4'>
                                <Label for='nama' className='clr-blue'>
                                    Nama Produk / Obat
                                </Label>
                                <Input id='nama' type='text' innerRef={(e) => this.namaProduk = e} />
                            </FormGroup>
                            <FormGroup className='col-md-4'>
                                <Label for='harga' className='clr-blue'>
                                    Harga
                                </Label>
                                <Input id='harga' type='text' innerRef={(e) => this.harga = e} />
                            </FormGroup>
                            <FormGroup className='col-md-4 clr-blue'>
                                <p>Kategori Obat/Produk</p>
                                <Input id='kategori' type='select' innerRef={(e) => this.kategori = e} style={{ padding: '1%' }}>
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
                        <div className='row clr-blue'>
                            <FormGroup className='col-md-6'>
                                <Label for='deskripsi' className='clr-blue'>Deskripsi</Label>
                                <Input id='deskripsi' type='textarea' innerRef={(e) => this.deskripsi = e} />
                            </FormGroup>
                            <FormGroup className='col-md-6'>
                                <Label for='kemasan'>Kemasan</Label>
                                <Input id='kemasan' type='text' innerRef={(e) => this.kemasan = e} />
                            </FormGroup>
                        </div>
                        <div className='row'>
                            <FormGroup className='col-md-6'>
                                <div className='row clr-blue'>
                                    {this.printInStock()}
                                </div>
                            </FormGroup>
                            <FormGroup className='col-md-6'>
                                <p className='clr-blue'>Upload Gambar Produk</p>
                                <div className="my-2" style={{ width: '25%' }}>
                                    {
                                        this.state.inImage[0].file ?
                                            <img src={URL.createObjectURL(this.state.inImage[0].file)} width="100%" />
                                            :
                                            <img src={imgupload} width="100%" />
                                    }
                                </div>
                                <Input placeholder={``} type="file" onChange={(e) => this.handleImage(e)} />
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='bt-orange' onClick={this.btnSave} >
                            Save
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

export default connect(mapToProps, { getProduct })(ModalAdd);
