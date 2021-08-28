$(function() {    
    var medicos = [];

    $.ajax({
        url: 'http://localhost:8080/api/medico',
        type: 'GET',
        success: function(resultado) {
            medicos = Object.keys(resultado).map(i => JSON.parse(JSON.stringify(resultado[Number(i)])));

            $.each(medicos, function (i, medico) {
                $("#medics").find('tbody')
                    .append($('<tr>')
                        .append('<th scope="row">' + (i + 1) + '</th>')
                        .append($('<td>' + medico.nome + '</td>'))
                        .append($('<td>' + medico.especialidade + '</td>'))
                        .append($('<td>' + medico.crm + '</td>'))
                        .append($('<td>' + medico.cpf + '</td>'))
                        .append(
                            $('<td><a href="edit-medic.html?medic=' + medico.crm + '">Editar</a> '
                                + '| <a href="delete-medic.html?medic=' + medico.crm + '">Excluir</a></td>'
                            )
                        )
                    );
            });
        }
    });

    $('#new_medic').click(function() {
        window.location.href = 'http://localhost/Consultas/frontend/new-medic.html';
    });
});