import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { verifyAction } from '../redux/actions/userAction';

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
            <div>
                <Button type='button' onClick={this.verify}>Verifikasi Akun</Button>
            </div>
        );
    }
}

export default connect(null, { verifyAction })(VerificationPage);