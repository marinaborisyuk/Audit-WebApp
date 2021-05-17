import DashboardMenu from "../components/DashboardMenu";
import { createService, getServices, deleteService } from "../api";
import { showLoading, hideLoading, rerender, showMessage } from '../utils';

const ServiceListScreen = {
    after_render: () => {
        document.getElementById('create-service-button').addEventListener('click', async () => {
            const data = await createService();
            document.location.hash = `/service/${data.service._id}/edit`;
        });
        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach(editButton => {
            editButton.addEventListener('click', () => {
                document.location.hash = `/service/${editButton.id}/edit`;
            });
        });
        const deleteButtons = document.getElementsByClassName('delete-btn');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                if (confirm('Удалить услугу?!')) {
                    showLoading();
                    const data = await deleteService(deleteButton.id);
                    if (data.error) {
                        showMessage(data);
                    } else 
                    hideLoading();
                    rerender(ServiceListScreen);
                }
            });
        }); 
    },
    render: async () => {
        const services = await getServices();  
        return `
        <div class = "dashboard">
            ${DashboardMenu.render({selected: 'services'})}
            <div class = "dashboard-content">
                <h2>Услуги</h2>
                <button id = "create-service-button" class = "primary">Добавить услулу</button>
                <div class = "service-list">
                    <table class = "table">
                        <thead>
                            <tr>
                                <th>ID услуги</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Категория</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${services.map(service => `
                                <tr>
                                    <td>${service._id}</td>
                                    <td>${service.name}</td>
                                    <td>${service.price}</td>
                                    <td>${service.category}</td>
                                    <td class = "buttons-td">
                                        <button id = "${service._id}" class = "edit-button primary">Изменить</button>
                                        <button id = "${service._id}" class = "delete-btn primary">Удалить</button>
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

export default ServiceListScreen;