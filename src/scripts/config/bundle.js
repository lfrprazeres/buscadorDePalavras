(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let palavrasParaBusca = [];
let contadorDePalavras = 0;
const novaPalavra = `
<div class="form-group col-md-12">
    <label> Digite um palavra ou uma frase para saber a sua recorrência </label>
    <div class="d-flex align-items-center palavraContainer">
        <input type="text" class="form-control palavraInput" aria-describedby="emailHelp" id="palavra${contadorDePalavras}"/>
        <div class="custom-control custom-checkbox col-md-6 ml-2">
            <input type="checkbox" class="custom-control-input" id="defaultUnchecked${contadorDePalavras}">
            <label class="custom-control-label" for="defaultUnchecked${contadorDePalavras}"> Desconsiderar palavras semelhantes </label>
        </div>
    </div>
</div>
`
// adicionando nova 
$(document).ready(() => {
    $(novaPalavra).appendTo($('.palavras'));
    contadorDePalavras++;
})

// adicionando palavras 
$(".palavras").on('input', 'input', (event) => {
    event.preventDefault();
    palavrasParaBusca = adicionarPalavraParaBusca(event.target, palavrasParaBusca)
})
// desconsiderar palavra checkbox
define(['./adicionarPalavraParaBusca.js']), () => {
    $(".palavras").on('click', '.custom-control-input', (event) => {
        id = $(element).closest('input').attr("id")[$(element).attr("id").length - 1];
        temItem = palavrasParaBusca.filter(item => item.id === id).length > 0 ? true : false;
        palavra = $(element).closest('.palavraContainer').find('.palavraInput').val();
        if(!temItem) {
            palavrasParaBusca.push({
                id,
                palavra,
                desconsiderar: $(element).is(":checked")
            })
        } else {
            palavrasParaBusca = palavrasParaBusca.map(item => {
                if(item.id === elementId) {
                    return {
                        id,
                        palavra,
                        desconsiderar: $(element).is(":checked")
                    }
                }
                return item;
            })
        }
    })
}

$(".novaPalavra").on("click", (e) => {
    e.preventDefault();
    $(novaPalavra).appendTo($('.palavras'));
    contadorDePalavras++;
})
let textArea = $('textarea');

$(".buscar").on("click", (e) => {
    e.preventDefault();
    texto = $('#text').val();
    let palavras = texto.split(" ").map(palavra => palavra.toLowerCase()).filter(palavras => palavras !== "");
    let respostas = [];
    buscas = palavrasParaBusca.map(item => ({
        palavra: item.palavra.toLowerCase(),
        desconsiderar: item.desconsiderar}
    ));
    buscas.map(busca => {
        let palavraAceita;
        if(busca.palavra.trim().split(" ").length > 1){
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
            palavraAceita = new RegExp("^[\.\,\;\!\?]{0,}" + busca + "[\.\,\;\!\?]{0,}$", "g");
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
})
},{}]},{},[1]);
