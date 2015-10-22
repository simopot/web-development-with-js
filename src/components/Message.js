import React from 'react';
import { Link } from 'react-router'
import Icon from 'react-fa'
import { Button, Panel, Input } from 'react-bootstrap';

export default React.createClass({
    render: function () {
        const { message, comments } = this.props;
		console.log(comments);
        return (
            <Panel bsStyle="info" header={ <div><Icon name="calendar" /> 12.12.2012 <Icon name="clock-o" /> 12:12 <Icon name="user" /> Simo <Icon name="pencil" /> <Icon name="trash-o" /></div>}>
				
				{message}
			
                <Panel bsStyle="warning" header={ <div><Icon name="calendar" /> 13.13.2013 <Icon name="clock-o" /> 13:13 <Icon name="user" /> Simo</div>}>
                	joopajoo
                </Panel>

                <Panel bsStyle="warning" header={ <div><Icon name="calendar" /> 14.14.2014 <Icon name="clock-o" /> 14:14 <Icon name="user" /> Simo</div>}>
                	juupajuu
                </Panel>

                <Panel bsStyle="warning" header="Uusi kommentti">
                    <Input type="textarea" />
                    <Input type="select" addonBefore={<Icon name="user" />}>
                        <option></option>
                        <option>Simo</option>
                        <option>foo</option>
                        <option>bar</option>
                    </Input>
                    <Button bsStyle="success" bsSize="medium">
                        <Icon name="comment" size="lg" /> Kommentoi
                    </Button>
                </Panel>

            </Panel>
        );
    }
});

