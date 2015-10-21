import React from 'react';
import { Link } from 'react-router'

const Greeter = React.createClass({
    render: function () {
        const { name } = this.props.params;

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
});

export default Greeter;
