$(function() {
    let searchParams = new URLSearchParams(window.location.search);
    var idJSON = { "id": searchParams.get('consult') }

    $('#pacienteDataList').focus();

    try {
        $.ajax({
            url: 'http://localhost:8080/api/consulta/',
            type: 'GET',
            success: function(result) {
                var rightResult = result.filter(test => test.id.toString() == idJSON.id);

                $('#pacienteDataList').val(rightResult[0].paciente_cpf);
                $('#medicoDataList').val(rightResult[0].medico_crm);
                $('#timeInput').val(rightResult[0].horario);
                $('#dataInput').val(rightResult[0].data);
            }
        });
    } catch (e) {
        console.log('error', e);
    }

    var spinner = $('#loader');

    $('#consultForm').submit(function(e) {
        e.preventDefault();
        var unindexed_values = $(this).serializeArray();
        var indexed_values = {};
        spinner.show();
        
        $.map(unindexed_values, function(n, i) {
            indexed_values[n['name']] = n['value'];
        });

        var consulta = {
            "paciente_cpf": indexed_values['pacienteDataList'],
            "medico_crm": indexed_values['medicoDataList'],
            "horario": indexed_values['timeInput'],
            "data": indexed_values['dataInput'],
        }

        try {
            $.ajax({
                url: 'http://localhost:8080/api/consulta/'+idJSON.id,
                type: 'PUT',
                data: consulta,
                success: function(result) {
                    spinner.hide();
                    window.location.href = 'http://localhost/Consultas/frontend/index.html';
                }
            });
        } catch (e) {
            console.log('error', e);
        }
    });
});