import React from 'react';
import api from '../api';
import Message from './Message';
import { default as I, List, Map, Range, Repeat } from 'immutable';

import Icon from 'react-fa'
import { Button, Grid, Row, Col, Panel, Input } from 'react-bootstrap';

import Firebase from 'firebase';

const myFirebaseRef = new Firebase("https://xxxxxxx.firebaseio.com/bulletinboard");

export default React.createClass({
    //const messages = this.state.messages;
    sendMessage: function(e) {
        e.preventDefault();
        const message = this.refs.newMessageText.getValue().trim();
        const user = this.refs.newMessageUser.getValue().trim();
        const timestamp = new Date().toJSON();
        if (message && user) {
            console.log(message, user, timestamp);
            myFirebaseRef.child('messages').push({message, user, timestamp});

            this.refs.newMessageText.getInputDOMNode().value = '';
            this.refs.newMessageUser.getInputDOMNode().value = '';
            console.log('tallennettu');
        }
        else {
            console.log('tietoja puuttuu');
        }
    },

    getInitialState: function() {
        return {
            messages: Map()
        }
    },

    componentDidMount: function() {
        myFirebaseRef
            .child('messages')
            .on('value', snapshot => {
                this.setState({
                    messages: Map(snapshot.val())
                });
                //console.log("cdm",messages);
        });
    },

    render: function() {
        console.log("state",this.state);
        const { messages } = this.state;
        //let messages = Map();

        const comments = [
            {
                text: "joopajoo",
                date: "13.13.2013",
                time: "13:13"
            },
            {
                text: "juupajuu",
                date: "14.14.2014",
                time: "14:14"
            }
        ];


        return (
            <div>
                <h1>Ilmoitustaulu</h1>
                <Grid>
                    <Row>
                        <Col sm={6}>
                            <Panel bsStyle="success" header={<div className="panelHeader">Uusi viesti</div>}>
                                <form className="form-inline" onSubmit={this.sendMessage}>
                                    <Input type="textarea" ref="newMessageText" />
                                    { " " }
                                    <Input type="select" ref="newMessageUser" bsSize="small" addonBefore={<Icon name="user" />}>
                                        <option></option>
                                        <option>Simo</option>
                                        <option>foo</option>
                                        <option>bar</option>
                                    </Input>
                                    { " " }
                                    <Button type="submit" bsStyle="success" bsSize="small">
                                        <Icon name="comment" size="lg" />
                                    </Button>
                                </form>
                            </Panel>
                            {messages
                                .reverse()
                                .map((message, i) =>
                                    <div>
                                        <Message key={i} message={message.message} comments={comments} />
                                    </div>
                            )}
                            <Message message="jotain" comments={[]} />

                            </Col>

                            <Col sm={6}>
                                a
                            </Col>
                    </Row>
                </Grid>
            </div>
        );
    },
/*
    getInitialState: function() {
        return {
            messages: []
        }
    },

    componentDidMount: function() {
        api.getMessages().then((data) => {
            this.setState({
                messages: data
            });
        });
    },*/
});
