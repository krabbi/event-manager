import {observable, computed, reaction, action, runInAction} from 'mobx';
import {promisedComputed} from 'computed-async-mobx';
import CategoryModel from './models/CategoryModel'
import agent from '../agent';
import { 
    PENDING, 
    FULFILLED
} from '../constants';


export default class CategoryStore {
    @observable page = 0;
    @observable categoriesPerPage = 15;

	@computed get categories() {
        return this.observableCategories.value.results.map(category => 
            CategoryModel.fromJS(this, category));
    }

	@computed get count() {
        return this.observableCategories.value.count;
    }

	@computed get state() {
        return this.observableCategories.busy ? PENDING : FULFILLED;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

	@action
	changeCategoriesPerPage (categoriesPerPage) {
        this.categoriesPerPage = categoriesPerPage;
    }

	@action
	changePage (page) {
        this.page = page;
    }

    observableCategories = promisedComputed({
        results: [],
        count: 0,
    }, () => 
        agent.Categories.getCategories(this.page, this.categoriesPerPage));
}