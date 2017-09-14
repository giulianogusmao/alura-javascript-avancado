class NegociacaoController {

  constructor () {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemView'));

    this._listaNegociacoes = new ListaNegociacoes();
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);
  }

  // adiciona uma negociacao na lista de negociacoes
  adiciona (event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._negociacoesView.update(this._listaNegociacoes);
    this._limpaFormulario();

    this._mensagem.texto = "Negociação adicionada com sucesso!";
    this._mensagemView.update(this._mensagem);
  }

  // captura os valores do formulário e retorna uma Negociacao instanciada
  _criaNegociacao() {
    // builderForm
    this._inputData.value = '2017-09-01';
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
    // this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;

    this._inputData.focus();
  }
}
