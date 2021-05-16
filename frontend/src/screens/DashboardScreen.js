import DashboardMenu from "../components/DashboardMenu";

const DashboardScreen = {
    after_render: () => {},
    render: () => {
        console.log('');
        return `
            <div class = "dashboard">
                ${DashboardMenu.render({selected: 'dashboard'})}
                <div class = "dashboard-content">
                    <h2>Мониторинг</h2>
                    <div>
                        Tut budet info                    
                    </div>
                </div>
            </div>
        `
    },
};

export default DashboardScreen;