import {observable, computed, reaction, action, runInAction} from 'mobx';
import {promisedComputed} from 'computed-async-mobx';
import OrganizerModel from './models/OrganizerModel'
import agent from '../agent';
import { 
    PENDING, 
    FULFILLED
} from '../constants';


export default class OrganizerStore {
    @observable page = 0;
    @observable organizersPerPage = 15;

	@computed get organizers() {
        return this.observableOrganizers.value.results.map(organizer => 
            OrganizerModel.fromJS(this, organizer));
    }

	@computed get count() {
        return this.observableOrganizers.value.count;
    }

	@computed get state() {
        return this.observableOrganizers.busy ? PENDING : FULFILLED;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

	@action
	changeOrganizersPerPage (organizersPerPage) {
        this.organizersPerPage = organizersPerPage;
    }

	@action
	changePage (page) {
        this.page = page;
    }

    observableOrganizers = promisedComputed({
        results: [],
        count: 0,
    }, () => 
        agent.Organizers.getOrganizers(this.page, this.organizersPerPage));
}