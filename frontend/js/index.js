$(function() {    
    var consultas = [];

    $.ajax({
        url: 'http://localhost:8080/api/consulta',
        type: 'GET',
        success: function(resultado) {
            consultas = Object.keys(resultado).map(i => JSON.parse(JSON.stringify(resultado[Number(i)])));

            $.each(consultas, function (i, consulta) {
                $("#consultas").find('tbody')
                    .append($('<tr>')
                        .append('<th scope="row">' + (i + 1) + '</th>')
                        .append($('<td>' + consulta.medico_crm + '</td>'))
                        .append($('<td>' + consulta.paciente_cpf + '</td>'))
                        .append($('<td>' + consulta.data + '</td>'))
                        .append($('<td>' + consulta.horario + '</td>'))
                        .append(
                            $('<td><a href="edit-consult.html?consult=' + consulta.id + '">Editar</a> ' + 
                                '| <a href="delete-consult.html?consult=' + consulta.id + '">Excluir</a></td>')
                        )
                    );
            });
        }
    });

    $('#new_consult').click(function() {
        window.location.href = 'http://localhost/Consultas/frontend/new-consult.html';
    });

    $('#list_pacients').click(function() {
        window.location.href = 'http://localhost/Consultas/frontend/pacients.html';
    });

    $('#list_medics').click(function() {
        window.location.href = 'http://localhost/Consultas/frontend/medics.html';
    });
});