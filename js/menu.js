/**
 * Class MenuModel
 */
class Menu {
    /**
     * Método Construtor
     */
    constructor() {
    }

    /**
     * Método que permite guardar os nomes dos jogadores em local Storage
     * @param {string} j1 Refere-se ao nome do Player1
     * @param {string} j2 Refere-se ao nome do Player2
     */
    guardarJogadores(j1, j2){
        localStorage.setItem("player1", j1);
        localStorage.setItem("player2", j2);
    }
}

/**
 * Class MenuController
 */
class MenuController {
    /**
     * Método Construtor
     * @param {Menu} model Refere-se ao model de Menu
     */
    constructor(model) {
        this.model = model;
        let frmJogar = document.getElementById("frmJogar");
        frmJogar.addEventListener("submit", this.btnJogarPressed.bind(this));
    }

    /**
     * Método que despoleta a acção de guardar o nome dos jogadores em local Storage
     * @param event evento que despoleta a acção
     */
    btnJogarPressed(event){
        event.preventDefault();
        let jogador1 = document.getElementById("player1").value;
        let jogador2 = document.getElementById("player2").value;
        this.model.guardarJogadores(jogador1, jogador2);
        location.replace("index.html");
    }
}



let menu = new MenuController(new Menu);


document.addEventListener("DOMContentLoaded", menu);