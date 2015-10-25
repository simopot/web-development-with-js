import React from 'react';
import Icon from 'react-fa';
import { Grid, Row, Col, Panel, Alert, Button } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Map } from 'immutable';
import moment from 'moment';
import uuid from 'uuid';


import api from '../api';
import Message from './Message';
import MessageForm from './MessageForm';

//myFirebaseRef.child('users').set(['Simo', 'Lusso', 'Tussi']);

export default React.createClass({
    getInitialState: function() {
        return {
            messages: Map()
        }
    },

    componentDidMount: function() {
        api.myFirebaseRef
            .child('messages')
            .on('value', snapshot => {
                this.setState({
                    messages: Map(snapshot.val())
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
                        <Col sm={12}>
                            <MessageForm />

                            <ReactCSSTransitionGroup
                                transitionName="fadeInTransition"
                                transitionAppear={false}
                                transitionAppearTimeout={500}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>

                                {messages
                                    .sortBy((message) => {
                                        if (!message.comments) {
                                            return message.timestamp;
                                        }
                                        return Map(message.comments).map(comment => comment.timestamp).max();
                                    })
                                    .reverse()
                                    .map((message, messageUuid) =>
                                        <Message
                                            key={messageUuid}
                                            messageUuid={messageUuid}
                                            text={message.text}
                                            timestamp={message.timestamp}
                                            user={message.user}
                                            comments={message.comments} />
                                )}

                            </ReactCSSTransitionGroup>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
