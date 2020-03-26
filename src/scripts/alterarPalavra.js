export default function alterarPalavra(palavras, id, novaPalavra) {
    id = parseInt(id);
    palavras.map(item => {
        if(item.id === id){
            item.setPalavra(novaPalavra);
            return item;
        }
        return item;
    })
    return palavras
}