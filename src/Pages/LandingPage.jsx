import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card } from 'reactstrap';
import { API_URL } from '../helper';
import pharmacist from '../Assets/pharmacist.png';
import generik from '../Assets/generik.png';
import alkes from '../Assets/alkes.png';
import herbal from '../Assets/herbal.png';
import perawatan from '../Assets/perawatan.png';
import suplemen from '../Assets/suplemen.png';
import dokter from '../Assets/dokter.png';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    printCategory = () => {
        return (
            <>
                <Link to='/product-page-category?idcategory=1' style={{ textDecoration: 'none' }}>
                    <div style={{ cursor: 'pointer' }}>
                        <div className='py-2'>
                            <div className='kategori-image m-auto'>
                                <img src={generik} style={{ maxWidth: '100%', minWidth: '100%' }} />
                            </div>
                        </div>
                        <h4 className='text-center' style={{ fontWeight: '800', marginTop: '5px', color: 'white' }}>Generik</h4>
                    </div>
                </Link>
                <Link to='/product-page-category?idcategory=2' style={{ textDecoration: 'none' }}>
                    <div style={{ cursor: 'pointer' }}>
                        <div className='py-2'>
                            <div className='kategori-image m-auto' style={{ paddingTop: '11%' }}>
                                <img src={suplemen} style={{ maxWidth: '100%', minWidth: '100%' }} />
                            </div>
                        </div>
                        <h4 className='text-center' style={{ color: 'white', fontWeight: '800', marginTop: '5px' }}>Suplemen</h4>
                    </div>
                </Link>
                <Link to='/product-page-category?idcategory=3' style={{ textDecoration: 'none' }}>
                    <div style={{ cursor: 'pointer' }}>
                        <div className='py-2'>
                            <div className='kategori-image m-auto' style={{ paddingTop: '11%' }}>
                                <img src={perawatan} style={{ maxWidth: '100%', minWidth: '100%' }} />
                            </div>
                        </div>
                        <h4 className='text-center' style={{ color: 'white', fontWeight: '800', marginTop: '5px' }}>Perawatan Tubuh</h4>
                    </div>
                </Link>
                <Link to='/product-page-category?idcategory=4' style={{ textDecoration: 'none' }}>
                    <div style={{ cursor: 'pointer' }}>
                        <div className='py-2'>
                            <div className='kategori-image m-auto' style={{ paddingTop: '15%' }}>
                                <img src={herbal} style={{ maxWidth: '100%', minWidth: '100%' }} />
                            </div>
                        </div>
                        <h4 className='text-center' style={{ color: 'white', fontWeight: '800', marginTop: '5px' }}>Herbal</h4>
                    </div>
                </Link>
                <Link to='/product-page-category?idcategory=5' style={{ textDecoration: 'none' }}>
                    <div style={{ cursor: 'pointer' }}>
                        <div className='py-2'>
                            <div className='kategori-image m-auto'>
                                <img src={alkes} style={{ maxWidth: '100%', minWidth: '100%' }} />
                            </div>
                        </div>
                        <h4 className='text-center' style={{ color: 'white', fontWeight: '800', marginTop: '5px' }}>Alat Kesehatan</h4>
                    </div>
                </Link>
            </>
        )
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', margin: '0' }}>
                    <div className='container box-landing shadow'>
                    </div>
                    <div className='landing-text-box'>
                    </div>
                    <div className='landing-text clr-orange2'>
                        <p style={{ fontWeight: '800', fontSize: '36px' }}>Beli Obat Lebih Mudah Dengan <span className='clr-blue'>pharma.</span></p>
                        <p className='clr-blue'>Dapatkan kebutuhan kesehatan anda di pharma mulai dari obat - obatan generik, herbal, suplemen hingga perawatan tubuh</p>
                        <Link to='/product-page'>
                            <Button className='bt-orange my-2'>Beli Sekarang!</Button>
                        </Link>
                    </div>
                    <div className='circle-right-box-md circle-right-box-lg'>
                        <span className='circle mx-2' style={{ background: '#FE5F01' }}></span>
                        <span className='circle mx-1' style={{ background: '#FFB000' }}></span>
                        <span className='circle mx-2' style={{ background: '#2B2273' }}></span>
                    </div>
                </div>
                <div className='container' style={{ marginTop: '5%' }}>
                    <div className='row' style={{ paddingRight: '10%' }}>
                        <div className='col-7'>
                            <div style={{ height: '400px', width: '400px', borderRadius: '50%', float: 'right', background: '#fff7e6' }}>
                                <img src={pharmacist} alt="" style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '5%', position: 'absolute' }} />
                            </div>
                        </div>
                        <div className='col-5' style={{ textAlign: 'left' }}>
                            <div style={{ paddingTop: '20%' }}>
                                <h2 className='clr-blue' style={{ fontWeight: '700' }}>Nikmati fitur belanja pharma dengan mendaftarkan diri anda!</h2>
                                <p className='lead text-muted'>Dengan memiliki akun, anda dapat melakukan transaksi dan order melalui resep yang anda dapatkan dari dokter!</p>
                                <Link to='register'><Button className='bt-orange' style={{ borderRadius: '20px', padding: '10px' }}>Daftar Sekarang!</Button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '-2%', marginBottom: '4%', marginLeft: '7%' }}>
                    <span className='circle mx-2' style={{ background: '#2B2273' }}></span>
                    <span className='circle mx-1' style={{ background: '#FFB000' }}></span>
                    <span className='circle mx-2' style={{ background: '#FE5F01' }}></span>
                </div>
                <div className='kategori-bar'>
                    <div className='d-flex' style={{ justifyContent: 'space-evenly' }}>
                        {
                            this.printCategory()
                        }
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-5' style={{ paddingTop: '15px' }}>
                            <div className='clr-blue'>
                                <h2 style={{ fontWeight: '700' }}>Upload Resep Dokter Anda Untuk Transaksi Lebih Mudah!</h2>
                                <p className='text-muted lead my-4'>Fitur ini membantu anda dalam melakukan transaksi obat sesuai dengan resep dokter yang anda miliki. Daftarkan diri anda  untuk dapat menggunakan fitur ini.</p>
                            </div>
                            <div style={{ marginBottom: '25px', right: '0' }}>
                                <div className='d-flex justify-content-end'>
                                    <span className='circle2 mx-2' style={{ background: '#FE5F01' }}></span>
                                    <span className='circle2 mx-1' style={{ background: '#FFB000' }}></span>
                                    <span className='circle2 mx-2' style={{ background: '#2B2273' }}></span>
                                </div>
                            </div>
                            <div>
                                <Link to='/uploadresep-page'><Button className='bt-orange' style={{ borderRadius: '20px', padding: '10px', margin: 'auto' }}>Upload Sekarang</Button></Link>
                            </div>
                        </div>
                        <div className='col-7'>
                            <div style={{ height: '500px', width: '500px' }}>
                                <img src={dokter} alt="" style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        product: state.productReducer.productList,
        category: state.productReducer.categoryList
    }
}

export default connect(mapToProps)(HomePage);



