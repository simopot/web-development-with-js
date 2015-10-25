import React from 'react';
import Icon from 'react-fa'
import { Panel, Input, Button, Grid, Row, Col } from 'react-bootstrap';
//import Scroll from 'react-scroll';
import { List } from 'immutable';
import moment from 'moment';
import uuid from 'uuid';
import Textarea from 'react-textarea-autosize';

import api from '../api';

export default React.createClass({
    getInitialState: function() {
        return {
            users: List(),
            textBsStyle: null,
            userBsStyle: null,
            panelProps: {}
        }
    },

    componentDidMount: function() {
        api.myFirebaseRef
            .child('users')
            .on('value', snapshot => {
            this.setState({
                users: List(snapshot.val())
            });
        });

        if (this.props.messageUuid) {
            this.setState({
                panelProps: {
                    bsStyle: 'warning',
                    header: <h2>Kommentoi</h2>,
                    collapsible: true,
                    expanded: false
                }
            });
        }
        else {
            this.setState({
                panelProps: {
                    bsStyle: 'success',
                    header: <h2>Uusi viesti</h2>,
                    collapsible: true,
                    expanded: false
                }
            });
        }
    },

    sendMessage: function(e) {
        e.preventDefault();

        //const text = this.refs.newMessageText.getValue().trim();
        const text = this.refs.newMessageText._rootDOMNode.value.trim();
        const user = this.refs.newMessageUser.getValue().trim();
        const timestamp = new moment().toJSON();

        this.setState({
            textBsStyle: null,
            userBsStyle: null
        });

        if (text && user) {
            if (this.props.messageUuid) {
                api.myFirebaseRef
                    .child('messages')
                    .child(this.props.messageUuid)
                    .child('comments')
                    .child(uuid.v4())
                    .set({text, user, timestamp});
            }
            else {
                api.myFirebaseRef
                    .child('messages')
                    .child(uuid.v4())
                    .set({text, user, timestamp});
            }

            this.refs.newMessageText._rootDOMNode.value = '';
            this.refs.newMessageUser.getInputDOMNode().value = '';
            this.togglePanel(e);
            window.scrollTo(0, 0);
        }

        else {
            if (!text)
                this.setState({
                    textBsStyle: "error"
                });
            if (!user)
                this.setState({
                    userBsStyle: "error"
                });
        }

    },

    togglePanel: function(e) {
        e.preventDefault();
        this.setState({ 
            panelProps: {
                ...this.state.panelProps,
                expanded: !this.state.panelProps.expanded 
            }
        });
    },

    render: function () {
        const { users } = this.state;

        return (
            <Panel {...this.state.panelProps} onSelect={this.togglePanel}>
                <form className="form-horizontal" onSubmit={this.sendMessage}>
                    
                    <Row>
                    <Col sm={12}>
                    
                    <Input bsStyle={this.state.textBsStyle} hasFeedback>
                        <Textarea ref="newMessageText" className="form-control" minRows={2}/>
                    </Input>
                    {' '}
                    </Col>
                    <Col/>
                    </Row>
                    <Row>
                    <Col sm={10}>
                    <Input type="select" ref="newMessageUser" bsSize="small" addonBefore={<Icon name="user" />}  bsStyle={this.state.userBsStyle} hasFeedback>
                        <option value=""></option>
                        {users.map((user, i) =>
                            <option key={i}>{user}</option>
                        )}
                    </Input>{' '}
                    </Col>
                    <Col sm={2}>
                    <Button type="submit" bsStyle="success" bsSize="small" className="btn-block">
                        <Icon name="comment" size="lg" /> Lähetä
                    </Button>
                    </Col>
                    </Row>
                    
                </form>
            </Panel>
        );
    }
});
