export class Mensagem {
  constructor(msg) {
    this._texto = msg || '';
  }

  get texto() {
    return this._texto;
  }

  set texto(msg) {
    this._texto = msg;
  }
}
