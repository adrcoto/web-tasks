import React, {Component} from 'react';
import {Button, Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';

export default class UserRow extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired,
        del: PropTypes.func.isRequired
    };

    _showRole = role => {
        switch (role) {
            case 1:
                return 'Admin';
            case 2:
                return 'User';
            default:
                return 'Unknown'
        }
    };

    _edit = (user) => {
        const {edit} = this.props;
        edit && edit(user);
    };

    _del = (user) => {
        const {del} = this.props;
        del && del(user);
    };

    render() {
        const {user} = this.props;

        return (
            <Row className={'userRow'}>
                <Col xs={1}>{user.id}</Col>
                <Col xs={3}>{user.name}</Col>
                <Col xs={4}>{user.email}</Col>
                <Col xs={2}>{this._showRole(user.role_id)}</Col>
                <Col xs={2}>
                    <Button color="success" size="sm" onClick={() => this._edit(user)}>Edit</Button>
                    <Button className={'deleteButton'} color="danger" size="sm"
                            onClick={() => this._del(user)}>Delete</Button>
                </Col>
            </Row>
        );
    }
}