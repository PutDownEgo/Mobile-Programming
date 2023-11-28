import { View, Text, TextInput, TouchableOpacity, Alert , StyleSheet} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/Feather';


const Setting = ({navigation}) => {
    return (
        <View>     
          <View style={style.title}>
              <View style={{flexDirection: 'row', margin: 10}}>
                <Text style={{fontSize: 20, color: 'white'}}>Setting</Text>
              </View>
          </View>              
         <TouchableOpacity style={{width: "100%", 
                                        height:40,
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        borderRadius: 50,
                                        backgroundColor: '#ef506b'}}
                                        onPress={()=> navigation.navigate("Login")}>
                <Text style={{color: 'white', fontSize: 20}}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
  title:{
      backgroundColor: '#ef506b',
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15
  },
})
export default Setting