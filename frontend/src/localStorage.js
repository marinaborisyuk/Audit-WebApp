export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') ? 
        JSON.parse(localStorage.getItem('cartItems')) :
        []; 
    return cartItems;
};

export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const setUserInfo = ({
    _id = '',
    name = '',
    email = '',
    password = '',
    token = '',
    isAdmin = false,
}) => {
    localStorage.setItem('userInfo', JSON.stringify({
        _id, 
        name, 
        email, 
        password, 
        token, 
        isAdmin,
    }));
};

export const clearUser = () => {
    localStorage.removeItem('userInfo');
};

export const getUserInfo = () => 
    localStorage.getItem('userInfo', ) ? 
    JSON.parse(localStorage.getItem('userInfo')) :
    { name: '', email: '', password: ''};     

export const getContactInfo = () => {
    const contactInfo = localStorage.getItem('contactInfo') ?
        JSON.parse(localStorage.getItem('contactInfo')) :
        {
            firmName: '',
            address: '',
            city: '',
            firmPhone: '',
        };
    return contactInfo;    
};    

export const setContactInfo = ({
    firmName = '',
    address = '',
    city = '',
    firmPhone = '', 
}) => {
    localStorage.setItem('contactInfo', JSON.stringify({firmName, address, city, firmPhone}));
};