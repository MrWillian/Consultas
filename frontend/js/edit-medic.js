$(function() {
    let searchParams = new URLSearchParams(window.location.search);
    var crmJSON = { "crm": searchParams.get('medic') }

    $('#crmInput').focus();

    try {
        $.ajax({
            url: 'http://localhost:8080/api/medico/',
            type: 'GET',
            success: function(result) {
                var rightResult = result.filter(test => test.crm.toString() == crmJSON.crm);

                $('#crmInput').val(rightResult[0].crm);
                $('#cpfInput').val(rightResult[0].cpf);
                $('#nomeInput').val(rightResult[0].nome);
                $('#especialidadeInput').val(rightResult[0].especialidade);
            }
        });
    } catch (e) {
        console.log('error', e);
    }

    var spinner = $('#loader');

    $('#pacientForm').submit(function(e) {
        e.preventDefault();
        var unindexed_values = $(this).serializeArray();
        var indexed_values = {};
        spinner.show();
        
        $.map(unindexed_values, function(n, i) {
            indexed_values[n['name']] = n['value'];
        });

        var medico = {
            "crm": indexed_values['crmInput'],
            "cpf": indexed_values['cpfInput'],
            "nome": indexed_values['nomeInput'],
            "especialidade": indexed_values['especialidadeInput'],
        }

        try {
            $.ajax({
                url: 'http://localhost:8080/api/medico/'+crmJSON.crm,
                type: 'PUT',
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