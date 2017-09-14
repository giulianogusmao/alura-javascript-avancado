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
    setTimeout(() => {
      this.update();
    }, 3000);
  }
}
