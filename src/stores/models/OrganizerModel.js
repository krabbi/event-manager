import { observable, action } from 'mobx';

export default class OrganizerModel {
	store;
	id;
	@observable name;
	@observable uri;
	@observable logo_uri;

    constructor(store, id, name, uri, logo_uri) 
    {
		this.store = store;
		this.id = id;
		this.name = name;
		this.uri = uri;
		this.logo_uri = logo_uri;
	}

    @action
	setName(name) {
		this.name = name;
	}

    @action
	setUri(uri) {
		this.uri = uri;
    }

    @action
    setLogoUri(logo_uri) {
        this.logo_uri = logo_uri
    }

	static fromJS(store, object) {
        return new OrganizerModel(store, object.id, object.name, object.uri, object.logo_uri);
	}
}