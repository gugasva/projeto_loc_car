import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { css } from '../../assets/css/css';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePassword({ navigation }) {
    const [idCliente, setIdCliente] = useState('')
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        async function fetchClienteData() {
            let response = await AsyncStorage.getItem('clienteData');
            let json = JSON.parse(response);
            if (json !== null && json.id) {
                setIdCliente(json.id); // Certifique-se de que o objeto JSON contém o ID do cliente
            } else{
                Alert.alert('Erro: Não foi possível recuperar os dados do cliente.')
            }
        }
        fetchClienteData();
    }, []);

    async function handleChangePassword() {
     
            // Faça a solicitação para atualizar a senha
            let response = await fetch("http://192.168.165.140:3000/updatepw",{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idCliente,
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                })
            });
            let json =await response.json();
            if(response.ok){
                Alert.alert('Senha alterada com sucesso!!!')
            }else{
                Alert.alert('Não foi possível fazer a alteração!!!')
            }

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={css.input}
                placeholder="Senha Atual"
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
            />
            <TextInput
                style={css.input}
                placeholder="Nova Senha"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
                style={css.input}
                placeholder="Confirme a Nova Senha"
                secureTextEntry={true}
                value={confirmNewPassword}
                onChangeText={(text) => setConfirmNewPassword(text)}
            />
            <Button title="Salvar" onPress={handleChangePassword} />
        </View>
    );
}
