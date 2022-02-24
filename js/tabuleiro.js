export {Tabuleiro, TabuleiroController, TabuleiroView}
import {Casa, CasaController, CasaView} from './casa.js';

/**
 * Class TabuleiroModel
 */
class Tabuleiro{
    /**
     * Método Construtor
     * @param {Map<Casa.numero, CasaController>} casas Refere-se a Map de Casas {id_casa -> Casa}
     */
    constructor(casas) {
        this.casas = casas;
    }
}

/**
 * Class TabuleiroController
 */
class TabuleiroController{
    /**
     * Método Construtor
     * @param {Tabuleiro} model Refere-se ao model de Tabuleiro
     * @param {TabuleiroView} view Refere-se à View de Tabuleiro
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    /**
     * Método que retorna booleano aquando a verificação se determinada casa é Especial ou não
     * @param {number} pos Refere-se a numero identificador da casa
     * @returns {boolean} Retorna valor booleano confirmando se se trata de casa Especial ou não
     */
    checkCasaEspecial(pos){
        let casa = this.model.casas.get(pos)
        return casa.getEspecial()
    }

    /**
     * Método que permite obter o objeto Casa
     * @param {number} pos Refere-se a numero identificador da casa
     * @returns {CasaController} Retorna o objeto Casa
     */
    getCasa(pos){
        return this.model.casas.get(pos)
    }

    // showCasaEspecial(pos){
    //     let casa = this.model.casas.get(pos)
    // }

    /**
     * Método que permite obter a string referente ao cofre da Casa
     * @param {number} pos Refere-se a numero identificador da casa
     * @returns {string} Retorna a String do Cofre associado à Casa
     */
    getCofre(pos){
        let casa = this.model.casas.get(pos)
        return casa.getCofre()
    }
}

/**
 * Class TabuleiroView
 */
class TabuleiroView{
    /**
     * Método Construtor
     */
    constructor() {
    }
}