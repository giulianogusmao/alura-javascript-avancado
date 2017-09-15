class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemView'));

    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    /*
      Quando utilizamos uma arrow function ela fica amarrada ao scopo no qual ela está sendo passada, isto é,
      independente de onde essa arrow function seja executada, ela sempre estara relacionada ao contexto atual.
      Enquanto que em uma funcção convencional o seu scopo this varia conforme o locol que é executada
    */
    this._listaNegociacoes = new ListaNegociacoes((model) => this._negociacoesView.update(model), true);
  }

  // adiciona uma negociacao na lista de negociacoes
  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._limpaFormulario();

    this._mensagem.texto = "Negociação adicionada com sucesso!";
    this._mensagemView.update(this._mensagem);
  }

  limpa() {
    this._listaNegociacoes.esvazia();

    this._mensagem.texto = "Lista de negociações apagada com sucesso!";
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
