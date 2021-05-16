import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const SigninScreen = {
    after_render: () => {
        document.getElementById("signin-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await signin({
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
                <form id = "signin-form">
                    <ul class = "form-items">
                        <li>
                            <h2>Авторизация</h2>
                        </li>
                        <li>
                            <input type = "email" name = "email" id = "email" placeholder = "Введите email..." required>
                        </li>
                        <li>
                            <input type = "password" name = "password" id = "password" placeholder = "Введите пароль..." required>
                        </li>
                        <li class = "form-footer">
                            <div>Новый пользователь? 
                                 <a href = "/#/register">Зарегистрируйтесь</a>
                            </div>
                            <button type = "submit" class = "primary">Войти</button>
                        </li>
                    </ul>
                </form>
            </div>
        `
    }
};

export default SigninScreen;

