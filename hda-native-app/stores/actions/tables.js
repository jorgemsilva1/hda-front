export const setActiveTable = tableIndex => {
    return {
        type: 'SET_ACTIVE_TABLE',
        payload: tableIndex
    };
};

export const _onSubmitOrder = order => {
    return {
        type: 'SUBMIT_ORDER',
        order
    }
};

export const _onDeleteSinglerOrder = _id => {
    return {
        type: 'DELETE_ORDER',
        _id
    }
};