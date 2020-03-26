export default class NovaPalavra {
    constructor(id){
        this.id = id;
        this.desconsiderar = false;
        this.element = `
        <div class="form-group col-md-12">
            <label> Digite a palavra ou a frase que deseja buscar </label>
            <div class="d-flex align-items-center palavraContainer">
                <input type="text" class="form-control palavraInput" aria-describedby="emailHelp" id="palavra${this.id}"/>
                <div class="custom-control custom-checkbox col-md-6 ml-2">
                    <input type="checkbox" class="custom-control-input" id="defaultUnchecked${this.id}">
                    <label class="custom-control-label" for="defaultUnchecked${this.id}"> Desconsiderar palavras semelhantes </label>
                </div>
            </div>
        </div>
    `
    }

    getElement (){
        return this.element;
    }
}