import React, { useEffect, useState } from "react";
import { Alert, FlatList, View, Image, Button, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
    const [data, setData] = useState([]);
    const filePath = "https://dummyjson.com/products/";

    useEffect(() => {
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
            });
    }, []); 

    const renderItem = ({ item }) => (
        <View style={{marginBottom: 10, flexDirection: 'row', flex:1, backgroundColor: '#eeeee4'}}>
            <View style={{flex:1, alignItems: 'center'}}>
                <Image source={{ uri: item.thumbnail }} style={{width: 80, height: 80}}/>
            </View>
            <View style={{flex:2}}>
                <Text variant="labelLarge">Title: {item.title}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Price: {item.price}</Text>
                <Text style={{color: 'green'}}>Discount: {item.discountPercentage} off</Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Stock: {item.stock}</Text>
                <Text>Brand: {item.brand}</Text>
                <Text>Category: {item.category}</Text>
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                    <Button title="DETAIL"></Button>
                    <Button title="ADD"></Button>
                    <Button title="DELETE"></Button>
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView>
            <Text variant="displaySmall">Product list</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} 
            />
        </ScrollView>
    );
}
