import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Orders from './Orders';
import Customer from './Customer';
import Setting from './Setting';
import Icon from 'react-native-vector-icons/FontAwesome';

const Main = () => {

    const Tab = createBottomTabNavigator();

    return(
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} 
                                options={{
                                  tabBarIcon: ({ color, size }) => (
                                    <Icon name="home" size={30} color="green" />
                                  ),
                                  headerShown: false,
                                }}/>
        <Tab.Screen name="Orders" component={Orders} 
                                options={{
                                  tabBarIcon: ({ color, size }) => (
                                    <Icon name="money" size={30} color="green" />
                                  ),
                                  headerShown: false,
                                }}/>                                
        <Tab.Screen name="Customer" component={Customer} 
                                options={{
                                  tabBarIcon: ({ color, size }) => (
                                    <Icon name="user" size={30} color="green" />
                                  ),
                                  headerShown: false,
                                }}/>      
        <Tab.Screen name="Setting" component={Setting} 
                                options={{
                                  tabBarIcon: ({ color, size }) => (
                                    <Icon name="cog" size={30} color="green" />
                                  ),
                                  headerShown: false,
                                }}/>
      </Tab.Navigator>
    )
}

export default Main;
