import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Products from './Products';
import AddProducts from './Product_Add';
import Details from './Product_Detail';
import Search from './Product_Search';
import {NavigationContainer} from '@react-navigation/native';
import {BottomNavigation, Text} from 'react-native-paper'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name = 'Products' component={Products}/>
      <Stack.Screen name = 'Details' component={Details}/>
    </Stack.Navigator>
  )
}

export default App = () => {
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
  // const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   {key: 'Products', title: 'Products', focusedIcon: 'database'},
  //   {key: 'AddProducts', title: 'Add', focusedIcon: 'folder'},
  //   {key: 'Search', title: 'Search', focusedIcon: 'find'},
  //   {key: 'Details', title: 'Detail', focusedIcon: 'calendar'},
  // ])

  // const renderScene = BottomNavigation.SceneMap({
  //   Products: Products,
  //   AddProducts: AddProducts,
  //   Search: Search,
  //   Details: Details,
  // })

  // return (
  //   // <Details/>
  //   <SafeAreaProvider>
  //     <BottomNavigation
  //       navigationState={{index, routes}}
  //       onIndexChange ={setIndex}
  //       renderScene={renderScene}
  //     />
  //   </SafeAreaProvider>
  // )
}
