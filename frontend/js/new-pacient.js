$(function() {
    $('#cpfInput').focus();
    var spinner = $('#loader');

    $('#pacientForm').submit(function(e) {
        e.preventDefault();
        var unindexed_values = $(this).serializeArray();
        var indexed_values = {};
        spinner.show();
        
        $.map(unindexed_values, function(n, i) {
            indexed_values[n['name']] = n['value'];
        });

        var paciente = {
            "cpf": indexed_values['cpfInput'],
            "nome": indexed_values['nomeInput'],
            "telefone": indexed_values['telefoneInput'],
            "data_nascimento": indexed_values['dataNascimentoInput'],
        }

        try {
            $.ajax({
                url: 'http://localhost:8080/api/paciente',
                type: 'POST',
                data: paciente,
                success: function(result) {
                    spinner.hide();
                    window.location.href = 'http://localhost/Consultas/frontend/pacients.html';
                }
            });
        } catch (e) {
            console.log('error', e);
        }
    });
});