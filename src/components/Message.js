import React from 'react';
import Icon from 'react-fa'
import { Button, Panel, Input } from 'react-bootstrap';
import Comment from './Comment'
export default React.createClass({
    render: function () {
        const { message, comments } = this.props;
        //const { messageText, messageTimestamp }
        return (
            <Panel bsStyle="info" header={ <div><Icon name="calendar" /> 12.12.2012 <Icon name="clock-o" /> 12:12 <Icon name="user" /> Simo <Icon name="pencil" /> <Icon name="trash-o" /></div>}>
                <div>
				    {message}
                </div>
                {comments.map((comment, i) =>
                    <Comment comment={comment}/>
                )}

                <Panel collapsible defaultCollapsed bsStyle="warning" header={<div>Kommentoi</div>}>
                    <form className="form-inline">
                        <Input type="textarea" />
                        { " " }
                        <Input type="select" bsSize="small" addonBefore={<Icon name="user" />}>
                            <option></option>
                            <option>Simo</option>
                            <option>foo</option>
                            <option>bar</option>
                        </Input>
                        { " " }
                        <Button bsStyle="success" bsSize="small">
                            <Icon name="comment" size="lg" />
                        </Button>
                    </form>
                </Panel>

            </Panel>
        );
    }
});

