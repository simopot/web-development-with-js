import React from 'react';
import api from '../api';
import Message from './Message';

import Icon from 'react-fa'
import { Button, Grid, Row, Col, Panel, Input } from 'react-bootstrap';

export default React.createClass({
    //const messages = this.state.messages;
    render: function() {
        const { messages } = this.state;

        const comments = [
            {
                text: "joopajoo",
                date: "13.13.2013",
                time: "13:13"
            },
            {
                text: "juupajuu",
                date: "14.14.2014",
                time: "14:14"
            }
        ];

        //console.log(comments);
        return (
            <div>
                <h1>Ilmoitustaulu</h1>
                <Grid>
                <Row>
                <Col sm={6}>
                <Panel bsStyle="success" header="Uusi viesti">
                    <Input type="textarea" />
                    <Input type="select" addonBefore={<Icon name="user" />}>
                        <option></option>
                        <option>Simo</option>
                        <option>foo</option>
                        <option>bar</option>
                    </Input>
                    <Button bsStyle="success" bsSize="medium">
                        <Icon name="floppy-o" size="lg" /> Tallenna
                    </Button>
                </Panel>
                
                <Message message="jotain" comments="" />

                {messages.map((message, i) =>
                    <Message key={i} message={message} comments={comments} />
                )}
                </Col>
                <Col sm={6}>
                a
                </Col>
                
                </Row>
                </Grid>
            </div>
        );
    },

    getInitialState: function() {
        return {
            messages: []
        }
    },

    componentDidMount: function() {
        api.getMessages().then((data) => {
            this.setState({
                messages: data
            });
        });
    },
});
