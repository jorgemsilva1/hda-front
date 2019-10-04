import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import DashboardStack from '../containers/Dashboard/DashboardStack';

export default Router = () => {
    return <AppRouter />
};

const TabNavigator = createBottomTabNavigator({
    Dashboard: DashboardStack
});

const AppRouter = createAppContainer(TabNavigator);