class Mensagem{
    constructor(){

        const ctrlF5 = setTimeout(()=>{
            window.location.reload(true)
        }        
        , 25200000);  //7 horas

        this.os = [['24 HRS CORRIDAS', '24HR', 'corrido', 1], ['48 HRS CORRIDAS', '48HR', 'corrido', 2], ['72 HRS CORRIDAS', '72HR', 'corrido', 3], 
        ['3 DIAS UTEIS', '3DIAS', 'uteis', 3], ['5 DIAS UTEIS', '5DIAS', 'uteis', 5]]

        let os = this.os

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
                    txtFalhaId.className = 'form-group'

                    let labelFalhaId = document.createElement('label');
                    labelFalhaId.innerHTML = 'ID Falha (opcional)'
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
                    let divAtraso= document.createElement('div');
                    divAtraso.id = 'qtd_atraso'
                    divAtraso.className = 'form-group'

                    let labelAtraso = document.createElement('label');
                    labelAtraso.innerHTML = 'Tipo de O.S*'
                    labelAtraso.setAttribute('for', 'form_os') 

                    let selectAtraso = document.createElement('select');
                    selectAtraso.setAttribute('id', 'form_os') 
                    selectAtraso.setAttribute('name', 'opcoesAtrasoOs') 
                    selectAtraso.setAttribute('required', 'required') 
                    selectAtraso.className = 'form-control'

                    let optionAtraso= document.createElement('option');
                    optionAtraso.innerHTML = '--Selecione sua opção--'
                    optionAtraso.setAttribute('value', 'null')
                    optionAtraso.setAttribute('selected', '') 
                    optionAtraso.setAttribute('disabled', '') 


                    document.getElementById('caixaFalhaAtraso').appendChild(divAtraso);
                    document.getElementById('qtd_atraso').appendChild(labelAtraso)
                    document.getElementById('qtd_atraso').appendChild(selectAtraso)
                    document.getElementById('form_os').appendChild(optionAtraso)

                    for (let i = 0; i < os.length; i++) {
                        let optionAtraso= document.createElement('option');
                        optionAtraso.innerHTML = os[i][0]
                        optionAtraso.setAttribute('value', os[i][1])                 
                        
                        document.getElementById('form_os').appendChild(optionAtraso)

                    }
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

        if(diff >= 0){
            let total_horas = (moment.duration(diff).asHours()).toFixed(2); // hora do calculo

            let hora_separar = parseInt(total_horas.split('.')[0])
            let min_separar = Math.round((parseInt(total_horas.split('.')[1]) * 0.60))
       
            if(hora_separar <= 9){
                hora_separar = '0'+ hora_separar
            }

            if(min_separar <= 9){
                min_separar = '0' + min_separar
            }

            let hora_real_conversao = `${hora_separar}:${min_separar}` //hora real 
            

            let valor_cheio = document.getElementsByName('valor_mensalidade')[0].value

            if(valor_cheio != ''){
                let desconto_hora = valor_cheio/720
            
                let desconto_semAcesso = (total_horas * desconto_hora).toFixed(2)
                let desconto_lentidao = (desconto_semAcesso/2).toFixed(2)
                
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
                                                                    
                    `TOTAL DE ${hora_real_conversao} HORAS SEM ACESSO DEVIDO À MANUTENÇÕES CORRETIVAS\n`+
                    `VALOR DO DESCONTO: R$ ${desconto_semAcesso}`

                    document.querySelector('#mensagem').value = mensagem;


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
                                                                    
                    `TOTAL DE ${hora_real_conversao} HORAS COM O ACESSO LENTO/OSCILANDO DEVIDO À MANUTENÇÕES CORRETIVAS\n`+
                    `VALOR DO DESCONTO: R$ ${desconto_lentidao}`

                    document.querySelector('#mensagem').value = mensagem;


                }else if(opcoesDesconto = 'atraso'){

                    let prazo = document.getElementsByName('opcoesAtrasoOs')[0].value
                    let dias_os
                    let tipo_prazo
                    
                    for (let i = 0; i < this.os.length; i++) {

                        if(this.os[i][1] === prazo && this.os[i][2] == 'corrido'){
                            dias_os = this.os[i][3]
                            tipo_prazo = this.os[i][2]
                            break
                        }else if(this.os[i][1] === prazo && this.os[i][2] == 'uteis'){
                            dias_os = this.os[i][3]
                            tipo_prazo = this.os[i][2]
                            break
                        }
                    }

                    if(tipo_prazo == 'corrido'){
                        let dataInicioAtraso = new Date(`${dataAtraso} 00:00:00`)

                        //TIPO CORRIDO
                        let data_inicio_atraso = moment(dataInicioAtraso).add(dias_os, 'days').format('L')
                        let dataHoraInicioAtraso = `${data_inicio_atraso} ${hora_inicio}`

                        let diffAtraso = moment(data_fim_string,"DD/MM/YYYY HH:mm:ss").diff(moment(dataHoraInicioAtraso,"DD/MM/YYYY HH:mm:ss"));
                        let total_horas_atraso = (moment.duration(diffAtraso).asHours()).toFixed(2); //hora calculo
                        //FIM TIPO CORRIDO

                        this.calculoAtrasoOs(data_inicio_atraso, total_horas_atraso, hora_inicio, hora_fim, data_fim)

                    }else if(tipo_prazo == 'uteis'){

                        let data_fim = document.getElementsByName('data_fim')[0].value

                        let dataInicioAtraso = new Date(`${dataAtraso} 00:00:00`)
                        let dataFimAtraso = new Date(`${data_fim} 00:00:00`)
                        
                        console.log('data inicio: ' + dataInicioAtraso)
                        console.log('data fim: ' + dataFimAtraso)


                        let diffAtraso = moment(dataFimAtraso).diff(moment(dataInicioAtraso));
                        let diffAtrasoDays = moment.duration(diffAtraso).asDays()


                        // CALCULAR OS DIAS UTEIS

                        let diasUteis = 0
                        let diasTotal = diffAtrasoDays + 1

                        let diasNaoUteis = []

                        for (let i = 0; i <= diffAtrasoDays; i++) {

                            let data_inicio_atraso = moment(dataInicioAtraso).add(i, 'days').format('L')

                            console.log(`dia ${i}: ${data_inicio_atraso}`)

                            data_inicio_atraso = data_inicio_atraso.split('/').reverse().join('/');
                            data_inicio_atraso = data_inicio_atraso.replace(/\//g, '-'); //trocando o "/" por "-"

                            let diaDasemana = new Date(data_inicio_atraso).getDay() + 1

                            if(diaDasemana === 7){
                                diaDasemana = 0
                            }

                            if (diaDasemana !== 0 && diaDasemana !== 6) {
                                diasUteis += 1
                            }else{
                                diasNaoUteis.push([data_inicio_atraso, diaDasemana])
                            }
                        }

                        let diasCalculo = diasTotal - diasUteis

                        //domingo = 0 e sabado = 6 no getDay


                        let dias_prazo_novo = dias_os + diasCalculo


                        //TIPO UTEIS (MESMAS VARIAVEWIS DO CORRIDO POREM COM NOMES DIFERENTES)
                        {
                            let data_inicio_atraso = moment(dataInicioAtraso).add(dias_prazo_novo, 'days').format('L')
                            let dataHoraInicioAtraso = `${data_inicio_atraso} ${hora_inicio}`

                            let diffAtraso = moment(data_fim_string,"DD/MM/YYYY HH:mm:ss").diff(moment(dataHoraInicioAtraso,"DD/MM/YYYY HH:mm:ss"));
                            let total_horas_atraso = (moment.duration(diffAtraso).asHours()).toFixed(2); //hora calculo

                            
                            data_fim = data_fim.split('-').reverse().join('-');
                            data_fim = data_fim.replace(/-/g, '/');


                            this.calculoAtrasoOs(data_inicio_atraso, total_horas_atraso, hora_inicio, hora_fim, data_fim, diasNaoUteis)
                        }
                        //FIM TIPO UTEIS

                    } 
                }
            }else{
                alert('Por favor, implemente o valor cheio da mensalidade!')
            }

            
        }else{
            alert('Data/hora fim é menor que a data/hora início, por favor corrigir')
        }


        document.getElementsByName('valor_mensalidade')[0].value = ''
        
    }


    calculoAtrasoOs(data_inicio_atraso, total_horas_atraso, hora_inicio, hora_fim, data_fim, diasNaoUteis){

        let diff = moment(`${data_fim} ${hora_fim}`,"DD/MM/YYYY HH:mm:ss").diff(moment(`${data_inicio_atraso} ${hora_inicio}`,"DD/MM/YYYY HH:mm:ss"));

        if(diff >= 0){
            let valor_cheio_atraso = document.getElementsByName('valor_mensalidade')[0].value
            let desconto_hora_atraso = valor_cheio_atraso/720     
            let desconto_atraso = (total_horas_atraso * desconto_hora_atraso).toFixed(2)


            let hora_separar_atraso = parseInt(total_horas_atraso.split('.')[0])
            let min_separar_atraso = Math.round((parseInt(total_horas_atraso.split('.')[1]) * 0.60))

            if(hora_separar_atraso <= 9 ){
                hora_separar_atraso = '0'+ hora_separar_atraso
            }

            if(min_separar_atraso <= 9){
                min_separar_atraso = '0' + min_separar_atraso
            }

            let hora_real_conversao_atraso = `${hora_separar_atraso}:${min_separar_atraso}` //hora real

            if(diasNaoUteis !== undefined){
                
                let diasCortados = diasNaoUteis.length

                let mensagem = `> DESCONTO REFERENTE A ATRASO DA ORDEM DE SERVIÇO\n\n`+

                `INICIO DO CALCULO: ${data_inicio_atraso} ${hora_inicio}\n`+
                `FINAL DO CALCULO: ${data_fim} ${hora_fim}\n\n`+

                `${diasCortados} DIAS CORTADOS DO CALCULO POR NÃO SEREM DIAS UTEIS\n\n`+ 
                                                            
                `TOTAL DE ${hora_real_conversao_atraso} HORAS UTEIS DEVIDO AO ATRASO NA EXECUÇÃO DA O.S\n`+
                `VALOR DO DESCONTO: R$ ${desconto_atraso}`

                document.querySelector('#mensagem').value = mensagem; 

            }else{
                let mensagem = `> DESCONTO REFERENTE A ATRASO DA ORDEM DE SERVIÇO\n\n`+

                `INICIO DO CALCULO: ${data_inicio_atraso} ${hora_inicio}\n`+
                `FINAL DO CALCULO: ${data_fim} ${hora_fim}\n\n`+
                                                            
                `TOTAL DE ${hora_real_conversao_atraso} HORAS CORRIDAS DEVIDO AO ATRASO NA EXECUÇÃO DA O.S\n`+
                `VALOR DO DESCONTO: R$ ${desconto_atraso}`

                document.querySelector('#mensagem').value = mensagem; 
            }              
        }else{
            alert('Desconto não concedido por estar dentro do prazo da O.S.')
        }   
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
