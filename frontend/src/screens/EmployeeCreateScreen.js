import { hideLoading, parseRequestUrl, showLoading, showMessage } from '../utils';
import { updateEmployee } from '../api';

const EmployeeCreateScreen = {
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
        return `
            <div class = "content">
                <div> 
                    <a href = "/#/employeelist/">Вернуться к списку сотрудников</a>
                </div>
                <div class = "from-container">
                    <form id = "edit-employee-form">
                        <ul class = "form-items">
                            <li>
                                <h2>Добавить запись</h2>
                            </li>
                            <li>
                                <input type = "name" name = "name" id = "name" placeholder = "Введите ФИО..." required>
                            </li>
                            <li>
                                <input type = "text" name = "jobTitle" id = "jobTitle" placeholder = "Введите должность..." required>
                            </li>
                            <li>
                                <input type = "text" name = "competencyEvaluation" id = "competencyEvaluation" placeholder = "Введите оценку компетентности..." required>
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

export default EmployeeCreateScreen;