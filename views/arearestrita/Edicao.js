import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { css } from '../../assets/css/css';


export default function Edicao()
{
    const [loc, setLoc] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLoc, setFilteredLoc] = useState([]);

    useEffect(() => {
        async function fetchLoc() {
            try {
              const response = await fetch("http://192.168.165.140:3000/loclist");
              if (response.ok) {
                const data = await response.json();
                setLoc(data);
              } else {
                console.error('Erro ao buscar locações:', response.statusText);
              }
            } catch (error) {
              console.error('Erro ao buscar locações:', error.message);
            }
          }
      
          fetchLoc();
        }, []);

        const renderImage = (fk_idVeiculo) => {
            switch (fk_idVeiculo) {
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

          const renderNomeCarro = (fk_idVeiculo) => {
            switch (fk_idVeiculo) {
                case 1:
                    return "Toyota Yaris";
                case 2:
                    return "Chevrolet Onix";
                case 3:
                    return "Volkswagen Gol";
                case 4:
                    return "Fiat Argo";
                case 5:
                    return "Mitsubishi Lancer";
                case 6:
                    return "Ford EcoSport";
                case 7:
                    return "Honda Civic";
                default:
                    return "Carro Desconhecido";
            }
        };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={css.itemContainer} key={item.id}>
            <Image source={renderImage(item.fk_idVeiculo)} style={css.imagem}></Image>
            <View style={css.detalhesContainer}>
            <Text>Carro: {renderNomeCarro(item.fk_idVeiculo)}</Text>
            <Text>Valor Total: R$ {item.valor_total.toFixed(2)}</Text>
            <Text>Data de Início: {item.data_inicio}</Text>
            <Text>Data de Fim: {item.data_fim}</Text>
            <Text>Pagamento: {item.metodo_pagamento}</Text>
            <Text>RETIRAR O CARRO</Text>
            </View>
        </TouchableOpacity>
        
    );

    return (
        <ScrollView style={css.containers}>
            <Text style={css.titulo}>Reservas</Text>
            <FlatList
                data={loc}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </ScrollView>
    );
}
