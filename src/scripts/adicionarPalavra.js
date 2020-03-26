import $ from 'jquery';
import {
    NovaPalavra
} from './';

export default function adicionarPalavra(palavras, id) {
    let novaPalavra = new NovaPalavra(id);
    $(novaPalavra.getElement()).appendTo($('.palavras'));
    return [...palavras, novaPalavra];
}