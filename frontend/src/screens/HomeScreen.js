// import axios from 'axios';
import { getServices } from '../api';
import { hideLoading, showLoading } from '../utils';

const HomeScreen =  {
    render: async () => {
        showLoading();
        const services = await getServices();
        hideLoading();
        if (services.error) {
            return `<div class = "error">${services.error}</div>`;
        }
        return `<ul class="services">${services.map(service =>
                    `<li class="service">
                        <a href="/#/service/${service._id}">${service.name}</a>
                    </li>`
                ).join('\n')}</ul>`;
    },
};

export default HomeScreen;