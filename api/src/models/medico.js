const Sequelize = require('sequelize');
const database = require('../database');
 
const Medico = database.define('medico', {
    crm: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    especialidade: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    }
});

module.exports = Medico;
