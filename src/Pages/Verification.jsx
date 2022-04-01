import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { verifyAction } from '../redux/actions/userAction';
import { MdMarkEmailRead } from "react-icons/md";

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    verify = () => {
        try {
            this.props.verifyAction()
            this.setState({ redirect: true })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" />
        }

        return (
            <div className='container text-center'>
                <div style={{ width: "30%", margin: "auto", paddingTop:"5%" }}>
                    <MdMarkEmailRead className='clr-blue' style={{ width: "100%", height: "100%" }} />
                </div>
                <hr style={{ borderWidth: 10, borderRadius: 10, marginBottom:"5%" }} />
                <div>
                    <h1 className='clr-orange2' style={{fontWeight:"bolder"}}>Verifikasi Akun Anda</h1>
                </div>
                <hr style={{ borderWidth: 5, borderRadius: 10, width: "20%", backgroundColor:"#2B2273" }} />
                <div className='clr-blue lead   '>
                    <p>Terima kasih sudah mendaftar di pharma</p>
                    <p>Gunakan tombol dibawah ini untuk verifikasi akun anda</p>
                </div>
                <div style={{ width: "40%", margin: "auto" }}>
                    <Button className='bt-orange' style={{ borderRadius: 10, width: "100%", height:"6vh" }} type='button' onClick={this.verify}>Verifikasi Akun</Button>
                </div>
                <hr style={{ borderWidth: 10, borderRadius: 10, marginTop:"5%" }} />
            </div>
        );
    }
}

export default connect(null, { verifyAction })(VerificationPage);