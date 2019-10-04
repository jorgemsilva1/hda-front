import { Ionicons } from '@expo/vector-icons';
import {
    createBottomTabNavigator
} from 'react-navigation-tabs'

import { Dashboard } from '../containers/Dashboard';
import Menu from '../containers/Menu';


export default createBottomTabNavigator({
        Dashboard: Dashboard,
        Menu: Menu
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const {
                    routeName
                } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;

                switch(routeName) {
                    case 'Dashboard':
                        iconName = `ios-apps`;
                    break;
                    case 'Menu':
                        iconName = `ios-list`;
                    break;
                }
                // You can return any component that you like here!
                return <IconComponent name = { iconName } size = {25} color = { tintColor } />
            }
        })
    }
)