class MensagemView  extends View {

  template(model) {
    return model ? `
      <p class="alert alert-info">
        ${model.texto}
      </p>
    ` : '';
  }

  update(model) {
    super.update(model);
    if (model)
      this._clearTimer();
  }

  _clearTimer() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.update();
    }, 3000);
  }
}
