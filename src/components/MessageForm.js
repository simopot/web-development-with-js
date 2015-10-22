import React from 'react';
import Icon from 'react-fa'
import { Panel, Input, Button } from 'react-bootstrap';
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

        if (text && user) {
            console.log('form',this.props);
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

            console.log('tallennettu');
        }
        else {
            console.log('tietoja puuttuu');
        }
    },

    getInitialState: function() {
        return {
            users: List()
        }
    },

    componentDidMount: function() {
        api.myFirebaseRef.on('value', snapshot => {
                const val = snapshot.val();
                this.setState({
                    users: List(val.users),
                });
        });
    },

    render: function () {
        const { users } = this.state;

        return (
            <form className="form-inline" onSubmit={this.sendMessage}>
                <Input type="textarea" ref="newMessageText" />
                { " " }
                <Input type="select" ref="newMessageUser" bsSize="small" addonBefore={<Icon name="user" />}>
                    <option value=""></option>
                    {users.map((user, i) =>
                        <option key={i} value={user}>{user}</option>
                    )}
                </Input>
                { " " }
                <Button type="submit" bsStyle="success" bsSize="small">
                    <Icon name="comment" size="lg" /> Lähetä
                </Button>
            </form>
        );
    }
});