import { createStackNavigator } from 'react-navigation-stack';
import Profile from './Profile';

import stackConfig from '../../routes/stackConfig';

export default ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: stackConfig('Profile')
    }
});

