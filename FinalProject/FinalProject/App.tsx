import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/Login';
import ItemDetail from './src/ItemDetail';
import Main from './src/Main';
import EditItem from './src/EditItem';
import OrderDetail from './src/OrderDetail';
import CustomerDetail from './src/CustomerDetail';
import AddItem from './src/AddItem';

const Stack = createStackNavigator();
const Tab  = createBottomTabNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Add Item" component={AddItem}/>
        <Stack.Screen name="Item Detail" component={ItemDetail}/>
        <Stack.Screen name="Edit Item" component={EditItem}/>
        <Stack.Screen name="Order Detail" component={OrderDetail}/>
        <Stack.Screen name="Customer Detail" component={CustomerDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}