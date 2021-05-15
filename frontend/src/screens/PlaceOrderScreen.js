import CheckoutSteps from "../components/CheckoutSteps";
import { getCartItems, getContactInfo } from "../localStorage"

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
        document.location.hash = '/cart';
    }
    const contactInfo = getContactInfo();
    const totalPrice = orderItems.reduce((a, c) => a + c.price, 0);
    return { orderItems, contactInfo, totalPrice };
}

const PlaceOrderScreen = {
    after_render: () => {},
    render: () => {
        const { orderItems, contactInfo ,totalPrice } = convertCartToOrder();
        return `
            <div>
                ${CheckoutSteps.render({step1: true, step2: true, step3: true})}
                <div class = "cart content">
                    <div class = "order-info">
                        <div class = "cart-list">
                            <ul class = "cart-list-container">
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
                                    `)
                                }
                            </ul>
                        </div>
                    </div>
                    <div class = "order-action" >
                        <h3>Итоговая сумма: ${totalPrice} руб.</h3>     
                        <button id = "checkout-button" class = "primary">Подтвердить заказ</button>
                    </div>
                </div>
            </div>
        `
    },
};

export default PlaceOrderScreen;