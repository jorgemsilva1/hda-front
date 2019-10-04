import { createStackNavigator } from 'react-navigation-stack';
import Cart from './Cart';

import stackConfig from '../../routes/stackConfig';

export default CartStack = createStackNavigator({
    Cart: {
        screen: Cart,
        navigationOptions: stackConfig('Cart')
    }
});

