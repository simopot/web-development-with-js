import './client.css';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

function getTussit() {
    return axios.get('/api/tussi').then((response) => {
        return response.data;
    });
}

const tussit = getTussit();

tussit.then((data) => console.log(data));

const HelloWorld = React.createClass({
    render: function () {
        return (
            <div>
                Hello {this.props.name}
            </div>
        );
    }
});

const Counterizer = React.createClass({
    render: function () {
        return (
            <div className="tussi">
                {this.props.count}
                <button onClick={this.props.onIncrementCounter}>
                    Lisää!
                </button>
            </div>
        );
    }
});

const MegaCounterizer = React.createClass({
    render: function () {
        return (
            <div className="megatussi">
                {this.props.count}
            </div>
        );
    }
})

const HelloWorldApp = React.createClass({
    render: function() {
        const names = this.state.names;

        return (
            <div>
                <h1>Lusso</h1>
                {names.map(name =>
                    <HelloWorld name={name} />
                )}

            <Counterizer
                count={this.state.count}
                onIncrementCounter={this.incrementCounter} />

            <MegaCounterizer
                count={this.state.count}
                onIncrementCounter={this.incrementCounter} />

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



ReactDOM.render(
    <HelloWorldApp />,
    document.getElementById('app')
);
