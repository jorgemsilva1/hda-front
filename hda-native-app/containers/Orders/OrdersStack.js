import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

// Compoennts
import Orders from './Orders';
import OrderMenu from './OrderMenu/OrderMenu';

import stackConfig from '../../routes/stackConfig';

export default OrdersStack = createStackNavigator({
    Orders: {
        screen: Orders,
        navigationOptions: stackConfig('Orders')
    },
    OrderMenu: {
        screen: OrderMenu,
        navigationOptions: {
            ...stackConfig('Choose Order'),
            // headerRight: <Text>Done</Text>
        }
    }
});

