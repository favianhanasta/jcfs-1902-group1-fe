import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'reactstrap';
import { API_URL } from '../helper';

class OrderByResepAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    printTransaksi = () => {
        return this.props.byResep.map((val, idx) => {
            return (
                <div className='col-5 my-4 mx-4 transaksi-box row' key={idx}>
                    <div className='col-10'>
                        <p className='font-price clr-orange2' style={{ fontWeight: 'bold' }}>{val.invoice}</p>
                        <p className='clr-blue' style={{fontWeight:'600'}}>User : {val.username}</p>
                    </div>
                    <div className='col-2'>
                        <Badge className='p-1 float-right'
                            color={val.idstatus == 4 || 8 ? 'secondary' : val.idstatus == 6 ? 'success' : val.idstatus == 7 ? 'danger' : 'primary'} style={{ color: 'white' }}>
                            {val.status}
                        </Badge>
                    </div>
                    <div className='col-12'>
                    <img src={API_URL + val.url} alt="" width='100%' />
                    </div>
                    <div className='my-2 col-12'>
                        <Link to={`/custom-order?idorder=${val.idorder}`}>
                            <Button className='float-right bt-orange'>Proses</Button>
                        </Link>
                    </div>
                </div>
            )
        })
    }
    render() { 
        return ( 
            <div className='container' style={{marginTop:'1%'}}>
                <div className='row'>
                    <div className='col-md-6 d-flex py-1'>
                        <h5 className='clr-blue'>Halaman Admin</h5>
                        <h5 className='mx-3'>|</h5>
                        <h5 className='clr-orange2'>Manajemen Order By Resep</h5>
                    </div>
                </div>
                <div className='row'>
                    {this.printTransaksi()}
                </div>
            </div>
         );
    }
}

const mapToProps =(state)=>{
    return{
        byResep : state.transactionReducer.byResep
    }
}

export default connect(mapToProps)(OrderByResepAdmin);