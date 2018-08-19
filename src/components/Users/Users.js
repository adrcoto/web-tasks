import React, {Component} from 'react';
import axios from 'axios';
import UserRow from "./UserRow";
import Layout from '../Misc/Layout';
import '../../css/Users.css';

import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export default class Users extends Component {
    state = {
        users: [],
        open: false,
        del: false, //used for showing delete modal
        id: false,
        name: '',
        email: '',
        password: '',
        role: '',
        remove: false, //used to know when to delete an user
        shouldRerender: false
    };

    async componentDidMount() {
        let users = await axios.get(process.env.REACT_APP_API_URL + 'admin/users');

        this.setState({users: users.data.data});
    }

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let users = await axios.get(process.env.REACT_APP_API_URL + 'admin/users');

            this.setState({users: users.data.data, shouldRerender: false});
        }
    }

    _toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _toggleDelete = () => {
        this.setState({
            del: !this.state.del,
            remove: false
        });
    }


    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _userAction = async () => {

        const {name, email, password, role, id, remove} = this.state;

        const data = {
            name, email
        };

        if (role !== '') {
            data.role = role;
        }

        let res;

        if (id) {
            res = await axios.patch(process.env.REACT_APP_API_URL + `admin/user/${id}`, data);
        } else {
            data.password = password;

            res = await axios.post(process.env.REACT_APP_API_URL + 'admin/user', data);
        }

        if (remove) {
            res = await axios.delete(process.env.REACT_APP_API_URL + `admin/user/${id}`, data);
        }


        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false,
                del: false
            });
        }
    };

    _del = (user) => {
        this.setState({
            id: user.id,
            remove: true,
            del: true
        });
    }


    _add = () => {
        this.setState({
            id: false,
            name: '',
            email: '',
            role: '',
            open: true
        });
    };

    _edit = (user) => {
        this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role_id,
            open: true
        });
    };

    render() {
        const {users, id} = this.state;
        return (
            <Layout>
                <Button className={'addButton'} color="primary" onClick={this._add}>Add user</Button>
                <Modal isOpen={this.state.open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{id ? 'Edit user' : 'Add user'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text"
                                       name="name"
                                       id="name"
                                       placeholder="Name"
                                       value={this.state.name}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email"
                                       name="email"
                                       id="email"
                                       placeholder="Email"
                                       value={this.state.email}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            {!id && <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                       name="password"
                                       id="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this._onChange}/>
                            </FormGroup>}
                            <FormGroup>
                                <Label for="role">Select</Label>
                                <Input type="select"
                                       name="role"
                                       id="role"
                                       onChange={this._onChange}
                                       value={this.state.role}>
                                    <option value={''}>Select</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>User</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._userAction}>{id ? 'Edit user' : 'Add user'}</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.del} toggle={this._toggleDelete}>
                    <ModalHeader toggle={this._toggleDelete}>Delete user</ModalHeader>
                    <ModalBody>
                        <p>Are you sure want to delete selected user ?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._userAction}>Delete</Button>
                        <Button color="secondary" onClick={this._toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>


                <div className={'users-list'}>
                    {users && users.map((user, key) => {
                        return <UserRow key={key} user={user} edit={this._edit} del={this._del}/>
                    })}
                </div>
            </Layout>
        )
    }
}
