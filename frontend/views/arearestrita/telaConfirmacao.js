import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Platform, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { css } from '../../assets/css/css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mail from 'react-native-mail';


const renderImage = (id) => {
    switch (id) {
        case 1:
            return require('../../assets/veiculos/YARIS.png');
        case 2:
            return require('../../assets/veiculos/ONIX.png');
        case 3:
            return require('../../assets/veiculos/GOL.png');
        case 4:
            return require('../../assets/veiculos/ARGO.png');
        case 5:
            return require('../../assets/veiculos/LANCER.png');
        case 6:
            return require('../../assets/veiculos/ECOSPORT.png');
        case 7:
            return require('../../assets/veiculos/CIVIC.png');
        default:
            return null;
    }
};

export default function TelaConfirmacao({ route }) {
    const { carro } = route.params;
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [showInicio, setShowInicio] = useState(false);
    const [showFim, setShowFim] = useState(false);
    const [valorTotal, setValorTotal] = useState(0);
    const [formaPagamento, setFormaPagamento] = useState('');
    const [idCliente, setIdCliente] = useState(null);

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
    
    const onChangeInicio = (event, selectedDate) => {
        const currentDate = selectedDate || dataInicio;
        setShowInicio(Platform.OS === 'ios');
        setDataInicio(currentDate);
    };

    const onChangeFim = (event, selectedDate) => {
        const currentDate = selectedDate || dataFim;
        setShowFim(Platform.OS === 'ios');
        setDataFim(currentDate);
    };

    const calcularValorTotal = () => {
        const dias = (dataFim - dataInicio) / (1000 * 60 * 60 * 24);
        const valor = dias * carro.preco;
        setValorTotal(valor);
    };

    async function sendForm() {
        console.log('ID Cliente:', idCliente)
    
        if (!idCliente) {
            Alert.alert('Erro', 'Não foi possível identificar o cliente.');
            return;
        } else {
            let response = await fetch("http://192.168.165.140:3000/confirma", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data_inicio: dataInicio,
                    data_fim: dataFim,
                    valor_total: valorTotal,
                    status: 'pendente',
                    metodo_pagamento: formaPagamento,
                    fk_idCliente: idCliente,
                    fk_idVeiculo: carro.id
                })
            });
            if (response.ok) {
                Alert.alert('Reserva confirmada!!!');
                sendConfirmationEmail(idCliente); // Chamada da função para enviar e-mail de confirmação
            } else {
                Alert.alert('Ocorreu um erro');
            }
        }
    }
    
  

    return (
        <View style={css.container}>
            <Text style={css.text_pattern}>Confirmação de Locação</Text>
            <Image source={renderImage(carro.id)} style={css.imagem} />
            <Text style={css.modelo}>{carro.modelo}</Text>
            <Text style={css.ano}>Ano: {carro.ano}</Text>
            <Text style={css.text_pattern}>Preço/Dia: R$ {carro.preco}</Text>

            <View style={css.datePickerContainer}>
                <Button onPress={() => setShowInicio(true)} title="Selecionar Data de Início" />
                {showInicio && (
                    <DateTimePicker
                        value={dataInicio}
                        mode="date"
                        display="default"
                        onChange={onChangeInicio}
                    />
                )}
                <Text style={css.text_pattern}>Data de Início: {dataInicio.toLocaleDateString()}</Text>
            </View>

            <View style={css.datePickerContainer}>
                <Button onPress={() => setShowFim(true)} title="Selecionar Data de Fim" />
                {showFim && (
                    <DateTimePicker
                        value={dataFim}
                        mode="date"
                        display="default"
                        onChange={onChangeFim}
                    />
                )}
                <Text style={css.text_pattern}>Data de Fim: {dataFim.toLocaleDateString()}</Text>
            </View>

            <View>
                <Text style={css.text_pattern}>Selecione a Forma de Pagamento</Text>
                <Picker
                    selectedValue={formaPagamento}
                    style={css.login_input}
                    onValueChange={(itemValue) => setFormaPagamento(itemValue)}
                >
                    <Picker.Item label="Selecione" value="" />
                    <Picker.Item label="Débito" value="Debito" />
                    <Picker.Item label="Crédito" value="Credito" />
                    <Picker.Item label="Pix" value="Pix" />
                    <Picker.Item label="Dinheiro" value="Dinheiro" />
                </Picker>
            </View>

            <TouchableOpacity style={css.button} onPress={calcularValorTotal}>
                <Text style={css.buttonText}>Calcular Valor Total</Text>
            </TouchableOpacity>
            {valorTotal > 0 && <Text style={css.valorTotal}>Valor Total: R$ {valorTotal.toFixed(2)}</Text>}

            <TouchableOpacity style={css.button} onPress={sendForm}>
                <Text style={css.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    );
}
