import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TextInput, StyleSheet, Button, Alert  } from "react-native";

export default function AddProducts() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [rating, setRating] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState('');

    handleSumbit = () => {
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {'Conten-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                discountPercentage: discountPercentage,
                rating: rating,
                stock: stock,
                brand: brand,
                category: category,
                images: images,
            }),
        })
            .then((res)=> res.json())
            .then(console.log);
        if(title.length==0){
            Alert.alert("Title required")
        }
        else if(description.length==0) {
            Alert.alert("Description required")
        }
        else if(price.length==0) {
            Alert.alert("Price required")
        }
        else if(discountPercentage.length==0) {
            Alert.alert("Discount percentage required")
        }
        else if(rating.length==0) {
            Alert.alert("Rating required")
        }
        else if(stock.length==0) {
            Alert.alert("Stock required")
        }
        else {
            Alert.alert("Add successful")
        }
    }



    return (
        <ScrollView style={{flex:1, flexDirection: 'column'}}>
            <Text style={{color: 'blue'}}>Add a Product</Text>
            <View>
                <Text style={styles.text}>Title</Text>
                <TextInput placeholder="Enter title" style={{borderWidth: 1}} 
                            onChangeText={setTitle}
                            value={title}></TextInput>

                <Text style={styles.text}>Description</Text>
                <TextInput placeholder="Enter description" style={{borderWidth: 1}}
                            onChangeText={setDescription}
                            value={description}></TextInput>

                <Text style={styles.text}>Price</Text>
                <TextInput placeholder="Enter price" style={{borderWidth: 1}}
                            onChangeText={setPrice}
                            value={price}></TextInput>

                <Text style={styles.text}>Discount Percentage</Text>
                <TextInput placeholder="Enter discount percentage" style={{borderWidth: 1}}
                            onChangeText={setDiscountPercentage}
                            value={discountPercentage}></TextInput>

                <Text style={styles.text}>Rating</Text>
                <TextInput placeholder="Enter rating" style={{borderWidth: 1}}
                            onChangeText={setRating}
                            value={rating}></TextInput>

                <Text style={styles.text}>Stock</Text>
                <TextInput placeholder="Enter stock" style={{borderWidth: 1}}
                            onChangeText={setStock}
                            value={stock}></TextInput>

                <Text style={styles.text}>Brand</Text>
                <TextInput placeholder="Enter brand" style={{borderWidth: 1}}
                            onChangeText={setBrand}
                            value={brand}></TextInput>

                <Text style={styles.text}>Category</Text>
                <TextInput placeholder="Enter category" style={{borderWidth: 1}}
                            onChangeText={setCategory}
                            value={category}></TextInput>

                <Text style={styles.text}>Images</Text>
                <TextInput placeholder="Enter images URL(s)" style={{borderWidth: 1}}
                            onChangeText={setImages}
                            value={images}></TextInput>
            </View>
            <Button title="Submit" onPress={() => {handleSumbit()}}></Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: '800',
        fontSize: 14,
    },
  });