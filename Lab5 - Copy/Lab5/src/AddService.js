import {Button, View, Text, TextInput, TouchableOpacity, Alert , StyleSheet} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
          console.log(error)
        });
    };
    const selectImage = async () => {
      const options = {
        title: 'Select Image',
        mediaType: 'photo', // Chỉ chọn ảnh, bạn cũng có thể thay đổi thành 'video' nếu cần
      };
    
      try {
        const result = await launchImageLibrary(options);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log('Image URI: ', response.uri);
          // Xử lý ảnh được chọn tại đây
        }
      } catch (error) {
        console.log('Error: ', error);
      }
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
                                onPress={selectImage}>
                <Text style={{color: 'white', fontSize: 20}}>Add</Text>
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
export default AddService