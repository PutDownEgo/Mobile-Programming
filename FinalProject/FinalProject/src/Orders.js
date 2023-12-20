import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

const Orders = ({navigation}) => {
  const [orders, setOrders] = useState();

  const fecthData = async () => {
    try {
        const response = await fetch('https://putdownego.pythonanywhere.com/api/orders/');
        const json = await response.json();
        setOrders(json)
    } catch (error) {
        console.error('Error:', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
        fecthData();
    }, [])
  );  
  const getTransactionID = async (itemId) => {
    AsyncStorage.setItem('orderId', itemId.toString());
    navigation.navigate("Order Detail")
  }
  const renderOrder = ({ item }) => {
    
    return (
      <TouchableOpacity onPress={() => getTransactionID(item.id)} style={{margin: 10,  borderWidth: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{ fontWeight: "900", color: 'black'}}>{item.id} - {item.status} - {item.user.username}</Text>
          </View>
          <View>
            {item.items.map(item => (
              <View key={item.id}>
                <Text style={{fontWeight: '800'}} numberOfLines={1} ellipsizeMode="tail">- {item.quantity}x {item.item.title}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{marginRight: 10}}>
          <Text style={{color: '#ef506b', fontWeight: 'bold'}}>
            {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(item.total)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const addTransaction = () => {
    console.log(orders[0].services)
    // navigation.navigate("Add Transaction")
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={style.title}>
            <View style={{flexDirection: 'row', margin: 10}}>
              <Text style={{fontSize: 25, color: 'white'}}> Orders</Text>
            </View>
        </View>
        <FlatList
              data={orders}
              renderItem={renderOrder}
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
export default Orders