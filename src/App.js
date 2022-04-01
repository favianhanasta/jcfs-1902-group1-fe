import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { keepAction } from './redux/actions/userAction';
import NavbarComponent from './Components/Navbar';
import HomePage from './Pages/LandingPage';
import RegisterPage from './Pages/Register';
import LoginPage from './Pages/Login';
import VerificationPage from './Pages/Verification';
import EditPage from './Pages/Edit';
import ResetPasswordPage from './Pages/ResetPassword';
import ManajemenProduk from './Pages/ManajemenProduk';
import ProductPage from './Pages/ProductPage';
import { getCategory, getProduct } from '../src/redux/actions';
import ProductDetail from './Pages/ProductDetail';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.keepAction()
    this.props.getProduct()
    this.props.getCategory()
  }
  
  render() {
    return (
      <div>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/product-page' element={<ProductPage />} />
          <Route path='/manajemen-produk' element={<ManajemenProduk />} />
          <Route path='/product-detail' element={<ProductDetail/>}/>
          <Route path='/verification/:token' element={<VerificationPage />} />
          <Route path='/resetpassword/:token' element={<ResetPasswordPage />} />
          <Route path='/edit' element={<EditPage />} />
        </Routes>
      </div>
    );
  }
}

const mapToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapToProps, { keepAction, getCategory, getProduct })(App);
