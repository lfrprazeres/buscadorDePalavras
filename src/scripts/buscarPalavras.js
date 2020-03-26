import $ from 'jquery';

export default function buscarPalavras(texto, palavrasParaBusca) {
    let palavras = texto.split(/\s+/).map(palavra => palavra.toLowerCase()).filter(palavras => palavras !== ""),
    respostas = [],
    buscas = palavrasParaBusca.map(item => ({
        palavra: item.palavra.toLowerCase(),
        desconsiderar: item.desconsiderar
    })).filter(item => item.palavra.trim() !== "");
    buscas.map(busca => {
        let palavraAceita;
        if(busca.palavra.trim().split(" ").length > 1){
            let palavraComposta = busca.palavra.trim().split(" ").map(palavra => palavra.toLowerCase());
            let recorrencia = 0;
            palavras.map((palavra, index) => {
                if(palavra === palavraComposta[palavraComposta.length - 1]){
                    let count = 1;
                    for(let i = palavraComposta.length - 2; i >= 0; i--){
                        let isPalavraAnteriorIgual = palavras[index - count] === palavraComposta[i];
                        if(!(isPalavraAnteriorIgual)){
                            break;
                        } else if(isPalavraAnteriorIgual && i === 0) {
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
                        count++;
                    }
                }
            })
        } else {
            if(busca.desconsiderar) {
                palavraAceita = new RegExp(`^[\.\,\;\!\?]{0,}${busca.palavra}[\.\,\;\!\?]{0,}$`,"g");
            } else {
                palavraAceita = new RegExp(`[\.\,\;\!\?]{0,}${busca.palavra}[\.\,\;\!\?]{0,}`,"g");
            }
           
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
                    a busca por ${resposta.busca.palavra} obteve ${resposta.recorrencia} ${resposta.recorrencia > 1 ? "recorrencias" : "recorrencia"}
                </div>
            `).appendTo($('.resposta'))
        } else {
            $(`
                <div class="container alert alert-danger">
                    a busca por ${resposta.busca.palavra} não obteve recorrências
                </div>
            `).appendTo($('.resposta'))
        }
    })
}