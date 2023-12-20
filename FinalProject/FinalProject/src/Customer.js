import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import base64 from 'react-native-base64';

const Customer = ({navigation}) => {
  const [customers, setCustomers] = useState();


  const fecthData = async () => {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('username');
    const authHeader = `Basic ${base64.encode(`${username}:${password}`)}`;
    try {
        const response = await axios.get('https://putdownego.pythonanywhere.com/api/customers/', {
          headers: {
              Authorization: authHeader,
              'Content-Type': 'application/json',
          },
          });
        setCustomers(response.data)
    } catch (error) {
        console.error('Error:', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
        fecthData();
    }, [])
  );  
  const getCustomerID = async (itemId) => {
    AsyncStorage.setItem('customerID', itemId.toString());
    navigation.navigate("Customer Detail")
  }
  const renderCustomer = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => getCustomerID(item.id)}  style={{margin: 10, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderRadius: 10}}>
          <View style={{margin: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text>Customer: </Text>
              <Text style={{ fontWeight: "bold" }}>{ item.first_name + " "+ item.last_name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Email: </Text>
              <Text style={{ fontWeight: "bold" }}>{ item.email }</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Phone number: </Text>
              <Text style={{ fontWeight: "bold" }}>{ item.user_profile.phone_number }</Text>
            </View>
          </View>
          <Icon name="chess-queen" size={30} color="#ef506b" style={{margin: 20}}/>
        </TouchableOpacity>
    );
  };

  const addCustomer = () => {
    navigation.navigate("Add Customer")
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.title}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 25, color: 'white'}}> Customer</Text>
          </View>
      </View>
      <FlatList
            data={customers}
            renderItem={renderCustomer}
            keyExtractor={item => item.id.toString()}
        />
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  title:{
      backgroundColor: 'green',
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
  },
})
export default Customer