const express = require('express');
var cors = require('cors')
const database = require('./database');
const Paciente = require('./models/paciente');
const Consulta = require('./models/consulta');
const Medico = require('./models/medico');

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.listen(8080, () => console.log("Servidor listening on port 8080..."));

app.get('/api/paciente', async (request, response) => {
    await database.sync();
    if (request.body.cpf) {
        return response.status(200).json(await Paciente.findOne({ where: {cpf: request.body.cpf} }));
    }
    return response.status(200).json(await Paciente.findAll());
});

app.post('/api/paciente', async (request, response) => {
    await database.sync();

    try {
        var pacienteCriado = await Paciente.create({
            cpf: request.body.cpf, 
            nome: request.body.nome,
            telefone: request.body.telefone,
            data_nascimento: request.body.data_nascimento
        });
    } catch (err) {
        console.log(err);
        return response.status(500).send("ERROR")
    }
    return response.status(201).json(pacienteCriado);
});

app.put('/api/paciente/:cpf', async (request, response) => {
    var pacienteCpf = request.params.cpf;
    if (pacienteCpf) {
        const paciente = await Paciente.findOne({ where: {cpf: pacienteCpf} });
        paciente.nome = request.body.nome;
        paciente.telefone = request.body.telefone;
        paciente.data_nascimento = request.body.data_nascimento;
        return response.status(200).json(await paciente.save());
    }
});

app.delete('/api/paciente', (request, response) => {
    Paciente.destroy({ where: { cpf: request.body.cpf }});
    return response.status(204).send("Deleted successfully...");
});

// CONSULTA

app.get('/api/consulta', async (request, response) => {
    await database.sync();
    if (request.body.id) {
        return response.status(200).json(await Consulta.findById(request.body.id));
    }
    return response.status(200).json(await Consulta.findAll());
});

app.post('/api/consulta', async (request, response) => {
    await database.sync();
    return response.status(201).json(await Consulta.create({
        medico_crm: request.body.medico_crm,
        paciente_cpf: request.body.paciente_cpf,
        horario: request.body.horario,
        data: request.body.data
    }));
});

app.put('/api/consulta/:id', async (request, response) => {
    if (request.params.id) {
        const consulta = await Consulta.findById(request.body.id);
        consulta.horario = request.body.horario;
        consulta.data = request.body.data;
        return response.status(200).json(await consulta.save());
    }
});

app.delete('/api/consulta', (request, response) => {
    Consulta.destroy({ where: { id: request.body.id }});
    return response.status(204).send("Deleted successfully...");
});

// MÉDICO

app.get('/api/medico', async (request, response) => {
    await database.sync();
    if (request.body.crm) {
        return response.status(200).json(await Medico.findOne({ where: {crm: request.body.crm} }));
    }
    return response.status(200).json(await Medico.findAll());
});

app.post('/api/medico', async (request, response) => {
    await database.sync();
    return response.status(201).json(await Medico.create({
        crm: request.body.crm,
        especialidade: request.body.especialidade,
        nome: request.body.nome,
        cpf: request.body.cpf
    }));
});

app.put('/api/medico/:crm', async (request, response) => {
    if (request.params.crm) {
        const medico = await Medico.findOne({ where: {crm: request.params.crm} });
        medico.especialidade = request.body.especialidade;
        medico.nome = request.body.nome;
        medico.cpf = request.body.cpf;
        return response.status(200).json(await medico.save());
    }
});

app.delete('/api/medico', (request, response) => {
    Medico.destroy({ where: { crm: request.body.crm }});
    return response.status(204).send("Deleted successfully...");
});
