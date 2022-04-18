import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { API_URL } from '../helper';

class OrderByResepUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    printTransaksi = () => {
        return this.props.byResep.map((val, idx) => {
            return (
                <div className='col-5 my-4 mx-4 transaksi-box row' key={idx}>
                    <div className='col-10'>
                        <p className='font-price clr-orange2' style={{ fontWeight: 'bold' }}>{val.invoice}</p>
                    </div>
                    <div className='col-2'>
                        <Badge className='p-1 float-right'
                            color={val.idstatus == 4 || 8 ? 'secondary' : val.idstatus == 6 ? 'success' : val.idstatus == 7 ? 'danger' : 'primary'} style={{ color: 'white' }}>
                            {val.status}
                        </Badge>
                    </div>
                    <img src={API_URL + val.url} alt="" width='100%' />
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container'>
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

export default connect(mapToProps)(OrderByResepUserPage);