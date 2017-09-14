class NegociacaoController {

  constructor () {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes();
  }

  // adiciona uma negociacao na lista de negociacoes
  adiciona (event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    console.log(this._listaNegociacoes.listaNegociacoes);
    this._limpaFormulario();
  }

  // captura os valores do formulário e retorna uma Negociacao instanciada
  _criaNegociacao() {
    // builderForm
    this._inputData.value = '2017-09-01';
    this._inputQuantidade.value = Math.floor(Math.random() * 10) + 1;
    this._inputValor.value = (Math.random() * 200).toFixed(2);

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
