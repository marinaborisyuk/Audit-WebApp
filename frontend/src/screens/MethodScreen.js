import DashboardMenu from "../components/DashboardMenu";
import { getPurposes } from "../api";
import { showMessage } from "../utils";

const MethodScreen = {
    after_render: () => {       
        document.getElementById('execute-method-button').addEventListener('click', async () => {
            const  { employees, purposes } = await getPurposes();
            const coefficients = [];
            let sum = 0; let count = 0;
            employees.forEach(employee => {
                const { competencyEvaluation } = employee; 
                coefficients.push(competencyEvaluation)
                sum += competencyEvaluation; count++;
                });
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
            purposeArr.forEach(x => {
                console.log(x[0]);
            })
            showMessage('')
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
                                    <td><input type = "text"  oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');" required></td>
                                `).join('\n')}
                                </tr>
                                `).join('\n')}
                        </tbody>
                    </table>
                </div>
                <button id = "execute-method-button" class = "primary">Выполнить</button>
            </div>
        </div>
    `;
    },
};

export default MethodScreen;