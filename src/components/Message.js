import React from 'react';
import {Link} from 'react-router';
import Icon from 'react-fa'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Panel, Button, Alert} from 'react-bootstrap';
import Modal from 'react-modal';
import { Map } from 'immutable';
import moment from 'moment';
import uuid from 'uuid';
import Linkify from 'react-linkify'

import api from '../api'
import Message from './Message';
import MessageForm from './MessageForm';

export default React.createClass({

	getInitialState: function() {
        return {
            modalIsOpen: false,
            editable: false
        }
    },

    editMessage: function(e) {
    	this.setState({editable: true});
    	console.log(e);

    },

	openModal: function() {
	    this.setState({modalIsOpen: true});
	},
	 
	closeModal: function() {
		this.setState({modalIsOpen: false});
	},

	deleteMessage: function(messageUuid, commentUuid) {
		if (commentUuid) {
                api.myFirebaseRef
                    .child('messages')
                    .child(messageUuid)
                    .child('comments')
                    .child(commentUuid)
                    .set(null);
            }
            else {
                api.myFirebaseRef
                    .child('messages')
                    .child(messageUuid)
                    .set(null);
            }
		this.closeModal();
	},

    render: function () {
        const { messageUuid, commentUuid, text, timestamp, user, isComment } = this.props;
        const comments = Map(this.props.comments);

        const customStyles = {
			content : {
			    top: '50%',
			    left: '50%',
			    right: 'auto',
			    bottom: 'auto',
			    marginRight: '-50%',
			    transform: 'translate(-50%, -50%)',
			    background: 'transparent',
			    border: 'none'
			}
		};

        return (
	       <Panel bsStyle={isComment ? 'warning' : 'info'} header={
            	<div>
            		<Icon name="calendar" /> {moment(timestamp).format('D.M.YYYY') + ' '}
            		<Icon name="clock-o" /> {moment(timestamp).format('HH:mm') + ' '}
            		<Icon name="user" /> {user + ' '}
            		<span className={isComment ? 'commentControls' : 'messageControls'}>
            			<Icon className="messageControl" name="pencil" onClick={this.editMessage} /> {' '}
            			<Icon className="messageControl" name="trash-o" onClick={this.openModal} />
            		</span>
            		    <Modal
							isOpen={this.state.modalIsOpen}
							onRequestClose={null}
							closeTimeoutMS={1000}
							style={customStyles}>
  
							<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
							    <h4>Poistetaanko {isComment ? 'kommentti' : 'viesti'}?</h4>
							    <p>
							        <Button onClick={this.deleteMessage.bind(this, messageUuid, commentUuid)} bsStyle="danger">Poista</Button>{' '}
						            <Button onClick={this.closeModal}>Peruuta</Button>
							    </p>
							</Alert>

						</Modal>
            	</div>
            	}>
            	<Linkify>
	            <p className="messageText" contentEditable={this.state.editable}>{text}</p>
	            </Linkify>

	            {!isComment ?
	            	<div className="comments">
						<ReactCSSTransitionGroup
                            transitionName="fadeInTransition"
                            transitionAppear={false}
                            transitionAppearTimeout={500}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}>

                                {(comments.size > 0) ?
        				            comments
        				            	.sortBy(comment => comment.timestamp)
        				            	.map((comment, commentUuid) =>
        				            		<Message
                                                key={commentUuid}
                                                commentUuid={commentUuid}
                                                messageUuid={messageUuid}
                                                text={comment.text}
                                                timestamp={comment.timestamp}
                                                user={comment.user}
                                                isComment={true} />
        				            )
                                : ''}

				        </ReactCSSTransitionGroup>

		            	<MessageForm messageUuid={messageUuid} />

		            </div>
	             : ''}
            </Panel>
        );
    }
});

