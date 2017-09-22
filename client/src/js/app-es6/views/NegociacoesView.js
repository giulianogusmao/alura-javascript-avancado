import { View } from './View.js';
import { instanceNegociacaoCtrl } from '../controllers/NegociacaoController.js';

export class NegociacoesView extends View {

  constructor(element) {
    super(element);

    element.addEventListener('click', (event) => {
      if (event.target.nodeName == 'TH')
        instanceNegociacaoCtrl().ordenaColuna(event.target.textContent.toLowerCase());
    });
  }

  template(model) {
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
              ${model.volumeTotal}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }

}
