import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    number: {
        borderWidth: 1,
        borderColor: 'grey',
        width: 80,
        height: 80,
        fontSize: 40,
        borderRadius: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#fff',
        marginRight: 10,
        marginTop: 10,
    },
    operations: {
        borderWidth: 1,
        borderColor: 'grey',
        width: 80,
        height: 80,
        fontSize: 40,
        borderRadius: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#f0f0f0',
        marginRight: 10,
        marginTop: 10,
        color: '#eca013',
    },
    result:{
        width: 80,
        height: 80,
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        marginTop: 10,    
    },
    clear:{
        borderWidth: 1,
        borderColor: 'grey',
        fontSize: 40,
        borderRadius: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#f0f0f0',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10
    },
    lastRow:{
        borderRadius: 50,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 40
    }
})