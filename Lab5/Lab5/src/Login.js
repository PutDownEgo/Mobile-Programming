import {  StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import axios from 'axios'; 
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const postData = {phone: `${phone}`, password: `${password}`, };

    const login = async () => {
            axios.post('https://kami-backend-5rs0.onrender.com/auth', postData)
            .then(response => {
                const name = response.data.name;
                const token = response.data.token;

                AsyncStorage.setItem('name', name);
                AsyncStorage.setItem('token', token);

                navigation.navigate("Home")
            })
            .catch(error => {
                Alert.alert("Tài khoản hoặc mật khẩu không chính xác!")
            });
    }

    return(
        <View style={style.background}>
            <Text style={style.title}>Login</Text>
            <TextInput placeholder="Phone" style={style.input} value={phone} onChangeText={setPhone}/>
            <TextInput placeholder="Password" style={style.input} value={password} onChangeText={setPassword}/>
            <TouchableOpacity style={style.button} onPress={login}>
                <Text style={style.text}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    input: {
        width: "80%",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
    },
    button:{
        width: "80%",
        backgroundColor: "#ef506b",
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color: "#ef506b",
        fontSize: 50,
        fontWeight: "bold",
        marginBottom: 20
    },
    background:{
        backgroundColor: "#f3f3f3",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
export default Login;