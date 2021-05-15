import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, getContactInfo, setContactInfo } from "../localStorage";

const ContactInfoScreen = {
    after_render: () => {
        document.getElementById("contactInfo-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            setContactInfo({
                firmName: document.getElementById('firmName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                firmPhone: document.getElementById('firmPhone').value,
            });
            console.log(document.location);
            document.location.hash = '/placeorder';
        });
    },
    render: () => {
        const { name } = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }

        const {firmName, address, city, firmPhone} = getContactInfo();

        return `
            ${CheckoutSteps.render({step1: true, step2: true})}
            <div class = "content form-container">
                <form id = "contactInfo-form">
                    <ul class = "form-items">
                        <li>
                            <h2>Контактные данные</h2>
                        </li>
                        <li>
                            <input type = "text" name = "firmName" id = "firmName" placeholder = "Введите полное название фирмы..." value = "${firmName}" required>
                        </li>
                        <li>
                            <input type = "text" name = "address" id = "address" placeholder = "Введите адрес фирмы..." value = "${address}" required>
                        </li>
                        <li>
                            <input type = "text" name = "city" id = "city" placeholder = "Введите город..." value = "${city}" required>
                        </li>
                        <li>
                            <input type = "tel" name = "phone" id = "firmPhone" placeholder = "Введите контактный номер..." value = "${firmPhone}" required>
                        </li>
                        <li class = "form-footer">
                            <button type = "submit" class = "primary">Продолжить</button>
                        </li>
                    </ul>
                </form>
            </div>
        `
    }
};

export default ContactInfoScreen;