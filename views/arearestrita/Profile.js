import React, {useState,useEffect} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {css} from '../../assets/css/css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Profile({navigation})
{
    async function logout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return(
        <View style={css.area_title}>

            <TouchableOpacity style={css.logout_button} onPress={()=>logout()}>
                <Icon name="sign-out" size={20} color="#999"/>
            </TouchableOpacity>

            <Text style={css.title}>Profile</Text>
           

        </View>
    );
}