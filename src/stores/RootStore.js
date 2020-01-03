import CommonStore from './CommonStore';
import EventStore from './EventStore';
import OrganizerStore from './OrganizerStore'
import CategoryStore from './CategoryStore'

class RootStore {
    constructor() {
        this.eventStore = new EventStore(this)
        this.commonStore = new CommonStore(this)
        this.organizerStore = new OrganizerStore(this)
        this.categoryStore = new CategoryStore(this)
    }
}

const store = new RootStore();

export default store;