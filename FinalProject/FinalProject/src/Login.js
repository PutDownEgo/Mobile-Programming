import {  StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import axios from 'axios'; 
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

const Login = ({ navigation }) => {

    const [username, setUsername] = useState('admin')
    const [password, setPassword] = useState('admin')

    const login = async () => {
    const authHeader = `Basic ${base64.encode(`${username}:${password}`)}`;
    try {
        const response = await axios.get('https://putdownego.pythonanywhere.com/auth/', {
        headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
        },
        });
        AsyncStorage.setItem('username', username);
        AsyncStorage.setItem('password', password);
        navigation.navigate('Main')
    } catch (error) {
        Alert.alert("Tài khoản hoặc mật khẩu không chính xác!")
    }
    };

    return(
        <View style={style.background}>
            <Text style={style.title}>Feane</Text>
            <TextInput placeholder="Username" style={style.input} value={username} onChangeText={setUsername}/>
            <TextInput textContentType="newPassword"
                 secureTextEntry
                 placeholder="Password" style={style.input} value={password} onChangeText={setPassword}/>
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
        backgroundColor: "green",
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color: "#0c0c0c",
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