import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../css/App.css';

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _login = async () => {
        const {email, password} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'login', {
            email, password
        });

        if (response && response.data && response.data.data) {
            sessionStorage.setItem('token', response.data.data.jwt);
            this.props.history.push('/users');
        } else {
            //afisam eroare
        }
    };

    render() {
        const {email, password} = this.state;

        return (
            <div className={'formContainer'}>
                <h3 className={'title'}>Login</h3>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type={'text'} name={'email'} value={email} onChange={this._onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type={'password'} name={'password'} value={password} onChange={this._onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Don't have an account ? Create <Link to={'/register'}>one</Link> right now !</Label>
                        <Label>Forgot your password ? <Link to={'/forgot-password'}>Reset password</Link></Label>
                    </FormGroup>
                    <Button color="primary" onClick={this._login}>Login</Button>
                </Form>
            </div>
        )
    }
}
