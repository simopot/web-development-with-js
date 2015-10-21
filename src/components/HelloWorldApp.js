import React from 'react';
import api from '../api'

const HelloWorldApp = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Lusso</h1>
                {this.props.children && React.cloneElement(
                    this.props.children,
                    {
                        names: this.state.names,
                        count: this.state.count,
                        onIncrementCounter: this.incrementCounter
                    }
                )}
            </div>
        );
    },

    getInitialState: function() {
        return {
            count: 0,
            names: []
        }
    },

    componentDidMount: function() {
        api.getTussit().then((data) => {
            this.setState({
                names: data
            });
        });
    },

    incrementCounter: function () {
        this.setState({
            count: this.state.count + 1
        });
    }

});

export default HelloWorldApp;
