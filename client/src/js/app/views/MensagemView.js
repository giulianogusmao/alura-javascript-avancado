class MensagemView {
  constructor(element) {
    this._element = element;
  }

  _template(model) {
    return model ? `
      <p class="alert alert-info">
        ${model.texto}
      </p>
    ` : '';
  }

  update(model) {
    this._element.innerHTML = this._template(model);
    if (model)
      this._clearTimer();
  }

  _clearTimer() {
    setTimeout(() => {
      this.update();
    }, 3000);
  }
}
