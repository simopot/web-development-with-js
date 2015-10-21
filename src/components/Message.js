import React from 'react';
import { Link } from 'react-router'

export default React.createClass({
    render: function () {
        const { message } = this.props;

        return (
            <div className="message">
                {message}
            </div>
        );
    }
});

