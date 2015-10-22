import React from 'react';
import Icon from 'react-fa'
import { Panel } from 'react-bootstrap';

export default React.createClass({
    render: function () {
        const { text, date, time } = this.props.comment;
		//console.log(comments);
        return (
            <Panel bsStyle="warning" header={ <div><Icon name="calendar" /> {date} <Icon name="clock-o" /> {time} <Icon name="user" /> Simo</div>}>
                {text}
            </Panel>
        );
    }
});
