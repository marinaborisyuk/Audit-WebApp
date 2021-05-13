import { update } from "../api";
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
    render: () => {
        const {name, email} = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        return `
            <div class = "content form-container">
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
        `
    }
};

export default ProfileScreen;

