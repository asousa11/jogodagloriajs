export {Jogo, JogoController,JogoView}

/**
 * Class Model Jogo
 */
class Jogo {
    /**
     * Método Construtor
     * @param {[Pergunta]} p1 Refere-se ao array de objetos Pergunta de nivel 1
     * @param {[Pergunta]} p2 Refere-se ao array de objetos Pergunta de nivel 2
     * @param {[Pergunta]} p3 Refere-se ao array de objetos Pergunta de nivel 3
     * @param {[PlayerController]}jogadores Refere-se ao array de objetos Player
     * @param {DadoController} dado Refere-se ao objeto Dado
     * @param {TabuleiroController} tabuleiro Refere-se ao objeto Tabuleiro
     * @param {LojaController} loja Refere-se ao objeto Loja
     */
    constructor(p1,p2,p3, jogadores, dado, tabuleiro,loja) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.jogadores = jogadores;
        this.loja = loja;
        this.dado = dado;
        this.tabuleiro = tabuleiro;
        this.perguntaAtual = undefined;
        // this.pecas = pecas;
        this.jogada = 0;
        this.jogadorAtual = this.getProximoJogador();
    }

    /**
     * Método aplica objeto Pergunta ao atributo perguntaAtual
     * @param {PerguntaController} pergunta Refere-se ao objeto Pergunta
     */
    setPerguntaAtual(pergunta){
        this.perguntaAtual = pergunta;
    }

    /**
     * Método que retorna conteudo do atributo perguntaAtual
     * @returns {Pergunta} Refere-se ao conteudo do atributo perguntaAtual
     */
    getPerguntaAtual(){
        return this.perguntaAtual;
    }

    /**
     * Retorna o próximo jogador
     * @returns {PlayerController} Retorna objeto player
     */
    getProximoJogador(){

        let lastPlayerDied;
        let lastPlayerHaveAllMapParts;
        if (this.jogadorAtual !== undefined){
            lastPlayerDied = this.jogadorAtual.getDie(); // jogador atual antes de fazer a troca
            lastPlayerHaveAllMapParts = this.jogadorAtual.getMapParts() === 3;
        }
        if (this.p1.length + this.p2.length + this.p3.length > 0) {
            if (!(lastPlayerHaveAllMapParts)) {
                if (this.jogadores.length > 1) {
                    if (this.jogada % 2 === 0) {
                        this.jogadorAtual = this.jogadores[0];
                    } else {
                        this.jogadorAtual = this.jogadores[1];
                    }

                    if (lastPlayerDied) {
                        this.jogadorAtual.getWinner(); // Vencedor pelas Vidas 2 players
                    }

                } else {
                    this.jogadorAtual = this.jogadores[0];
                    if (lastPlayerDied)
                        this.jogadorAtual.showNewGame();
                }
            }

        } else {
            this.showNewGame(); // Termina por não haver perguntas suficientes
        }

        this.jogadorAtual.updateInventario();
        this.jogadorAtual.updateMapParts();
        this.jogadorAtual.showMoedas();
        this.jogadorAtual.updateVidas();
        this.loja.showArtigosLoja(this.jogadorAtual);
        return this.jogadorAtual;
    }

    /**
     * Método que retorna uma pergunta aleatória de acordo com o nivel pretendido
     * @param nivel Referente ao nivel pretendido para a pergunta a ser feita
     * @returns {PerguntaController} Retorna o PerguntaController da pergunta a ser feita
     */
    getPergunta(nivel){
        let pergunta;
        if (nivel === "1"){
            const index = Math.floor(Math.random()*this.p1.length);
            pergunta = this.p1[index];
            this.p1.splice(index,1);
        } else if (nivel === "2"){
            const index = Math.floor(Math.random()*this.p2.length);
            pergunta = this.p2[index];
            this.p2.splice(index,1);
        } else {
            const index = Math.floor(Math.random()*this.p3.length);
            console.log(this.p3[0])
            pergunta = this.p3[index];
            this.p3.splice(index,1);
        }
        return pergunta;
    }

    /**
     * Método que permite mostrar um timer durante o jogo
     */
    startTimer(){
        let sec = 0;
        function pad ( val ) { return val > 9 ? val : "0" + val; }
        setInterval( function(){
            document.getElementById("seconds").innerHTML=pad(++sec%60);
            document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
        }, 1000);
    }
}

/**
 * Classe JogoController
 * Recebe como parâmetros o ModelJogo e ViewJogo Inerentes
 * Detém ainda os Eventlisteners necessários e métodos para o arranque normal do jogo
 */
class JogoController {
    /**
     * Método Construtor
     * @param {Jogo} model Refere-se ao model do Jogo
     * @param {JogoView} view Refere-se à view do Jogo
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
        document.getElementById("dado-button").addEventListener('click',this.btnLancarDadoPressed.bind(this));
        let frmNivel = document.getElementById("frmNivel");
        frmNivel.addEventListener('submit', this.getNivel.bind(this));
        let frmPergunta = document.getElementById("frmPergunta")
        frmPergunta.addEventListener('submit', this.verificaResposta.bind(this));
        let frmChaves = document.getElementById("frmChaves");
        frmChaves.addEventListener('submit', this.getChaveEscolhida.bind(this));

        document.getElementById("shop-button").addEventListener('click', this.abrirLoja.bind(this));
        document.getElementById("close-button").addEventListener('click', this.fecharLoja.bind(this));
        document.getElementById("def-button").addEventListener('click', this.handleDefinicoes.bind(this));

        document.getElementById("art0").addEventListener('click',this.art0Pressed.bind(this));
        document.getElementById("art1").addEventListener('click',this.art1Pressed.bind(this));
        document.getElementById("art2").addEventListener('click',this.art2Pressed.bind(this));
        document.getElementById("art5").addEventListener('click',this.art5Pressed.bind(this));
        document.getElementById("art6").addEventListener('click',this.art6Pressed.bind(this));
        document.getElementById("art7").addEventListener('click',this.art7Pressed.bind(this));
        document.getElementById("art8").addEventListener('click',this.art8Pressed.bind(this));
        document.getElementById("art9").addEventListener('click',this.art9Pressed.bind(this));
        document.getElementById("art10").addEventListener('click',this.art10Pressed.bind(this));

        this.view.showJogadorAtual(this.model.jogadorAtual.getNome(), this.model.jogadorAtual.getId());
        this.model.startTimer();

    }

    /**
     * Método cuja responsabilidade é a de inserir num arrays os niveis, caso o array da pergunta correspondente ainda tenha perguntas disponiveis
     * @returns {[number]} Refere-se ao array dos niveis
     */
    getAvailableNiveis(){
        let niveisList = [];
        if (this.model.p1.length > 0){
            niveisList.push(1);
        }
        if (this.model.p2.length > 0){
            niveisList.push(2);
        }
        if (this.model.p3.length > 0){
            niveisList.push(3);
        }
        return niveisList;
    }

    /**
     * Método que permite 'fechar' a loja e voltar a mostrar o tabuleiro de jogo.
     */
    fecharLoja(){
        document.getElementById("tabuleiro").style.visibility = "visible";
        document.getElementById("tabuleiro").style.display = "block";
        document.getElementById("loja").style.visibility = "hidden";
        document.getElementById("loja").style.display = "none";
    }

    /**
     * Método que permite mostrar a loja.
     */
    abrirLoja(){
        document.getElementById("tabuleiro").style.visibility = "hidden";
        document.getElementById("tabuleiro").style.display = "none";
        document.getElementById("loja").style.visibility = "visible";
        document.getElementById("loja").style.display = "block";
    }

    /**
     * Método que permite abrir e fechar as definições de jogo.
     */
    handleDefinicoes(){
        if (document.getElementById("music").style.visibility === "visible"){
            document.getElementById("music").style.visibility = "hidden"
        } else {
            document.getElementById("music").style.visibility = "visible"
        }
    }

    /**
     * Método que permite obter um random number qaundo o dado é lançado
     */
    btnLancarDadoPressed() {
        this.view.hidePergunta();
        this.model.jogada ++;
        if (this.model.jogadorAtual.getJogavel()){
            this.model.dado.lancarDado();
            //////////////////////////////////////////////
            // this.model.jogadorAtual.updateAtualPositon(12);
            // console.log(this.model.tabuleiro.getCasa(this.model.jogadorAtual.getActualPosition()))
            /////////////////////////////////////////////////
            this.model.jogadorAtual.updateAtualPositon(this.model.dado.getValor());
        }
        let pos = this.model.jogadorAtual.getActualPosition();
        this.casasEspeciais(pos);
    }

    /**
     * Método que permite tomar decisões de acordo com a posição/casa que calhou
     * Se for uma Casa Especial, deverá executar funções proprias referentes a esta
     * @param {number} pos Referente à posição / casa obtida no tabuleiro
     */
    casasEspeciais(pos){
        if (this.model.tabuleiro.checkCasaEspecial(pos)){
            let loja = this.model.loja;
            let carteira = this.model.jogadorAtual.getCarteira();
            let player = this.model.jogadorAtual;
            switch (true){
                case (pos === 6): // Santa Maria
                    if (carteira.getMoedas() >= loja.getPreco(12)) {
                        let artigo = this.model.loja.getArt(12);
                        // this.model.jogadorAtual.comprarArt(artigo);
                        artigo.compraArtSA();
                        this.delay()
                    }else {
                        if (this.model.jogadorAtual.getJogavel()){
                            let artigo = this.model.loja.getArt(12);
                            artigo.notCompraArtSA();
                            this.model.jogadorAtual.setPlayerNotJogavel();
                        } else {
                            this.model.jogadorAtual.comunitaryServiceContinued();
                        }
                        this.view.lancaNivel(this.getAvailableNiveis());
                    }
                    break;
                case (pos === 12): // São Miguel --- Special
                    if (player.playerHaveKeys()){
                        let playerKeys = player.getKeys();
                        this.view.lancaChaves(playerKeys);
                    } else {
                        // Não tem Chaves
                        player.removeVida();
                        player.noKeysSA();
                        this.delay();
                    }
                    break;
                case (pos === 25): // Graciosa --- Special
                    if (player.playerHaveKeys()){
                        let playerKeys = player.getKeys();
                        this.view.lancaChaves(playerKeys);
                    } else {
                        // Não tem Chaves
                        player.removeVida();
                        player.noKeysSA();
                        this.delay();
                    }
                    break;
                case (pos === 49): // Pico --- Special
                    if (player.playerHaveKeys()){
                        let playerKeys = player.getKeys();
                        this.view.lancaChaves(playerKeys);
                    } else {
                        // Não tem Chaves
                        player.removeVida();
                        player.noKeysSA();
                        this.delay();
                    }
                    break;

                case (pos === 18): // Terceira
                    if (carteira.getMoedas() >= loja.getPreco(11)) {
                        let artigo = this.model.loja.getArt(11);
                        // this.model.jogadorAtual.comprarArt(artigo);
                        artigo.compraArtSA();
                        this.delay()
                    }
                    else {
                        if (this.model.jogadorAtual.getJogavel()){
                            let artigo = this.model.loja.getArt(11);
                            artigo.notCompraArtSA();
                            this.model.jogadorAtual.setPlayerNotJogavel();
                        } else {
                            this.model.jogadorAtual.comunitaryServiceContinued();
                        }
                        this.view.lancaNivel(this.getAvailableNiveis());
                    }
                    break;
                case (pos === 33): // São Jorge
                    if (carteira.getMoedas() >= loja.getPreco(15)) {
                        let artigo = this.model.loja.getArt(15);
                        // this.model.jogadorAtual.comprarArt(artigo);
                        artigo.compraArtSA();
                        this.delay()
                    }
                    else {
                        if (this.model.jogadorAtual.getJogavel()){
                            let artigo = this.model.loja.getArt(15);
                            artigo.notCompraArtSA();
                            this.model.jogadorAtual.setPlayerNotJogavel();
                        } else {
                            this.model.jogadorAtual.comunitaryServiceContinued();
                        }
                        this.view.lancaNivel(this.getAvailableNiveis());
                    }
                    break;
                case (pos === 40): // Flores
                    if (carteira.getMoedas() >= loja.getPreco(14)) {
                        let artigo = this.model.loja.getArt(14);
                        // this.model.jogadorAtual.comprarArt(artigo);
                        artigo.compraArtSA();
                        this.delay()
                    }
                    else {
                        if (this.model.jogadorAtual.getJogavel()){
                            let artigo = this.model.loja.getArt(14);
                            artigo.notCompraArtSA();
                            this.model.jogadorAtual.setPlayerNotJogavel();
                        } else {
                            this.model.jogadorAtual.comunitaryServiceContinued();
                        }
                        this.view.lancaNivel(this.getAvailableNiveis());
                    }
                    break;
                case (pos === 42): // Corvo
                    if (carteira.getMoedas() >= loja.getPreco(16)) {
                        let artigo = this.model.loja.getArt(16);
                        // this.model.jogadorAtual.comprarArt(artigo);
                        artigo.compraArtSA();
                        this.delay()
                    }else {
                        if (this.model.jogadorAtual.getJogavel()){
                            let artigo = this.model.loja.getArt(16);
                            artigo.notCompraArtSA();
                            this.model.jogadorAtual.setPlayerNotJogavel();
                        } else {
                            this.model.jogadorAtual.comunitaryServiceContinued();
                        }
                        this.view.lancaNivel(this.getAvailableNiveis());
                    }
                    break;
            }
        }else {
            this.view.lancaNivel(this.getAvailableNiveis());
        }
    }

    /**
     * Método que permite obter o nivel através do value da tag "nivel"
     * @param {Event} event evento que despoleta a acção
     */
    getNivel(event){
        event.preventDefault();
        let nivel = document.getElementById("nivel").value;
        this.obterPergunta(nivel)
    }

    /**
     * Método que permite verifica a Chave é compativel por forma a abrir o cofre
     * @param {string} cofre referente à string do cofre (ex: Cofre Azul)
     * @param {string} chave referente à string da chave (ex: Chave Azul)
     * @returns {boolean} retorna booleano true caso seja a chave adequada para o cofre, ou false quando contrário
     */
    checkIgualdadeCofreChave(cofre, chave){
        return (cofre === "Cofre Azul" && chave === "Chave Azul") || (cofre === "Cofre Vermelho" && chave === "Chave Vermelha") || (cofre === "Cofre Verde" && chave === "Chave Verde");
    }

    /**
     * Método para que caso seja uma das 3 casas + especiais, possa executar 1 dos seguintes métodos:
     * Adicione um parte do mapa caso se verifique a condição
     * Caso contrário é executado o método dedicado à casa
     * @param event evento que despoleta a acção
     */
    getChaveEscolhida(event){
        event.preventDefault();
        let chave = document.getElementById("chave").value;
        let jogador = this.model.jogadorAtual;

        //obter cofre da casa especial
        let cofre = this.model.tabuleiro.getCofre(jogador.getActualPosition());

        if (this.checkIgualdadeCofreChave(cofre,chave)){
            jogador.addMapParts();
        }else {
            if (jogador.getActualPosition() === 12){
                jogador.saoMiguel(jogador);
            }
            if (jogador.getActualPosition() === 25){
                jogador.graciosa(jogador);
            }
            if (jogador.getActualPosition() === 49){
                jogador.pico(jogador);
            }
        }
        this.view.hideChaves();
        this.delay();
    }

    /**
     * Método que permite obter a pergunta e mostrar na view a pergunta
     * @param nivel evento que despoleta a acção
     */
    obterPergunta(nivel){
        let pergunta = this.model.getPergunta(nivel);
        this.model.setPerguntaAtual(pergunta)
        this.lancaQuestao(pergunta);
    }

    /**
     * Método para mostrar na View a pergunta
     * @param {PerguntaController} pergunta referente à pergunta obtida
     */
    lancaQuestao(pergunta){
        this.view.hideNivel();
        pergunta.showPergunta();
    }

    async getResult(respostaUser) {
        return await fetch("http://localhost:8000/api/perguntas/7/solucao?opcao="+respostaUser)
            .then(async res => res.json())
            .then(
                (result) => {
                    return result
                })
    }

    async caller(r) {
        const json = await this.getResult(r);  // command waits until completion
        return json         // hello is now available
    }

    /**
     * Método que compara a resposta certa e resposta dada pelo jogador
     * Em função do obtido ou adiciona moeda ou retira vida
     * @param event que despoleta a acção
     */
    verificaResposta(event){
        event.preventDefault();
        let respostaUser = document.getElementById("resposta").value;
        fetch("http://localhost:8000/api/perguntas/"+document.getElementById("hidden-id").value+"/solucao?opcao="+respostaUser)
            .then(res => res.json())
            .then(
                (result) => {
                    alert('primeiro: ' + respostaUser);
                    alert('primeiro: ' + document.getElementById("hidden-id").value);
                    alert('segundo: ' + result);
                    alert('terceiro: ' + result.resposta);
                    //let nivel = pergunta.obterNivel();
                    if (result.resposta === "correta"){
                        this.model.jogadorAtual.setPlayerJogavel()
                        this.model.jogadorAtual.addMoeda(1);
                        this.model.jogadorAtual.sucessResponseSA();
                        // if (nivel === 1){
                        //     this.model.jogadorAtual.addMoeda(1);
                        //     this.model.jogadorAtual.sucessResponseSA();
                        // } else if (nivel === 2){
                        //     this.model.jogadorAtual.addMoeda(2);
                        //     this.model.jogadorAtual.sucessResponseSA();
                        // } else {
                        //     this.model.jogadorAtual.addMoeda(3);
                        //     this.model.jogadorAtual.sucessResponseSA();
                        // }
                    } else {
                        this.model.jogadorAtual.removeVida();

                        if (this.model.jogadorAtual.getDie() !== true)
                            this.model.jogadorAtual.unsucessResponseSA();
                        else
                            this.model.jogadorAtual.getDiedSA();
                    }
                    this.view.hidePergunta();
                    this.delay()
                })

    }

    /**
     * Método dedicado à aquisição da Chave Azul
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art0Pressed(){
        let artigo = this.model.loja.getArt(0);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }

    /**
     * Método dedicado à aquisição da Chave Vermelha
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art1Pressed(){
        let artigo = this.model.loja.getArt(1);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }
    /**
     * Método dedicado à aquisição da Chave Verde
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art2Pressed(){
        let artigo = this.model.loja.getArt(2);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }
    /**
     * Método dedicado à aquisição de Cordas
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art5Pressed(){
        let artigo = this.model.loja.getArt(5);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }
    /**
     * Método dedicado à aquisição de Máscaras
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art6Pressed(){
        let artigo = this.model.loja.getArt(6);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }
    /**
     * Método dedicado à aquisição de Protetores Solares
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art7Pressed(){
        let artigo = this.model.loja.getArt(7);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }
    /**
     * Método dedicado à aquisição da Recordações Várias
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art8Pressed(){
        let artigo = this.model.loja.getArt(8);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }
    /**
     * Método dedicado à aquisição da Garrafas de Àgua
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art9Pressed(){
        let artigo = this.model.loja.getArt(9);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }
    /**
     * Método dedicado à aquisição de Cozido nas Furnas
     * Atualiza Inventário e mostra View de Player e Loja
     */
    art10Pressed(){
        let artigo = this.model.loja.getArt(10);
        this.model.jogadorAtual.comprarArt(artigo);
        this.model.loja.showArtigosLoja(this.model.jogadorAtual);
        // artigo.compraArtSA()
        this.model.jogadorAtual.updateInventario();
    }

    /**
     * Método que permite adicionar um delay na execução dos proximos métodos
     */
    delay(){
        setTimeout(() => {
            this.model.dado.enableButton();
            this.model.getProximoJogador();
            this.view.showJogadorAtual(this.model.jogadorAtual.getNome(), this.model.jogadorAtual.getId());
        }, 3500);
    }

    showNewGame(){
        this.view.newGame();
    }

}

/**
 * Class JogoView
 */
class JogoView{
    /**
     * Método Construtor
     */
    constructor() {
    }

    /**
     * Método que permite mostrar na View as chaves adquiridas pelo jogador em dropdown
     * @param {array} playerKeys Refere-se ao array de chaves adquiridas pelo jogador
     */
    lancaChaves(playerKeys){
        console.log(playerKeys)
        document.getElementById("imagem-pergunta").style.visibility = "visible";
        document.getElementById("frmChaves").style.display = "block";
        let keyslist = document.getElementById("areaChaves");
        keyslist.innerHTML = "";

        let strHtml = `<h1>Qual a chave que quer usar?</h1>
                            <select id="chave">`;
        let strHtmlEnd = `</select>
                            <button id="confirm-answer-button"  type="submit">Submeter</button>`;
        for (let key of playerKeys){
            strHtml += `<option value="${key}">${key}</option>`;
        }
        keyslist.innerHTML = strHtml + strHtmlEnd;
    }

    /**
     * Método que permite mostar na View os niveis para a escolha da pergunta do nivel correspondente
     */
    lancaNivel(niveisList){

        document.getElementById("frmNivel").style.display = "block";
        let areaNivel = document.getElementById("areaNivel");
        areaNivel.innerHTML = "";

        let strHtml = `<h1>Qual o nível pretendido?</h1>
                            <select id="nivel">`;
        let strHtmlEnd = `</select>
                            <button id="confirm-answer-button"  type="submit">Submeter</button>`;
        for (let nivel of niveisList){
            strHtml += `<option value="${nivel}">Nivel ${nivel}</option>`;
        }
        areaNivel.innerHTML = strHtml + strHtmlEnd;

    }

    /**
     * Método que esconde a tag com ID "frmNivel"
     */
    hideNivel(){
        document.getElementById("frmNivel").style.display = "none";
    }

    /**
     * Método que esconde a tag com ID "frmPergunta"
     */
    hidePergunta(){
        document.getElementById("frmPergunta").style.display = "none";
        document.getElementById("imagem-pergunta").style.visibility = "hidden";
    }

    /**
     * Método que esconde a tag com ID "frmChaves"
     */
    hideChaves(){
        document.getElementById("frmChaves").style.display = "none";
    }

    /**
     * Método que permite mostrar na tag com ID "actualPlayer" o nome do jogador atual
     * @param {string} nomejogadorAtual Refere-se ao nome do jogador
     * @param {number} id id do joagdor para escolher o icon
     */
    showJogadorAtual(nomejogadorAtual,id){
        document.getElementById("turnIcon").innerHTML = `<i class="player${id} fas fa-chess-king"></i>`
        document.getElementById("actualPlayer").innerText = nomejogadorAtual;
    }

    /**
     * Método para mostrar mensagem novo jogo para quando terminam as perguntas
     */
    newGame(){
        Swal.fire({
            title: 'As perguntas acabaram !!',
            text: 'Vai um novo jogo ?',
            confirmButtonText: `Jogar novamente`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                location.replace("menu.html");
            }
        })
    }
}