import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import axios from "axios";
import '../../css/tasks.css';

import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            users: [],
            shouldRerender: false,
            name: '',
            usrs: [],
            us: '',
            open: false,
            id: false,
        }
    }

    async componentDidMount() {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`);

        let usersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`);
        this.setState({
            groups: response.data.data,
            users: usersResponse.data.data,
        });
    }


    _toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };


    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _add = () => {
        this.setState({
            id: false,
            name: '',
            open: true
        });
    };

    _showUser = user_id => {
        const {users} = this.state;

        let name = '';

        users && users.map(user => {
            if (user.id === user_id) {
                name = user.name;
            }
        });

        return name;
    };


    render() {
        const {user} = this.props;
        const {groups, users, open, name, id, us} = this.state;
        
        return (
            <Layout user={user}>

                <Modal isOpen={open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{id ? 'Edit task' : 'Add task'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text"
                                       name="name"
                                       id="name"
                                       placeholder="Name"
                                       value={name}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="users">Select</Label>
                                <Input type="select"
                                       name="users"
                                       id="users"
                                       onChange={this._onChange}
                                       value={user}>
                                    <option value={us}>Select</option>
                                    {users.length > 1 && users.map((u, key) => {
                                        return <option key={key} value={u.id}>{u.name}</option>;
                                    })}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Add group</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Button className={'add-new'} color="primary" onClick={this._add}>Add task</Button>
                <div className={'tasks-list'}>
                    <Row className={'table-header'}>
                        <Col xs={1}>Id</Col>
                        <Col xs={2}>Name</Col>
                        <Col xs={3}>Owner</Col>
                        <Col xs={2}>Actions</Col>
                    </Row>
                    {groups.map((group, key) => {
                        return <Row key={key} className={`table-column ${key % 2 === 0 ? 'odd' : ''}`}>
                            <Col xs={1}>{group.id}</Col>
                            <Col xs={2}>{group.name}</Col>
                            <Col xs={3}>{this._showUser(group.owner)}</Col>
                            <Col xs={2}>
                                <Button color="info" size="sm">View</Button>
                            </Col>
                        </Row>;
                    })}
                </div>
            </Layout>
        )
    }
}
