import { getEmployees, createEmployee, deleteEmployee } from "../api";
import DashboardMenu from "../components/DashboardMenu";
import { hideLoading, rerender, showLoading } from "../utils";

const EmployeeListScreen = {
    after_render: () => {
        document.getElementById('create-employee-button').addEventListener('click', async () => {
            const data = await createEmployee();
            document.location.hash = `/employee/${data.employee._id}/create`;
        });
        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach(editButton => {
            editButton.addEventListener('click', () => {
                document.location.hash = `/employee/${editButton.id}/edit`;
            });
        });
        const deleteButtons = document.getElementsByClassName('delete-btn');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                if (confirm('Удалить запись?!')) {
                    showLoading();
                    const data = await deleteEmployee(deleteButton.id);
                    if (data.error) {
                        showMessage(data);
                    } else 
                    hideLoading();
                    rerender(EmployeeListScreen);
                }
            });
        });
    },
    render: async () => {
        const employees = await getEmployees();
        return `
            <div class = "dashboard">
                ${DashboardMenu.render({selected: 'employees'})}
                <div class = "dashboard-content">
                    <h1>Сотрудники</h1>
                    <button id = "create-employee-button" class = "primary">Добавить сотрудника</button>
                    <div class = "service-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ФИО</th>
                                    <th>Должность</th>
                                    <th>Оценка компетентности</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${employees.map((employee) => `
                                    <tr>
                                        <td>${employee._id}</td>
                                        <td>${employee.name}</td>
                                        <td>${employee.jobTitle}</td>
                                        <td>${employee.competencyEvaluation}</td>
                                        <td>
                                            <button id = "${employee._id}" class = "edit-button primary">Изменить</button>
                                            <button id = "${employee._id}" class = "delete-btn primary">Удалить</button>
                                        </td>
                                    </tr>
                                `).join('\n')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
    },
};

export default EmployeeListScreen;