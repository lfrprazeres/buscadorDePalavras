import './styles/main.scss';
import $ from 'jquery';
import {
    desconsiderarPalavra,
    adicionarPalavra,
    buscarPalavras,
    alterarPalavra,
    excluirPalavra
} from './scripts';
import 'bootstrap';

let palavrasParaBusca = [];
let contadorDePalavras = 0;
let text = $('textarea');

// adicionando o primeiro input para buscar palavra
$(document).ready(() => {
    palavrasParaBusca = adicionarPalavra(palavrasParaBusca, contadorDePalavras);
    contadorDePalavras++;
})

// adicionando palavra no array 
$(".palavras").on('input', 'input', (event) => {
    let id = $(event.target).attr("id")[$(event.target).attr("id").length - 1];
    palavrasParaBusca = alterarPalavra(palavrasParaBusca, id, event.target.value);
})

// função para desconsiderar palavra
$(".palavras").on('click', '.custom-control-input', (event) => {
    palavrasParaBusca = desconsiderarPalavra(event.target, palavrasParaBusca)
})

// função para adicionar nova palavra no array
$(".novaPalavra").on("click", (e) => {
    e.preventDefault();
    palavrasParaBusca = adicionarPalavra(palavrasParaBusca, contadorDePalavras);
    contadorDePalavras++;
})

$('.palavras').on("click", '.excluir', (e) => {
    e.preventDefault();
    let id = $(event.target).attr("id")[$(event.target).attr("id").length - 1];
    palavrasParaBusca = excluirPalavra(palavrasParaBusca, id);
})

// função para buscar palavras
$(".buscar").on("click", (e) => {
    e.preventDefault();
    let texto = $(text).val();
    buscarPalavras(texto, palavrasParaBusca);
})