import React, {useState, useEffect} from 'react';
import {Button, Text, KeyboardAvoidingView, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {css} from '../assets/css/css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Login({navigation}) {
    const [display, setDisplay] = useState('none');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    useEffect(() => {
        verifyLogin();
    }, []);

    useEffect(() => {
        if (login === true) {
            biometric();
        }
    }, [login]);

    async function verifyLogin() {
        let response = await AsyncStorage.getItem('clienteData');
        let json = await JSON.parse(response);
        if (json !== null) {
            setUsuario(json.usuario);
            setPassword(json.password);
            setLogin(true);
        }
    }

    async function biometric() {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        if (compatible) {
            let biometricRecords = await LocalAuthentication.isEnrolledAsync();
            if (!biometricRecords) {
                alert('Biometria não cadastrada');
            } else {
                let result = await LocalAuthentication.authenticateAsync();
                if (result.success) {
                    sendForm();
                } else {
                    setUsuario(null);
                    setPassword(null);
                }
            }
        }
    }

    // Envio do forms de login
    async function sendForm() {
        let response = await fetch("http://192.168.165.140:3000/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: usuario,
                password: password
            })
        });
        let json = await response.json();
        if (json === 'error') {
            setDisplay('flex');
            setTimeout(() => {
                setDisplay('none');
            }, 5000);
            await AsyncStorage.clear();
        } else {
            await AsyncStorage.setItem('clienteData', JSON.stringify(json));
            navigation.navigate('AreaRestrita');
        }
    }

    return (
        <KeyboardAvoidingView style={[css.container]}>
            <View>
                <Text style={css.text_pattern}>BEM VINDO</Text>
            </View>

            <View>
                <Text style={css.login_msg(display)}>Usuário ou senha inválidos!</Text>
            </View>

            <View style={css.formContainer}>
                <TextInput
                    style={css.input}
                    placeholder='Usuário:'
                    onChangeText={text => setUsuario(text)}
                />
                <TextInput
                    style={css.input}
                    placeholder='Senha:'
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
                <View>
                    <TouchableOpacity style={css.button} onPress={sendForm}>
                        <Text style={css.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
