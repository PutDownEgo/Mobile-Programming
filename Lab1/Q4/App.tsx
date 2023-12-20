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
import { ScrollView, Button} from 'react-native';

export default () => {
  return (
    <ScrollView style={style.container}>
      <Square/>
    </ScrollView>
  )
}