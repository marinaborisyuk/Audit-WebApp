import Error404Screen from './screens/Error404Screen.js';
import HomeScreen from './screens/HomeScreen.js';
import ServiceScreen from './screens/ServiceScreen.js';
import { parseRequestUrl } from './utils.js';

const routes = {
    "/": HomeScreen,
    "/service/:id": ServiceScreen,
};

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resourse ? `/${request.resourse}` : '/') + 
                     (request.id ? '/:id' : '') + 
                     (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router); 