class NegociacoesView {

  constructor(element) {
    this._element = element;
  }

  update(model) {
    this._element.innerHTML = this._template(model);
    return this;
  }

  _template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>

        <tbody>
          ${model.listaNegociacoes.map(item => `
            <tr>
              <td>${item.data}</td>
              <td>${item.quantidade}</td>
              <td>${item.valor}</td>
              <td>${item.volume}</td>
            <tr>
          `).join('')}
        </tbody>

        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td>
              ${model.listaNegociacoes.reduce((total, item) => total = (parseFloat(total) + item.volume).toFixed(2), 0.0)}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }
}
