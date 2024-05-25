import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation
import { css } from '../../assets/css/css';
import { urlRoot } from '../../config/config';

export default function Carro() {
  const [carros, setCarros] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation(); // Obtenha o objeto de navegação

  useEffect(() => {
    async function fetchCarros() {
      try {
        const response = await fetch('http://192.168.0.6:3000/carro');
        if (response.ok) {
          const data = await response.json();
          setCarros(data);
        } else {
          console.error('Erro ao buscar carros:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar carros:', error.message);
      }
    }

    fetchCarros();
  }, []);

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

  const confirmaPress = (carro) => {
    navigation.navigate('telaConfirmacao', {carro: { ...carro, imagem: renderImage(carro.id)}});
  };

  const renderItem = ({ id, modelo, ano, preco, imagem }) => (
    <TouchableOpacity
      key={id}
      style={css.itemContainer}
      onPress={() =>
        confirmaPress({ id, modelo, ano, preco }
        )
      }
    >
      <Image source={renderImage(id)} style={css.imagem} />
      <View style={css.detalhesContainer}>
        <Text style={css.modelo}>{modelo}</Text>
        <Text style={css.ano}>Ano: {ano}</Text>
        <Text style={css.preco}>Preço/Dia: R$ {preco}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredCarros = carros.filter((carro) =>
    carro.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView style={css.containers}>
      <Text style={css.titulo}>Carros Disponíveis para Aluguel</Text>
      <TextInput
        style={css.input}
        placeholder="Pesquisar por nome do carro"
        onChangeText={(text) => setSearchTerm(text)}
      />
      {filteredCarros.map(renderItem)}
    </ScrollView>
  );
}
