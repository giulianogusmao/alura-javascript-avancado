class ListaNegociacoes {
  constructor(contexto, eventEmitter, emitterOnLoad) {
    this._listaNegociacoes = [];
    this._eventEmitter = eventEmitter;
    this._eventContexto = contexto;

    if (emitterOnLoad) this._emitter();
  }

  get listaNegociacoes() {
    return [].concat(this._listaNegociacoes);
  }

  // adiciona item a lista
  adiciona(negociacao) {
    this._listaNegociacoes.push(negociacao);
    this._emitter();
  }

  // limpa a lista
  esvazia() {
    this._listaNegociacoes.length = 0;
    this._emitter();
  }

  // executa funcao recebida no contexto recebido passando esta classe como referencia
  _emitter() {
    if (typeof this._eventEmitter == 'function')
      Reflect.apply(this._eventEmitter, this._eventContexto, [this]);
      // this._eventEmitter(this);
  }
}
