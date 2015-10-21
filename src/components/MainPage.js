import React from 'react';
import Counterizer from './Counterizer';
import MegaCounterizer from './MegaCounterizer';
import HelloWorld from './HelloWorld';


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
