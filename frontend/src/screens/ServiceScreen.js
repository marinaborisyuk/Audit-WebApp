import { getService } from '../api';
import {parseRequestUrl} from '../utils';

const ServiceScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const service = await getService(request.id);
        if (service.error) {
            return `<div>${service.error}</div>`;
        }
        return `
            <div class = "content">
                <div class = "back-to-result">
                    <a href = "/#/">Вернуться обратно</a>
                </div>
                <div class = "details">
                    <ul>
                        <li>
                            <h1>${service.name}</h1>
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
            </div>`;
    },
};

export default ServiceScreen;