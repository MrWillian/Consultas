const Sequelize = require('sequelize');
const database = require('../database');
 
const PacienteConsulta = database.define('paciente_consulta', {
    paciente_cpf: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
    },
    consulta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
    },
});

module.exports = PacienteConsulta;
