import { getOrder } from "../api";
import { parseRequestUrl } from "../utils";

const OrderScreen = {
    after_render: () => {},
    render: async () => {
        const request = parseRequestUrl();
        const { _id, contactInfo, orderItems, totalPrice } = await getOrder(request.id);
        return `
            <div>
                <div class = "cart content">
                    <div class = "order-info">
                        <div class = "cart-list">
                            <ul class = "cart-list-container">
                                <li><h1>Заказ №${_id}</h1></li>
                                <li id = "contact-li">
                                    <h2>Контактные данные</h2>
                                    <div>
                                        ${contactInfo.firmName}
                                        ${contactInfo.address}
                                        ${contactInfo.city}
                                        ${contactInfo.firmPhone}
                                    </div>
                                </li>
                                <li>
                                    <h2>Корзина</h2>
                                    <div class = "cart-price">Цена</div>
                                </li>
                                ${
                                    orderItems.map(item => `
                                        <li>
                                            <div class = "cart-name">
                                                <div>
                                                    <a href = "/#/service/${item.service}">${item.name}</a>
                                                </div>
                                            </div>
                                            <div class = "cart-price">
                                                ${item.price}
                                            </div>
                                        </li>
                                    `).join('\n')
                                }
                            </ul>
                        </div>
                    </div>
                    <div class = "order-action" >
                        <h3>Итоговая сумма: ${totalPrice} руб.</h3>     
                    </div>
                </div>
            </div>
        `
    },
};

export default OrderScreen;