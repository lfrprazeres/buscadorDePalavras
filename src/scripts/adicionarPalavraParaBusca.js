const adicionarPalavraParaBusca = (element, palavras) => {
    elementId = $(element).attr("id")[$(element).attr("id").length - 1];
    temItem = palavras.filter(item => item.id === elementId).length > 0 ? true : false;
    desconsiderar = $(element).find('.custom-control-input')
    console.log(desconsiderar)
    if(!temItem) {
        palavras.push({
            id: elementId,
            palavra: $(element).val()
        })
    } else {
        palavras = palavras.map(item => {
            if(item.id === elementId) {
                return {
                    id: item.id,
                    palavra: $(element).val()
                }
            }
            return item;
        })
    }
    return palavras;
}