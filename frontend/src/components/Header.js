import { getUserInfo } from "../localStorage";

const Header = {
    render: () => {
        const {name} = getUserInfo()
        return `
        <div class = "brand">
            <a href="/#/">КлассАудит</a>
        </div>
        <div class = "header-btn">
        ${name 
            ? `<a href = /#/profile>${name}</a>`
            : `<a href="/#/signin">Войти</a>`
        }
            <a href="/#/cart">Корзина</a>
        </div>
        `
    },
    after_render: () => {},
}

export default Header;