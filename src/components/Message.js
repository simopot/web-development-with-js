import React from 'react';
import Icon from 'react-fa'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Panel } from 'react-bootstrap';
import { Map } from 'immutable';
import moment from 'moment';
import uuid from 'uuid';

import api from '../api'
import Message from './Message';
import MessageForm from './MessageForm';

export default React.createClass({
    getInitialState: function() {
        return {
            comments: Map()
        }
    },

    componentDidMount: function() {
        if (!this.props.isComment) {
	        api.myFirebaseRef
				.child('messages')
	            .child(this.props.messageUuid)
	            .child('comments')
	        	.on('value', snapshot => {
	                const val = snapshot.val();
	                console.log('val',val);
	                this.setState({
	                    comments: Map(val)
	                });
	        });
	    }
    },

    render: function () {
    	//console.log('messageprops', this.props);
        const { messageUuid, text, timestamp, user, isComment } = this.props;
        const { comments } = this.state;
        return (
            <Panel bsStyle={isComment ? 'warning' : 'info'} header={ 
            	<div>
            		<Icon name="calendar" /> {moment(timestamp).format('D.M.YYYY') + ' '} 
            		<Icon name="clock-o" /> {moment(timestamp).format('HH:mm')+ ' '}
            		<Icon name="user" /> {user + ' '}
            		<div className="messageControls">
            			<Icon name="pencil" /> {' '}
            			<Icon name="trash-o" /> {' '}
            		</div>
            	</div>
            	}>
	            <div>
				    {text}
	            </div>

	            {!isComment ? 
	            	<div className="comments">
						<ReactCSSTransitionGroup transitionName="fadeInTransition" transitionAppear={false} transitionAppearTimeout={500}>
				            {comments
				            	.sortBy(comment => comment.timestamp)
				            	.map((comment, commentUuid) =>
				            		<Message key={commentUuid} text={comment.text} timestamp={comment.timestamp} user={comment.user} isComment={true} />
				            )}
				        </ReactCSSTransitionGroup>
			        
			            <Panel collapsible defaultCollapsed bsStyle="warning" header={<div>Kommentoi</div>}>
			            	<MessageForm messageUuid={messageUuid} />
			            </Panel>
		            </div>
	             : ''}
            </Panel>
        );
    }
});

