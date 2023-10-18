/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import data from './Data';
import Square from './Square';
import style from './style';
import { ScrollView } from 'react-native';

export default () => {
  return (
    <ScrollView style={style.container}>
      {data.map((item, index) => (
        <Square key={item} text={`Square ${index+1}`}/>
      ))}
    </ScrollView>
  )
}