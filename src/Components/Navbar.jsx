import React from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../redux/actions/userAction';
import { Link } from 'react-router-dom';
import logo from '../Assets/pharma.png';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BsCartFill } from "react-icons/bs";
import { Badge } from '@mui/material';
import { API_URL } from '../helper';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='clr-blue shadow-sm'>
                <div className='container' style={{ paddingTop: '10px' }}>
                    <div className='row'>
                        <div className='col-4 p-3'>
                            <Link to="/">
                                <img src={logo} alt="..." style={{ width: "40%" }} />
                            </Link>
                        </div>
                        <div className='col-6'>
                            <div className='d-flex p-3' id='nav-item' style={{ fontSize: 14, fontWeight: "bold" }}>
                                <div>
                                    <Link to="/" style={{ textDecoration: "none" }}>
                                        <p className='mx-4 clr-blue'>Home</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/product-page" style={{ textDecoration: "none" }}>
                                        <p className='mx-4 clr-blue'>Produk</p>
                                    </Link>
                                </div>
                                <div>
                                    <p className='mx-4'>Tentang Kami</p>
                                </div>
                                {
                                    this.props.idrole == 2 &&
                                    <>
                                        <div>
                                            <Link to="/halaman-transaksi" className='clr-blue' style={{ textDecoration: "none" }}>
                                                <p className='mx-4'>Transaksi</p>
                                            </Link>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='col-2 clr-blue d-flex ' style={{ fontSize: 14, fontWeight: "bold" }}>
                            {
                                this.props.idrole == 2 &&
                                <Link to="/cart" style={{ color: "#2d3436" }}>
                                    <div className='p-3'>
                                        <Badge badgeContent={this.props.cartList.length} color='error'>
                                            <BsCartFill className='clr-blue' style={{ fontSize: '20px' }} />
                                        </Badge>
                                    </div>
                                </Link>
                            }
                            {
                                this.props.username
                                    ?
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret nav className="d-flex clr-blue align-items-center">
                                            <div className='d-flex'>
                                                <img className='mt-1' src={API_URL + this.props.imgProfile} style={{ height: 40, width: 40, borderRadius: '50px' }} />
                                                <div className='p-2'>
                                                    <p className='mt-1'>{this.props.username}</p>
                                                </div>
                                            </div>
                                        </DropdownToggle>
                                        {
                                            this.props.idrole === 1
                                                ?
                                                <DropdownMenu>
                                                    <DropdownItem>
                                                        <Link to="/manajemen-produk" className="nav-link" style={{ color: "#2d3436" }}>
                                                            Manajemen Produk
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/manajemen-transaksi" className="nav-link" style={{ color: "#2d3436" }}>
                                                            Manajemen Transaksi
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/manajemen-orderresep" className="nav-link" style={{ color: "#2d3436" }}>
                                                            Manajemen Order By Resep
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/sales-report" className="nav-link" style={{ color: "#2d3436" }}>
                                                            Sales Report
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/datalog" className="nav-link" style={{ color: "#2d3436" }}>
                                                            Data Log
                                                        </Link>
                                                    </DropdownItem>
                                                    <div style={{ borderTopWidth: 2 }}>
                                                        <DropdownItem onClick={() => {
                                                            localStorage.removeItem("data");
                                                            this.props.logoutAction()
                                                        }}>
                                                            <Link to="/login">
                                                                Keluar
                                                            </Link>
                                                        </DropdownItem>
                                                    </div>
                                                </DropdownMenu>
                                                :
                                                <DropdownMenu>
                                                    <DropdownItem>
                                                        <Link to="/editprofile" className="nav-link" style={{ color: "#2d3436" }}>
                                                            Profil
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/daftaralamat" className="nav-link" style={{ color: "#2d3436" }}>
                                                            Daftar Alamat
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/editpassword" className="nav-link" style={{ color: "#2d3436" }}>
                                                            Ubah Password
                                                        </Link>
                                                    </DropdownItem>
                                                    <hr />
                                                    <DropdownItem onClick={() => {
                                                        localStorage.removeItem("data");
                                                        this.props.logoutAction()
                                                    }}>
                                                        <Link to="/login" style={{ textDecoration: "none" }}>
                                                            <p className='clr-blue'>Keluar</p>
                                                        </Link>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                        }

                                    </UncontrolledDropdown>
                                    :
                                    <>
                                        <Link to="/login">
                                            <Button className='bt-orange my-2' style={{ borderRadius: 10 }}>Masuk</Button>
                                        </Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        idrole: state.userReducer.idrole,
        cartList: state.userReducer.cartList,
        imgProfile: state.userReducer.profile_image
    }
}

export default connect(mapToProps, { logoutAction })(NavbarComponent);