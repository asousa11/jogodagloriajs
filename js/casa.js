export {Casa, CasaController, CasaView};

/**
 * CasaModel
 */
class Casa {
    /**
     * Método Construtor
     * Caso seja especial recebe nome e cofre
     * @param {number} numero Refere-se ao numero da casa
     * @param {boolean} special Refere-se ao facto de ser ou não um casa especial
     * @param {string} nome Refere-se ao nome da casa especial
     * @param {string} cofre Refere-se ao nome do cofre presente em casa especial
     */
    constructor(numero,special,nome,cofre) {
        this.numero = numero;
        this.special = special;

        if (special !== true){
            this.nome = "Casa " + numero;
            this.cofre = cofre;
        }else {
            this.nome = nome;
            this.cofre = cofre;
        }
    }
}

/**
 * Class CasaController
 */
class CasaController{
    /**
     * Método Construtor
     * @param {Casa} model Refere-se ao Model de Casa
     * @param {CasaView} view Refere-se á View de Casa
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    /**
     * Método que retorna o booleano do atributo special
     * @returns {boolean} Retorna true ou false do atributo special
     */
    getEspecial(){
        return this.model.special;
    }

    /**
     * Método que retorna a string do atributo cofre
     * @returns {string} Retorna a string do atributo cofre
     */
    getCofre(){
        return this.model.cofre;
    }

}

/**
 * Class CasaView
 */
class CasaView{
    /**
     * Método Construtor
     */
    constructor() {
    }

}