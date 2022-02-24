export {Loja,LojaController,LojaView}

/**
 * Class LojaModel
 */
class Loja {
    /**
     * Método Construtor
     * @param {[]} artigos Refere-se a array de objetos Artigo
     */
    constructor(artigos) {
        this.artigos = artigos;
    }

    /**
     *Método que permite verificar a viabilidade de compra de determinado artigo de acordo com as modedas disponiveis do jogador
     * @param {string} artigo Refere-se ao numero que identifica o artigo
     * @param {number} moedas Refere-se ao numero de moedas que o jogador dispoe
     * @returns {boolean} Retorna True caso haj disponibilidade financeira e False para o inverso
     */
    verifyArtigoEnabletoBuy(artigo,moedas){
        return moedas >= this.artigos[artigo].getPreco();
    }

    /**
     * Método que permite verificar se existe determinado artigo em inventário do jogador
     * @param {string} artigo Refere-se ao identificado do artigo
     * @param {[]} inventario do jogador
     * @returns {boolean} Retorna booleano confirmando a existencia ou não existencia de determinado artigo
     */
    verifyArtigoEnablebyQuantity(artigo,inventario){
        return inventario.has(this.artigos[artigo].getNome())
    }

    // updateNItens(artigo){
    //     this.artigos[artigo].addNItens();
    // }
    //
    // getQtNItens(artigo){
    //     return this.artigos[artigo].getNItens();
    // }

    /**
     * Método que permite validar a possibilidade de aquisição de artigos na loja
     * @param {boolean} haveMoney Refere-se ao facto de haver ou não dinheiro
     * @param {boolean} haveQt Refere-se ao facto de haver ou não qt disponivel de produto
     * @param {boolean} haveVidas Refere-se ao facto de haver ou não possibilidade de aquisição de produto em virtude de vidas disponiveis
     * @param {number} artigo Refere-se a codigo identificado de artigo
     */
    updateAddBtn(haveMoney, haveQt, haveVidas, artigo){
        if (!(artigo === "10")) {
            if (haveMoney && !(haveQt)) {
                this.artigos[artigo].enableArtigoBuyBtn(artigo);
            } else {
                this.artigos[artigo].disableBuyBtn(artigo);
            }
        } else {
            if (( haveMoney  && !(haveVidas)) || (!(haveMoney)  && haveVidas) || (!(haveMoney) && !(haveVidas))) {
                this.artigos[artigo].disableBuyBtn(artigo);
            } else {
                this.artigos[artigo].enableArtigoBuyBtn(artigo);
            }
        }
    }

    /**
     * Método que retorna o preço de determinado artigo de acordo com o parâmetro
     * @param {number} artigo Refere-se a codigo identificado de artigo
     * @returns {number} Retorna preço de artigo
     */
    getPreco(artigo){
        return this.artigos[artigo].getPreco();
    }

    // getArtigoQT(artigo){
    //     return this.artigos[artigo].getNItens();
    // }

    /**
     * Método que retorna o nome de determinado artigo de acordo com o parâmetro
     * @param {number} artigo Refere-se a codigo identificado de artigo
     * @returns {string} Retorna nome de artigo
     */
    getArtigoNome(artigo){
        return this.artigos[artigo].getNome();
    }

    /**
     * Método que retorna determinado artigo de acordo com o parâmetro
     * @param {number} artigo Refere-se a codigo identificado de artigo
     * @returns {ArtigoController} Retorna objeto Artigo
     */
    getArtigo(artigo){
        return this.artigos[artigo];
    }

}

/**
 * Class LojaController
 */
class LojaController{
    /**
     * Método Construtor
     * @param {Loja} model Refere-se ao model de Carteira
     * @param {LojaView} view Refere-se à View de Carteira
     */
    constructor(model,view) {
        this.model = model;
        this.view = view;
    }

    /**
     * Método que permite controlar se determinados artigos ainda têm a possibilidade de serem adquiridos na Loja
     * @param {PlayerController} jogador Refere-se a objeto do tipo Player
     */
    showArtigosLoja(jogador){
        let haveQt;
        let haveMoney;
        let haveVidas;
        for (let i in this.model.artigos){
            if (i === "0" || i === "1" || i === "2" || i === "5" || i === "6" || i === "7" || i === "8" || i === "9" || i === "10" ){
                haveMoney = this.model.verifyArtigoEnabletoBuy(i, jogador.getCarteira().getMoedas());

                if (i === "0" || i === "1" || i === "2"){                   // Verifica a quantidade das chaves
                    haveQt = this.model.verifyArtigoEnablebyQuantity(i,jogador.model.inventario);
                } else if (i === "10") {
                    haveVidas = jogador.getVidas() < 5;
                }
                else {
                    haveQt = false
                }
                this.model.updateAddBtn(haveMoney, haveQt,haveVidas, i);
            }
        }
    }

    /**
     * Método que retorna o preço de determinado artigo de acordo com o parâmetro
     * @param {number} artigo Refere-se a codigo identificado de artigo
     * @returns {number} Retorna preço de artigo
     */
    getPreco(artigo){
        return this.model.getPreco(artigo);
    }

    /**
     * Método que retorna o nome de determinado artigo de acordo com o parâmetro
     * @param {number} artigo Refere-se a codigo identificado de artigo
     * @returns {string} Retorna nome de artigo
     */
    getArtigoNome(artigo){
        return this.model.getArtigoNome(artigo);
    }

    /**
     * Método que retorna determinado artigo de acordo com o parâmetro
     * @param {number} artigo Refere-se a codigo identificado de artigo
     * @returns {ArtigoController} Retorna objeto Artigo
     */
    getArt(artigo){
        return this.model.getArtigo(artigo);
    }
}

/**
 * Class LojaView
 */
class LojaView {
    /**
     * Método Construtor
     */
    constructor() {
    }


}