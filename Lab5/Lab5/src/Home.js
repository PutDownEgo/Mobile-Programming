import {  StyleSheet, Text, TouchableOpacity, View, Image, Alert, FlatList} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; 
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React from "react";


const Home = ({ navigation }) => {
    const [services, setServices] = useState();
    const [name, setName] = useState("");
    const [token, setToken] = useState("");

    const fecthData = async () => {
        try {
            const response = await fetch('https://kami-backend-5rs0.onrender.com/services');
            const json = await response.json();
            setServices(json)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getData = async () => {
        try {
          const name = await AsyncStorage.getItem('name');
          setName(name)
          const token = await AsyncStorage.getItem('token');
          setToken(token)
        } catch (e) {
          console.log(e)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getData();
            fecthData();
        }, [])
    );

    const getServiceID = async (itemId) => {
        AsyncStorage.setItem('serviceID', itemId);
        navigation.navigate("Service Detail")
    }

    const renderServiceItem = ({ item }) => {
        return (
            <TouchableOpacity style={style.item} onPress={() => getServiceID(item._id)}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 14,marginLeft: 10, fontWeight: 'bold', color: 'black'}}>{item.name}</Text>
                <Text style={{marginRight: 10, fontWeight: 'bold'}}>{item.price}đ</Text>
            </TouchableOpacity>
        );
      };
    
    return(
        <View style={{flex:1, flexDirection: "column"}}>
            <View style={style.title}>
                <Text style={style.name}>{name}</Text>
                <Text style={{marginRight:20}}>
                    <Icon name="user-circle-o" size={30} color="white"/>
                </Text>
            </View>
            <View style={{flex:10, alignItems: 'center', backgroundColor: 'white'}}>
                <Image source={require('../images/logo.jpg')} style={{width: 200}}/>
                <View style={style.service}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                        Danh sách dịch vụ
                    </Text>
                    <TouchableOpacity style={style.button} onPress={()=>{navigation.navigate("Add Service")}}>
                        <Text style={style.text}>+</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={services}
                    renderItem={renderServiceItem}
                    keyExtractor={item => item._id.toString()}
                />
            </View>
        </View>
    )
}


export default Home;

const style = StyleSheet.create({
    service:{
        width: "90%", 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        height: 40,
        marginBottom: 10
    },
    title:{
        backgroundColor: '#ef506b',
        flex:1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name:{
        marginLeft: 20,
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 20
    },
    button:{ 
        width: 40, 
        height:40,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 50,
        backgroundColor: '#ef506b'
    },
    text:{
        fontSize: 25,
        color: 'white'
    },
    item:{
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 350,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 10
    }
})