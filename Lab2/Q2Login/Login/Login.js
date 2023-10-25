import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./Style";

const LoginScreen = () => {
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.input} placeholder="Phone"></TextInput>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry></TextInput>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default LoginScreen;

