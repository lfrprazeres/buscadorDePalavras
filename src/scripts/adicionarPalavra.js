import $ from 'jquery';

export default function adicionarPalavra(element, palavras) {
    let id = $(element).closest('input').attr("id")[$(element).attr("id").length - 1];
    let temItem = palavras.filter(item => item.id === id).length > 0 ? true : false;
    let palavra = $(element).closest('.palavraContainer').find('.palavraInput').val();
    console.log("palavra: ", palavra)
    if(!temItem) {
        palavras.push({
            id,
            palavra,
            desconsiderar: $(element).is(":checked")
        })
    } else {
        palavras = palavras.map(item => {
            if(item.id === id) {
                return {
                    id,
                    palavra,
                    desconsiderar: $(element).is(":checked")
                }
            }
            return item;
        })
    }
    return palavras;
}