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
      new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia'
    );
  }

  // adiciona uma negociacao na lista de negociacoes
  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._limpaFormulario();

    this._mensagem.texto = "Negociação adicionada com sucesso!";
  }

  limpa() {
    this._listaNegociacoes.esvazia();

    this._mensagem.texto = "Lista de negociações apagada com sucesso!";
  }

  importaNegociacoes() {
    let service = new NegociacaoService();
    service.getSemana((err, negociacoes) => {
      if (err) {
        this._mensagem.texto = err;
        return;
      }

      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
      this._mensagem.texto = 'Negociações importadas com sucesso!';
    });
  }

  // captura os valores do formulário e retorna uma Negociacao instanciada
  _criaNegociacao() {
    // builderForm
    this._inputData.value = DateHelper.dateToStr(new Date(), false);
    this._inputQuantidade.value = Math.floor(Math.random() * 10) + 1;
    this._inputValor.value = Math.random() * 200;

    return new Negociacao(
      DateHelper.strToDate(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  // limpa todos os dados do formulariao e aplica o focus no campo data
  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;

    this._inputData.focus();
  }
}
