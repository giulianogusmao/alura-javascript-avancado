class MensagemView  extends View {

  template(model) {
    let strTemplate = '';

    try {
    strTemplate = model.texto ? `
      <p class="alert alert-info">
        ${model.texto}
      </p>
    ` : '';
    } catch (e) {}

    return strTemplate;
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
