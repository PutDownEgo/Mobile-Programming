import React, {useState} from 'react';
import {FlatList, TextInput, ScrollView, View,SafeAreaView,Button  } from "react-native";
import {Card, Text} from 'react-native-paper';

export default function Search(){
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    let filePath = 'https://dummyjson.com/products';

    const searchProduct = () =>{
        if(value!='')
            filePath = 'https://dummyjson.com/products/search?q=' + value;
        fetch(filePath)
            .then((response)=>{
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d)=>{
                setData(d.products);
            })
            .catch((error)=>{
                console.error('Error fetching data:', error);
            })
    }

    const renderItem = ({item}) => {
        return (
            <Card style={{marginTop: 20}}>
                <Text variant='displaySmall'>Product Detail</Text>
                <Card.Cover source={{ uri: item.thumbnail }} />
                <Card.Content>
                <Text variant="titleLarge">{item.title}</Text>
                <Text variant="bodyMedium">Description: {item.description}</Text>
                <Text variant="bodyMedium">Price: ${item.price}</Text>
                <Text variant="bodyMedium">Discount: {item.discount}%</Text>
                <Text variant="bodyMedium">Rating: {item.rating} stars</Text>
                <Text variant="bodyMedium">Stock: {item.stock} units</Text>
                <Text variant="bodyMedium">Brand: {item.brand}</Text>
                <Text variant="bodyMedium">Category: {item.category}</Text>
                </Card.Content>
            </Card>
        );
    }

    return(
        <ScrollView>
            <Text variant='headlineSmall'>Search Products</Text>
            <TextInput style={{borderWidth: 1, marginBottom: 10}} placeholder='Search' onChangeText={setValue} value={value}></TextInput>
            <Button onPress={() =>{searchProduct()}} title='Search'></Button>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} 
            />
        </ScrollView>
    );
}