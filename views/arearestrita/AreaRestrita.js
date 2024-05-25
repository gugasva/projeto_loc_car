import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile, Edicao, Carro, telaConfirmacao } from '../index';
import { css } from '../../assets/css/css';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CarroStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CarroList" component={Carro} options={{ headerShown: false }} />
            <Stack.Screen name="telaConfirmacao" component={telaConfirmacao} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function AreaRestrita() {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function getUsuario() {
            let response = await AsyncStorage.getItem('clienteData');
            let json = JSON.parse(response);
            setUsuario(json.nome);
        }
        getUsuario();
    }, []);

    return(
    
        <Tab.Navigator
            activeColor='#999'
            inactiveColor='#fff'
            barStyle={css.area_tab}    
        >
      <Tab.Screen
    name="Profile"
    component={Profile}
    options={{
        headerShown:false,
        title:"Profile",
        headerStyle:{backgroundColor:'#111'},
        headerTintColor:'#fff',
        headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}}}/>

      <Tab.Screen name="Edicao" component={Edicao} />

      <Tab.Screen name="Carro" component={CarroStack} />


    </Tab.Navigator>
    
    
    );
}




