import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from 'axios';
import '../../css/App.css';

export default class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _register = async () => {
        const {name, email, password} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'register', {
            name, email, password
        });


        if (response && response.data && response.data.responseType == 'success') {
            this.props.history.push('/login');
            alert('intru');
        } else {
            //afisam eroare
        }
    };

    render() {
        const {name, email, password} = this.state;

        return (
            <div className={'formContainer'}>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type={'text'} name={'name'} value={name} onChange={this._onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type={'text'} name={'email'} value={email} onChange={this._onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type={'password'} name={'password'} value={password} onChange={this._onChange}/>
                    </FormGroup>
                    <Button color="primary" onClick={this._register}>Register</Button>
                </Form>
            </div>
        )
    }
}