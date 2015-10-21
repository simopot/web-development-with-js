import React from 'react';
import api from '../api'
import Message from './Message'

export default React.createClass({
    //const messages = this.state.messages;
    render: function() {
        const { messages } = this.state;

        console.log(this.state);
        return (
            <div>
                <h1>Ilmoitustaulu</h1>
                {messages.map((message, i) =>
                    <Message key={i} message={message} />
                )}
            </div>
        );
    },

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
    },
});
