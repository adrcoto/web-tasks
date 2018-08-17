import React, {Component} from 'react';
import {Container, Jumbotron} from 'reactstrap';


export default class Landing extends Component {

    render() {
        return (
            <Container>

                <Jumbotron className={'jumbotron'}>
                    <h2 className="display-4">Welcome to Task Manager!</h2>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra
                        attention to featured content or information.</p>
                    <hr className="my-2"/>
                    <p>If you're new, click Get Started to register on our platform to start making tasks.</p>
                    <p className="lead">
                        <a className={'btn btn-primary'} href={"/login"}>Login</a>
                        <a className={'btn btn-info register'} href={"/register"}>Get Started</a>
                    </p>
                </Jumbotron>
                
            </Container>
        )
    }
}
