import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from 'axios';
import '../../css/App.css';

export default class ResetPassword extends Component {

    state = {
        email: '',
        code: '',
        password: '',
        rePass: ''
    };


    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _changePassword = async () => {
        const {email, code, password, rePass} = this.state;

        if (password != rePass) {
            alert('Passwords do not match!');
            return;
        }
        const response = await axios.post(process.env.REACT_APP_API_URL + 'change-password', {
            password, code, email
        });
        console.log(code);

        if (response && response.data && response.data.responseType === 'success')
            this.props.history.push('/login');
        else
            console.log(response.data);

    };

    render() {
        const {email, code, password, rePass} = this.state;

        return (
            <div className={'formContainer'}>
                <h3 className={'title'}>Change Password</h3>
                <p>Enter the code we sent you</p>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type={'text'} name={'email'} value={email} onChange={this._onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="code">Token</Label>
                        <Input type={'text'} name={'code'} value={code} onChange={this._onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">New Password</Label>
                        <Input type={'password'} name={'password'} value={password} onChange={this._onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="rePass">Confirm Password</Label>
                        <Input type={'password'} name={'rePass'} value={rePass} onChange={this._onChange}/>
                    </FormGroup>
                    <Button className={'submit'} color="primary" onClick={this._changePassword}>Submit</Button>
                </Form>
            </div>
        )
    }
}
