import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles} from '@material-ui/styles';
import {
    Card,
    CardContent,
    TextField,
    CardActions,
    IconButton,
    Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { observable, action, computed } from "mobx";
import {promisedComputed} from 'computed-async-mobx';

import EventModel from '../../stores/models/EventModel';
import agent from '../../agent';

const styles = theme => ({
    root: {
    },
    media: {
        maxWidth: '30%',
        maxHeight: '400px',
        objectFit: 'contain',
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: 20,
        width: '40%',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
});

@withStyles(styles)
@inject(stores => ({
    email: stores.rootStore.commonStore.email,
}))
@observer
export default class Event extends React.Component {
    @observable currentEventId = '';
    @observable editMode = false;

	@computed get currentEvent() {
        return EventModel.fromJS(this, this.observableCurrentEvent.value);
    }
    observableCurrentEvent = promisedComputed({}, () => 
        this.currentEventId ? agent.Events.getEvent(this.currentEventId) : {}
    );

    @action toggleEditMode = () => {
        this.editMode = !this.editMode;
    }
	@action
	setCurrentEventId (currentEventId) {
        this.currentEventId = currentEventId;
    }

    componentDidMount() {
        this.setCurrentEventId(this.props.match.params.eventId);
    }
    render() {
        const { classes, email } = this.props;
        const { currentEvent } = this;

        return (
            <div className={classes.root}>
                {currentEvent.id !== undefined && (
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <TextField 
                                className={classes.textField} 
                                disabled={!this.editMode}
                                value={currentEvent.name} 
                                onChange={event => currentEvent.setName(event.target.value)}
                                label="Name" 
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled={!this.editMode} 
                                value={currentEvent.uri} 
                                onChange={event => currentEvent.setUri(event.target.value)}
                                label="Uri"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled value={currentEvent.category.name} 
                                label="Category"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled value={currentEvent.organizer.name} 
                                label="Organizer"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled value={currentEvent.start_time} 
                                label="Start time"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled value={currentEvent.finish_time} l
                                abel="Finish time"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled={!this.editMode} 
                                value={currentEvent.ticket_price_currency} 
                                onChange={event => currentEvent.setTicketPriceCurrency(event.target.value)}
                                label="Ticket currency"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled={!this.editMode} 
                                value={currentEvent.min_ticket_price} 
                                type="number"
                                onChange={event => currentEvent.setMinTicketPrice(event.target.value)}
                                label="Minimal ticket price"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled={!this.editMode} 
                                value={currentEvent.max_ticket_price} 
                                type="number"
                                onChange={event => currentEvent.setMaxTicketPrice(event.target.value)}
                                label="Maximal ticket price"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled={!this.editMode} 
                                value={currentEvent.logo_uri} 
                                onChange={event => currentEvent.setLogoUri(event.target.value)}
                                label="Logo uri"
                            />
                            <TextField 
                                className={classes.textField} 
                                disabled 
                                value={currentEvent.description} 
                                label="Description" 
                                multiline
                            />
                            <img src={currentEvent.logo_uri} className={classes.media}/>
                        </CardContent>
                        {email && (
                            <CardActions className={classes.actions}>
                                {this.editMode && <Button onClick={() => {
                                    const {id, name, uri, logo_uri, ticket_price_currency, 
                                        min_ticket_price, max_ticket_price} = currentEvent
                                    agent.Events.patchEvent(id, {name, uri, logo_uri, 
                                            ticket_price_currency, min_ticket_price, max_ticket_price})
                                        .then(() => {
                                            this.toggleEditMode();
                                        })
                                }}>Save</Button>}
                                {this.editMode && <Button onClick={() => {
                                    this.setCurrentEventId('');
                                    this.setCurrentEventId(currentEvent.id);
                                    this.toggleEditMode();
                                }}>Cancel</Button>}
                                {!this.editMode && (
                                    <IconButton onClick={this.toggleEditMode}>
                                        <EditIcon/>
                                    </IconButton>
                                )}
                            </CardActions>
                        )}
                    </Card>
                )}
            </div>
        );
    }
}