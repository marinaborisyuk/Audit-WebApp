import { hideLoading, parseRequestUrl, showLoading, showMessage } from '../utils';
import { getEmployee, updateEmployee } from '../api';

const EmployeeEditScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById("edit-employee-form").addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await updateEmployee({
                _id: request.id,
                name: document.getElementById('name').value,
                jobTitle: document.getElementById('jobTitle').value,
                competencyEvaluation: document.getElementById('competencyEvaluation').value,
            });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                document.location.hash = '/employeelist/';
            }
        });
    },
    render: async () => {
        const request = parseRequestUrl();
        const employee = await getEmployee(request.id);
        return `
            <div class = "content">
                <div> 
                    <a href = "/#/employeelist/">Вернуться к списку сотрудников</a>
                </div>
                <div class = "from-container">
                    <form id = "edit-employee-form">
                        <ul class = "form-items">
                            <li>
                                <h2>Изменить данные записи "${employee.name}"</h2>
                            </li>
                            <li>
                                <input type = "name" name = "name" id = "name" placeholder = "Введите ФИО..." value = "${employee.name}" required>
                            </li>
                            <li>
                                <input type = "text" name = "jobTitle" id = "jobTitle" placeholder = "Введите должность..." value = "${employee.jobTitle}" required>
                            </li>
                            <li>
                                <input type = "text" name = "competencyEvaluation" id = "competencyEvaluation" placeholder = "Введите оценку компетентности..." value = "${employee.competencyEvaluation}" required>
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

export default EmployeeEditScreen;