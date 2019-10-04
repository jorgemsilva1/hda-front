import { createStackNavigator } from 'react-navigation-stack';
import Menu from './Menu';

import stackConfig from '../../routes/stackConfig';

export default MenuStack = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: stackConfig('Menu')
    }
});

