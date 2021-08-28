$(function() {
    $('#nomeInput').focus();
    var spinner = $('#loader');

    $('#medicForm').submit(function(e) {
        e.preventDefault();
        var unindexed_values = $(this).serializeArray();
        var indexed_values = {};
        spinner.show();
        
        $.map(unindexed_values, function(n, i) {
            indexed_values[n['name']] = n['value'];
        });

        var medico = {
            "cpf": indexed_values['cpfInput'],
            "crm": indexed_values['crmInput'],
            "nome": indexed_values['nomeInput'],
            "especialidade": indexed_values['especialidadeInput'],
        }

        try {
            $.ajax({
                url: 'http://localhost:8080/api/medico',
                type: 'POST',
                data: medico,
                success: function(result) {
                    spinner.hide();
                    window.location.href = 'http://localhost/Consultas/frontend/medics.html';
                }
            });
        } catch (e) {
            console.log('error', e);
        }
    });
});