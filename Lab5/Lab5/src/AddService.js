import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 


const AddService = ({navigation}) => {
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState();
    const [token, setToken] = useState("");

    useEffect(() => {
      const getData = async () => {
        try {
          const fetchedToken = await AsyncStorage.getItem('token');
          setToken(fetchedToken);
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }, []);
    const headers = {
      'Authorization': `Bearer ${token}`
    }    
    const addService = async () => {
      const postData = { name: `${serviceName}`, price: `${price}` };
      axios
        .post('https://kami-backend-5rs0.onrender.com/services', postData, {headers: headers})
        .then(response => {
          Alert.alert("Thêm dịch vụ thành công!")
        })
        .catch(error => {
          Alert.alert("Đã có lỗi xảy ra!")
        });
    };
    return (
        <View style={{margin: 10}}>
        <Text style={{marginBottom: 5}}>Service name *</Text>
        <TextInput style={{backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth:1, marginBottom: 20}} onChangeText={setServiceName}></TextInput>
        <Text style={{marginBottom: 5}}>Price *</Text>
        <TextInput style={{backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth:1, marginBottom: 20}} onChangeText={setPrice}></TextInput>
        <TouchableOpacity style={{width: "100%", 
                                    height:40,
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    borderRadius: 50,
                                    backgroundColor: '#ef506b'}}
                            onPress={addService}>
            <Text style={{color: 'white', fontSize: 20}}>Add</Text>
        </TouchableOpacity>
        </View>
    )
}

export default AddService