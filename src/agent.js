import rootStore from './stores/RootStore';
const API_ROOT = 'http://api.my-events.site/api/v1';

const handleErrors = status => {
  if (status === 401) {
    authStore.logout();
  }
  return status;
};

const getToken = () => rootStore.commonStore.token ? `Token ${rootStore.commonStore.token}` : null;

const requests = {
    get: url => 
        fetch(`${API_ROOT}${url}`, {
            method: 'GET',
            headers: {
                Authorization: getToken()
            },
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            handleErrors(res.status);
            throw new Error(`Error on ${API_ROOT}${url}\nResponse status: ${res.status}`);
        }),
    post: (url, body) => 
        fetch(`${API_ROOT}${url}`, {
            method: 'POST',
            headers: {
                Authorization: getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            handleErrors(res.status);
            throw new Error(`Error on ${API_ROOT}${url}\nResponse status: ${res.status}`);
        }),
    patch: (url, body) => 
        fetch(`${API_ROOT}${url}`, {
            method: 'PATCH',
            headers: {
                Authorization: getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            handleErrors(res.status);
            throw new Error(`Error on ${API_ROOT}${url}\nResponse status: ${res.status}`);
        }),
};
  

const Auth = {
    login: (email, password) => requests.post('/users/token/', { 
        username: email, 
        password
    }),
    register: (email, password) => requests.post('/users/register', { 
        email, 
        password
    })
}


const Users = {
    current: () => requests.get('/users/me'),
}

const Events = {
    getEvents: (page, eventsPerPage, search) => {
        const offset = page * eventsPerPage;
        return requests.get(`/events/search?limit=${eventsPerPage}&offset=${offset}&search=${search}`)
    },
    getEvent: eventId => requests.get(`/events/${eventId}/`),

    patchEvent: (eventId, body) => requests.patch(`/events/${eventId}/`, body)
};

const Organizers = {
    getOrganizers: (page, itemsPerPage) => {
        const offset = page * itemsPerPage;
        return requests.get(`/organizers/?limit=${itemsPerPage}&offset=${offset}`)
    },
};

const Categories = {
    getCategories: (page, itemsPerPage) => {
        const offset = page * itemsPerPage;
        return requests.get(`/categories/?limit=${itemsPerPage}&offset=${offset}`)
    },
};


export default {
    Events,
    Auth,
    Users,
    Organizers,
    Categories,
};