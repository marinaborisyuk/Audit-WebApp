import { hideLoading, parseRequestUrl, showLoading, showMessage } from '../utils';
import { updateService } from '../api';

const ServiceEditScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById("edit-service-form").addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await updateService({
                _id: request.id,
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                category: document.getElementById('category').value,
                includingServices: document.getElementById('includingServices').value,
                price: document.getElementById('price').value,
            });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                document.location.hash = '/servicelist/';
            }
        });
    },
    render: async () => {
        return `
            <div class = "content">
                <div> 
                    <a href = "/#/servicelist/">Вернуться к списку услуг</a>
                </div>
                <div class = "from-container">
                    <form id = "edit-service-form">
                        <ul class = "form-items">
                            <li>
                                <h2>Добавить данные об услуге</h2>
                            </li>
                            <li>
                                <input type = "name" name = "name" id = "name" placeholder = "Введите название..." required>
                            </li>
                            <li>
                                <input type = "text" name = "description" id = "description" placeholder = "Введите описание..." required>
                            </li>
                            <li>
                                <input type = "text" name = "category" id = "category" placeholder = "Введите категорию..." required>
                            </li>
                            <li>
                                <input type = "text" name = "includingServices" id = "includingServices" placeholder = "Введите включающие услуги..." required>
                            </li>
                            <li>
                                <input type = "text" name = "price" id = "price" placeholder = "Введите стоимость..." required>
                            </li>
                            <li>
                                <button type = "submit" class = "primary">Добавить</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        `;
    },
};

export default ServiceEditScreen;