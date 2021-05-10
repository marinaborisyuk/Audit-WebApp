import data from '../data.js';

const HomeScreen =  {
    render: async () => {
        const response = await fetch("http://localhost:5000/api/services", {
            headers: {
                "Content-Type":"applocation/json",
            },
        });
        if (!response || !response.ok) {
            return `<div>Ошибка при получении данных</div>`;
        }
        const services = await response.json()

        return `<ul class="services">${services.map(service =>
                    `<li class="service">
                        <a href="/#/service/${service._id}">${service.name}</a>
                    </li>`
                ).join('\n')}
                </ul>`
    }
};

export default HomeScreen;