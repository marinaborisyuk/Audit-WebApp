import axios from 'axios';

const HomeScreen =  {
    render: async () => {
        const response = await axios({
            url: "http://localhost:3000/api/services",
            headers: {
                "Content-Type":"applocation/json",
            },
        });
        if (!response || response.statusText !== 'OK') {
            return `<div>Ошибка при получении данных</div>`;
        }
        const services = response.data;

        return `<ul class="services">${services.map(service =>
                    `<li class="service">
                        <a href="/#/service/${service._id}">${service.name}</a>
                    </li>`
                ).join('\n')}
                </ul>`
    }
};

export default HomeScreen;