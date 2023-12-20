import { View, Text, StyleSheet, Modal, Alert, Button} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';
import Moment from 'moment';

const OrderDetail = ({navigation}) => {
    const [orderID, setOrderID] = useState('');
    const [code, setCode] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [orderAt, setOrderAt] = useState('')
    const [total, setTotal] = useState('')
    const [address, setAddress] = useState('')
    const [discount, setDiscount] = useState(0)
    const [items, setItems] = useState([])
    const getID = async ()=>{
      try {
        const id = await AsyncStorage.getItem('orderId');
        setOrderID(id)
        const url = 'https://putdownego.pythonanywhere.com/api/orders/' + id +'/';
        const response = await axios.get(url);
        setCode(response.data.id)
        setUsername(response.data.user.username)
        setEmail(response.data.user.email)
        setOrderAt(response.data.order_placed_at)
        setTotal(response.data.total)
        setItems(response.data.items)
        setAddress(response.data.address)
      } catch (error) {
        console.error('Error:', error);
      }
  };
    useFocusEffect(
      React.useCallback(() => {
        getID();
        let totalDiscount = 0;

        items.forEach(item => {
          if (item.item.discount > 0) {
            const discountAmount = (item.item.price * item.quantity * item.item.discount) / 100;
            totalDiscount += discountAmount;
          }
        });
      
        setDiscount(totalDiscount);
      }, [items])
    );
    return (
      <View>
          <View style={style.title}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Icon name="arrow-left" size={20} color="white" onPress={() => { navigation.goBack() }} style={{marginTop: 5}}/>
                  <Text style={{ fontSize: 20, color: 'white' }}> Order detail</Text>
                </View>
          </View>
          <View style={{margin: 10, backgroundColor: 'white', borderWidth: 1, padding: 10, borderRadius: 10}}>
              <Text style={{color: 'red', marginBottom: 5 }}>General information</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{ marginBottom: 5 }}>Order code</Text>
                  <Text style={{ marginBottom: 5 }}>Customer</Text>
                  <Text style={{ marginBottom: 5 }}>Email</Text>
                  <Text style={{ marginBottom: 5 }}>Ordered at</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold'}}>{code}</Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{username}</Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{email}</Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{Moment(orderAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </View>
              </View>
              <Text style={{ marginBottom: 5 }}>Shipping address</Text>
              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{address}</Text>
          </View>
          <View style={{ margin: 10, backgroundColor: 'white', borderWidth: 1, padding: 10, borderRadius: 10 }}>
            <Text style={{ color: 'red', marginBottom: 5  }}>Item list</Text>
            {items.map(item => (
              <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginBottom: 5, width: '60%'}} numberOfLines={3} ellipsizeMode="tail">{item.item.title}</Text>
                <Text style={{ marginBottom: 5, fontWeight: 'bold'}}>x{item.quantity}</Text>
                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(item.item.price * item.quantity)}
                  </Text>
              </View>
            ))}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ marginBottom: 5 }}>Total</Text>
              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(total+discount)}
              </Text>
            </View>
          </View>
          <View style={{margin: 10, backgroundColor: 'white', borderWidth: 1, padding: 10, borderRadius: 10}}>
              <Text style={{color: 'red', marginBottom: 5 }}>Cost</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                  <Text style={{ marginBottom: 5 }}>Amount of money</Text>
                  <Text style={{ marginBottom: 5 }}>Discount</Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 20 }}>Total payment</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold'}}>
                      {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(total+discount)}
                  </Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
                      -{new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(discount)}
                  </Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'red', fontSize: 20  }}>
                      {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(total)}
                  </Text>
                </View>
              </View>
          </View>
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