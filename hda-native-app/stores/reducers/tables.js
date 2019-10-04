import TABLES from '../../api/tables';

const uuidv4 = require('uuid/v4');

const INITIAL_STATE = {
    activeTableIndex: 0,
    allTables: TABLES,
}

export default tablesReducer = (initialState = INITIAL_STATE, action) => {
    const allTablesCopy = [...initialState.allTables];
    const activeTable = allTablesCopy[initialState.activeTableIndex];

    switch(action.type) {
        case 'SET_ACTIVE_TABLE': 

            allTablesCopy.forEach(cur => cur.isActive = false);
            allTablesCopy[action.payload].isActive = true;

            return {
                allTables: allTablesCopy, 
                activeTableIndex: action.payload
            };
        case 'SUBMIT_ORDER':

            let total = 0;
            let finalTableTotal = 0;

            const orderValues = Object.values(action.order);

            orderValues.forEach(order => {
                if (order)
                    total += order.price;
            })
            
            activeTable.orders.push(
                {
                    ...action.order, 
                    _id: uuidv4(), 
                    total: Math.floor(total * 100) / 100
                }
            );

            // TODO: PERCEBER O ERRO DA SOMA!!!!!!!!!!!!!!!!!!!!!!
            activeTable.orders.forEach(order => {
                if (order)
                    finalTableTotal += total;
            });

            activeTable.finalTotal = finalTableTotal;

            return {
                ...initialState,
                allTables: allTablesCopy
            };
        case 'DELETE_ORDER': 

            const el = activeTable.orders.find(cur => cur._id === action._id);

            activeTable.finalTotal = Math.floor((activeTable.finalTotal - el.total) * 100) / 100;
            activeTable.orders.splice(activeTable.orders.findIndex(cur => cur._id === action._id), 1);

            return {
                ...initialState,
                allTables: allTablesCopy
            };

        case 'CHECKOUT_ORDER':

            activeTable.paymentMode = true;

            return {
                ...initialState,
                allTables: allTablesCopy
            };
        default:
            return initialState;
    }
};