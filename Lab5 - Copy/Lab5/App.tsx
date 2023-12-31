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
import ItemDetail from './src/ItemDetail';
import Main from './src/Main';
import EditService from './src/EditService';
import AddCustomer from './src/AddCustomer';
import TransactionDetail from './src/TransactionDetail';

const Stack = createStackNavigator();
const Tab  = createBottomTabNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Add Service" component={AddService}/>
        <Stack.Screen name="Item Detail" component={ItemDetail}/>
        <Stack.Screen name="Edit Service" component={EditService}/>
        <Stack.Screen name="Add Customer" component={AddCustomer}/>
        <Stack.Screen name="Transaction Detail" component={TransactionDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}