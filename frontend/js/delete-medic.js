$(function() {
    let searchParams = new URLSearchParams(window.location.search);
    var crm = { "crm": searchParams.get('medic') }.crm;

    $.ajax({
        url: 'http://localhost:8080/api/medico',
        type: 'DELETE',
        data: {
            "crm": crm,
        },
        success: function(resultado) {
            window.location.href = 'http://localhost/Consultas/frontend/medics.html';
        }
    });
});