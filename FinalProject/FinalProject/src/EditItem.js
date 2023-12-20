import {Button, View, Text, TextInput, TouchableOpacity, Alert , StyleSheet, ScrollView} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/Feather';
import base64 from 'react-native-base64';
import {launchImageLibrary} from 'react-native-image-picker';


const EditItem = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [itemID, setItemID] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [discount, setDiscount] = useState('');
    const [image, setImage] = useState();

    useEffect(() => {
      const getData = async () => {
        try {
          const name = await AsyncStorage.getItem('username');
          setUsername(name)
          const password = await AsyncStorage.getItem('password');
          setPassword(password)
          const editID = await AsyncStorage.getItem('editID');
          setItemID(editID)
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }, []);
    const authHeader = `Basic ${base64.encode(`${username}:${password}`)}`;

    const updateItem = async () => {
      const url = "https://putdownego.pythonanywhere.com/api/update_item/"+itemID+"/";
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('title', title);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('slug', slug);
      formData.append('description', description);
      formData.append('discount', discount);
      axios
        .put(url, formData,{
          headers: {
              Authorization: authHeader,
              'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          Alert.alert("Chỉnh sửa món ăn thành công!")
        })
        .catch(error => {
          Alert.alert("Đã có lỗi xảy ra!")
          console.log(error)
        });
      console.log(url)
    };
      const options = {
        mediaType: 'photo',
        quality: 1,
    };
    const chooseImageFromLibrary = async () => {
        try {
            const result = await launchImageLibrary(options);
            if (!result.cancelled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    }
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={style.title}>
              <View style={{flexDirection: 'row', margin: 10}}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginTop: 5}}><Icon name="arrow-left" size={20} color="white"/></TouchableOpacity>
                <Text style={{fontSize: 20, color: 'white'}}> Update Item</Text>
              </View>
          </View>          
          <View style={{margin: 10}}>
            <Text style={{marginBottom: 5}}>Title *</Text>
            <TextInput style={{backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth:1, marginBottom: 20}} onChangeText={setTitle}></TextInput>
            <Text style={{marginBottom: 5}}>Price *</Text>
            <TextInput style={{backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth:1, marginBottom: 20}} onChangeText={setPrice}></TextInput>
            <Text style={{marginBottom: 5}}>Discount (%)</Text>
            <TextInput style={{backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth:1, marginBottom: 20}} onChangeText={setDiscount}></TextInput>
            <Text style={{marginBottom: 5}}>Category *</Text>
            <TextInput style={{backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth:1, marginBottom: 20}} onChangeText={setCategory}></TextInput>
            <Text style={{marginBottom: 5}}>Slug *</Text>
            <TextInput style={{backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth:1, marginBottom: 20}} onChangeText={setSlug}></TextInput>
            <Text style={{marginBottom: 5}}>Description *</Text>
            <TextInput style={{backgroundColor: '#f2f2f7', borderRadius: 10, borderWidth:1, marginBottom: 20}} onChangeText={setDescription}></TextInput>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
              <Text style={{marginBottom: 5, marginRight: 20}}>Image *</Text>
              <Button onPress={chooseImageFromLibrary} title='Choose Image'></Button>
            </View>
            <TouchableOpacity style={{width: "100%", 
                                        height:40,
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        borderRadius: 50,
                                        backgroundColor: '#ffc468'}}
                                onPress={updateItem}>
                <Text style={{color: 'white', fontSize: 20}}>Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
export default EditItem