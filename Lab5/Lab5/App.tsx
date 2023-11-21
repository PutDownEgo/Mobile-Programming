import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Home';
import Login from './src/Login';
import Customer from './src/Customer';
import Transaction from './src/Transaction';
import Setting from './src/Setting';
import AddService from './src/AddService';
import ServiceDetail from './src/ServiceDetail';

const Stack = createStackNavigator();
const Tab  = createBottomTabNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add Service" component={AddService} 
                      options={{ 
                        title: 'Service',
                        headerStyle: {backgroundColor: '#ef506b'},
                        headerTitleStyle: {color: 'white'},
                        headerTintColor: 'white',
                        headerShown: true}}/>
          <Stack.Screen name="Service Detail" component={ServiceDetail}
                      options={{ 
                        title: 'Service Detail',
                        headerStyle: {backgroundColor: '#ef506b'},
                        headerTitleStyle: {color: 'white'},
                        headerTintColor: 'white',
                        headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}