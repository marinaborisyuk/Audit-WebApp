import DashboardMenu from "../components/DashboardMenu";
import { getServices } from "../api";

const ServiceListScreen = {
    after_render: () => {},
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
                                        <button id = "${service._id}" class = "primary">Изменить</button>
                                        <button id = "${service._id}" class = "primary">Удалить</button>
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