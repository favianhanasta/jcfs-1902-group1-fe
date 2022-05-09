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
import EditPasswordPage from './Pages/EditPassword';
import ResetPasswordPage from './Pages/ResetPassword';
import ManajemenProduk from './Pages/ManajemenProduk';
import ProductPage from './Pages/ProductPage';
import { getCategory, getProduct, getSatuan, getTransactionByResep } from '../src/redux/actions';
import ProductDetail from './Pages/ProductDetail';
import NotFound from './Pages/NotFound';
import EditProfilePage from './Pages/EditProfile';
import UploadResep from './Pages/UploadResep';
import DaftarAlamatPage from './Pages/DaftarAlamat';
import CartPage from './Pages/Cart';
import CheckoutPage from './Pages/Checkout';
import TransaksiPage from './Pages/TransaksiPage';
import ManajemenTransaksi from './Pages/ManajemenTransaksi';
import OrderByResepAdmin from './Pages/OrderByResepAdmin';
import CustomOrderResep from './Pages/CustomOrderResep';
import SalesReport from './Pages/SalesReport';
import DataLogging from './Pages/DataLogging';
import ProductByCategory from './Pages/ProductByCategory';
import FooterComp from './Components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.keepAction()
    this.props.getProduct()
    this.props.getCategory()
    this.props.getSatuan()
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
          <Route path='/product-page-category' element={<ProductByCategory />} />
          <Route path='/product-detail' element={<ProductDetail />} />
          <Route path='/verification/:token' element={<VerificationPage />} />
          <Route path='/resetpassword/:token' element={<ResetPasswordPage />} />
          <Route path='/uploadresep-page' element={<UploadResep />} />
          {
            this.props.idrole === 2 ?
              <>
                <Route path='/editpassword' element={<EditPasswordPage />} />
                <Route path='/editprofile' element={<EditProfilePage />} />
                <Route path='/daftaralamat' element={<DaftarAlamatPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path='/uploadresep-page' element={<UploadResep />} />
                <Route path='/halaman-transaksi' element={<TransaksiPage />} />
              </>
              :
              this.props.idrole === 1 ?
                <>
                  <Route path='/manajemen-produk' element={<ManajemenProduk />} />
                  <Route path='/manajemen-transaksi' element={<ManajemenTransaksi />} />
                  <Route path='/manajemen-orderresep' element={<OrderByResepAdmin />} />
                  <Route path='/custom-order' element={<CustomOrderResep />} />
                  <Route path='/sales-report' element={<SalesReport />} />
                  <Route path='/datalog' element={<DataLogging/>} />
                </>
                :
                <>
                  <Route path='*' element={<NotFound />} />
                </>
          }
          <Route path='*' element={<NotFound />} />
        </Routes>
        <FooterComp/>
      </div>
    );
  }
}

const mapToProps = (state) => {
  return {
    username: state.userReducer.username,
    idrole: state.userReducer.idrole
  }
}

export default connect(mapToProps, { keepAction, getCategory, getProduct, getSatuan, getTransactionByResep })(App);
