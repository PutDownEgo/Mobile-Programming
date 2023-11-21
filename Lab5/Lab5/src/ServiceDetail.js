import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const ServiceDetail = () => {
    const [serviceID, setServiceID] = useState('');
    const [service, setService] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [creator, setCreator] = useState('');
    const [time, setTime] = useState('');
    const [update, setUpdate] = useState('');

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
      } catch (e) {
        console.error('Error:', error);
      }
  };

    useEffect(()=>{
        getID()
    }, [])

    return (
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
    )
}

export default ServiceDetail