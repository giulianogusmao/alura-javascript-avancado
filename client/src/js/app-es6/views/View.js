export class View {
  constructor(element) {
    this._element = element;
  }

  update(model) {
    this._element.innerHTML = this.template(model);
    return this;
  }

  template() {
    throw new Error('O método template deve ser implementado');
  }
}
