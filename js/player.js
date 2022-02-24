export {Player,PlayerController,PlayerView};
import {CarteiraController} from "./carteira.js";

/**
 * Class ModelPlayer
 */
class Player {


    /**
     * Método Construtor
     * @param {number} id o ID do jogador. Pode ser 1 ou 2
     * @param {CarteiraController} carteira Refere-se ao ojecto Carteira
     * @param {string} nome Refere-se ao objeto nome referente oa PLayer
     */
    constructor(carteira, nome, id) {
        this.id = id;
        this.inventario = new Map; //{Nome artigo: quantidade}
        this.nome = nome
        this.carteira = carteira;
        this.vidas = 1;
        this.actualPosition = 0;
        this.mapParts = 2;
        this.die = false;
        this.jogavel = true;
    }

    /**
     * Método que permite remover 1 und. de vida ao jogador
     */
    removeVida(){
        this.vidas -- ;
    }

    /**
     * Método que permite remover 1 und. de vida ao jogador
     */
    addVida(){
        this.vidas ++ ;
    }

    /**
     * Método que permite adicionar 1 und. de partes de mapa
     */
    addMapParts(){
        this.mapParts ++ ;
    }

    /**
     * Método que permite obter as mapParts do PLayer
     * @returns {number} Refere-se ao numero de mapParts
     */
    getMapParts(){
        return this.mapParts;
    }

    /**
     * Método que permite remover artigo do inventario do player
     * @param {string} artigo_key Refere-se à key do Map - inventario
     */
    removeArtigo(artigo_key){
        let qt_artigo = this.inventario.get(artigo_key)
        if ((qt_artigo - 1) === 0){
            this.inventario.delete(artigo_key)
        }else {
            qt_artigo -- ;
            this.inventario.set(artigo_key, qt_artigo);
        }
    }

    /**
     * Método que permite adicionar artigo ao inventario do jogador
     * @param {ArtigoController} artigo Refere-se à key do Map - inventario
     */
    addArtigo(artigo){
        console.log(artigo)
        if (this.inventario.has(artigo.model.nome)){
            let qt_artigo = this.inventario.get(artigo.model.nome);
            qt_artigo ++;
            this.inventario.set(artigo.model.nome, qt_artigo);
        } else {
            this.inventario.set(artigo.model.nome, 1);
        }
    }

    /**
     * Método que permite verifica se o jogador tem chaves no seu inventario
     * @returns {boolean} Refere-se ao boolean que retorna a existencia de chaves em inventario ou não
     */
    playerHaveKeys(){
        return this.inventario.has("Chave Azul") || this.inventario.has("Chave Vermelha") || this.inventario.has("Chave Verde");
    }

    /**
     * Método que permite obter as chaves contidas no inventario do Jogador
     * @returns {[string]} Retorna array com as strings das chaves contidas no inventario do jogador
     */
    getKeys(){
        let keys = [];
        if (this.inventario.has("Chave Azul")){
            keys.push("Chave Azul")
        }
        if (this.inventario.has("Chave Vermelha")){
            keys.push("Chave Vermelha")
        }
        if (this.inventario.has("Chave Verde")) {
            keys.push("Chave Verde")
        }
        return keys;
    }

    getId(){
        return this.id;
    }
}

/**
 * Class PlayerController
 */
class PlayerController{
    /**
     * Método Construtor
     * @param {Player} model Refere-se ao model de Player
     * @param {PlayerView} view Refere-se à view de Player
     */
    constructor(model,view) {
        this.model = model;
        this.view = view;
        this.view.showPlayerPos(this.model.actualPosition, this.model.getId())
    }

    getId(){
        return this.model.getId();
    }

    getJogavel(){
        return this.model.jogavel;
    }

    setPlayerJogavel(){
        this.model.jogavel = true;
    }

    setPlayerNotJogavel(){
        this.model.jogavel = false;
    }

    /**
     * Método que permite saber se jogador perdeu
     * @returns {boolean} Refere-se ao booleano que retorna se jogador perdeu ou não
     */
    getDie(){
        return this.model.die;
    }

    /**
     * Método que permite obter o nome do jogador
     * @returns {string} Refere-se ao nome do jogdor
     */
    getNome(){
        return this.model.nome;
    }

    /**
     * Método que retorna o valor das mapParts
     * @returns {number} Refere-se ao valor dos mapParts do jogador
     */
    getMapParts(){
        return this.model.getMapParts();
    }

    /**
     * Método que retorna um array com as keys detidas pelo jogador
     * @returns {[string]} Refere-se ao arrays com as strings das keys do jogador
     */
    getKeys(){
        return this.model.getKeys();
    }

    /**
     * Método que retorna a confirmação da existência de keys no inventário do jogador
     * @returns {boolean} Refere-se ao valor booleano obtido pela existencia de keys no inventário do jogador ou não
     */
    playerHaveKeys(){
        return this.model.playerHaveKeys();
    }

    /**
     * Método que retorna objeto Carteira
     * @returns {CarteiraController} Refere-se ao objeto carteira
     */
    getCarteira(){
        return this.model.carteira;
    }

    /**
     * Método que retorna atributo vidas do jogador
     * @returns {number} Refere-se ao atributo vidas do jogador
     */
    getVidas(){
        return this.model.vidas;
    }

    /**
     * Método que remove remove valor ao atributo vidas do jogador.
     */
    removeVida(){
        this.model.removeVida();
        this.updateVidas();
    }

    /**
     * Método que adiciona valor ao atributo vidas do jogador.
     */
    addVida(){
        this.model.addVida();
    }

    /**
     * Método que permite incrementar moedas
     * @param {number} x Refere-se ao numero de moedas a incrementar
     */
    addMoeda(x){
        this.model.carteira.addMoeda(x);
        this.model.carteira.showMoedas()
    }

    /**
     * Método que permite atualizar na View e no Model a  posição atual do jogador
     * @param {number} valor Refere-se ao valor que saiu no dado
     */
    updateAtualPositon(valor){
        //console.log(valor);
        this.view.deletePlayerPos(this.model.actualPosition, this.model.getId())
        if (this.model.actualPosition+valor>50) {
            this.model.actualPosition = (this.model.actualPosition + valor) % 50;
        }else {
            this.model.actualPosition += valor;
        }
        this.view.showPlayerPos(this.model.actualPosition, this.model.id);
    }

    /**
     * Método que permite lançar na view a amostragem do numero de vidas do utilizador
     */
    updateVidas(){
        if (this.getVidas() === 0) {
            this.model.die = true;
        }
            this.view.showPlayerVidas(this.model.vidas);
    }

    /**
     * Método permite mostrar na view as moedas do jogador
     */
    showMoedas(){
        this.model.carteira.showMoedas();
    }

    /**
     * Método retorna a posição atual do jogador
     * @returns {number} Refere-se ao valor da posição atual do jogador
     */
    getActualPosition(){
        return this.model.actualPosition;
    }

    /**
     * Método adiciona no Map Inventário artigo comprado e atualiza o valor em moedas na carteira do jogador
     * @param {ArtigoController} artigo Refere-se codigo identificador do artigo
     */
    comprarArt(artigo){
        if (artigo.model.nome === "Cozido das Furnas") {
            this.model.carteira.removeMoeda(artigo.model.preco);
            this.addVida();
            this.updateVidas();
        }
        else {
            this.model.addArtigo(artigo);
            this.model.carteira.removeMoeda(artigo.model.preco);
        }

        this.model.carteira.showMoedas();
    }

    /**
     * Método permite mostar na View o atual inventário do jogador
     */
    updateInventario(){
        this.view.showInventario(this.model.inventario)
    }

    /**
     * Método permite adicionar mapParts atualiza na view e caso seja 3 mapParts mostra o jogador vencedor
     */
    addMapParts(){
        this.model.addMapParts();
        this.updateMapParts();
        if (this.model.mapParts === 3)
            this.view.winPartsMapSA(this.model.mapParts, this.model.nome);
        else
            this.view.PartsMapSA(this.model.mapParts);
    }

    /**
     * Método permite atualizar na view a quantidade de mapParts do jogdor
     */
    updateMapParts(){
        this.view.showMapParts(this.model.mapParts);
    }

    /**
     * Método para executar regras asociadas à casa de São Miguel
     * @param {PlayerController} jogador Refere-se ao jogador em causa
     */
    saoMiguel(jogador){
        if (this.model.inventario.has("Protetores Solares") && this.model.inventario.has("Garrafas de Água")){
            let artigos = ["Protetores Solares","Garrafas de Água"]
            this.model.removeArtigo("Protetores Solares");
            this.model.removeArtigo("Garrafas de Água");
            this.updateInventario();
            this.view.inventarioGastosSaoMiguelSA(artigos)
        }else {
            this.view.dieSaoMiguelSA(jogador.getNome())
            jogador.model.die = true;
        }
    }

    /**
     * Método para executar regras asociadas à casa da Garciosa
     * @param {PlayerController} jogador Refere-se ao jogador em causa
     */
    graciosa(jogador) {
        if (this.model.inventario.has("Máscaras") && this.model.inventario.has("Garrafas de Água") && this.model.inventario.has("Cordas")){
            let artigos = ["Máscaras","Garrafas de Água","Cordas"]
            this.model.removeArtigo("Máscaras");
            this.model.removeArtigo("Garrafas de Água");
            this.model.removeArtigo("Cordas");
            this.updateInventario();
            this.view.inventarioGastosGarciosaSA(artigos)
        }else {
            this.view.dieGraciosaSA(jogador.getNome())
            jogador.model.die = true;
        }
    }

    /**
     * Método para executar regras asociadas à casa do Pico
     * @param {PlayerController} jogador Refere-se ao jogador em causa
     */
    pico(jogador) {
        if (this.model.inventario.has("Cordas")){
            let artigos = ["Cordas"]
            this.model.removeArtigo("Cordas");
            this.updateInventario();
            this.view.inventarioGastosPicoSA(artigos)
        }else {
            this.view.diePicoSA(jogador.getNome());
            jogador.model.die = true;
        }
    }

    /**
     * Método que permite mostrar mensagem após resposta errada
     */
    unsucessResponseSA(){
        this.view.unsucessResponseSA(this.getVidas());
    }

    /**
     * Método que permite mostrar mensagem após o jogador perder
     */
    getDiedSA(){
        this.view.getDie(this.getNome());
    }
    /**
     * Método que permite mostrar mensagem após resposta acertada
     */
    sucessResponseSA(){
        this.view.sucessResponseSA(this.getCarteira().getMoedas());
    }
    /**
     * Método que permite mostrar mensagem após encontrado o vencedor
     */
    getWinner(){
        this.view.getWinner(this.getNome());
    }

    noKeysSA(){
        if (this.getVidas() === 0)
            this.view.noKeysDeathSA(this.getVidas());
        else
            this.view.noKeysSA(this.getVidas());
    }

    comunitaryServiceContinued(){
        this.view.comunitaryServiceContinued();
    }

    showNewGame(){
        this.view.newGame(this.getNome());
    }
}

/**
 * Class PlayerView
 */
class PlayerView{

    /**
     * Método que apaga a antiga posição do jogador
     * @param {number} pos Refere-se ao identificador da casa
     * @param {number} id o ID do jogador (1 ou 2)
     */
    deletePlayerPos(pos,id){
        document.getElementById("c"+pos+"p"+id).innerHTML = "";
    }

    /**
     * Método que mostra o inventário
     * @param {Map} inventario Refere-se ao Map de artigos detidos pelo jogador
     */

    showInventario(inventario){
        let inv = document.getElementById("inv_body")
        inv.innerHTML = "";
        for (let artigo of inventario.entries()){
            let strHtml = `
            <div class="row">
            <div class="col text-left">
               <p>${artigo[0]}</p>
            </div>
            <div class="col-3 text-right">
               <p>${artigo[1]}</p> 
            </div>
            </div>        
            `;
            inv.innerHTML += strHtml;
        }
    }

    /**
     * Este método irá avançar com a peça de acordo com o valor recebido, vindo do Dado.
     * @param {number} pos Valor vindo do Dado que indica o número de casas a avançar.
     * @param {number} id o id do utilizador. É usado para selecionar o icon correspondente
     */
    showPlayerPos(pos,id) {
        document.getElementById("c"+pos+"p"+id).innerHTML =
            `<i class="player${id} fas fa-chess-king"></i>`;
        //document.getElementById("casa"+pos).innerHTML = nome;
    }

    /**
     * Este método irá mostrar o montante de vidas associadas ao jogador
     * @param vidas
     */
    showPlayerVidas(vidas){
        document.getElementById("vidas").innerText = vidas;
    }

    /**
     * Este método irá mostrar o montante de partes de mapa conseguidas pelo jogador
     * @param mapParts
     */
    showMapParts(mapParts){
        document.getElementById("mapParts").innerText = mapParts+"/3";
    }

    /**
     * Método para mostrar mensagem de mapPart obtida
     * @param {number} mapParts Refere-se ao numero de mapParts que o jogador detém
     * @constructor
     */
    PartsMapSA(mapParts){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Boa',
            text: 'Agora tens ' + mapParts + ' parte(s) do mapa',
            showConfirmButton: false,
            timer: 3500
        });
    }

    /**
     * Método para mostrar mensagem de insucesso do jogador na casa de São Miguel
     * @param {string} nome Refere-se ao nome do jogador
     */
    dieSaoMiguelSA(nome){
        Swal.fire({
            imageUrl: 'css/img/skull.png',
            imageHeight: 200,
            title: 'Não estavas preparado...morreste.',
            html:"Precisavas de protetor solar e uma garrafa de água.",
            showConfirmButton: false,
        })
    }

    /**
     * Método para mostrar mensagem de insucesso do jogador na casa da Graciosa
     * @param {string} nome Refere-se ao nome do jogador
     */
    dieGraciosaSA(nome){
        Swal.fire({
            imageUrl: 'css/img/skull.png',
            imageHeight: 200,
            title: 'Não estavas preparado...morreste.',
            html:"Precisavas de uma máscara, garrafa de água e uma corda.",
            showConfirmButton: false,
        })
    }

    /**
     * Método para mostrar mensagem de insucesso do jogador na casa do Pico
     * @param {string} nome Refere-se ao nome do jogador
     */
    diePicoSA(nome){
        Swal.fire({
            imageUrl: 'css/img/skull.png',
            imageHeight: 200,
            title: 'Não estavas preparado...',
            html:"Precisavas de uma corda.",
            showConfirmButton: false,
        })
    }

    /**
     * Método para mostrar a mensagem de jogador vencedor, quando a vitoria seja conseguida pela totalidade das maspParts
     * @param {number} mapParts Refere-se ao numero de mapParts detidas pelo jogador
     * @param {string} playerName Refere-se ao nome do jogador
     */
    winPartsMapSA(mapParts, playerName){
        Swal.fire({
            imageUrl: 'css/img/crown.png',
            imageHeight: '200',
            title: 'PARABÉNS! '+ playerName +' conseguiste todas as partes do mapa.',
            text: 'Clica no botão abaixo para jogares novamente.',
            confirmButtonText: `Jogar novamente`,
        }).then((result) => {
            if (result.isConfirmed) {
                location.replace("menu.html");
            }
        })
    }

    /**
     * Método que permite mostrar mensagem após resposta errada
     * @param {number} vidas Refere-se às numero atual de vidas do jogador
     */
    unsucessResponseSA(vidas){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Falhaste',
            text: 'Perdeste uma vida. Tens agora '+vidas+' vidas.Mais atenção para a próxima!',
            showConfirmButton: false,
            timer: 3500
        });
    }

    /**
     * Método que permite mostrar mensagem após resposta acertada
     * @param {number} moedas Refere-se às numero atual de moedas do jogador
     */
    sucessResponseSA(moedas){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Boa !!',
            text: 'Ganhaste uma moeda! Agora tens ' + moedas + ' moeda(s)',
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem após jogador perder
     * @param {string} nome Refere-se ao nome do jogador
     */
    getDie(nome){
        Swal.fire({
            imageUrl: 'css/img/skull.png',
            imageHeight: 200,
            title: 'Oh...! O '+nome+' morreu.',
            showConfirmButton: false,
        })
    }

    /**
     * Método que permite mostrar mensagem após se ter encontrado o vencedor
     * @param {string} nome Refere-se ao nome do jogador
     */
    getWinner(nome){
        Swal.fire({
            imageUrl: 'css/img/crown.png',
            imageHeight: 200,
            title: 'PARABÉNS! Ganhaste o jogo '+nome,
            text: 'Clica no botão abaixo para jogar novamente.',
            confirmButtonText: `Jogar novamente`,
        }).then((result) => {
            if (result.isConfirmed) {
                location.replace("menu.html");
            }
        })
    }

    /**
     * Método que permite mostrar mensagem após perder um vida numa Casa Especial
     * @param {number} vidas Refere-se ao numero de vidas atuais do jogador
     */
    noKeysSA(vidas){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Não tens chaves',
            text: 'Perdeste uma vida. Tens agora '+vidas+' vidas!',
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem após perder um vida numa Casa Especial, com jogador sem Vidas
     * @param {number} vidas Refere-se ao numero de vidas atuais do jogador
     */
    noKeysDeathSA(vidas){
        Swal.fire({
            imageUrl: 'css/img/skull.png',
            imageHeight: 200,
            position: 'center',
            title: 'Não tens chaves e perdeste a tua última vida !!!!!!',
            text: 'Tens agora '+vidas+' vidas!',
            showConfirmButton: false,
            timer: 3500
        })
    }


    /**
     * Método que permite mostrar mensagem após gastar artigos numa Casa Especial
     * @param {[string]} artigos Refere-se aos artigos a mostrar
     */
    inventarioGastosSaoMiguelSA(artigos){
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Inventario Update',
            html: "Foram gastos os seguintes artigos : <br><b>" + artigos [0] +"</b><br><b>" + artigos[1] + "</b>",
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem após gastar artigos numa Casa Especial
     * @param {[string]} artigos Refere-se aos artigos a mostrar
     */
    inventarioGastosGarciosaSA(artigos){
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Inventario Update',
            html: "Foram gastos os seguintes artigos : <br><b>" + artigos [0] +"</b><br><b>" + artigos[1] + "</b><br><b>" + artigos[2] +"</b>",
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem após gastar artigos numa Casa Especial
     * @param {[string]} artigos Refere-se aos artigos a mostrar
     */
    inventarioGastosPicoSA(artigos){
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Inventario Update',
            html: "Foram gastos os seguintes artigos : <br><b>" + artigos [0] +"</b><br><b>" + artigos[1] + "</b><br><b>" + artigos[2] +"</b>",
            showConfirmButton: false,
            timer: 3500
        })
    }

    /**
     * Método que permite mostrar mensagem quando o utilizador está em serviço comunitário
     */
    comunitaryServiceContinued(){
        Swal.fire(
            'Serviço Comunitário',
            'Ainda não respondeste acertadamente ? <br> Ah pois, continuas em Serviço Comunitário !!',
            'info'
        );
    }

    /**
     * Método para mostrar mensagem novo jogo
     * @param {string} nome Refere-se ao nome do jogador
     */
    newGame(nome){
        Swal.fire({
            imageUrl: 'css/img/restart.png',
            imageHeight: 200,
            title: 'Vai um nova Partida ' + nome +'? ',
            confirmButtonText: `Jogar novamente`,
        }).then((result) => {
            if (result.isConfirmed) {
                location.replace("menu.html");
            }
        })
    }
}

