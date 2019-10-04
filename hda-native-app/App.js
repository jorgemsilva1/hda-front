import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Redux
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import foodReducer from './stores/reducers/food';
import tablesReducer from './stores/reducers/tables';
import orderReducer from './stores/reducers/order';
import cartReducer from './stores/reducers/cart';

// Components
import Login from './containers/Login';
import DashboardStack from './containers/Dashboard/DashboardStack';
import CartStack from './containers/Cart/CartStack';
import MenuStack from './containers/Menu/MenuStack';
import OrdersStack from './containers/Orders/OrdersStack';
import ProfileStack from './containers/Profile/ProfileStack';

import { colors } from './variables';

// Combine Reducers
const combinedReducers = combineReducers({
  food: foodReducer,
  tables: tablesReducer,
  order: orderReducer,
  cart: cartReducer
});

// Create Redux Store
const store = createStore(combinedReducers)

const App = () => {

  useEffect(() => {
    Font.loadAsync({
      'roboto-slab-regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
      'roboto-slab-bold': require('./assets/fonts/RobotoSlab-Bold.ttf'),
    })
  }, []);

  return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
}

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
})

const TabNavigator = createBottomTabNavigator({
  Dashboard: DashboardStack,
  Menu: MenuStack,
  Orders: OrdersStack,
  Cart: CartStack,
  Profile: ProfileStack
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            const IconComponent = Ionicons;
            let iconName;
            switch(routeName) {
                case 'Dashboard':
                    iconName = `ios-home`;
                break;
                case 'Menu':
                    iconName = `ios-restaurant`;
                break;
                case 'Cart':
                    iconName = `ios-cart`;
                break;
                case 'Orders':
                    iconName = 'ios-list'
                break;
                case 'Profile':
                    iconName = 'ios-person'
                break;
            }
            return <IconComponent name={iconName} size={25} color={tintColor} />
        },
    }),
    tabBarOptions: {
        activeTintColor: colors.primaryColor,
        inactiveTintColor: 'rgba(0,0,0, 0.2)',
        style: {
            backgroundColor: 'white',
            padding: 8
        },
        showLabel: false
    }
});

const AppNavigator = createSwitchNavigator({
  Auth:  AuthNavigator,
  Home: TabNavigator
})

const AppContainer = createAppContainer(AppNavigator);

export default App;
