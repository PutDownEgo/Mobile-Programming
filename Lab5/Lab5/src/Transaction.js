import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

const Transaction = ({navigation}) => {
  const [transactions, setTransactions] = useState();

  const fecthData = async () => {
    try {
        const response = await fetch('https://kami-backend-5rs0.onrender.com/transactions');
        const json = await response.json();
        setTransactions(json)
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
    AsyncStorage.setItem('transactionID', itemId);
    navigation.navigate("Transaction Detail")
}
  const renderTransaction = ({ item }) => {
    
    return (
      <TouchableOpacity onPress={() => getTransactionID(item._id)} style={{margin: 10,  borderWidth: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{ fontWeight: "900", color: 'black'}}>{item.id}</Text>
          </View>
          <View>
            {item.services.map(service => (
              <View key={service._id} style={{width: '85%'}}>
                <Text style={{fontWeight: '800'}} numberOfLines={1} ellipsizeMode="tail">- {service.name}</Text>
              </View>
            ))}
          </View>
          <Text>Customer: {item.customer.name}</Text>          
        </View>
        <View style={{marginRight: 10}}>
          <Text style={{color: '#ef506b', fontWeight: 'bold'}}>{item.price} đ</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const addTransaction = () => {
    console.log(transactions[0].services)
    // navigation.navigate("Add Transaction")
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={style.title}>
            <View style={{flexDirection: 'row', margin: 10}}>
              <Text style={{fontSize: 25, color: 'white'}}> Transaction</Text>
            </View>
        </View>
        <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={item => item._id.toString()}
          />
        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ef506b',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}
            onPress={addTransaction}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

const style = StyleSheet.create({
  title:{
      backgroundColor: '#ef506b',
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
  },
})
export default Transaction