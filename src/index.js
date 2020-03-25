import './styles/main.scss';
import $ from 'jquery';
import {
    desconsiderarPalavra,
    adicionarPalavra,
    NovaPalavra,
    buscarPalavras
} from './scripts';
import 'bootstrap';

let palavrasParaBusca = [];
let contadorDePalavras = 0;
let text = $('textarea');

// adicionando o primeiro input para buscar palavra
$(document).ready(() => {
    $('.palavras').append(new NovaPalavra(contadorDePalavras).getElement());
    contadorDePalavras++;
})

// adicionando palavra no array 
$(".palavras").on('input', 'input', (event) => {
    event.preventDefault();
    palavrasParaBusca = adicionarPalavra(event.target, palavrasParaBusca)
})

// função para desconsiderar palavra
$(".palavras").on('click', '.custom-control-input', (event) => {
    palavrasParaBusca = desconsiderarPalavra(event.target, palavrasParaBusca)
})

// função para adicionar nova palavra no array
$(".novaPalavra").on("click", (e) => {
    e.preventDefault();
    $(new NovaPalavra(contadorDePalavras).getElement()).appendTo($('.palavras'));
    contadorDePalavras++;
})

// função para buscar palavras
$(".buscar").on("click", (e) => {
    e.preventDefault();
    let texto = $(text).val();
    buscarPalavras(texto, palavrasParaBusca);
})