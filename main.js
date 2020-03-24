let palavrasParaBusca = [];
let contadorDePalavras = 1;
$(".palavras").on('input', 'input', (event) => {
    event.preventDefault();
    if($(event.target).val() !== ""){
        elementId = $(event.target).attr("id")[$(event.target).attr("id").length - 1];
        temItem = palavrasParaBusca.filter(item => item.id === elementId).length > 0 ? true : false;
        if(!temItem) {
            palavrasParaBusca.push({
                id: elementId,
                palavra: $(event.target).val()
            })
        } else {
            palavrasParaBusca = palavrasParaBusca.map(item => {
                if(item.id === elementId) {
                    return {
                        id: item.id,
                        palavra: $(event.target).val()
                    }
                }
                return item;
            })
        }
    }
})

$(".novaPalavra").on("click", (e) => {
    e.preventDefault();
    let novaPalavra = `
        <div class="form-group col-md-5">
            <label> Digite um palavra ou uma frase para saber a sua recorrência </label>
            <input type="text" class="form-control palavraInput" aria-describedby="emailHelp" id="palavra${contadorDePalavras}"/>
        </div>
    `
    $(novaPalavra).appendTo($('.palavras'));
    contadorDePalavras++;
})
let textArea = $('textarea');

$(".buscar").on("click", (e) => {
    e.preventDefault();
    texto = $('#text').val();
    let palavras = texto.split(" ").map(palavra => palavra.toLowerCase()).filter(palavras => palavras !== "");
    let respostas = [];
    buscas = palavrasParaBusca.map(item => item.palavra.toLowerCase());
    buscas.map(busca => {
        let palavraAceita;
        if(busca.trim().split(" ").length > 1){
            let palavraComposta = busca.trim().split(" ").map(palavra => palavra.toLowerCase());
            let recorrencia = 0;
            palavras.map((palavra, index) => {
                if(palavra === palavraComposta[palavraComposta.length - 1]){
                    for(let i = palavraComposta.length - 2; i >= 0; i--){
                        if(!(palavras[index - 1] === palavraComposta[i])){
                            break;
                        } else if(palavras[index - 1] === palavraComposta[i] && i === 0) {
                            recorrencia += 1;
                            let resposta = respostas.filter(resposta => resposta.busca === busca);
                            if(resposta.length > 0) {
                                respostas = respostas.map(resposta => {
                                    if(resposta.busca === busca) {
                                        return {
                                            busca,
                                            recorrencia: resposta.recorrencia + 1
                                        }
                                    }
                                    return resposta;
                                })
                            } else {
                                respostas.push({
                                    busca,
                                    recorrencia: recorrencia
                                });
    
                            }
                        }
                    }
                }
            })
        } else {
            palavraAceita = new RegExp("[\.\,\;\!\?]{0,}" + busca + "[\.\,\;\!\?]{0,}", "g");
            let recorrencia = palavras.filter(p => p.match(palavraAceita));
            respostas.push({
                busca,
                recorrencia: recorrencia.length
            });
        }
    });
    $('.resposta').empty();
    respostas.map(resposta => {
        if(resposta.recorrencia >= 1){
            $(`
                <div class="container alert alert-success">
                    a busca por ${resposta.busca} obteve ${resposta.recorrencia} ${resposta.recorrencia > 1 ? "recorrencias" : "recorrencia"}
                </div>
            `).appendTo($('.resposta'))
        } else {
            $(`
                <div class="container alert alert-danger">
                    a busca por ${resposta.busca} não obteve recorrências
                </div>
            `).appendTo($('.resposta'))
        }
        
    })
})