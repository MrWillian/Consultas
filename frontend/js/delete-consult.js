$(function() {
    let searchParams = new URLSearchParams(window.location.search);
    var id = { "id": searchParams.get('consult') }.id;

    $.ajax({
        url: 'http://localhost:8080/api/consulta',
        type: 'DELETE',
        data: {
            "id": id,
        },
        success: function(resultado) {
            window.location.href = 'http://localhost/Consultas/frontend/index.html';
        }
    });
});