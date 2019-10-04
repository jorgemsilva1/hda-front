import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from './Dashboard';

import stackConfig from '../../routes/stackConfig';

export default DashboardStack = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: stackConfig('Dashboard')
    }
});

