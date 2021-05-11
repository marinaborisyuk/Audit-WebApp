import CartScreen from './screens/CartScreen';
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';
import { parseRequestUrl } from './utils';

const routes = {
    "/": HomeScreen,
    "/service/:id": ServiceScreen,
    "/cart/:id": CartScreen,
    "/cart": CartScreen,
};

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resourse ? `/${request.resourse}` : '/') + 
                     (request.id ? '/:id' : '') + 
                     (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router); 