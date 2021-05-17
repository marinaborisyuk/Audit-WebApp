import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const RegisterScreen = {
    after_render: () => {
        document.getElementById("register-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading()
            const data = await register({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                redirectUser();
            }
        });

    },
    render: () => {
        if (getUserInfo().name) {
            redirectUser();
        }
        return `
            <div class = "content form-container">
                <form id = "register-form">
                    <ul class = "form-items">
                        <li>
                            <h2>Регистрация</h2>
                        </li>
                        <li>
                            <input type = "name" name = "name" id = "name" placeholder = "Введите имя..." required>
                        </li>
                        <li>
                            <input type = "email" name = "email" id = "email" placeholder = "Введите email..." required>
                        </li>
                        <li>
                            <input type = "password" name = "password" id = "password" placeholder = "Введите пароль..." required>
                        </li>
                        <li>
                            <input type = "password" name = "repassword" id = "repassword" placeholder = "Введите пароль повторно..." required>
                        </li>
                        <li class = "form-footer">
                            <div>Есть аккуант? 
                                 <a href = "/#/signin">Войдите!</a>
                            </div>
                            <button type = "submit" class = "primary">Зарегистрироваться</button>
                        </li>
                    </ul>
                </form>
            </div>
        `
    }
};

export default RegisterScreen;

