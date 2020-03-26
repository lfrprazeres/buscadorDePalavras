import $ from 'jquery';
export default function excluirPalavra(palavras, id) {
    $(".palavras").find(".form-group").each((index, element) => {
        let input = $(element).find(".palavraInput");
        let inputId = input.attr("id")[input.attr("id").length - 1];
        if(inputId === id){
            $(element).remove();
        }
    })
    return palavras.filter(item => {
        return item.id !== id
    });
}