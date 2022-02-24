class Pergunta extends React.Component {
    constructor() {
        super();
        this.state = {
            id: Math.floor(Math.random()*10)+1,
            resposta: "",
            pergunta: "",
            image: "",
            opcao1: "", opcao2: "", opcao3: "", opcao4: ""
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        //TODO: implement a random id for the question
        fetch("http://localhost:8000/api/perguntas/"+this.state.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        pergunta: result.data.texto,
                        image: result.data.urlImagem,
                        opcao1: result.data.opcao1,
                        opcao2: result.data.opcao2,
                        opcao3: result.data.opcao3,
                        opcao4: result.data.opcao4,
                    });
                })
    }

    sendResposta = () =>{
        //TODO: get the id of the same question
        const option = document.getElementById("resposta").value;
        fetch("http://localhost:8000/api/perguntas/7/solucao?opcao={option}")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.resposta)
                })
    }

    handleChange = (event) => {
        this.setState({resposta: event.target.value});
    }

    handleSubmit = () => {
        //this.setState({resposta: document.getElementById("resposta").value});
        //alert('Your answer is: ' + document.getElementById("resposta").value)
        //this.props.onSubmit(this.state.resposta);
        this.setState({id: Math.floor(Math.random()*10)+1})
    }

    render(){
        return (
            <div>
                <input id="hidden-id" type="text" value={this.state.id} style={{display: "none"}}/>
                <h1>{this.state.pergunta}</h1>
                <select id ="resposta" value={this.state.resposta} onChange={this.handleChange}>
                    <option value="1">{this.state.opcao1}</option>
                    <option value="2">{this.state.opcao2}</option>
                    <option value="3">{this.state.opcao3}</option>
                    <option value="4">{this.state.opcao4}</option>
                </select>
                <button id="confirm-answer-button" type="submit">Submeter</button>
            </div>
        );
    }
}

class ConjuntoPergunta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    checkAnswer = (value) => {
        fetch("http://localhost:8000/api/perguntas/7/solucao?opcao="+value)
            .then(res => res.json())
            .then(
                (result) => {
                    //JogoController.verificaResposta(result.resposta)
                    alert('Your answer is: ' + result.resposta)
                })

    }

    render() {
        return (
            <Pergunta/>
        );
    }
}

ReactDOM.render(
    <ConjuntoPergunta/>, document.getElementById("areaPergunta")
);