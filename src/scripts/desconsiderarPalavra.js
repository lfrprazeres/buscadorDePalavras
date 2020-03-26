import $ from 'jquery';

export default function desconsiderarPalavra(element, palavras) {
    let id = $(element).attr("id")[$(element).attr("id").length - 1];
    let temItem = palavras.filter(item => item.id === id).length > 0 ? true : false;
    let desconsiderar = $(element).find('.custom-control-input').prevObject.is(":checked")
    if(!temItem) {
        palavras.push({
            id,
            palavra: $(element).val(),
            desconsiderar
        })
    } else {
        palavras = palavras.map(item => {
            console.log("item: ", item)
            if(item.id === id) {
                return {
                    ...item,
                    desconsiderar
                }
            }
            return item;
        })
    }
    console.log("palavras: ", palavras)
    return palavras;
}