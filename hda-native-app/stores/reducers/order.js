const INITIAL_STATE = { 
    food: null,
    pao: null, 
    ref: null,
    ent: null 
};

export default orderReducer = (initialState = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_ORDER_ITEM':
            switch(action.itemType) {
                default:
                    return {...initialState, food: action.item}
                case 'pao': 
                    return {...initialState, pao: action.item}
                break;
                case 'ref': 
                    return {...initialState, ref: action.item}
                break;
                case 'ent': 
                    return {...initialState, ent: action.item}
            }
        
        case 'CLEAR_ORDER':

            return {
                food: null,
                pao: null, 
                ref: null,
                ent: null 
            };

        default:
            return initialState;
    }
}