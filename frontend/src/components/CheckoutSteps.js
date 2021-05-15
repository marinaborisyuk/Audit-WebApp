const CheckoutSteps = {
    render: (props) => {
        console.log('');
        return `
            <div class = "checkout-steps">
                <div class = "${props.step1 ? 'active' : ''}">Авторизация</div>
                <div class = "${props.step2 ? 'active' : ''}">Контактные данные</div>
                <div class = "${props.step3 ? 'active' : ''}">Подтверждение заказа</div>
            </div>
        `;
    },
};

export default CheckoutSteps;