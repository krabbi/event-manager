import { observable, action } from 'mobx';

export default class OrganizerModel {
	store;
	id;
	@observable name;

    constructor(store, id, name) 
    {
		this.store = store;
		this.id = id;
		this.name = name;
	}

    @action
	setName(name) {
		this.name = name;
	}


	static fromJS(store, object) {
        return new OrganizerModel(store, object.id, object.name);
	}
}