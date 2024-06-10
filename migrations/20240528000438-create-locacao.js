'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_inicio: {
        type: Sequelize.DATE
      },
      data_fim: {
        type: Sequelize.DATE
      },
      valor_total: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      metodo_pagamento: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Locacaos');
  }
};