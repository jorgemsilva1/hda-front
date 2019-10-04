export const checkoutOrder = (tableNumber, tableFullOrder, finalTotal) => {
    return {
        type: 'CHECKOUT_ORDER',
        tableNumber,
        tableFullOrder,
        finalTotal
    }
};