class ListaNegociacoes {
  constructor() {
    this.__ordemAtual = '';
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

  ordena(coluna) {
    this._listaNegociacoes.sort((a, b) => a[`_${coluna}`] - b[`_${coluna}`]);

    // caso seja a mesma coluna que esteja sendo ordenada, ordena do maior para o menor (lista reversa)
    if (coluna == this._ordemAtual)
      this._listaNegociacoes.reverse();

    this._ordemAtual = coluna;
  }

  get volumeTotal() {
    return this._listaNegociacoes.reduce((total, item) => total = (parseFloat(total) + item.volume), 0.0);
  }
}
