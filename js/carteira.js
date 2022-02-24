export {Carteira,CarteiraController,CarteiraView}

/**
 * Class CarteiraModel
 */
class Carteira{
    /**
     * Método Construtor
     */
    constructor() {
        this.moedas = 0;
    }

    /**
     * Método que permite obter as moedas em carteira
     * @returns {number} Refere-se ao numero de moedas na carteira
     */
    getMoedas(){
        return this.moedas;
    }

    /**
     * Método que permite remover determinado numero de moedas da carteira de acordo com o parâmetro
     * @param {number} x Refere-se ao numero de moedas a remover da carteira
     */
    removeMoeda(x){
        this.moedas -= x;
    }

    /**
     * Método que permite adicionar determinado numero de moedas à carteira de acordo com o parâmetro
     * @param {number} x Refere-se ao numero de moedas a adicionar à carteira
     */
    addMoeda(x){
        this.moedas += x;
    }
}

/**
 * Class CarteiraController
 */
class CarteiraController{
    /**
     * Método Construtor
     * @param {Carteira} model Refere-se ao model de Carteira
     * @param {CarteiraView} view Refere-se à View de Carteira
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    /**
     * Método permite obter o montante de moedas presentes em carteira
     * @returns {number} Refere-se ao montante de moedas em carteira
     */
    getMoedas(){
        return this.model.getMoedas();
    }

    /**
     * Método permite mostrar na CarteiraView montante de moedas em carteira
     */
    showMoedas(){
        this.view.showMoedas(this.model.moedas)
    }

    /**
     * Método permite adicionar moedas em carteira de acordo com o parâmetro
     * @param {number} x Refere-se ao número de moedas a adicionar
     */
    addMoeda(x){
        this.model.addMoeda(x);
    }

    /**
     * Método permite remover moedas em carteira de acordo com o parâmetro
     * @param {number} x Refere-se ao numero de moedas a remover
     */
    removeMoeda(x){
        this.model.removeMoeda(x);
    }



}

/**
 * Class CarteiraView
 */
class CarteiraView{
    /**
     * Método Construtor
     */
    constructor() {
    }

    /**
     * Método permite mostrar numero de moedas em carteira
     * @param {number} moedas Refere-se ao numero de moedas em carteira
     */
    showMoedas(moedas){
        document.getElementById("moedas").innerText = moedas;
    }

}