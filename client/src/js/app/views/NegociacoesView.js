class NegociacoesView extends View {

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th onclick="negociacaoController.ordenaColuna('data')">DATA</th>
                <th onclick="negociacaoController.ordenaColuna('quantidade')">QUANTIDADE</th>
                <th onclick="negociacaoController.ordenaColuna('valor')">VALOR</th>
                <th onclick="negociacaoController.ordenaColuna('volume')">VOLUME</th>
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
              ${model.volumeTotal}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }

}
