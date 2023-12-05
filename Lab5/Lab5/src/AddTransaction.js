import { View, Text, TextInput, TouchableOpacity, Alert , StyleSheet} from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';


const AddTransaction = ({navigation}) => {
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState();
    const [token, setToken] = useState("");
    const [customers, setCustomers] = useState([]);
    
    const fecthCustomer = async () => {
      try {
          const response = await fetch('https://kami-backend-5rs0.onrender.com/customers');
          const json = await response.json();
          setCustomers(json)
      } catch (error) {
          console.error('Error:', error);
      }
    }
    useEffect(() => {
      const getData = async () => {
        try {
          const fetchedToken = await AsyncStorage.getItem('token');
          setToken(fetchedToken);
        } catch (error) {
          console.error(error);
        }
      };
      getData();
      fecthCustomer();
    }, []);
    const headers = {
      'Authorization': `Bearer ${token}`
    }    
    const addService = async () => {
      const postData = { name: `${serviceName}`, price: `${price}` };
      axios
        .post('https://kami-backend-5rs0.onrender.com/services', postData, {headers: headers})
        .then(response => {
          Alert.alert("Thêm dịch vụ thành công!")
        })
        .catch(error => {
          Alert.alert("Đã có lỗi xảy ra!")
          console.log(error)
        });
    };
    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          </Text>
        );
      }
      return null;
    };
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const data = customers.map(customer => ({
      label: customer.name,
      value: customer._id,
    }));
    const addCustomer = async () => {
      // const postData = { name: `${customerName}`, phone: `${phone}` };
      // axios
      //   .post('https://kami-backend-5rs0.onrender.com/customers', postData, {headers: headers})
      //   .then(response => {
      //     Alert.alert("Thêm khách hàng thành công!")
      //   })
      //   .catch(error => {
      //     Alert.alert("Đã có lỗi xảy ra!")
      //     console.log(error)
      //   });
      console.log(data)
    };
    return (
      <View style={styles.container}>
        <Text>Customer *</Text>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select customer' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
                    <TouchableOpacity style={{width: "100%", 
                                        height:40,
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        borderRadius: 50,
                                        backgroundColor: '#ef506b'}}
                                onPress={addCustomer}>
                <Text style={{color: 'white', fontSize: 20}}>Add</Text>
            </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default AddTransaction