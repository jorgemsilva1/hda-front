import { colors } from '../variables';

export default stackConfig = title => {
    return {
        title: title,
        headerStyle: {
          backgroundColor: colors.primaryColor,
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'roboto-slab-regular',
        }
        // headerRight: <Ionicons name='ios-settings' size={25} color='white' />, 
    };
}