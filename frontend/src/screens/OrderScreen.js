import { completeOrder, getOrder } from "../api";
import { getUserInfo } from "../localStorage";
import { hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from "../utils";

const OrderScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        console.log(request);
        const completeBtn = document.getElementById('complete-order-button');
        if( completeBtn != null) {
            completeBtn.addEventListener('click', async () => {
                await completeOrder(request.id);
                showLoading();
                showMessage('Заказ завершён!');
                hideLoading();
                rerender(OrderScreen);
            });
        }
    },
    render: async () => {
        const { isAdmin } = getUserInfo();
        const request = parseRequestUrl();
        const { _id, contactInfo, orderItems, totalPrice, isCompleted, completedAt } = await getOrder(request.id);
        return `
            <div>
                <div class = "cart content">
                    <div class = "order-info">
                        <div class = "cart-list">
                            <ul class = "cart-list-container">
                                <li id = "order-state"><h1>Заказ №${_id}</h1>
                                    ${
                                        isCompleted
                                        ? `<div class="success">Выполнен ${completedAt}</div>`
                                        : `<div class="error">Не выполнен</div>`
                                    }
                                </li>
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
                        ${!isCompleted && isAdmin ?
                            `<button id = "complete-order-button" class = "primary">Завершить заказ</button>` :
                            ''}    
                    </div>
                </div>
            </div>
        `
    },
};

export default OrderScreen;