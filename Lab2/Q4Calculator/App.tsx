import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import styles from './style'
export default App = () =>{
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('0');

  const handleNumberInput = (num) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };


  const handleOperatorInput = (operator) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    if(operator==='+'){
      setDisplayValue((num1+num2).toString())
    } else if(operator === '-'){
      setDisplayValue((num1-num2).toString())
    } else if(operator === '*'){
      setDisplayValue((num1*num2).toString())
    } else if(operator === '/'){
      setDisplayValue((num1/num2).toString())
    }

    setOperator(null)
    setFirstValue('')
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  }

  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.result}>{displayValue}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => handleNumberInput('7')}>
          <Text style={styles.number}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberInput('8')}>
          <Text style={styles.number}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberInput('9')}>
          <Text style={styles.number}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOperatorInput('/')}>
          <Text style={styles.operations}>&divide;</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => handleNumberInput('4')}>
          <Text style={styles.number}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberInput('5')}>
          <Text style={styles.number}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberInput('6')}>
          <Text style={styles.number}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOperatorInput('*')}>
          <Text style={styles.operations}>x</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => handleNumberInput('1')}>
          <Text style={styles.number}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberInput('2')}>
          <Text style={styles.number}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberInput('3')}>
          <Text style={styles.number}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOperatorInput('-')}>
          <Text style={styles.operations}>-</Text>
        </TouchableOpacity>
      </View>                 
      <View style={{flexDirection: 'row', marginTop:10}}>
          <TouchableOpacity onPress={() => handleNumberInput('0')} style={{flex:2, marginLeft: 20, marginRight: 10}}>
           <Text style={[{backgroundColor: "#fff"}, styles.lastRow]}>0</Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOperatorInput('+')} style={{flex:1, marginRight: 10}}>
            <Text style={[{backgroundColor: "#f0f0f0"}, styles.lastRow]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEqual} style={{flex:1, marginRight: 25}}>
            <Text style={[{backgroundColor: "#f0f0f0"}, styles.lastRow]}>=</Text>
          </TouchableOpacity>
      </View>       
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleClear} style={{flex:1}}>
            <Text style={styles.clear}>C</Text>
          </TouchableOpacity>
      </View>            
    </View>
  )
}
