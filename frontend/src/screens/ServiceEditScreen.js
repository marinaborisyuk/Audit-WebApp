import { hideLoading, parseRequestUrl, showLoading, showMessage } from '../utils';
import { getService, updateService } from '../api';

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
        const request = parseRequestUrl();
        const service = await getService(request.id);
        return `
            <div class = "content">
                <div> 
                    <a href = "/#/servicelist/">Вернуться к списку услуг</a>
                </div>
                <div class = "from-container">
                    <form id = "edit-service-form">
                        <ul class = "form-items">
                            <li>
                                <h2>Изменить данные об услуге "${service.name}"</h2>
                            </li>
                            <li>
                                <input type = "name" name = "name" id = "name" placeholder = "Введите название..." value = "${service.name}" required>
                            </li>
                            <li>
                                <input type = "text" name = "description" id = "description" placeholder = "Введите описание..." value = "${service.description}" required>
                            </li>
                            <li>
                                <input type = "text" name = "category" id = "category" placeholder = "Введите категорию..." value = "${service.category}" required>
                            </li>
                            <li>
                                <input type = "text" name = "includingServices" id = "includingServices" placeholder = "Введите включающие услуги..." value = "${service.includingServices}" required>
                            </li>
                            <li>
                                <input type = "text" name = "price" id = "price" placeholder = "Введите стоимость..." value = "${service.price}" required>
                            </li>
                            <li>
                                <button type = "submit" class = "primary">Изменить</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        `;
    },
};

export default ServiceEditScreen;