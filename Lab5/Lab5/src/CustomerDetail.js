import { View, Text, StyleSheet, Modal, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomerDetail = ({navigation}) => {
    const [customerID, setCustomerID] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [totalSpent, setTotalSpent] = useState('');
    const [time, setTime] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [token, setToken] = useState("");

    const getID = async ()=>{
      try {
        const id = await AsyncStorage.getItem('customerID');
        setCustomerID(id)

        const url = 'https://kami-backend-5rs0.onrender.com/Customers/' + `${id}`;
        const response = await axios.get(url);

        setName(response.data.name)
        setPhone(response.data.phone)
        setTotalSpent(response.data.totalSpent)
        setTransactions(response.data.transactions)
        const fetchedToken = await AsyncStorage.getItem('token');
        setToken(fetchedToken);
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
        AsyncStorage.setItem('customerID', customerID);
        navigation.navigate('Edit Customer')
      } else{
        Alert.alert(
          'Warning',
          'Are you sure you want to remove this client? This operation cannot be returned',
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
                const url = "https://kami-backend-5rs0.onrender.com/Customers/"+customerID;
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
                  <Text style={{ fontSize: 20, color: 'white' }}> Customer detail</Text>
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
          <View style={{margin: 10, backgroundColor: 'white', padding: 10, borderRadius: 10}}>
              <Text style={{color: 'red', marginBottom: 5 }}>General information</Text>
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                  <Text style={{ marginBottom: 5 }}>Name: {name}</Text>
                  <Text style={{ marginBottom: 5 }}>Phone: {phone}</Text>
                  <Text style={{ marginBottom: 5 }}>Total spent: {totalSpent} đ</Text>
                  <Text style={{ marginBottom: 5 }}>Time: {time}</Text>
                  <Text style={{ marginBottom: 5 }}>Last update: {lastUpdate}</Text>
              </View>
          </View>
          <ScrollView style={{ margin: 10, backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
            <Text style={{ color: 'red', marginBottom: 10, fontSize: 20 }}>Transaction history</Text>
            {transactions.map(transaction => (
              <View key={transaction._id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, marginBottom: 20, borderRadius: 10, padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginBottom: 5, fontWeight: 'bold'}}>{transaction.id} - {moment(transaction.createdAt).format('MM-DD-YYYY, h:mm:ss')}</Text>
                  {transaction.services.map((service, index) => (
                    <View key={index}>
                      <Text numberOfLines={1} ellipsizeMode="tail">- {service.name}</Text>
                    </View>
                  ))}
                </View>
                <Text style={{ marginLeft: 10, color: '#ef506b'}}>{transaction.price} đ</Text>
              </View>
            ))}
          </ScrollView>
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
export default CustomerDetail