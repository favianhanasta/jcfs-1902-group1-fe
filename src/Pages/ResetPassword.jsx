import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';
import { newPassword } from '../redux/actions/userAction';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    newPasswordFunc = async () => {
        try {
            if (this.newPassword.value === this.confNewPassword.value) {
                
                await this.props.newPassword(this.newPassword.value)
                this.setState({ redirect: true })
            } else {
                alert("password tidak sama")
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" />
        }
        return (
            <div className='container'>
                <Label>New Password</Label>
                <Input innerRef={(element) => this.newPassword = element} />
                <Label>Confirm New Password</Label>
                <Input innerRef={(element) => this.confNewPassword = element} />
                <Button type='button' onClick={this.newPasswordFunc}>Verifikasi Akun</Button>
            </div>
        );
    }
}


export default connect(null, { newPassword })(ResetPasswordPage);