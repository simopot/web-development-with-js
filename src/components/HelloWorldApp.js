import React from 'react';
import axios from 'axios'

function getTussit() {
    return axios.get('/api/tussi').then((response) => {
        return response.data;
    });
}

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
        getTussit().then((data) => {
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
