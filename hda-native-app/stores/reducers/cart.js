const INITIAL_STATE = {
    allOrders: []
}

export default cartReducer = (initialState = INITIAL_STATE, action) => {

    const stateCopy = {...initialState};

    switch(action.type) {
        case 'CHECKOUT_ORDER':

            stateCopy.allOrders.push({
                tableNumber: action.tableNumber,
                orders: action.tableFullOrder,
                finalTotal: action.finalTotal
            });

            return {...stateCopy};
        default: 
            return initialState;
    };
};