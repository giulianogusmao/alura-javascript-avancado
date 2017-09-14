class ListaNegociacoes {
  constructor() {
    this._listaNegociacoes = [];
  }

  get listaNegociacoes() {
    return [].concat(this._listaNegociacoes);
  }

  adiciona(negociacao) {
    this._listaNegociacoes.push(negociacao);
  }
}
