import { getService } from '../api';
import Rating from '../components/Rating';
import {hideLoading, parseRequestUrl, showLoading} from '../utils';

const ServiceScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('add-button').addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`;
        });
    },
    render: async () => {
        const request = parseRequestUrl();
        showLoading();
        const service = await getService(request.id);
        if (service.error) {
            return `<div>${service.error}</div>`;
        }
        hideLoading();
        return `
            <div class = "background"> 
            <div class = "content">
                <div class = "back-to-result">
                    <a href = "/#/">Вернуться обратно</a>
                </div>
                <div class = "details">
                    <ul>
                        <li>
                            <h1>${service.name}</h1>
                            <div class = "service-rating">
                                ${Rating.render({value: service.rating, text: `${service.numReviews} просмотров`})}
                            </div>
                        </li>
                        <li>${service.description}</li>
                        <li><h3>Компания "КлассАудит" оказывает следующие виды услуг по данному аудиту:</h3></li>
                        <li>${service.includingServices}</li>
                        <li class = "price"><h4>Стоимость данной услуги: ${service.price}</h4></li>
                        <li>
                            <button class = "primary" id = "add-button">
                                Добавить в корзину
                            </button>
                        </li>
                    </ul>
                </div>
            </div></div>`;
    },
};

export default ServiceScreen;