import CartScreen from './screens/CartScreen';
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';
import SigninScreen from './screens/SigninScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ContactInfoScreen from './screens/ContactInfoScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import DashboardScreen from './screens/DashboardScreen';
import ServiceListScreen from './screens/ServiceListScreen';
import ServiceEditScreen from './screens/ServiceEditScreen';

const routes = {
    "/": HomeScreen,
    "/service/:id": ServiceScreen,
    "/service/:id/edit": ServiceEditScreen,
    "/order/:id": OrderScreen,
    "/cart/:id": CartScreen,
    "/cart": CartScreen,
    "/signin": SigninScreen, 
    "/register": RegisterScreen, 
    "/profile": ProfileScreen,
    "/contactinfo": ContactInfoScreen,
    "/placeorder": PlaceOrderScreen,
    "/dashboard": DashboardScreen,
    "/servicelist": ServiceListScreen,
    
};

const router = async () => {
    showLoading();
    const request = parseRequestUrl();
    const parseUrl = (request.resourse ? `/${request.resourse}` : '/') + 
                     (request.id ? '/:id' : '') + 
                     (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    if (screen.after_render())
        await screen.after_render();
    hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router); 