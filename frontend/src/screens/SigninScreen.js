const SigninScreen = {
    after_render: () => {},
    render: () => {
        console.log('dfgfg');
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
                                 <a href = "/#/registre">Зарегистрируйтесь</a>
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

