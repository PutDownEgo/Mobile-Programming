import { View, Text, StyleSheet, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';
import base64 from 'react-native-base64';
import Moment from 'moment';


const OrderDetail = ({navigation}) => {
    const [customer, setCustomer] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phone, setPhone] = useState('')
    const [totalSpent, setTotalSpent] = useState('')
    const [totalOrders, setTotalOrders] = useState('')
    const [orders, setOrders] = useState([])
    const getID = async ()=>{
      try {
        const id = await AsyncStorage.getItem('customerID');
        const name = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        const authHeader = `Basic ${base64.encode(`${name}:${password}`)}`;
        const url = 'https://putdownego.pythonanywhere.com/api/customers/' + id;
        const response = await axios.get(url, {
          headers: {
              Authorization: authHeader,
              'Content-Type': 'application/json',
          },
          });
        setCustomer(response.data.user.first_name + " " + response.data.user.last_name)
        setDateOfBirth(response.data.user.user_profile.date_of_birth)
        setEmail(response.data.user.email)
        setPhone(response.data.user.user_profile.phone_number)
        setTotalOrders(response.data.order_summary.total_orders)
        const format = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(response.data.order_summary.total_spent);
        setTotalSpent(format);
        setOrders(response.data.orders)
      } catch (error) {
        console.error('Error:', error);
      }
  };
    useFocusEffect(
      React.useCallback(() => {
        getID();
      }, [])
    );
    return (
      <View>
          <View style={style.title}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Icon name="arrow-left" size={20} color="white" onPress={() => { navigation.goBack() }} style={{marginTop: 5}}/>
                  <Text style={{ fontSize: 20, color: 'white' }}> Customer detail</Text>
                </View>
          </View>
          <View style={{margin: 10, backgroundColor: 'white', borderWidth: 1, padding: 10, borderRadius: 10}}>
              <Text style={{color: 'red', marginBottom: 5 }}>General information</Text>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text style={{ marginBottom: 5 }}>Customer: {customer}</Text>
                  <Text style={{ marginBottom: 5 }}>Date of birth: {dateOfBirth}</Text>
                  <Text style={{ marginBottom: 5 }}>Email: {email}</Text>
                  <Text style={{ marginBottom: 5 }}>Phone number: {phone}</Text>
                  <Text style={{ marginBottom: 5 }}>Total Spent: {totalSpent}
                  </Text>
                  <Text style={{ marginBottom: 5 }}>Total Orders: {totalOrders} Orders</Text>
                </View>
              </View>
          </View>
          <ScrollView style={{ margin: 10, backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
            <Text style={{ color: 'red', marginBottom: 10}}>Order history</Text>
            {orders.map(order => (
              <View key={order.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, marginBottom: 20, borderRadius: 10, padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold'}}>{order.id} - {Moment(order.order_placed_at).format('MM-DD-YYYY, h:mm:ss')}</Text>
                  {order.items.map((item, index) => (
                    <View key={index}>
                      <Text numberOfLines={1} ellipsizeMode="tail">- {item.item.title}</Text>
                    </View>
                  ))}
                </View>
                {/* <Text style={{ marginLeft: 10, color: '#ef506b'}}>{transaction.price} đ</Text> */}
              </View>
            ))}
          </ScrollView>
      </View>
    )
}

const style = StyleSheet.create({
  title:{
      backgroundColor: 'green',
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 55
  },

})
export default OrderDetail