export {Artigo, ArtigoController, ArtigoView};

/**
 * Class ModelArtigo
 */
class Artigo{
    /**
     * Método Construtor
     * @param {string}nome Refere-se ao nome do artigo
     * @param {number} preco Refere-se ao preço do artigo
     */
    constructor(nome,preco) {
        this.nome = nome;
        this.preco = preco;
    }

    /**
     * Método que permite obter o preço do artigo
     * @returns {number} Refere-se ao preco do artigo
     */
    getPreco(){
        return this.preco;
    }

    /**
     * Método que permite obter o nome do artigo
     * @returns {string} Refere-se ao nome do artigo
     */
    getNome(){
        return this.nome;
    }
}

/**
 * Class ArtigoController
 */
class ArtigoController{
    /**
     * Método Construtor
     * @param {Artigo} model Refere-se ao model de Artigo
     * @param {ArtigoView} view Refere-se á view de Artigo
     */
    constructor(model,view) {
        this.model = model;
        this.view = view;
    }

    /**
     * Método que permite obter do ModelArtigo preco do artigo
     * @returns {number} Refere-se ao preço do artigo
     */
    getPreco(){
        return this.model.getPreco();
    }

    /**
     * Método que permite na ArtigoView colocar o botão para aquisição do artigo a enable
     * @param {number} i Refere-se ao índice do artigo
     */
    enableArtigoBuyBtn(i){
        this.view.enableArtigoBuyBtn(i);
    }
    /**
     * Método que permite na ArtigoView colocar  o botão para aquisição do artigo a disable
     * @param {number} i Refere-se ao índice do artigo
     */
    disableBuyBtn(i){
        this.view.disableBuyBtn(i);
    }
    /**
     * Método que permite obter do ModelArtigo nome do artigo
     * @returns {string} Refere-se ao nome do artigo
     */
    getNome(){
        return this.model.getNome();
    }

    /**
     * Método que mostra mensagem quando adquirido artigo
     */
    compraArtSA(){
        if (this.getNome() === "Cozido das Furnas")
            this.view.CompraArtCozidoFurnasSA(this.getNome());
        else if (this.getNome() === "Viagem de Barco para ver as Baleias")
            this.view.showCompra12SA(this.getPreco());
        else if (this.getNome() === "Tourada à Corda")
            this.view.showCompra11SA(this.getPreco());
        else if (this.getNome() === "Viagem Guida à Fajã do Santo Cristo")
            this.view.showCompra15SA(this.getPreco());
        else if (this.getNome() === "Viagem Guiada à Rocha dos Bordões")
            this.view.showCompra14SA(this.getPreco());
        else if (this.getNome() === "Viagem Guida à Lagoa do Caldeirão")
            this.view.showCompra16SA(this.getPreco());
        else
            this.view.compraArtSA(this.getNome());
    }

    notCompraArtSA(){
        if (this.getNome() === "Viagem de Barco para ver as Baleias")
            this.view.showNotCompra12SA();
        else if (this.getNome() === "Tourada à Corda")
            this.view.showNotCompra11SA(this.getPreco());
        else if (this.getNome() === "Viagem Guida à Fajã do Santo Cristo")
            this.view.showNotCompra15SA(this.getPreco());
        else if (this.getNome() === "Viagem Guiada à Rocha dos Bordões")
            this.view.showNotCompra14SA(this.getPreco());
        else if (this.getNome() === "Viagem Guida à Lagoa do Caldeirão")
            this.view.showNotCompra16SA(this.getPreco());
    }



}

/**
 * Class ArtigoView
 */
class ArtigoView{
    /**
     * Método Construtor
     */
    constructor() {
    }

    /**
     * Método que permite colocar o botão para aquisição do artigo a disable
     * @param {number} i Refere-se ao índice do artigo
     */
    enableArtigoBuyBtn(i){
        document.getElementById("art"+i).disabled = false;
    }

    /**
     * Método que permite colocar  o botão para aquisição do artigo a enable
     * @param {number} i Refere-se ao índice do artigo
     */
    disableBuyBtn(i){
        document.getElementById("art"+i).disabled = true;
    }

    /**
     * Método que permite mostrar mensagem após a aquisição de produto
     * @param {string} nomeArtigo Refere-se ao nome do artigo
     */
    compraArtSA(nomeArtigo){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Boa',
            text: nomeArtigo +' adquirida(o).',
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem após a aquisição de produto
     * @param {string} nomeArtigo Refere-se ao nome do produto adquirido
     */
    CompraArtCozidoFurnasSA(nomeArtigo){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Boa',
            text: nomeArtigo +' adquirida(o). Ganhaste 1 vida extra',
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem de produto adquirido
     * @param {number} price Refere-se ao preço do produto adquirido
     */
    showCompra12SA(price){
        Swal.fire({
            imageUrl: 'css/img/casa6.svg',
            imageHeight: 100,
            position: 'center',
            icon: 'success',
            title: 'Santa Maria',
            text: 'Fizeste uma viagem para ver baleias. Custou '+price+' moedas.',
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem de produto adquirido
     * @param {number} price Refere-se ao preço do produto adquirido
     */
    showCompra11SA(price){
        Swal.fire({
            imageUrl: 'css/img/casa18.svg',
            imageHeight: 100,
            position: 'center',
            icon: 'success',
            title: 'Terceira',
            text: 'Assististe a uma tourada à corda. Custou '+ price +' moedas.',
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem de produto adquirido
     * @param {number} price Refere-se ao preço do produto adquirido
     */
    showCompra15SA(price){
        Swal.fire({
            imageUrl: 'css/img/casa33.svg',
            imageHeight: 100,
            position: 'center',
            icon: 'success',
            title: 'São Jorge',
            text: 'Fizeste uma viagem à Fajã do Santo Cristo. Custou ' + price + ' moedas.',
            showConfirmButton: false,
            timer: 3500
        })
    }
    /**
     * Método que permite mostrar mensagem de produto adquirido
     * @param {number} price Refere-se ao preço do produto adquirido
     */
    showCompra14SA(price){
        Swal.fire({
            imageUrl: 'css/img/casa40.svg',
            imageHeight: 100,
            position: 'center',
            icon: 'success',
            title: 'Flores',
            text: 'Fizeste uma viagem à Rocha dos Bordões. Custou ' + price + ' moedas.',
            showConfirmButton: false,
            timer: 3500
        })
    }
    /**
     * Método que permite mostrar mensagem de produto adquirido
     * @param {number} price Refere-se ao preço do produto adquirido
     */
    showCompra16SA(price){
        Swal.fire({
            imageUrl: 'css/img/casa42.svg',
            imageHeight: 100,
            position: 'center',
            icon: 'success',
            title: 'Corvo',
            text: 'Fizeste uma viagem à Lagoa do Caldeirão. Custou ' + price + ' moedas.',
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem de impossibilidade de aquisição de produto
     */
    showNotCompra12SA(){

        Swal.fire({
            imageUrl: 'css/img/casa6.svg',
            imageHeight: 100,
            position: 'center',
                html: '<h1>Santa Maria</h1>' +
                    'Não tens dinheiro para a viagem para ver baleias. <br> Terás de fazer trabalho comunitário !!',
        },
            'Santa Maria',
            'Não tens dinheiro para a viagem para ver baleias. <br> Terás de fazer trabalho comunitário !!',
        );
    }

    /**
     * Método que permite mostrar mensagem de impossibilidade de aquisição de produto
     */
    showNotCompra11SA(){
        Swal.fire({
                imageUrl: 'css/img/casa18.svg',
                imageHeight: 100,
                position: 'center',
        },
            'Terceira',
            'Não tens dinheiro para uma tourada à corda. <br> Terás de fazer trabalho comunitário!',
            'info'
        );
    }

    /**
     * Método que permite mostrar mensagem de impossibilidade de aquisição de produto
     */
    showNotCompra15SA(){
        Swal.fire({
            imageUrl: 'css/img/casa33.svg',
            imageHeight: 100,
            position: 'center',
        },
            'São Jorge',
            'Não tens dinheiro para uma viagem à Fajã do Santo Cristo. <br> Terás de fazer trabalho comunitário!',
            'info'
        );
    }
    /**
     * Método que permite mostrar mensagem de impossibilidade de aquisição de produto
     */

    showNotCompra14SA(){
        Swal.fire({
            imageUrl: 'css/img/casa40.svg',
            imageHeight: 100,
            position: 'center',
        },
            'Flores',
            'Não tens dinheiro para uma viagem à Rocha dos Bordões. <br> Terás de fazer trabalho comunitário !!',
            'info'
        );
    }

    /**
     * Método que permite mostrar mensagem de impossibilidade de aquisição de produto
     */
    showNotCompra16SA(){
        Swal.fire({
            imageUrl: 'css/img/casa42.svg',
            imageHeight: 100,
            position: 'center',
        },
            'Corvo',
            'Não tens dinheiro para uma viagem à Lagoa do Caldeirão. <br> Terás de fazer trabalho comunitário !!',
            'info'
        )
    }

}