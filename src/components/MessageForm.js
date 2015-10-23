import React from 'react';
import Icon from 'react-fa'
import { Panel, Input, Button } from 'react-bootstrap';
import Scroll from 'react-scroll';
import { List } from 'immutable';
import moment from 'moment';
import uuid from 'uuid';

import api from '../api';

export default React.createClass({
    sendMessage: function(e) {
        e.preventDefault();

        const text = this.refs.newMessageText.getValue().trim();
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

            this.refs.newMessageText.getInputDOMNode().value = '';
            this.refs.newMessageUser.getInputDOMNode().value = '';

            window.scrollTo(0, 0);

            this.setState({
                panelProps: {...this.state.panelProps, expanded: false}
            });
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

    getInitialState: function() {
        return {
            users: List(),
            textBsStyle: null,
            userBsStyle: null,
            panelProps: {}
        }
    },

    componentDidMount: function() {
        api.myFirebaseRef.on('value', snapshot => {
            const val = snapshot.val();
            this.setState({
                users: List(val.users)
            });
        });

        if (this.props.messageUuid) {
            this.setState({
                panelProps: {
                    bsStyle: 'warning',
                    header: <div>Kommentoi</div>,
                    collapsible: true,
                    defaultCollapsed: false
                }
            });
        }
        else {
            this.setState({
                panelProps: {
                    bsStyle: 'success',
                    header: <div>Uusi viesti</div>
                }
            });
        }
    },

    render: function () {
        const { users } = this.state;

        return (
            <Panel {...this.state.panelProps}>
                <form className="form-inline" onSubmit={this.sendMessage}>
                    <Input type="textarea" ref="newMessageText" bsStyle={this.state.textBsStyle} hasFeedback />{' '}
                    <Input type="select" ref="newMessageUser" bsSize="small" addonBefore={<Icon name="user" />}  bsStyle={this.state.userBsStyle} hasFeedback>
                        <option value=""></option>
                        {users.map((user, i) =>
                            <option key={i}>{user}</option>
                        )}
                    </Input>{' '}
                    <Button type="submit" bsStyle="success" bsSize="small">
                        <Icon name="comment" size="lg" /> Lähetä
                    </Button>
                </form>
            </Panel>
        );
    }
});
