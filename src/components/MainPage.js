import React from 'react';

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
});

export default MainPage;
