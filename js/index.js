import {Jogo, JogoController, JogoView} from "./jogo.js";
import {Player, PlayerController, PlayerView} from "./player.js";
import {Pergunta,PerguntaController,PerguntaView} from "./pergunta.js";
import {Artigo,ArtigoController,ArtigoView} from "./artigo.js";
import {Loja, LojaController, LojaView} from "./loja.js";
import {Casa, CasaController, CasaView} from "./casa.js";
import {Dado, DadoController, DadoView} from "./dado.js";
import {Tabuleiro, TabuleiroController, TabuleiroView} from "./tabuleiro.js";
import {Carteira, CarteiraController, CarteiraView} from "./carteira.js";


/**
 * Método que permite carregar todos os objetos necessários para a aplicação
 */
function Inicio(){
    const casas = makeCasas();
    const perguntasN1 = makePerguntasN1();
    const perguntasN2 = makePerguntasN2();
    const perguntasN3 = makePerguntasN3();
    let artigos = makeArtigos();
    let loja = makeLoja(artigos);
    let dado = makeDado();
    // let loja = makeLoja(artigos);
    let tabuleiro = makeTabuleiro(casas);
    const players = makePlayer()
    const jogo = makeJogo(perguntasN1, perguntasN2, perguntasN3,players,dado,tabuleiro,loja);
}

/**
 * Método que permite instanciar objeto Carteira
 * @returns {CarteiraController} Refere-se ao CarteiraController que detém os Model e View correspondentes
 */
function makeCarteira() {
    let model = new Carteira();
    let view = new CarteiraView();
    return new CarteiraController(model, view);
}

/**
 * Método que permite instanciar objeto Tabuleiro
 * @param {Map<Casa.numero, CasaController>} casas Refere-se ás casas presentes em Tabuleiro
 * @returns {TabuleiroController} Refere-se ao TabuleiroController que detém os Model e View correspondentes
 */
function makeTabuleiro(casas) {
    let model = new Tabuleiro(casas);
    let view = new TabuleiroView();
    return new TabuleiroController(model, view);
}

/**
 * Método que permite instanciar objeto Dado
 * @returns {DadoController} Refere-se ao DadoController que detém os Model e View correspondentes
 */
function makeDado() {
    let model = new Dado();
    let view = new DadoView();
    return new DadoController(model, view);
}

/**
 * Método que permite instanciar objeto Jogo
 * @param {[]} perguntasN1 Refere-se ao array de perguntas de nivel 1
 * @param {[]} perguntasN2 Refere-se ao array de perguntas de nivel 2
 * @param {[]} perguntasN3 Refere-se ao array de perguntas de nivel 3
 * @param {[]} players Refere-se ao arrray de jogadores
 * @param {DadoController} dado Refere-se ao objeto Dado
 * @param {TabuleiroController} tabuleiro Refere-se ao objeto Tabuleiro
 * @param {LojaController} loja Refere-se ao objeto Looja
 * @returns {JogoController} Retorna o objeto Jogo
 */
function makeJogo(perguntasN1, perguntasN2, perguntasN3, players, dado, tabuleiro,loja){
    let model = new Jogo(perguntasN1, perguntasN2, perguntasN3, players, dado, tabuleiro,loja);
    let view = new JogoView();
    return new JogoController(model, view);
}

/**
 * Método que permite instanciar objeto Loja
 * @param {[]} artigos Refere-se ao array de objetos a serem incluidos na loja
 * @returns {LojaController} Retorna objeto Loja
 */
function makeLoja(artigos){
    let model = new Loja(artigos);
    let view = new LojaView();
    return new LojaController(model, view);
}

/**
 * Método que permite instanciar o objeto Player
 * @returns {[]} Retorna array de objetos do tipo Player
 */
function makePlayer(){
    let players = [];
    let nomesStorage = [];
    if (localStorage.getItem("player1") !== ""){
        nomesStorage.push(localStorage.getItem("player1"))
    }
    if (localStorage.getItem("player2") !== ""){
        nomesStorage.push(localStorage.getItem("player2"))
    }
    // let i = localStorage.getItem(nJogadores)
    let i = nomesStorage.length;
    for (let x=0; x<i; x++){
        let carteira = makeCarteira();
        let nome = nomesStorage[x];
        let model = new Player(carteira, nome,x+1);
        let view = new PlayerView();
        players.push( new PlayerController(model, view));
    }
    return players;
}

/**
 * Método que permite instanciar os objetos Perguntas nivel 1
 * @returns {[]} Retorna array de perguntas do nivel 1
 */
function makePerguntasN1() {
    const Perguntas = ["Quantas ilhas tem o arquipélago dos Açores?",
        "O arquipélago dos Açores é dividido em quantos grupos?",
        "Em que ilha do arquipélago podemos encontrar uma queijada típica com a forma de uma estrela?",
        "Em que cidade está sedeada a Presidência do Governo Regional?","Qual a cidade açoriana classificada como Património Mundial em 1983?",
        "Quantas ilhas tem o Grupo Oriental?","Qual a ilha conhecida pelos seus moinhos?", "Qual a ilha mais conhecida pelas suas atividades baleeiras?",
        "Qual o nome da ave marinha que nidifica na região e que se caracteriza pelo seu grito noturno?",
        "Se quiser comer um cozido confecionado a vapor num buraco escavado no solo, que ilha deve visitar?",
        "De que ilha é característico um prato chamado Alcatra?","De que ilha é mais conhecido o vinho Verdelho?", "Qual a ilha com mais população?",
        "Em que ilha podemos entrar no café mais conhecido dos Açores (Peter's Café)?","De que ilha a 'espécie' é um doce da doçaria tradicional?",
        "Qual a festa religiosa que se realiza em todas as ilhas?","Em que ilha podemos ouvir as tradicionais 'Velhas'","Qual o cetáceo mais comum nos mares dos Açores?",
        "Em que ilha podemos subir ao ponto mais alto de Portugal?","Como se chama a ilha mais pequena do arquipélago?",
        "Que nome se dá ao marisco univalve que se encontra agarrado à rocha marítima?",
        "Quais as cores predominantes da bandeira dos Açores?","Para participar numa batalha de limas, na época carnavalesca, a que ilha se deve deslocar?",
        "Quantas ilhas tem o Grupo Ocidental?","Qual a ilha mais ocidental do arquipélago e consequentemente da Europa?","Qual a ilha conhecida pela internacionalização da sua marina?",
        "Em que cidade se situam as instalações da Assembleia Legislativa Regional?","Que ilha é conhecida pelas suas fajãs?","Quantas ilhas tem o grupo Central?",
        "Qual é a ilha 'verde'?"];

    const Respostas = [
        [9,10,8,7],[3, 2, 4, 5],["Graciosa", "São Jorge", "Pico", "Faial"],
        ["Ponta Delgada", "Horta", "Angra do Heroísmo", "Lagoa"],["Angra do Heroísmo", "Horta", "Ponta Delgada", "Lagoa"],
        [2, 3, 4, 5],["Graciosa", "Flores", "São Miguel", "Santa Maria"],["Pico", "Faial", "Graciosa", "Terceira"],
        ["Cagarro", "Pardal", "Melro", "Priolo"], ["São Miguel", "Flores", "Graciosa", "Terceira"], ["Pico", "São Jorge", "Faial", "Terceira"],
        ["Terceira", "Graciosa", "Pico", "Corvo"],["Terceira", "São Miguel", "Flores", "Santa Maria"],["São Miguel", "Flores", "Faial", "Santa Maria"],
        ["São Jorge", "Terceira", "Flores", "Santa Maria"],["Santo Cristo", "São João", "Espirito Santo", "Santo António"], ["Terceira", "São Jorge", "Pico", "Faial"],
        ["Cachalote", "Golfinho Comum", "Baleia Azul", "Tubarão Martelo"],["São Miguel", "Pico", "Graciosa", "São Jorge"],["Corvo", "Flores", "Santa Maria", "Graciosa"],
        ["Lapa", "Amêijoa", "Berbigão", "Búzio"],["Azul + branco", "azul + amarelo", "amarelo + branco", "azul + laranja"],["São Miguel", "Flores", "Santa Maria", "Graciosa"],
        [3, 4, 2,  5],["Corvo", "Santa Maria", "Graciosa", "Flores"],["Faial", "São Miguel", "Pico", "Terceira"],["Angra do Heroísmo", "Ponta Delgada", "Lagoa", "Horta"],
        ["São Jorge", "Pico", "Terceira", "Faial"],[5, 2, 4, 3],["Pico", "Corvo", "São Miguel", "Faial"]]

    const RespostaCorreta = ["9", "3", "Graciosa","Ponta Delgada", "Angra do Heroísmo", "2","Graciosa","Pico","Cagarro", "São Miguel",
        "Terceira","Pico","São Miguel","Faial","São Jorge","Espirito Santo","Terceira","Cachalote","Pico","Corvo","Lapa",
        "Azul + branco","São Miguel","2","Flores","Faial","Horta","São Jorge","5","São Miguel"];

    let N1 = [];
    for (let i =0; i<Perguntas.length; i++ ){
        N1.push(new PerguntaController(new Pergunta(Perguntas[i],Respostas[i],RespostaCorreta[i],1, ("css/img/questions/img"+(i+1)+".jpg")), new PerguntaView()));
    }
    return N1;
}

/**
 * Método que permite instanciar os objetos Perguntas nivel 2
 * @returns {[]} Retorna array de perguntas do nivel 2
 */
function makePerguntasN2() {
    const Perguntas = ["Qual é a ilha 'cinzenta'?","Qual é a ilha 'castanha'?","Qual é a ilha 'preta'?","Qual a mais antiga vila açoriana?",
        "Qual a ilha que produz o famoso atum de 'Santa Catarina'?","Qual o nome da ilha onde se localiza o Centro de Controlo Aéreo do Atlântico?",
        "De que ilha é oriundo o tradicional queijo da ilha?","Que ilha é conhecida pelas suas festividades taurinas, conhecidas por 'touradas à corda'?",
        "Que ilha do arquipélago se localiza mais a norte?","Em que ilha se situa a maior gruta vulcânica na região?","Em que ilha se pode visitar o ilhéu das cabras?",
        "Em que ilha se pode visitar a Lagoa do Fogo?","Qual a designação inicial mais conhecida para a ilha Terceira?","" +
        "Como se chama a zona balnear, onde se realiza o Festival de Verão denominado Maré de Agosto?","Como se chama o ponto mais alto da ilha Terceira?",
        "Que doce característico da ilha  Terceira, tem o nome de uma rainha de Portugal?","Em que ilha podemos visitar o Algar do Carvão?",
        "Em que ilha podemos visitar a Furna do Enxofre?","Como se chama a  espécie de ave endémica da ilha de São Miguel?",
        "Qual a designação do aeroporto em Ponta Delgada?","Em que ano foram inauguradas as “Portas do Mar” em Ponta Delgada?",
        "Qual destes festivais se realiza na Ribeira Quente na ilha de São Miguel?","Qual destes festivais se realiza na Ribeira Grande na ilha de São Miguel?",
        "Qual o papa que visitou os Açores?","Qual o jornal açoriano mais antigo de Portugal?","Que jogador açoriano é um dos melhores marcadores da seleção portuguesa?",
        "Qual o açoriano que foi o primeiro presidente da República portuguesa?","Em que ano a RTP Açores realizou a sua primeira emissão?",
        "Qual o presidente do primeiro governo regional dos Açores?","Quem é o autor da letra do Hino dos Açores?"];

    const Respostas = [["Graciosa", "Terceira", "Faial", "Pico"],
        ["São Jorge", "Pico", "Faial", "São Miguel"],["Corvo", "Flores", "Santa Maria", "Graciosa"],["Velas", "Calheta", "Corvo", "Vila do Porto"],
        ["Faial", "Pico", "São Jorge", "São Miguel"],["Santa Maria", "Terceira", "São Miguel", "Faial"],["São Jorge", "Faial", "Pico", "São Miguel"],
        ["Terceira",  "São Jorge", "São Miguel", "Faial"],["Corvo", "Flores", "Graciosa", "Pico"],["Pico", "São Miguel", "Graciosa", "Terceira"],
        ["São Miguel", "Terceira", "Faial", "Pico"],["São Miguel", "Terceira", "Faial", "Pico"],
        ["Ilha de Jesus Cristo", "Ilha de Cristo", "Ilha da Luz", "Ilha do Mar"],["Praia Pipas", "Praia Longa",  "Praia Formosa", "Praia da Areia"],
        ["Serra de Santa Bárbara", "Serra do Pico", "Pico da Vara", "Pico do Ferro"],["Dona Ana", "Dona Amélia", "Dona Maria", "Dona Isabel"],
        ["São Miguel", "Terceira", "Graciosa", "Pico"],["São Miguel", "Terceira", "Graciosa", "Pico"],["Açor", "Milhafre", "Pombo torcaz", "Priolo"],
        ["Nordela", "João Paulo II", "Cristiano Ronaldo", "Pauleta"],[2008, 2007, 2009, 2010],["Maré de Agosto", "Tremor", "Chicharro", "Monte Verde"],
        ["Maré de Agosto", "Tremor", "Chicharro", "Monte Verde"],["Paulo VI", "Francisco", "João Paulo I", "João Paulo II"],
        ["Correio dos Açores", "Açoriano Oriental", "Tribuna das Ilhas", "Diário Insular"],["Pauleta", "Eliseu", "Minhoca", "Eusébio"],
        ["Teófilo Braga", "Manuel de Arriaga", "Bernardino Machado", "Sidónio Pais"],[1974, 1975, 1977, 1978],["Carlos César", "Mota Amaral", "Vasco Cordeiro", "Alberto João Jardim"],
        ["Vitorino Nemésio", "Natália Correia", "João de Melo", "Fernando Pessoa"]];

    const RespostaCorreta = ["Pico","São Jorge","Corvo","Vila do Porto",
        "São Jorge","Santa Maria","São Jorge","Terceira","Corvo","Graciosa","Terceira","São Miguel","Ilha de Jesus Cristo","Praia Formosa",
        "Serra de Santa Bárbara","Dona Amélia","Terceira","Graciosa","Priolo","João Paulo II","2008","Chicharro","Monte Verde",
        "João Paulo II","Açoriano Oriental","Pauleta","Manuel de Arriaga","1975","Mota Amaral","Natália Correia"];

    let N2 = [];
    for (let i =0; i<Perguntas.length; i++ ){
        N2.push(new PerguntaController(new Pergunta(Perguntas[i],Respostas[i],RespostaCorreta[i],2,("css/img/questions/img"+(i+1)+".jpg")), new PerguntaView()));
    }
    return N2;
}

/**
 * Método que permite instanciar os objetos Perguntas nivel 3
 * @returns {[]} Retorna array de perguntas do nivel 3
 */
function makePerguntasN3() {
    const Perguntas = ["A quem é atribuído o povoamento inicial da ilha do Faial?",
        "Em que ano se deu a ultima erupção vulcânica da ilha do Faial?","Em 1501, Lages do Pico é elevada a vila e sede de concelho. Por quem?",
        "Quantos concelhos tem a ilha de S. Jorge?","Qual o nome vulgar da moeda fundida em 1829, na cidade de Angra do Heroísmo?",
        "Como se chama, na ilha de Santa Maria, a baía que se caracteriza pelo formato de concha gigante?","Que nome se dá, na ilha do Corvo,  às ruas estreitas, que se espraiam pela encosta?",
        "O que se esperava encontrar na ilha das Flores na altura da sua colonização?","Onde se abrigavam as frotas baleeiras na ilha do Faial?",
        "Onde está situado o Museu Regional dos Baleeiros?","Que rei português foi exilado na ilha Terceira?","Qual a largura aproximada da ilha do Corvo?",
        "Na fase de expansão Portuguesa, quem descobriu a ilha do Corvo?","Qual é a altitude da lagoa do fogo?","Quantos habitantes, aproximadamente,  tem a ilha do Pico?",
        "Quantas lagoas se encontram na zona central da ilha das Flores?","Quem apelidou a ilha do Faial de  ilha  Azul em 1924?","Como era chamada a ilha de Santa Maria no século XIV?",
        "Como se chama o património arquitetónico, de natureza religiosa, mais importante da ilha do Faial?","Na ilha Graciosa, em que ano Santa Cruz recebeu o titulo de Vila?",
        "Em honra de que padroeira, se realizam as maiores festas religiosas da ilha de Santa Maria?","Qual a área aproximada da ilha do Faial?",
        "Em que ano a localidade Madalena foi elevada a vila na ilha do Pico?","Qual o nome da formação geológica, de origem vulcânica, localizada no concelho da Madalena, na ilha do Pico?",
        "Em que freguesia, da ilha Terceira, se situa o Algar do Carvão?","Em que ilha se realizou a batalha da Salga?","Em que ano se realizou a batalha da Salga?",
        "Qual a cultura predominante nos Açores no século XVII?","Quantos concelhos tem a ilha de São Miguel?",
        "Em que ano o papa João Paulo II visitou os Açores?"];

    const Respostas =[["Wilhelm van der Haegen", "Gonçalo Velho Cabral", "Joss van Hurtere", "Martin Behaim"],[1955, 1956, 1957, 1958],["D.Manuel II", "D.João I", "D.Manuel I", "D.joão II"],
        [2, 1, 4, 5],["Escudo", "Prata", "Maluco", "Vintém"],["Baía de São Cristóvão", "Baía de São Lourenço", "Baía de São Miguel", "Baía dos Anjos"],
        ["Canadas", "Ruelas", "Estreitos", "Ruas"],["Frutos", "Flores", "Metais", "Madeira"],["Porto Pim", "Porto Paz", "Porto Côvo", "Porto Grande"],
        ["Lajes do Pico", "Madalena do Pico", "Calheta, Velas"],["D.Afonso II", "D.Afonso IV", "D.Afonso V", "D.Afonso VI"],["4 Km", "6 Km","8 Km","10 km"],
        ["José Oliveira", "Diogo Morgado", "Manuel de Freitas", "Diogo de Teive"],["575m", "1000m", "275m", "725m"],[15000,12000,14000,11000],
        ["Sete", "Quatro", "Duas", "Nove"],["Vitorino Nemésio", "Manuel de Arriaga", "Raul Brandão", "João de  Melo"],["Ilha dos Lobos", "Ilha dos Cagarros", "Ilha do Sol", "Ilha do Sul"],
        ["Colégio das Freiras", "Mosteiro dos Jesuítas", "Colégio dos Jesuítas", "Igreja do santo Cristo"],[1486, 1468, 1484, 1489],
        ["Nossa Senhora da Assunção", "Nossa Senhora da Ajuda", "Nossa Senhora dos Milagres", "Nossa Senhora dos Aflitos"],["162km", "173Km", "170km", "178km"],
        [1732, 1720, 1723, 1875],["Gruta dos Fetos", "Gruta das Torres", "Ponta do Vulcão", "Jardim da Montanha"],["Porto Judeu", "Feteira", "Altares", "Doze Ribeiras"],
        ["Santa Maria", "Terceira", "São Miguel", "Faial"],[1580, 1581, 1590, 1591],["Laranjas", "pastel", "linho", "milho"],[5,6,7,8],[1990, 1991, 1995, 1993]];

    const RespostaCorreta = ["Joss van Hurtere","1958",
        "D.Manuel I","2","Maluco","Baía de São Lourenço","Canadas","Flores","Porto Pim","Lajes do Pico","D.Afonso VI","4 Km",
        "Diogo de Teive","575m","15000","Sete","Raul Brandão", "Ilha dos Lobos","Colégio dos Jesuítas","1486",
        "Nossa Senhora da Assunção","173Km","1723","Gruta das Torres","Porto Judeu","Terceira","1581","Laranjas","6","1991"];

    // const Perguntas = ["A quem é atribuído o povoamento inicial da ilha do Faial?"];
    // const Respostas =[["Wilhelm van der Haegen", "Gonçalo Velho Cabral", "Joss van Hurtere", "Martin Behaim"]];
    // const RespostaCorreta = ["Joss van Hurtere"];

    let N3 = [];

    for (let i =0; i<Perguntas.length; i++ ){
        N3.push(new PerguntaController(new Pergunta(Perguntas[i],Respostas[i],RespostaCorreta[i],3, ("css/img/questions/img"+(i+1)+".jpg")), new PerguntaView()));
    }
    return N3;
}

/**
 * Método que permite instanciar os objetos do tipo Artigo
 * @returns {[]} Retorna array de objetos do tipo Artigo
 */
function makeArtigos(){
    let artigos = [];
    const nomeArtigo =["Chave Azul","Chave Vermelha","Chave Verde", "Viagem de Barco ao Ilhéu V. Franca","Subida à montanha do Pico","Cordas","Máscaras","Protetores Solares",
        "Recordações Várias","Garrafas de Água","Cozido das Furnas","Tourada à Corda","Viagem de Barco para ver as Baleias","Viagem Guiada ao vulcão dos Capelinhos",
        "Viagem Guiada à Rocha dos Bordões","Viagem Guida à Fajã do Santo Cristo","Viagem Guida à Lagoa do Caldeirão"];
    const precoUnitrio =[5,5,5,3,3,2,2,2,1,1,3,2,3,2,2,2,2];
    // const nItens = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for (let i=0; i<nomeArtigo.length; i++) {
        artigos.push(new ArtigoController(new Artigo(nomeArtigo[i],precoUnitrio[i]),new ArtigoView()))
    }
    return artigos;
}

/**
 * Método que permite construir array de strings para o efeito dos cofres
 * @returns {[]} Retorna array de strings para o efeito dos cofres
 */
function makeCofres(){
    const cofres =[];
    cofres.push("Cofre Azul");
    cofres.push("Cofre Vermelho");
    cofres.push("Cofre Verde");
    randomOrder(cofres);
    return cofres;
}

/**
 * Método que permite alterar a ordem de posições no array
 * @param array
 */
function randomOrder(array) {
    array.sort(() => Math.random() - 0.5);
}

/**
 * Metodo que permite obter o conteudo da primeira posição do array dos cofres
 * @param {[]} cofres Refere-se ao arrays de strings dos cofres
 * @returns {any} Retorna o conteudo da primeira posição do array dos cofres
 */
function popCofres(cofres){
    return cofres.pop();
}

/**
 * Método que permite obter instanciar objetos do tipo Casa
 * @returns {Map<numero, CasaController>} Retorna um Map de objetos Casa
 */
function makeCasas(){
    let cofres = makeCofres()
    let x = 50;
    let casas = new Map;
    for (let i=1; i<=x; i++ ){
        switch(i){
            case 6:
                casas.set(i,new CasaController(new Casa(i,true,"Santa Maria",undefined),new CasaView))
                break;
            case 12:
                casas.set(i,new CasaController(new Casa(i,true,"Vila Franca do Campo",popCofres(cofres)),new CasaView))
                break;
            case 18:
                casas.set(i,new CasaController(new Casa(i,true,"Terceira",undefined),new CasaView))
                break;
            case 25:
                casas.set(i,new CasaController(new Casa(i,true,"Graciosa",popCofres(cofres)),new CasaView))
                break;
            case 33:
                casas.set(i,new CasaController(new Casa(i,true,"São Jorge",undefined),new CasaView))
                break;
            case 49:
                casas.set(i,new CasaController(new Casa(i,true,"Pico",popCofres(cofres)),new CasaView))
                break;
            case 40:
                casas.set(i,new CasaController(new Casa(i,true,"Flores",undefined),new CasaView))
                break;
            case 42:
                casas.set(i,new CasaController(new Casa(i,true, "Corvo",undefined),new CasaView))
                break;
            default:
                casas.set(i,new CasaController(new Casa(i,false,"",undefined),new CasaView))
        }
    }
    return casas;
}

document.addEventListener("DOMContentLoaded", Inicio);
