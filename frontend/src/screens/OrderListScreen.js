import DashboardMenu from "../components/DashboardMenu";
import { getOrders, deleteOrder } from "../api";
import { showLoading, hideLoading, rerender, showMessage } from '../utils';

const OrderListScreen = {
    after_render: () => {
        const deleteButtons = document.getElementsByClassName('delete-btn');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                if (confirm('Удалить услугу?!')) {
                    showLoading();
                    const data = await deleteOrder(deleteButton.id);
                    if (data.error) {
                        showMessage(data);
                    } else 
                    hideLoading();
                    rerender(OrderListScreen);
                }
            });
        }); 
    },
    render: async () => {
        const orders = await getOrders();  
        return `
        <div class = "dashboard">
            ${DashboardMenu.render({selected: 'orders'})}
            <div class = "dashboard-content">
                <h2>Заказы</h2>
                <div class = "order-list">
                    <table class = "table">
                        <thead>
                            <tr>
                                <th>ID заказа</th>
                                <th>Дата заказа</th>
                                <th>Стоимость</th>
                                <th>Пользователь</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order => `
                                <tr>
                                    <td>${order._id}</td>
                                    <td>${order.createdAt}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>${order.user.name}</td>
                                    <td class = "buttons-td">
                                        <button id = "${order._id}" class = "edit-button primary">Изменить</button>
                                        <button id = "${order._id}" class = "delete-btn primary">Удалить</button>
                                    </td>
                                </tr>
                            `).join('\n')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    },
};

export default OrderListScreen;