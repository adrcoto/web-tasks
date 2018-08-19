import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from 'axios';
import '../../css/App.css';

export default class ForgotPassword extends Component {


    state = {
        email: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };


    _verify = async () => {
        const {email} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'forgot-password', {
            email
        });

        if (response && response.data && response.data.responseType === 'success')
            this.props.history.push('/change-password');
        else
            console.log(response.data);

    };

    render() {
        const {email} = this.state;

        return (
            <div className={'formContainer password'}>
                <h3 className={'title'}>Forgot Password ?</h3>
                <p><i>Provide your email below.</i></p>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type={'text'} name={'email'} value={email} onChange={this._onChange}/>
                    </FormGroup>
                    <Button className={'submit'} color="primary" onClick={this._verify}>Submit</Button>
                </Form>
            </div>
        )
    }
}
