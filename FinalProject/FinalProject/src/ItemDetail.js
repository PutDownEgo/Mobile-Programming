import { View, Text, StyleSheet, Modal, Alert, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';
import base64 from 'react-native-base64';

const ItemDetail = ({navigation}) => {
    const [itemID, setItemID] = useState('');
    const [item, setItem] = useState();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDiscription] = useState('');
    const [image, setImage] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [discount, setDiscount] = useState('');

    const getID = async ()=>{
      try {
        const id = await AsyncStorage.getItem('itemID');
        setItemID(id)
        const url = 'https://putdownego.pythonanywhere.com/api/items/' + `${id}`+ '/';
        const response = await axios.get(url);
        setCategory(response.data.category)
        setDiscription(response.data.description)
        setDiscount(response.data.discount)
        setImage(response.data.image)
        setPrice(response.data.price)
        setSlug(response.data.slug)
        setTitle(response.data.title)
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
        AsyncStorage.setItem('editID', itemID);
        navigation.navigate('Edit Item')
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
              onPress: async () => {
                const username = await AsyncStorage.getItem('username');
                const password = await AsyncStorage.getItem('password');
                console.log(username)
                console.log(password)
                const authHeader = `Basic ${base64.encode(`${username}:${password}`)}`;
                console.log(authHeader)
                const url = `https://putdownego.pythonanywhere.com/api/items/delete/${itemID}/`;
                console.log(url)
                axios.delete(url,{
                  headers: {
                      Authorization: authHeader,
                      'Content-Type': 'application/json',
                  },
                })
                .then(response => {
                  navigation.navigate("Main")
                })
                .catch(error => {
                  console.error('Error:', error);
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
                    <Icon name="arrow-left" size={30} color="white" onPress={() => { navigation.goBack() }} style={{marginTop: 5}}/>
                  <Text style={{ fontSize: 30, color: 'white' }}> Item</Text>
                </View>
                <MenuProvider style={{marginLeft: 230, marginTop: 15}}>
                  <Menu>
                    <MenuTrigger>
                      <Icon name="more-vertical" size={30} color="white" />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption onSelect={() => handleOptionSelect('Edit')} text="Edit" />
                      <MenuOption onSelect={() => handleOptionSelect('Delete')} text="Delete" />
                    </MenuOptions>
                  </Menu>
                </MenuProvider>
          </View>
          <View style={{margin: 10}}>
            <View style={{alignItems: 'center'}}>
              <Image source={{ uri: "https://putdownego.pythonanywhere.com/"+`${image}` }} style={{width: 200, height: 200}} resizeMode="contain"/>
            </View>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Slug: </Text>
              <Text>{slug}</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Title: </Text>
              <Text>{title}</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Description: </Text>
              <Text>{description}</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Category: </Text>
              <Text>{category}</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Price: </Text>
              <Text>{price} đ</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Discount: </Text>
              <Text>{discount}%</Text>
            </Text>
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
  },

})
export default ItemDetail