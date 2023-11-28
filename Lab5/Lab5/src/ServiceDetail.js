import { View, Text, StyleSheet, Modal, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';

const ServiceDetail = ({navigation}) => {
    const [serviceID, setServiceID] = useState('');
    const [service, setService] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [creator, setCreator] = useState('');
    const [time, setTime] = useState('');
    const [update, setUpdate] = useState('');
    const [token, setToken] = useState("");

    const getID = async ()=>{
      try {
        const id = await AsyncStorage.getItem('serviceID');
        setServiceID(id)
        const url = 'https://kami-backend-5rs0.onrender.com/services/' + `${id}`;
        const response = await axios.get(url);
        setService(response.data)
        setName(response.data.name)
        setPrice(response.data.price)
        setTime(response.data.createdAt)
        setUpdate(response.data.updatedAt)
        setCreator(response.data.user.name)
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
                    <Icon name="arrow-left" size={30} color="white" onPress={() => { navigation.goBack() }} style={{marginTop: 5}}/>
                  <Text style={{ fontSize: 30, color: 'white' }}> Service</Text>
                </View>
                <MenuProvider style={{marginLeft: 200, marginTop: 15}}>
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
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Service name: </Text>
              <Text>{name}</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Price: </Text>
              <Text>{price}</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Creator: </Text>
              <Text>{creator}</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Time: </Text>
              <Text>{time}</Text>
            </Text>
            <Text style={{fontSize: 17}}>
              <Text style={{fontWeight: '800'}}>Final update: </Text>
              <Text>{update}</Text>
            </Text>
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
export default ServiceDetail