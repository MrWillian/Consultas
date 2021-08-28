$(function() {
    $('#pacienteDataList').focus();

    var pacientes = [];
    var medicos = [];

    $.ajax({
        url: 'http://localhost:8080/api/paciente',
        type: 'GET',
        success: function(resultado) {
            pacientes = Object.keys(resultado).map(i => JSON.parse(JSON.stringify(resultado[Number(i)])));

            $.each(pacientes, function (i, paciente) {
                $('#pacienteOptions').append($('<option>', { 
                    text: paciente.nome,
                    value: paciente.cpf,
                }));
            });
        }
    });

    $.ajax({
        url: 'http://localhost:8080/api/medico',
        type: 'GET',
        success: function(resultado) {
            medicos = Object.keys(resultado).map(i => JSON.parse(JSON.stringify(resultado[Number(i)])));

            $.each(medicos, function (i, medico) {
                $('#medicoOptions').append($('<option>', { 
                    text: medico.nome,
                    value: medico.crm,
                }));
            });
        }
    });

    $('#consultForm').submit(function(e) {
        e.preventDefault();
        var unindexed_values = $(this).serializeArray();
        var indexed_values = {};

        $.map(unindexed_values, function(n, i) {
            indexed_values[n['name']] = n['value'];
        });

        var consulta = {
            "paciente_cpf": indexed_values['pacienteDataList'],
            "medico_crm": indexed_values['medicoDataList'],
            "data": indexed_values['dataInput'],
            "horario": indexed_values['timeInput'],
        }

        $.ajax({
            url: 'http://localhost:8080/api/consulta',
            type: 'POST',
            data: consulta,
            success: function(result) {
                window.location.href = 'http://localhost/Consultas/frontend/index.html';
            }
        });
    });
});