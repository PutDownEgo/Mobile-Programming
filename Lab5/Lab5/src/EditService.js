import { View, Text, TextInput, TouchableOpacity, Alert , StyleSheet} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/Feather';


const EditService = ({navigation}) => {
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState();
    const [token, setToken] = useState("");
    const [serviceID, setServiceID] = useState('');

    useEffect(() => {
      const getData = async () => {
        try {
          const fetchedToken = await AsyncStorage.getItem('token');
          setToken(fetchedToken);
          const editID = await AsyncStorage.getItem('editID');
          setServiceID(editID)
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }, []);
    const headers = {
      'Authorization': `Bearer ${token}`
    }    
    const updateService = async () => {
      const url = "https://kami-backend-5rs0.onrender.com/services/"+serviceID;
      const postData = { name: `${serviceName}`, price: `${price}` };
      axios
        .put(url, postData, {headers: headers})
        .then(response => {
          Alert.alert("Chỉnh sửa dịch vụ thành công!")
        })
        .catch(error => {
          Alert.alert("Đã có lỗi xảy ra!")
          console.log(error)
        });
    };
    return (
        <View>
          <View style={style.title}>
              <View style={{flexDirection: 'row', margin: 10}}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginTop: 5}}><Icon name="arrow-left" size={30} color="white"/></TouchableOpacity>
                <Text style={{fontSize: 30, color: 'white'}}> Service</Text>
              </View>
          </View>          
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
                                onPress={updateService}>
                <Text style={{color: 'white', fontSize: 20}}>Update</Text>
            </TouchableOpacity>
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
  },

})
export default EditService