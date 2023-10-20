import {createLineItem, deleLineItem, updateLineItem, getLineItemById} from "../lineItem/lineItemSlice"


const addToCart = async (line) => {
    const response = await createLineItem(line);
    return response;
};

const removeFromCart = async (itemId) => {
    await deleLineItem(itemId);
    newArticles = cart.articles.filter(item => item != itemId)
    cart.articles = newArticles;
    cartGetTotal();
    return cart;
};

const increaseItemQuantity = async (itemId) => {
    lineItem = await getLineItemById(itemId);
    const data = {
        id: itemId,
        lineItem: lineItem.lineItemQuantity + 1,
    }
    await updateLineItem(data);
    cartGetTotal();
    return cart;
}

const decreaseItemQuantity = async (itemId) => {
    lineItem = await getLineItemById(itemId);
    if (lineItem.lineItemQuantity = 1)
        return removeFromCart(itemId);
    const data = {
        id: itemId,
        lineItem: lineItem.lineItemQuantity - 1,
    }
    await updateLineItem(data);
    cartGetTotal();
    return cart;
}

const cartGetTotal = async () => {
    cart.articles.map(article => {
        cart.total += article.lineItemPrice;
    })
}

const cartService = {
    addToCart,
    removeFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
}

export default cartService;

