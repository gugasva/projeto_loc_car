import React, { useState } from 'react';
import { View, Text, Image, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; 
import { css } from '../../assets/css/css';

export default function TelaConfirmacao({ route }) {
    const { carro } = route.params;
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [showInicio, setShowInicio] = useState(false);
    const [showFim, setShowFim] = useState(false);
    const [valorTotal, setValorTotal] = useState(0);
    const [formaPagamento, setFormaPagamento] = useState(''); 

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

    return (
        <View style={css.container}>
            <Text style={css.titulo_confirma}>Confirmação de Locação</Text>
            <Image source={carro.imagem} style={css.imagem} />
            <Text style={css.modelo}>{carro.modelo}</Text>
            <Text style={css.ano}>Ano: {carro.ano}</Text>
            <Text style={css.preco}>Preço/Dia: R$ {carro.preco}</Text>
            
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
                <Text>Data de Início: {dataInicio.toLocaleDateString()}</Text>
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
                <Text>Data de Fim: {dataFim.toLocaleDateString()}</Text>
            </View>

            <View>
                <Text style={css.pickerLabel}>Selecione a Forma de Pagamento</Text>
                <Picker
                    selectedValue={formaPagamento}
                    style={css.picker}
                    onValueChange={(itemValue) => setFormaPagamento(itemValue)}
                >
                    <Picker.Item label="Selecione" value="null" />
                    <Picker.Item label="Débito" value="debito" />
                    <Picker.Item label="Crédito" value="credito" />
                    <Picker.Item label="Pix" value="pix" />
                    <Picker.Item label="Dinheiro" value="dinheiro" />
                </Picker>
            </View>

            <TouchableOpacity style={css.calcular} onPress={calcularValorTotal}>
              <Text>Calcular Valor Total</Text>
            </TouchableOpacity>
            {valorTotal > 0 && <Text style={css.valorTotal}>Valor Total: R$ {valorTotal.toFixed(2)}</Text>}
        </View>
    );
}
