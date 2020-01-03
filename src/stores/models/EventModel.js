import { observable, action } from 'mobx';

export default class EventModel {
	store;
	id;
	@observable name;
	@observable uri;
	@observable category;
	@observable organizer;
	@observable start_time;
	@observable finish_time;
	@observable ticket_price_currency;
	@observable min_ticket_price;
	@observable max_ticket_price;
	@observable logo_uri;
	@observable provider;
	@observable description;

    constructor(store, id, name, uri, category, organizer, start_time, finish_time, 
        ticket_price_currency, min_ticket_price, max_ticket_price, logo_uri, provider, description) 
    {
		this.store = store;
		this.id = id;
		this.name = name;
		this.uri = uri;
		this.category = category;
		this.organizer = organizer;
		this.start_time = start_time;
		this.finish_time = finish_time;
		this.ticket_price_currency = ticket_price_currency;
		this.min_ticket_price = min_ticket_price;
		this.max_ticket_price = max_ticket_price;
		this.logo_uri = logo_uri;
		this.provider = provider;
		this.description = description;
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
    setTicketPriceCurrency(ticket_price_currency) {
        this.ticket_price_currency = ticket_price_currency
    }

    @action
    setMinTicketPrice(min_ticket_price) {
        this.min_ticket_price = min_ticket_price
    }

    @action
    setMaxTicketPrice(max_ticket_price) {
        this.max_ticket_price = max_ticket_price
    }

    @action
    setLogoUri(logo_uri) {
        this.logo_uri = logo_uri
    }

	static fromJS(store, object) {
        return new EventModel(store, object.id, object.name, object.uri, object.category, 
            object.organizer, object.start_time, object.finish_time, object.ticket_price_currency, 
            object.min_ticket_price, object.max_ticket_price, object.logo_uri, object.provider,
            object.description_plain);
	}
}