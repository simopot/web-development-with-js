import React from 'react';
import Icon from 'react-fa';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { default as I, List, Map, Range, Repeat } from 'immutable';
import moment from 'moment';
import uuid from 'uuid';

import api from '../api';
import Message from './Message';
import MessageForm from './MessageForm';

//myFirebaseRef.child('users').set(['Simo', 'Lusso', 'Tussi']);

export default React.createClass({
    getInitialState: function() {
        return {
            users: List(),
            messages: Map()
        }
    },

    componentDidMount: function() {
        api.myFirebaseRef.on('value', snapshot => {
                const val = snapshot.val();
                this.setState({
                    messages: Map(val.messages)
                });
        });
    },

    render: function() {
        const { messages } = this.state;

        return (
            <div>
                <h1>Ilmoitustaulu</h1>
                <Grid>
                    <Row>
                        <Col sm={6}>
                            <Panel bsStyle="success" header={<div className="panelHeader">Uusi viesti</div>}>
                                <MessageForm />
                            </Panel>
                            
                            <ReactCSSTransitionGroup transitionName="fadeInTransition" transitionAppear={false} transitionAppearTimeout={500}>
                                {messages
                                    .sortBy(message => message.timestamp)
                                    .reverse()
                                    .map((message, messageUuid) =>
                                            <Message
                                                key={messageUuid} 
                                                messageUuid={messageUuid}
                                                text={message.text}
                                                timestamp={message.timestamp}
                                                user={message.user}
                                            />

                                    )}
                            </ReactCSSTransitionGroup>
                        </Col>

                        <Col sm={6}>
                            
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
