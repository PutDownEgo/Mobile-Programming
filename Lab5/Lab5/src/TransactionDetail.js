import { View, Text, StyleSheet, Modal, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';

const TransactionDetail = ({navigation}) => {
    const [transactionID, setTransactionID] = useState('');
    const [code, setCode] = useState('');
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [creationTime, setCreationtime] = useState('');
    const [services, setServices] = useState([]);
    const [total, setTotal] = useState();
    const [discount, setDiscount] = useState();
    const [totalPayment, setTotalPayment] = useState();

    const getID = async ()=>{
      try {
        const id = await AsyncStorage.getItem('transactionID');
        setTransactionID(id)

        const url = 'https://kami-backend-5rs0.onrender.com/transactions/' + `${id}`;
        const response = await axios.get(url);

        setCode(response.data.id)
        setCustomer(response.data.customer.name)
        setPhone(response.data.customer.phone)
        setCreationtime(response.data.createdAt)
        setServices(response.data.services)
        setTotal(response.data.priceBeforePromotion)
        setDiscount(response.data.priceBeforePromotion-response.data.price)
        setTotalPayment(response.data.price)

      } catch (e) {
        console.error('Error:', error);
      }
  };
    useFocusEffect(
      React.useCallback(() => {
        getID();
      }, [])
    );

    const handleOptionSelect = value => {
      if(value === 'Edit'){
        AsyncStorage.setItem('editID', serviceID);
        navigation.navigate('Edit Service')
      } else{
        Alert.alert(
          'Warning',
          'Are you sure you want to remove this service? This operation cannot be returned',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                const headers = {
                  'Authorization': `Bearer ${token}`
                }    
                const url = "https://kami-backend-5rs0.onrender.com/services/"+serviceID;
                axios
                  .delete(url, {headers: headers})
                  .then(response => {
                    navigation.goBack();
                  })
                  .catch(error => {
                    Alert.alert("Đã có lỗi xảy ra!")
                  });
              },
            },
          ],
          { cancelable: false }
        );
      }
    };
    return (
      <View>
          <View style={style.title}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Icon name="arrow-left" size={20} color="white" onPress={() => { navigation.goBack() }} style={{marginTop: 5}}/>
                  <Text style={{ fontSize: 20, color: 'white' }}> Transaction detail</Text>
                </View>
                <MenuProvider>
                  <Menu>
                    <MenuTrigger style={{marginLeft: 150, marginTop: 10}}>
                      <Icon name="more-vertical" size={30} color="white" />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption onSelect={() => handleOptionSelect('Edit')} text="Edit" />
                      <MenuOption onSelect={() => handleOptionSelect('Delete')} text="Delete" />
                    </MenuOptions>
                  </Menu>
                </MenuProvider>
          </View>
          <View style={{margin: 10, backgroundColor: 'white', borderWidth: 1, padding: 10, borderRadius: 10}}>
              <Text style={{color: 'red', marginBottom: 5 }}>General information</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{ marginBottom: 5 }}>Transaction code</Text>
                  <Text style={{ marginBottom: 5 }}>Customer</Text>
                  <Text style={{ marginBottom: 5 }}>Creation time</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold'}}>{code}</Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{customer} {phone}</Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{creationTime}</Text>
                </View>
              </View>
          </View>
          <View style={{ margin: 10, backgroundColor: 'white', borderWidth: 1, padding: 10, borderRadius: 10 }}>
            <Text style={{ color: 'red', marginBottom: 5  }}>Service list</Text>
            {services.map(service => (
              <View key={service._id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginBottom: 5, width: '60%'}} numberOfLines={3} ellipsizeMode="tail">{service.name}</Text>
                <Text style={{ marginBottom: 5, fontWeight: 'bold'}}>x{service.quantity}</Text>
                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{service.price * service.quantity} đ</Text>
              </View>
            ))}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ marginBottom: 5 }}>Total</Text>
              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{total} đ</Text>
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
                  <Text style={{ marginBottom: 5, fontWeight: 'bold'}}>{total} đ</Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>-{discount} đ</Text>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'red', fontSize: 20  }}>{total- discount} đ</Text>
                </View>
              </View>
          </View>
      </View>
    )
}

const style = StyleSheet.create({
  title:{
      backgroundColor: '#ef506b',
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 55
  },

})
export default TransactionDetail