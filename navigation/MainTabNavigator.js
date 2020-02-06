/* eslint-disable prettier/prettier */
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';

//
import StatisticsScreen from '../screens/StatisticsScreen';
import PreventionsScreen from '../screens/PreventionsScreen';
import NewsScreen from '../screens/NewsScreen';
import AboutScreen from '../screens/AboutScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const StatisticStack = createStackNavigator(
  {
    Statistic: StatisticsScreen,
  },
  config
);

StatisticStack.navigationOptions = {
  tabBarLabel: 'Statistic',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-globe` : 'md-globe'} />
  ),
};

StatisticStack.path = "";

const PreventionStack = createStackNavigator(
  {
    Prevention: PreventionsScreen,
  },
  config
);

PreventionStack.navigationOptions = {
  tabBarLabel: 'Prevention',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-pulse` : 'md-pulse'} />
  ),
};

PreventionStack.path = "";

const NewsStack = createStackNavigator(
  {
    News: NewsScreen,
  },
  config
);

NewsStack.navigationOptions = {
  tabBarLabel: 'Prevention',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-document` : 'md-document'} />
  ),
};

NewsStack.path = "";

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  },
  config
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

AboutStack.path = "";


const tabNavigator = createBottomTabNavigator({
  StatisticStack,
  PreventionStack,
  AboutStack,
});

tabNavigator.path = '';

export default tabNavigator;
