import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';

import { _onSubmitOrder } from '../../../stores/actions/tables';
import { clearOrder } from '../../../stores/actions/order';

const HeaderButton = props => {
    
    const onPressBtn = () => {
        if (props.order.food) {
            props._onSubmitOrder(props.order);
            props.clearOrder();
            props.navigation.goBack();
        }

        props.navigation.goBack();        
    };
    
    return <Button onPress={onPressBtn} color="white" title="Done"/>
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        _onSubmitOrder,
        clearOrder
    }, dispatch);
};

const mapStateToProps = state => {
    return {
        order: state.order
    };
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HeaderButton));