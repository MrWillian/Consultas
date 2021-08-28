$(function() {
    let searchParams = new URLSearchParams(window.location.search);
    var cpf = { "cpf": searchParams.get('pacient') }.cpf;

    $.ajax({
        url: 'http://localhost:8080/api/paciente',
        type: 'DELETE',
        data: {
            "cpf": cpf,
        },
        success: function(resultado) {
            window.location.href = 'http://localhost/Consultas/frontend/pacients.html';
        }
    });
});