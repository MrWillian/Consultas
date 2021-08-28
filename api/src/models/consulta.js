const Sequelize = require('sequelize');
const database = require('../database');
 
const Consulta = database.define('consulta', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    medico_crm: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    paciente_cpf: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    horario: {
        type: Sequelize.STRING
    },
    data: {
        type: Sequelize.STRING
    }
});

module.exports = Consulta;
