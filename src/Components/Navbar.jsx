import React from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../redux/actions/userAction';
import { Link, Navigate } from 'react-router-dom';
import logo from '../assets/pharma.png';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='container py-3 clr-blue'>
                <div className='row'>
                    <div className='col-4'>
                        <Link to="/">
                            <img className='my-2' src={logo} alt="..." style={{ width: "40%" }} />
                        </Link>
                    </div>
                    <div className='col-6'>
                        <div className='d-flex p-2' style={{ fontSize: 14, fontWeight: "bold" }}>
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <p className='mx-4 clr-blue'>Home</p>
                            </Link>
                            <p className='mx-4'>Produk</p>
                            <p className='mx-4'>Tentang Kami</p>
                            <p className='mx-4'>Kontak Kami</p>
                        </div>
                    </div>
                    <div className='col-2 clr-blue' style={{ fontSize: 14, fontWeight: "bold" }}>
                        {
                            this.props.username
                                ?
                                <UncontrolledDropdown>
                                    <DropdownToggle caret nav size="sm" className="d-flex align-items-center clr-blue">
                                        Hello, {this.props.username}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link to="/" className="nav-link" style={{ color: "#2d3436" }}>
                                                Profil
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/edit" className="nav-link" style={{ color: "#2d3436" }}>
                                                Edit Profile
                                            </Link>
                                        </DropdownItem>
                                        <div style={{ borderTopWidth: 2 }}>
                                            <DropdownItem onClick={() => {
                                                localStorage.removeItem("data");
                                                this.props.logoutAction()
                                                this.setState({ redirect: true })
                                            }}>
                                                <Link to="/ ">
                                                    Keluar
                                                </Link>
                                            </DropdownItem>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                :
                                <>
                                    <Link to="/login">
                                        <Button className='bt-orange' style={{ borderRadius: 10 }}>Masuk</Button>
                                    </Link>
                                </>

                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { logoutAction })(NavbarComponent);