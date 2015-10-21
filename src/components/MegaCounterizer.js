import React from 'react';

const MegaCounterizer = React.createClass({
    render: function () {
        return (
            <div className="megatussi">
                {this.props.count}
            </div>
        );
    }
});

export default MegaCounterizer;
