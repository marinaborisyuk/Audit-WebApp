import Chartist from 'chartist';
import { getSummary } from "../api";
import DashboardMenu from "../components/DashboardMenu";

let summary = {};

const DashboardScreen = {
    after_render: () => {
        new Chartist.Line('.ct-chart-line', {
            labels: summary.dailyOrders.map((x) => x._id),
            series: [summary.dailyOrders.map((x) => x.sales)],
        }, {
            showArea: true,
        });
        new Chartist.Pie('.ct-chart-pie', {
            labels: summary.serviceCategories.map((x) => x._id),
            series: summary.serviceCategories.map((x) => x.count),
        }, {
            donut: true,
            donutWidth: 60,
            startAngle: 270,
            showLabel: true,
            donutSolid: true,
        })
    },
    render: async () => {
        summary = await getSummary();
        return `
            <div class = "dashboard">
                ${DashboardMenu.render({selected: 'dashboard'})}
                <div class = "dashboard-content">
                    <h2>Мониторинг</h2>
                    <ul class = "summary-items">
                        <li>
                            <div class = "summary-title color1">
                                <span><i class = "fa fa-users"></i> Пользователи</span>
                            </div>
                            <div class = "summary-body">
                                ${summary.users[0].numUsers}
                            </div>
                        </li>
                        <li>
                            <div class = "summary-title color2">
                                <span><i class = "fa fa-users"></i> Заказы</span>
                            </div>
                            <div class = "summary-body">
                            ${summary.orders[0].numOrders}
                            </div>
                        </li>
                        <li>
                            <div class = "summary-title color3">
                                <span><i class = "fa fa-users"></i> Прибыль</span>
                            </div>
                            <div class = "summary-body">
                                ${summary.orders[0].totalSales} р.
                            </div>
                        </li>
                    </ul>
                    <div class = "charts">
                        <div>
                            <h3>Прибыль</h3>
                            <div class = "ct-perfect-fourth ct-chart-line"></div>
                        </div>
                        <div>
                            <h3>Категории</h3>
                            <div class = "ct-perfect-fourth ct-chart-pie"></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
};

export default DashboardScreen;