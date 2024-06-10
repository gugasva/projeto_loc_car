import React, {useState,useEffect} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {css} from '../assets/css/css'

export default function Home(props)
{
    console.log(props)
    return(
        <View style={[css.container]}>
            <Text style={css.text_pattern}>BEM VINDO</Text>
            <TouchableOpacity style={css.button} onPress={() => props.navigation.navigate('Login')}>
        <Text style={css.buttonText}>Ir para Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={css.button} onPress={() => props.navigation.navigate('Cadastro')}>
        <Text style={css.buttonText}>Fazer cadastro</Text>
      </TouchableOpacity>
        </View>
    );
}