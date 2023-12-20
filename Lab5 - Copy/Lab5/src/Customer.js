import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Customer = ({navigation}) => {
  const [customers, setCustomers] = useState();

  const fecthData = async () => {
    try {
        const response = await fetch('https://kami-backend-5rs0.onrender.com/customers');
        const json = await response.json();
        setCustomers(json)
    } catch (error) {
        console.error('Error:', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
        fecthData();
    }, [])
  );  

  const renderCustomer = ({ item }) => {
    return (
      <View style={{margin: 10, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderRadius: 10}}>
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text>Customer: </Text>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Phone: </Text>
            <Text style={{ fontWeight: "bold" }}>{ item.phone }</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
          <Text>Total money: </Text>
            <Text style={{ fontWeight: "bold", color: 'red'}}>{ item.totalSpent } đ</Text>
          </View>
        </View>
        <Icon name="chess-queen" size={30} color="#ef506b" style={{margin: 20}}/>
      </View>
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
          onPress={addCustomer}
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
export default Customer