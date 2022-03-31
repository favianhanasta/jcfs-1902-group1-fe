import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Label, Input, Form, Button } from 'reactstrap';
import { API_URL } from '../helper';

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    btChangeNewPassword = () => {
        let dataPassword = {
            newPassword : this.newPassword.value
        }
        try {
            let token = localStorage.getItem('data')
            if (this.newPassword.value === this.confNewPassword.value){
                axios.patch(`${API_URL}/users/changepass`, dataPassword, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                alert("ubah")
            } else {
                alert("password tidak sama")
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    render() {
        return (
            <div className='container'>
                <h1>Edit Page</h1>
                <h3>Change Password</h3>
                <Form>
                    <Label>New Password</Label>
                    <Input type='password' innerRef={(element) => this.newPassword = element}/>
                    <Label>Confirm New Password</Label>
                    <Input type='password' innerRef={(element) => this.confNewPassword = element}/>
                    <Button onClick={this.btChangeNewPassword}>Submit</Button>
                </Form>
            </div>
        );
    }
}

const mapToProps = (state) =>{
    return {
        username : state.userReducer.username,
        password: state.userReducer.password,   
        email: state.userReducer.email
    }
}

export default connect(mapToProps)(EditPage);