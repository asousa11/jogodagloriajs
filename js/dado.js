export {Dado,DadoController, DadoView};

// ## Class Dado / Model ##
/**
 * Class DadoModel
 */
class Dado {
    /**
     * Método Construtor
     */
    constructor( ){
        this.valor = 0;
    }

    /**
     * Método que atribui ao atributo valor o aleatório de 1 a 6
     */
    lancarDado() {
        this.valor = Math.floor(Math.random()*6) +1;
    }

    /**
     * Método que permite retorna valor de atributo valor
     * @returns {number} Refere-se ao valor presente em dado
     */
    getValor(){
        return this.valor;
    }
}

/**
 *Class DadoController
 */
class DadoController{
    /**
     * Método Construtor
     * @param {Dado} model Refere-se ao Model de Dado
     * @param {DadoView} view Refere-se à View de Dado
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    /**
     * Método de permite lançar o dado
     */
    lancarDado () {
        this.model.lancarDado();
        this.view.mostrarDado(this.getValor());
    }

    /**
     * Método que permite obter o conteudo do atributo valor presente no DadoModel
     * @returns {number} Retorna o valor de dado
     */
    getValor(){
        return this.model.getValor();
    }

    enableButton(){
        this.view.enableButton();
    }

}

/**
 * Class DadoView
 */
class DadoView{
    /**
     * Método Construtor
     */
    constructor() {
    }

    /**
     * Este método mostra a imagem do dado que corresponde ao valor que saiu
     * @param {number} valor o valor do dado
     */
    mostrarDado(valor){
        document.getElementById("imagem-pergunta").src = "css/img/dice/dice"+valor+".jpg";
        document.getElementById("imagem-pergunta").style.visibility = "visible";
        this.disableButton();
    }

    disableButton(){
        document.getElementById("dado-button").disabled = true;
    }

    enableButton(){
        document.getElementById("dado-button").disabled = false;
    }

}



