var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pergunta = function (_React$Component) {
    _inherits(Pergunta, _React$Component);

    function Pergunta() {
        _classCallCheck(this, Pergunta);

        var _this = _possibleConstructorReturn(this, (Pergunta.__proto__ || Object.getPrototypeOf(Pergunta)).call(this));

        _this.loadData = function () {
            //TODO: implement a random id for the question
            fetch("http://localhost:8000/api/perguntas/" + _this.state.id).then(function (res) {
                return res.json();
            }).then(function (result) {
                _this.setState({
                    pergunta: result.data.texto,
                    image: result.data.urlImagem,
                    opcao1: result.data.opcao1,
                    opcao2: result.data.opcao2,
                    opcao3: result.data.opcao3,
                    opcao4: result.data.opcao4
                });
            });
        };

        _this.sendResposta = function () {
            //TODO: get the id of the same question
            var option = document.getElementById("resposta").value;
            fetch("http://localhost:8000/api/perguntas/7/solucao?opcao={option}").then(function (res) {
                return res.json();
            }).then(function (result) {
                console.log(result.resposta);
            });
        };

        _this.handleChange = function (event) {
            _this.setState({ resposta: event.target.value });
        };

        _this.handleSubmit = function () {
            //this.setState({resposta: document.getElementById("resposta").value});
            //alert('Your answer is: ' + document.getElementById("resposta").value)
            //this.props.onSubmit(this.state.resposta);
            _this.setState({ id: Math.floor(Math.random() * 10) + 1 });
        };

        _this.state = {
            id: Math.floor(Math.random() * 10) + 1,
            resposta: "",
            pergunta: "",
            image: "",
            opcao1: "", opcao2: "", opcao3: "", opcao4: ""
        };
        return _this;
    }

    _createClass(Pergunta, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("input", { id: "hidden-id", type: "text", value: this.state.id, style: { display: "none" } }),
                React.createElement(
                    "h1",
                    null,
                    this.state.pergunta
                ),
                React.createElement(
                    "select",
                    { id: "resposta", value: this.state.resposta, onChange: this.handleChange },
                    React.createElement(
                        "option",
                        { value: "1" },
                        this.state.opcao1
                    ),
                    React.createElement(
                        "option",
                        { value: "2" },
                        this.state.opcao2
                    ),
                    React.createElement(
                        "option",
                        { value: "3" },
                        this.state.opcao3
                    ),
                    React.createElement(
                        "option",
                        { value: "4" },
                        this.state.opcao4
                    )
                ),
                React.createElement(
                    "button",
                    { id: "confirm-answer-button", type: "submit" },
                    "Submeter"
                )
            );
        }
    }]);

    return Pergunta;
}(React.Component);

var ConjuntoPergunta = function (_React$Component2) {
    _inherits(ConjuntoPergunta, _React$Component2);

    function ConjuntoPergunta(props) {
        _classCallCheck(this, ConjuntoPergunta);

        var _this2 = _possibleConstructorReturn(this, (ConjuntoPergunta.__proto__ || Object.getPrototypeOf(ConjuntoPergunta)).call(this, props));

        _this2.checkAnswer = function (value) {
            fetch("http://localhost:8000/api/perguntas/7/solucao?opcao=" + value).then(function (res) {
                return res.json();
            }).then(function (result) {
                //JogoController.verificaResposta(result.resposta)
                alert('Your answer is: ' + result.resposta);
            });
        };

        _this2.state = {};
        return _this2;
    }

    _createClass(ConjuntoPergunta, [{
        key: "render",
        value: function render() {
            return React.createElement(Pergunta, null);
        }
    }]);

    return ConjuntoPergunta;
}(React.Component);

ReactDOM.render(React.createElement(ConjuntoPergunta, null), document.getElementById("areaPergunta"));