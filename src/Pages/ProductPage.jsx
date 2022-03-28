import React from 'react';
import { Card, CardBody, CardImg, Input, InputGroup, Button } from 'reactstrap';
import { RiShoppingCartLine, RiSearch2Line } from "react-icons/ri";
const logo = require('../assets/pharma.png')

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    url: "https://www.kimiafarma.co.id/images/PRODUK/TRAMADOL.jpg",
                    name: "Tramadol",
                    price: 2450
                },
                {
                    url: "https://www.kimiafarma.co.id/images/PRODUK/PETHIDINE.jpg",
                    name: "Pethidin Hcl",
                    price: 2450
                },
                {
                    url: "https://www.kimiafarma.co.id/images/PRODUK/NATRIUM-DIKLOFENAK-.jpg",
                    name: "Natrium Diklofenak",
                    price: 2450
                },
                {
                    url: "https://www.kimiafarma.co.id/images/PRODUK/NATRIUM-DIKLOFENAK-.jpg",
                    name: "Natrium Diklofenak",
                    price: 2450
                },
                {
                    url: "https://www.kimiafarma.co.id/images/PRODUK/NATRIUM-DIKLOFENAK-.jpg",
                    name: "Natrium Diklofenak",
                    price: 2450
                },
                {
                    url: "https://www.kimiafarma.co.id/images/PRODUK/MORFINA-GAB-420.jpg",
                    name: "Morphine Tablet 10MG",
                    price: 2450
                },
                {
                    url: "https://www.kimiafarma.co.id/images/PRODUK/ASAM-MEFENAMAT-STRIP-424.jpg",
                    name: "Asam Mefanamat",
                    price: 2450
                },
                {
                    url: "https://www.kimiafarma.co.id/images/PRODUK/METRONIDAZOLE-GAB.jpg",
                    name: "Metronidazole Tablet",
                    price: 2450
                }
            ],
            category: ["Obat Batuk", "Kecantikan", "Facial", "Masker", "Obat Generik"],
            dropdownHarga: false,
            dropdownNama: false,
            page : 1,
        }
    }

    printProductList = () => {
        let {page} = this.state;
        return this.state.data.slice(page>1? (page-1)*12 :page-1,page*12).map((val, idx) => {
            return (
                <div className='col-md-3 my-3' key={idx}>
                    <Card className='card'>
                        <CardImg src={val.url} top width='100%' style={{ height: '140px' }} />
                        <CardBody style={{ height: '160px' }}>
                            <div style={{ height: '95px' }}>
                                <p className='clr-blue' style={{ fontSize: '15px', fontWeight: '500' }}>{val.name}</p>
                                <p className='font-price text-muted' style={{ fontSize: '15px' }}>IDR {val.price}/tablet</p>
                            </div>
                            <RiShoppingCartLine style={{ color: '#2A2172', float: 'right', marginTop: '10%', fontSize: '18px', cursor: 'pointer' }} />
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }

    printCategory = () => {
        return this.state.category.map((val, idx) => {
            return (
                <p className='clr-blue' id='filter-kategori' key={idx} style={{ cursor: 'pointer' }}>{val}</p>
            )
        })
    }

    printBtPagination = () =>{
        let btn=[]
        for(let i=0;i< Math.ceil(this.state.data.length/12);i++){
            btn.push(<Button className='bt-pagination' onClick={()=>this.setState({page: i+1})}>{i+1}</Button>)
        }
        return btn;
    }

    render() {
        return (
            <div className='utama container'>
                <div className=' bg-light text-center my-2' style={{ marginBottom: '2%', padding: '3%', borderRadius: '15px' }}>
                    <p className='clr-blue' style={{ fontWeight: '400', fontSize: '18px' }}>Dapatkan obat anda melalui resep dokter dengan klik tombol dibawah !</p>
                    <Button className='bt-orange'>Upload Resep!</Button>
                </div>
                <div className='row py-3'>
                    <div className='col-md-3'>
                        {/* Butuh getCategory pada database */}
                        <div className='my-2 p-3 bg-light' style={{ borderRadius: '15px' }}>
                            <h4 className='clr-blue'>Kategori</h4>
                            <div className='mx-4'>
                                {this.printCategory()}
                            </div>
                            <h4 className='clr-blue'>Sort</h4>
                            <div className='px-4'>
                                <p className='clr-blue'>Harga</p>
                                <div>
                                    <Button className='sort' outline>Terendah-Tertinggi</Button>
                                    <Button className='sort my-2' outline>Tertinggi-Terendah</Button>
                                </div>
                                <p className='clr-blue'>Nama Obat</p>
                                <div>
                                    <Button className='sort' outline>A-Z</Button>
                                    <Button className='sort mx-2' outline>Z-A</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-9 p-3'>
                        <div className='row my-2'>
                            <div className='col-6'>
                                <img src={logo} style={{ width: '40%' }} />
                            </div>
                            <div className='col-6'>
                                <h5 className='clr-orange my-1' style={{float: 'right' }}>| Produk</h5>
                            </div>
                        </div>
                        <InputGroup className='my-2'>
                            <Input className='input-blue' type='text' placeholder='Cari Produk atau Obat' />
                            <Button style={{ background: '#2B2273', borderLeft: 'none', borderRadius: '0' }}>
                                <RiSearch2Line />
                            </Button>
                        </InputGroup>
                        <div className='row'>
                            {this.printProductList()}
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    {this.printBtPagination()}
                </div>
            </div>
        );
    }
}

export default ProductPage;