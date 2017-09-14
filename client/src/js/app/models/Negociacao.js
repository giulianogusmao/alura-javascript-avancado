class Negociacao {

  constructor(data, quantidade, valor) {
    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = parseFloat(valor).toFixed(2);
    Object.freeze(this);
  }

  get volume() {
    return this._quantidade * this._valor;
  }

  get data() {
    return DateHelper.dateToStr(new Date(this._data.getTime()));
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }
}
