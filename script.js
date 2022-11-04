class Mensagem{
    constructor(){

        moment.locale('pt-br')

        var select = document.getElementById('form_need');

        select.addEventListener('change', function() {
            let opcoesDesconto = document.getElementsByName('opcoesDesconto')[0].value

            let caixaFalhaAtraso = document.getElementById('caixaFalhaAtraso')

            if(opcoesDesconto == 'semacesso' || opcoesDesconto == 'lentidao'){

                if(document.getElementById('qtd_atraso') !== null){
                    document.getElementById('qtd_atraso').remove()
                }              

                if(caixaFalhaAtraso.children.length == 0){
                    let txtFalhaId = document.createElement('div');
                    txtFalhaId.id = 'id_falha'
                    txtFalhaId.className = 'form-group mt-2'

                    let labelFalhaId = document.createElement('label');
                    labelFalhaId.innerHTML = 'ID Falha opcional'
                    labelFalhaId.setAttribute('for', 'form_name') 

                    let inputFalhaId = document.createElement('input');
                    inputFalhaId.setAttribute('type', 'number') 
                    inputFalhaId.setAttribute('name', 'number_id') 
                    inputFalhaId.className = 'form-control'

                    document.getElementById('caixaFalhaAtraso').appendChild(txtFalhaId);
                    document.getElementById('id_falha').appendChild(labelFalhaId)
                    document.getElementById('id_falha').appendChild(inputFalhaId)
                }
            }else if(opcoesDesconto == 'atraso'){

                if(document.getElementById('id_falha') !== null){
                    document.getElementById('id_falha').remove()
                } 

                if(caixaFalhaAtraso.children.length == 0){
                    let txtAtraso= document.createElement('div');
                    txtAtraso.id = 'qtd_atraso'
                    txtAtraso.className = 'form-group mt-2'

                    let labelAtraso = document.createElement('label');
                    labelAtraso.innerHTML = 'Prazo O.S (dias)'
                    labelAtraso.setAttribute('for', 'form_name') 

                    let inputLabelAtraso = document.createElement('input');
                    inputLabelAtraso.setAttribute('type', 'number') 
                    inputLabelAtraso.setAttribute('name', 'number_id') 
                    inputLabelAtraso.className = 'form-control'

                    document.getElementById('caixaFalhaAtraso').appendChild(txtAtraso);
                    document.getElementById('qtd_atraso').appendChild(labelAtraso)
                    document.getElementById('qtd_atraso').appendChild(inputLabelAtraso)
                }
            }
        })
             
    }

    desconto(){

        let opcoesDesconto = document.getElementsByName('opcoesDesconto')[0].value
                
        var data_inicio = document.getElementsByName('data_inicio')[0].value
        var data_fim = document.getElementsByName('data_fim')[0].value
        var hora_inicio = document.getElementsByName('hora_inicio')[0].value
        var hora_fim = document.getElementsByName('hora_fim')[0].value

        let msg_inicio;


        let dataAtraso = data_inicio

        data_inicio = data_inicio.split('-').reverse().join('-');
        data_fim = data_fim.split('-').reverse().join('-');

        data_inicio = data_inicio.replace(/-/g, '/');
        data_fim = data_fim.replace(/-/g, '/');


        var data_inicio_string = `${data_inicio} ${hora_inicio}`;
        var data_fim_string = `${data_fim} ${hora_fim}`;


        var diff = moment(data_fim_string,"DD/MM/YYYY HH:mm:ss").diff(moment(data_inicio_string,"DD/MM/YYYY HH:mm:ss"));
        const total_horas = moment.duration(diff).asHours();
        
        
        if(opcoesDesconto == 'semacesso'){

            let id_falha = document.querySelector('#id_falha input').value

            if(id_falha > 0){
                msg_inicio = `> DESCONTO REFERENTE A FALTA DE ACESSO | FALHA ID ${id_falha}`
            }else{
                msg_inicio = `> DESCONTO REFERENTE A FALTA DE ACESSO`
            }

            var mensagem = `${msg_inicio}\n\n`+

            `SEM ACESSO DESDE: ${data_inicio} ${hora_inicio}\n`+
            `VOLTOU DIA: ${data_fim} ${hora_fim}\n\n`+
                                                            
            `TOTAL DE ${total_horas.toFixed(2)} HORAS SEM ACESSO DEVIDO À MANUTENÇÕES CORRETIVAS`

        }else if( opcoesDesconto == 'lentidao'){

            let id_falha = document.querySelector('#id_falha input').value

            if(id_falha > 0){
                msg_inicio = `> DESCONTO REFERENTE A LENTIDÃO/OSCILAÇÃO | FALHA ID ${id_falha}`
            }else{
                msg_inicio = `> DESCONTO REFERENTE A LENTIDÃO/OSCILAÇÃO`
            }

            var mensagem = `${msg_inicio}\n\n`+

            `COM ACESSO LENTO DESDE: ${data_inicio} ${hora_inicio}\n`+
            `NORMALIZOU: ${data_fim} ${hora_fim}\n\n`+
                                                            
            `TOTAL DE ${total_horas.toFixed(2)} HORAS COM O ACESSO LENTO/OSCILANDO DEVIDO À MANUTENÇÕES CORRETIVAS`
        }else if(opcoesDesconto = 'atraso'){

            let prazo = parseInt(document.getElementsByName('number_id')[0].value)

            let dataInicioAtraso = new Date(`${dataAtraso} 00:00:00`)

            let data_inicio_atraso = moment(dataInicioAtraso).add(prazo, 'days').format('L')

            let dataHoraInicioAtraso = `${data_inicio_atraso} ${hora_inicio}`

            let diffAtraso = moment(data_fim_string,"DD/MM/YYYY HH:mm:ss").diff(moment(dataHoraInicioAtraso,"DD/MM/YYYY HH:mm:ss"));
            const total_horas_atraso = moment.duration(diffAtraso).asHours();

            var mensagem = `> DESCONTO REFERENTE A ATRASO DA ORDEM DE SERVIÇO\n\n`+

            `INICIO DO CALCULO: ${data_inicio_atraso} ${hora_inicio}\n`+
            `FINAL DO CALCULO: ${data_fim} ${hora_fim}\n\n`+
                                                            
            `TOTAL DE ${total_horas_atraso.toFixed(2)} HORAS DEVIDO AO ATRASO NA EXECUÇÃO DA O.S`

        }

        document.querySelector('#mensagem').value = mensagem;
    }
}

let msg = new Mensagem();


function copiarTexto() {
    var copyText = document.getElementById("mensagem");
    navigator.clipboard.writeText(copyText.value);

    botaoCopiar = document.getElementById("copiar");

    botaoCopiar.value = "Copiado!"
    botaoCopiar.classList.remove('btn-primary')
    botaoCopiar.classList.add('btn-success')

    const myTimeout = setTimeout(()=>{
            botaoCopiar.value = "Copiar"
            botaoCopiar.classList.remove('btn-success')
            botaoCopiar.classList.add('btn-primary')
        }        
    , 1000);  
    
  }
