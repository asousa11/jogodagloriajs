export {Pergunta,PerguntaController,PerguntaView}

// Model
/**
 * Class PerguntaModel
 */
class Pergunta {
    /**
     * Método Construtor
     * @param {string} pergunta Refere-se à string que corresponde à pergunta
     * @param {[string]} respostas Refere-se ao array que contem as strings com as respostas possiveis
     * @param {string} respostaCerta Refere-se à String que contém a repsosta correta
     * @param {number} nivel Refere-se ao nivel ao qual a pergunta está associado
     * @param {string} imgPath Faz referência ao path da imagem da pergunta
     */
    constructor(pergunta, respostas, respostaCerta, nivel, imgPath) {
        this.respostas = [];
        this.questao = pergunta;
        for (let i=0; i<respostas.length; i++){
            this.respostas[i] = respostas[i];
        }
        this.respostaCerta = respostaCerta;
        this.nivel = nivel;
        this.imgPath = imgPath;

    }

    /**
     * Verifica se a resposta está correta, e retorna um boolean
     * @param resposta Refere-se à resposta obtida a determinada pergunta
     * @returns {boolean} Retorna valor booleano para o caso da pergunta estar certa ou não
     */
    verificarResposta(resposta){
        return resposta === this.respostaCerta;
    }

    /**
     * Retorna o nivel associado à pergunta
     * @returns {number} Retorna o nivel associado à pergunta
     */
    getNivel(){
        return this.nivel;
    }
}

/**
 * Class PerguntaController
 */
class PerguntaController {
    /**
     * Método Construtor
     * @param {Pergunta} model Refere-se ao model de P
     * @param {PerguntaView} view Refere-se à view de P
     */
    constructor(model, view) {
        this.view = view;
        this.model = model;
    }

    /**
     * Método que despoleta a amostragem de pergunta em PerguntaView
     */
    showPergunta(){
        let questao = this.model.questao;
        let respostas = this.model.respostas;
        let path = this.model.imgPath;
        this.view.mostrarPergunta(questao, respostas, path);
    }

    /**
     * Método que despoleta a verificação da pergunta em PerguntaModel
     * @param resposta
     * @returns {boolean}
     */
    verifyResposta(resposta){
        return this.model.verificarResposta(resposta);
    }

    /**
     * Método que retorna o nivel associado à pergunta
     * @returns {number} Refere-se ao nivel associado à pergunta
     */
    obterNivel(){
        return this.model.getNivel();
    }

}

/**
 * Class PerguntaView
 */
class PerguntaView {
    /**
     * Método Construtor
     */
    constructor() {
    }

    /**
     * Método que despoleta a amostragem de P e possieis respostas em dropdown
     * @param {string} questao Refere-se a string da pergunta
     * @param {[string]} respostas Refere-se às strings do arrays das possiveis respostas
     * @param {string} path É o path da imagem da questão, que irá ser passado para outro método
     */
    mostrarPergunta(questao, respostas, path){
        document.getElementById("frmPergunta").style.display = "block";

        // document.getElementById("areaPergunta").innerHTML = `<h1>${questao}</h1>
        //                     <select id="resposta">
        //                         <option value="${respostas[0]}">${respostas[0]}</option>
        //                         <option value="${respostas[1]}">${respostas[1]}</option>
        //                         <option value="${respostas[2]}">${respostas[2]}</option>
        //                         <option value="${respostas[3]}">${respostas[3]}</option>
        //                     </select>
        //                     <button id="confirm-answer-button" type="submit">Submeter</button>`;
        //this.mostrarImagem(path);
    }

    /**
     *
     * @param {string} path É o path da imagem da questão
     */
    mostrarImagem(path){
        document.getElementById("imagem-pergunta").src = path;
        document.getElementById("imagem-pergunta").style.visibility = "visible";
    }

    // hidePergunta(){
    //     document.getElementById("frmPergunta").style.display = "none";
    // }
}

