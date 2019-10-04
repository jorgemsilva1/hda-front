export const setOrderItem = (item, itemType) => {
    return {
        type: 'SET_ORDER_ITEM',
        itemType,
        item
    };
}

export const clearOrder = () => {
    return {
        type: 'CLEAR_ORDER'
    };
}