import './client.css';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Router, Route, Link, IndexRoute } from 'react-router'


function getTussit() {
    return axios.get('/api/tussi').then((response) => {
        return response.data;
    });
}

const HelloWorld = React.createClass({
    render: function () {
        return (
            <div>
                <Link to={`/hello/${this.props.name}`}>
                    Hello {this.props.name}
                </Link>
            </div>
        );
    }
});

const Counterizer = React.createClass({
    render: function () {
        const { count, onIncrementCounter } = this.props;

        return (
            <div className="tussi">
                {count}
                <button onClick={onIncrementCounter}>
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

const MainPage = React.createClass({
    render: function () {
        const { count, names, onIncrementCounter } = this.props;
        return (
            <div>

                {names.map((name, i) =>
                    <HelloWorld key={i} name={name} />
                )}

                <Counterizer
                    count={this.props.count}
                    onIncrementCounter={this.props.onIncrementCounter} />

                <MegaCounterizer
                    count={this.props.count}
                    onIncrementCounter={this.props.onIncrementCounter} />

            </div>
        );
    }
})

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

const Greeter = React.createClass({
    render: function () {
        console.log(this.props);
        const name = this.props.params.name;

        return (
            <div>
                <h2>
                    Hellooo {name}
                </h2>
                <Link to="/">
                    Takaisin
                </Link>
            </div>
        );
    }
})


const routes = (
    <Router>
        <Route path="/" component={HelloWorldApp}>
            <IndexRoute component={MainPage}/>
            <Route path="/hello/:name" component={Greeter}/>
        </Route>
    </Router>
);


ReactDOM.render(
    routes,
    document.getElementById('app')
);
