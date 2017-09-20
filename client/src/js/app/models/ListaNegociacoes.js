class ListaNegociacoes {
  constructor() {
    this._listaNegociacoes = [];
  }

  get listaNegociacoes() {
    return [].concat(this._listaNegociacoes);
  }

  // adiciona item a lista
  adiciona(negociacao) {
    this._listaNegociacoes.push(negociacao);
  }

  // limpa a lista
  esvazia() {
    if (this._listaNegociacoes.length)
      this._listaNegociacoes.length = 0;
  }
}
