class Mensagem{
    constructor(){

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
                    labelAtraso.innerHTML = 'Quantidade dias em atraso'
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

        let dataAtraso = data_fim;

        let date1 = new Date(data_inicio.slice(0,4), data_inicio.slice(5,7),data_inicio.slice(8,10), hora_inicio.slice(0,2), hora_inicio.slice(3,5)),
        date2 = new Date(data_fim.slice(0,4), data_fim.slice(5,7), data_fim.slice(8,10), hora_fim.slice(0,2), hora_fim.slice(3,5));

        let diffMs = (date2 - date1);
        let total_horas = (diffMs / (1000 * 60 * 60));

        let data1Mes = date1.getMonth()

        console.log(date1.getDate())

        if(date1.getDate() == 1 && data1Mes == date2.getMonth()){
            data1Mes = date1.getMonth() - 1
        }

        if(data1Mes == 1 || data1Mes == 3 || data1Mes == 5 || data1Mes == 7 || data1Mes == 8 || data1Mes == 10 || data1Mes == 0){
            if(data1Mes != date2.getMonth() && data1Mes < date2.getMonth()){
                total_horas = total_horas + 24
                //
            }
        }



        data_inicio = data_inicio.split('-').reverse().join('-');
        data_fim = data_fim.split('-').reverse().join('-');

        data_inicio = data_inicio.replace(/-/g, '/');
        data_fim = data_fim.replace(/-/g, '/');

        
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

            `SEM ACESSO DESDE: ${data_inicio} ${hora_inicio}\n`+
            `VOLTOU DIA: ${data_fim} ${hora_fim}\n\n`+
                                                            
            `TOTAL DE ${total_horas.toFixed(2)} HORAS COM O ACESSO LENTO/OSCILANDO DEVIDO À MANUTENÇÕES CORRETIVAS`
        }else if(opcoesDesconto = 'atraso'){

            let qtdDiasAtraso = document.getElementsByName('number_id')[0].value

            let horario_fim_ms = ((hora_fim.slice(0,2) * 3600000) + (hora_fim.slice(3,5) * 60000))  
            let hora_atraso_inicio = new Date(date1.getTime()).toLocaleString().slice(11, 16)
            let horario_inicio_ms = ((hora_atraso_inicio.slice(0,2) * 3600000) + (hora_atraso_inicio.slice(3,5) * 60000))


            let data_fim_atraso = new Date(dataAtraso.slice(0,4), dataAtraso.slice(5,7), dataAtraso.slice(8,10), hora_fim.slice(0,2), hora_fim.slice(3,5));
            let data_inicio_atraso = new Date((data_fim_atraso.getTime()) - (((qtdDiasAtraso) * 24 * 60 * 60 * 1000) + horario_fim_ms - horario_inicio_ms))


            let diffMsAtraso = (data_fim_atraso - data_inicio_atraso);
            let total_horas_atraso = (diffMsAtraso / (1000 * 60 * 60));
            


            let duasCasasData = data_inicio_atraso.getDate()
            let duasCasasMes = data_inicio_atraso.getMonth()

            if(duasCasasData < 9){
                duasCasasData = "0" + duasCasasData
            }


            if(duasCasasMes == 1 || duasCasasMes == 3 || duasCasasMes == 5 || duasCasasMes == 7 || duasCasasMes == 8 || duasCasasMes == 10 || duasCasasMes == 0){
               
                if(data_inicio_atraso.getMonth() != date2.getMonth() && data_inicio_atraso.getMonth() < date2.getMonth()){
                    // let diferenca_meses = date2.getMonth() - data_inicio_atraso.getMonth() 
                    // console.log(diferenca_meses)

                    total_horas_atraso = total_horas_atraso + 24
                }

            }

            if(duasCasasMes < 9){
                duasCasasMes = "0" + duasCasasMes
            }


            let data_atraso_nova = duasCasasData + "/" + duasCasasMes + "/" + data_inicio_atraso.getFullYear();



            var mensagem = `> DESCONTO REFERENTE A ATRASO DA ORDEM DE SERVIÇO\n\n`+

            `INICIO DO CALCULO: ${data_atraso_nova} ${hora_atraso_inicio}\n`+
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
