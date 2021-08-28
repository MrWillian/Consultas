$(function() {    
    var pacientes = [];

    $.ajax({
        url: 'http://localhost:8080/api/paciente',
        type: 'GET',
        success: function(resultado) {
            pacientes = Object.keys(resultado).map(i => JSON.parse(JSON.stringify(resultado[Number(i)])));

            $.each(pacientes, function (i, paciente) {                
                $("#pacients").find('tbody')
                    .append($('<tr>')
                        .append('<th scope="row">' + (i + 1) + '</th>')
                        .append($('<td>' + paciente.nome + '</td>'))
                        .append($('<td>' + paciente.cpf + '</td>'))
                        .append($('<td>' + paciente.telefone + '</td>'))
                        .append($('<td>' + paciente.data_nascimento + '</td>'))
                        .append($('<td><a href="edit-pacient.html?pacient=' + paciente.cpf + '">Editar</a></td>'))
                        .append($('<td><a href="delete-pacient.html?pacient=' + paciente.cpf + '">Excluir</a></td>'))
                    )
            });
        }
    });
    
    $('#new_pacient').click(function() {
        window.location.href = 'http://localhost/Consultas/frontend/new-pacient.html';
    });
});