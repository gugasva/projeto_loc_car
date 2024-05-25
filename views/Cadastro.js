import React, {useState,useEffect} from 'react';
import {Button, Text, KeyboardAvoidingView, View, Image, TextInput, Alert, TouchableOpacity} from 'react-native';
import {css} from '../assets/css/css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '../config/config';

export default function Cadastro()
{
    const [nome, setNome] = useState(null);
    const [cpf,setCpf] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefone, setTelefone] =useState(null);
    const [usuario, setUsuario] = useState(null);
    const [password, setPassword] = useState(null);
    const [response, setResponse]= useState(null);

    async function sendForm()
    {
        let response= await fetch('http://192.168.0.6:3000/create',{
            method: 'POST',
            headers:{
                Aceept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                cpf: cpf,
                email: email,
                telefone: telefone,
                usuario: usuario,
                password: password
            })
        });
        if (response.ok) {
            // Exibe o alerta de sucesso
            Alert.alert('Usuário criado com sucesso');
        } else {
            // Exibe o alerta de erro
            Alert.alert('Erro ao criar usuário', 'Ocorreu um erro ao tentar criar o usuário.');
        }
    }

    
    return(
        <KeyboardAvoidingView style={[css.container, css.darkbg]}>
            <View>
                    <Text style={css.text_pattern}>BEM VINDO</Text>
            </View>
            <View style={css.formContainer}>
                <TextInput style={css.login_input} placeholder='Nome Completo:' onChangeText={text=>setNome(text)} />
                <TextInput style={css.login_input} placeholder='CPF:' onChangeText={text=>setCpf(text)}/>
                <TextInput style={css.login_input} placeholder='Email:' onChangeText={text=>setEmail(text)}/>
                <TextInput style={css.login_input} placeholder='Telefone:' onChangeText={text=>setTelefone(text)}/>
                <TextInput style={css.login_input} placeholder='Usuário:' onChangeText={text=>setUsuario(text)}/>
                <TextInput style={css.login_input} placeholder='Senha:' onChangeText={text=>setPassword(text)} secureTextEntry={true} />
                <TouchableOpacity style={css.button} onPress={sendForm}>
                <Text style={css.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    );
}