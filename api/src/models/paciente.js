const Sequelize = require('sequelize');
const database = require('../database');
 
const Paciente = database.define('paciente', {
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING
    },
    data_nascimento: {
        type: Sequelize.STRING
    }
});

module.exports = Paciente;