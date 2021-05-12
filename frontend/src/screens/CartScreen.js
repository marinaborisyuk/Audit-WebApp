import { getService } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

/* eslint-disable no-use-before-define */

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.service === item.service);
    if (existItem) {
        cartItems = cartItems.map((x) => x.service === existItem.service ? item : x);
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
        rerender(CartScreen);
    }
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.service !== id));
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart';
    } else {
        rerender(CartScreen);
    }
};

const CartScreen = {
    after_render: () => {
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                console.log(deleteButton);
                removeFromCart(deleteButton.id);
            });
        });
        document.getElementById('checkout-button').addEventListener('click', () => {
            document.location.hash = '/signin';
        })
    }, 
    render: async () => {
        const request = parseRequestUrl();
        if (request.id) {
            const service = await getService(request.id);
            addToCart({
                service: service._id,
                name: service.name,
                price: service.price
            });
        }
        const cartItems = getCartItems();
        return `
            <div class = "content cart">
                <div class = "cart-list">
                    <ul class = "cart-list-container">
                        <li>
                            <h2>Корзина</h2>
                            <div class = "cart-price">Цена, руб.</div>
                        </li>
                        ${
                            cartItems.length === 0 ?
                                '<div class = "empty-cart">Корзина пуста... <a href = "/#/">Выбрать услугу</a></div>' : 
                                cartItems.map((item) => `
                                    <li>
                                        <div class = "cart-name">
                                            <div>
                                                <a href = "/#/service/${item.service}">${item.name}</a>
                                            </div>
                                            <button type = "button" class = "delete-button" id = "${item.service}">Удалить</button>
                                        </div>
                                        <div class = "cart-price">
                                            ${item.price}
                                        </div>
                                    </li>
                                `).join('\n')
                        }
                    </ul>
                </div>
                <div class = "cart-action">
                    <h3>Итоговая сумма: ${cartItems.reduce((a, c) => a + c.price, 0)} руб.</h3>     
                    <button id = "checkout-button" class = "primary">Оформить заказ</button>   
                </div>
            </div>`;
    },
};

export default CartScreen;