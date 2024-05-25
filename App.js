import React, {useState,useEffect} from 'react';
import {Text, View, Button, Alert } from 'react-native';
import {css} from './assets/css/css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home,Login,Consulta, Cadastro} from './views';
import AreaRestrita from './views/arearestrita/AreaRestrita';


export default function App() {
  
 
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
       name="Home"
       component={Home} 
       options={{
        title:"Bem Vindo",
        headerStyle:{backgroundColor:'#000'},
        headerTintColor:'#fff',
        headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
       }}
       />
      <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
      <Stack.Screen name="Cadastro" options={{headerShown:false}} component={Cadastro} />
      <Stack.Screen name="AreaRestrita" options={{headerShown:false}} component={AreaRestrita} />

    </Stack.Navigator>
  </NavigationContainer>
  );
}


