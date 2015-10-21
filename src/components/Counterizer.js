import React from 'react';

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

export default Counterizer;
