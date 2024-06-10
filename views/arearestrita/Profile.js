import React, {useState,useEffect} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {css} from '../../assets/css/css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Profile({navigation})
{
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        async function loadCliente() {
            const clienteData = await AsyncStorage.getItem('clienteData');
            if (clienteData) {
                setCliente(JSON.parse(clienteData));
            }
        }

        loadCliente();
    }, []);

    const handleChangePassword = () => {
        // Navegar para a tela de alteração de senha
        navigation.navigate('ChangePassword');
    };

    return (
        <View style={[css.container]}>
            {cliente ? (
                <View>
                    <Text style={css.text_pattern}>Nome: {cliente.nome}</Text>
                    <Text style={css.text_pattern}> Email: {cliente.email}</Text>
                    <Text style={css.text_pattern}>Telefone: {cliente.telefone}</Text>
                    <Text style={css.text_pattern}>User: {cliente.usuario}</Text>

                    <TouchableOpacity style={css.button} title="Alterar Senha" onPress={handleChangePassword} >
                        <Text style={css.buttonText}>Alterar Senha</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text>Carregando...</Text>
            )}
        </View>
    );
}