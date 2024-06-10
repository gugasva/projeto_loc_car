'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Locacao.init({
    data_inicio: DataTypes.DATE,
    data_fim: DataTypes.DATE,
    valor_total: DataTypes.FLOAT,
    status: DataTypes.STRING,
    metodo_pagamento: DataTypes.STRING,
    fk_idCliente: DataTypes.NUMBER,
    fk_idVeiculo: DataTypes.NUMBER

  }, {
    sequelize,
    modelName: 'Locacao',
  });
  return Locacao;
};