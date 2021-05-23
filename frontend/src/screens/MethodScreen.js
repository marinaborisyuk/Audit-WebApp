import DashboardMenu from "../components/DashboardMenu";
import { getPurposes, createAndDownloadPdf } from "../api";
import { hideLoading, showLoading, showMessage } from "../utils";

const MethodScreen = {
    after_render: () => {       
        document.getElementById('execute-method-button').addEventListener('click', async () => {
            const  { employees, purposes } = await getPurposes();
            const purposeNames = [];
            purposes.forEach( purpose => purposeNames.push(purpose.name));
            let purposeNamesRes = purposeNames.join(',');

            const coefficients = [];
            let sum = 0; let count = 0;
            const employeeNames = [];

            employees.forEach(employee => {
                const { competencyEvaluation, name } = employee; 
                coefficients.push(competencyEvaluation);
                employeeNames.push(name);
                sum += competencyEvaluation; count++;
            });
            let employeeNamesRes = employeeNames.join(',');

            const relativeCompetencyAssessments = coefficients.map(coefficient => {
                return coefficient/sum;
            });
            const inputs = document.querySelectorAll('input[type="text"]');
            const estimates = [];

            inputs.forEach(input => {
                const { value } = input;
                if (value)
                estimates.push(Number(value));
            });

            const estimatesMatrix = [];
            for (let i = 0; i < estimates.length; i+=count) {
                let matrixArr = [];
                for (let j = 0; j < count; j++) {
                    matrixArr.push(estimates[i+j]);
                }
                estimatesMatrix.push(matrixArr);
            }
            let estimatesRes = estimates.join(',');

            const targetWeights = [];
            for (let i = 0; i < estimatesMatrix.length; i++) {
                let weigthRes = 0;
                for (let j = 0; j < count; j++) {
                    weigthRes += estimatesMatrix[i][j] * relativeCompetencyAssessments[j];
                }
                targetWeights.push(weigthRes);
            }
            const purposeArr = [];
            for (let i = 0; i < purposes.length; i++) {
                const tmp = [purposes[i].name, targetWeights[i]];
                purposeArr.push(tmp);
            }
            purposeArr.sort((a, b) => b[1] - a[1]);

            showMessage(`Лучшая альтернатива: ${purposeArr[0][0]}`);
            let purposeArrRes = purposeArr.join(',');
            document.getElementById('get-report-button').addEventListener('click', async (e) => {
                e.preventDefault();
                showLoading();
                await createAndDownloadPdf({
                    employees: employeeNamesRes,
                    purposes: purposeNamesRes,
                    estimates: estimatesRes,
                    results: purposeArrRes,
                });
                hideLoading();
            });
        });
        
    },
    render: async () => { 
        const  { employees, purposes } = await getPurposes();
        return `
        <div class = "dashboard">
            ${DashboardMenu.render({selected: 'method'})}
            <div class = "dashboard-content">
                <h2>Определение цели</h2>
                <div class = "service-list">
                    <table class = "table">
                        <thead>
                            <tr>
                                <th></th>
                                ${employees.map(employee => `
                                    <th>${employee.name}</th>
                                `).join('\n')}
                            </tr>
                        </thead>
                        <tbody>
                                ${purposes.map(purpose => `
                                <tr>
                                    <td>${purpose.name}</td>
                                    ${employees.map(employee => `
                                    <td><input type = "text"  oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');" value = "1" required></td>
                                `).join('\n')}
                                </tr>
                                `).join('\n')}
                        </tbody>
                    </table>
                </div>
                <button id = "execute-method-button" class = "primary">Выполнить</button>
                <button id = "get-report-button" class = "primary">Получить отчёт</button>
            </div>
        </div>
    `;
    },
};

export default MethodScreen;