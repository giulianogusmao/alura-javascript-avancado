class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._mensagem = new Bind(
      new Mensagem(), new MensagemView($('#mensagemView')), 'texto'
    );

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena'
    );

    this._negociacaoService = new NegociacaoService();
  }

  // adiciona uma negociacao na lista de negociacoes
  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._limpaFormulario();

    this._mensagem.texto = "Negociação adicionada com sucesso!";
  }

  envia() {
    this._negociacaoService.postNegociacao(
      this._criaNegociacao())
      .then(x => {
        // console.log(x);
        this._limpaFormulario();
        this._mensagem.texto = 'Negociação enviada com sucesso!';
      })
      .catch(err => this._mensagem.texto = err);
  }

  limpa() {
    this._listaNegociacoes.esvazia();

    this._mensagem.texto = "Lista de negociações apagada com sucesso!";
  }

  importaNegociacoes() {
    // chamando promises de forma sincrona
    Promise.all([
      this._negociacaoService.getSemana(),
      this._negociacaoService.getAnterior(),
      this._negociacaoService.getRetrasada()
    ])
      .then(negociacoes => {
        negociacoes
          /* o Promise.all retorna um array com os dados(array), por isso preciso achatar ele transformando
            em um array com 1 dimensão */
          .reduce((novoArray, array) => novoArray.concat(array), [])
          .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

        this._mensagem.texto = 'Negociações importadas com sucesso!';
      })
      .catch(err => this._mensagem.texto = err);
  }

  ordenaColuna(coluna) {
    this._listaNegociacoes.ordena(coluna);
  }

  // captura os valores do formulário e retorna uma Negociacao instanciada
  _criaNegociacao() {
    // builderForm
    this._inputData.value = this._inputData.value || DateHelper.dateToStr(new Date(), false);
    this._inputQuantidade.value = this._inputQuantidade.value || Math.floor(Math.random() * 10) + 1;
    this._inputValor.value = Number(this._inputValor.value) > 0 ? this._inputValor.value : Math.random() * 200;

    try {
      return new Negociacao(
        DateHelper.strToDate(this._inputData.value),
        this._inputQuantidade.value,
        this._inputValor.value
      );
    } catch(err) {
      this._mensagem.texto = err;
      throw new Error(err); // gera o erro recebido para interromper o código e não continuar com a inclusão
    }
  }

  // limpa todos os dados do formulariao e aplica o focus no campo data
  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;

    this._inputData.focus();
  }
}
