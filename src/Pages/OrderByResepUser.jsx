import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { API_URL } from '../helper';
import { getTransactionByResep } from '../redux/actions';
const cartempty = require('../Assets/empty.png');

class OrderByResepUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getTransactionByResep()
    }

    printTransaksi = () => {
        return this.props.byResep.map((val, idx) => {
            return (
                <div className='col-5 my-4 mx-4 transaksi-box row p-4' key={idx}>
                    <div className='col-10'>
                        <p className='font-price clr-orange2' style={{ fontWeight: 'bold' }}>{val.invoice}</p>
                    </div>
                    <div className='col-2' >
                        <Badge className='p-1 float-right'
                            color={val.idstatus == 4 || 8 ? 'secondary' : val.idstatus == 6 ? 'success' : val.idstatus == 7 ? 'danger' : 'primary'} style={{ color: 'white' }}>
                            {val.status}
                        </Badge>
                    </div>
                    <div>
                        <img src={API_URL + val.url} alt="" width='100%' style={{ marginTop: '10px' }} />
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container'>
                {
                    this.props.byResep.length > 0 ?
                        <div className='row'>
                            {this.printTransaksi()}
                        </div>
                        :
                        <div className='text-center transaksi-box' style={{ padding: '10%' }}>
                            <div className='d-flex justify-content-center'>
                                <img src={cartempty} />
                            </div>
                            <h1 className='clr-orange'>Belum Ada Transaksi</h1>
                        </div>
                }
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        byResep: state.transactionReducer.byResep
    }
}

export default connect(mapToProps, { getTransactionByResep })(OrderByResepUser);