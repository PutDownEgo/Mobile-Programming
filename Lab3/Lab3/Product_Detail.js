import React, {useState, useEffect} from 'react';
import {ScrollView} from "react-native";
import {Card, Text, Button} from 'react-native-paper';

export default function Details(){
    const [data, setData] = useState([]);
    const filePath = 'https://dummyjson.com/products/3';

    useEffect(() => {
        fetch(filePath)
            .then((response) =>{
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((d)=>{
                setData(d)
            })
            .catch((error)=>{
                console.error("Error fetching data:", error);
            })
    });
    
    return(
        <ScrollView>
            <Card>
                <Text variant='displaySmall'>Product Detail</Text>
                <Card.Cover source={{ uri: data.thumbnail }} />
                <Card.Content>
                <Text variant="titleLarge">{data.title}</Text>
                <Text variant="bodyMedium">Description: {data.description}</Text>
                <Text variant="bodyMedium">Price: ${data.price}</Text>
                <Text variant="bodyMedium">Discount: {data.discount}%</Text>
                <Text variant="bodyMedium">Rating: {data.rating} stars</Text>
                <Text variant="bodyMedium">Stock: {data.stock} units</Text>
                <Text variant="bodyMedium">Brand: {data.brand}</Text>
                <Text variant="bodyMedium">Category: {data.category}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button>Cancel</Button> 
                    <Button>Delete</Button>
                </Card.Actions>
            </Card>            
        </ScrollView>
    );
}