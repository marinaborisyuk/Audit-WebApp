import { getService } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.service === item.service);
    if (existItem) {
        cartItems = cartItems.map((x) => x.service === existItem.service ? item : x);
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
};

const CartScreen = {
    after_render: () => {
        
    }, 
    render: async () => {
        const request = parseRequestUrl();
        if (request.id) {
            const service = await getService(request.id);
            addToCart({
                service: service._id,
                name: service.name,
                price: service.price
            });
        }
        return `<div>Cart Screen</div>
                <div>${getCartItems().length}</div>`;
    },
};

export default CartScreen;