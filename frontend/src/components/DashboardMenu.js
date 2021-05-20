const DashboardMenu = {
    render: (props) => `
        <div class = "dashboard-menu">
            <ul>
                <li class = "${props.selected === 'dashboard' ? 'selected' : ''}"><a href = "/#/dashboard">Мониторинг</a></li>
                <li class = "${props.selected === 'orders' ? 'selected' : ''}"><a href = "/#/orderlist">Заказы</a></li>
                <li class = "${props.selected === 'services' ? 'selected' : ''}"><a href = "/#/servicelist">Услуги</a></li>
                <li class = "${props.selected === 'employees' ? 'selected' : ''}"><a href = "/#/employeelist">Сотрудники</a></li>
            </ul>
        </div>
    `
};

export default DashboardMenu;