import {observable, computed, reaction, action, runInAction} from 'mobx';
import {promisedComputed} from 'computed-async-mobx';
import EventModel from './models/EventModel'
import agent from '../agent';
import { 
    PENDING, 
    FULFILLED
} from '../constants';


export default class EventStore {
    @observable page = 0;
    @observable eventsPerPage = 15;
    @observable searchString = '';

	@computed get events() {
        return this.observableEvents.value.results.map(event => EventModel.fromJS(this, event));
    }

	@computed get count() {
        return this.observableEvents.value.count;
    }

	@computed get state() {
        return this.observableEvents.busy ? PENDING : FULFILLED;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

	@action
	changeEventsPerPage (eventsPerPage) {
        this.eventsPerPage = eventsPerPage;
    }

	@action
	changePage (page) {
        this.page = page;
    }

	@action
	changeSearchString (searchString) {
        this.searchString = searchString;
    }

    observableEvents = promisedComputed({
        results: [],
        count: 0,
    }, () => 
        agent.Events.getEvents(this.page, this.eventsPerPage, this.searchString));

}