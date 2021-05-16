import { getMyOrders, update } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const ProfileScreen = {
    after_render: () => {
        document.getElementById('signout-button').addEventListener('click', () => {
            clearUser();
            document.location.hash = '/';
        });
        document.getElementById("profile-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading()
            const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                document.location.hash = '/';
            }
        });

    },
    render: async () => {
        const {name, email} = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        const orders = await getMyOrders();
        return `
            <div class = "content profile-container">
                <div class = "profile">
                    <div class = "profile-info">
                        <form id = "profile-form">
                            <ul class = "form-items">
                                <li>
                                    <h2>Профиль</h2>
                                </li>
                                <li>
                                    <input type = "name" name = "name" id = "name" placeholder = "Введите имя..." value = "${name}" required>
                                </li>
                                <li>
                                    <input type = "email" name = "email" id = "email" placeholder = "Введите email..." value = "${email}" required>
                                </li>
                                <li>
                                    <input type = "password" name = "password" id = "password" placeholder = "Введите пароль..." required>
                                </li>
                                <li class = "form-footer">
                                    <button type = "submit" class = "primary">Изменить</button>
                                    <button type = "button" id = "signout-button" class = "primary">Выйти</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div class = "profile-orders">
                        <table>
                            <thead>
                                <th>ID Заказа</th>
                                <th>Дата заказа</th>
                                <th>Стоимость</th>
                                <th></th>
                            </thead>
                            <tbody>
                                ${orders.length === 0 ? `<tr><td colspan = "4">Нет заказов...</td></tr>` :
                                    orders.map(order => `
                                        <tr>
                                            <td>${order._id}</td>
                                            <td>${order.createdAt}</td>
                                            <td>${order.totalPrice}</td>
                                            <td><a href = "/#/order/${order._id}">Детали заказа</a></td>
                                        </tr>
                                    `).join('\n')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
    }
};

export default ProfileScreen;

