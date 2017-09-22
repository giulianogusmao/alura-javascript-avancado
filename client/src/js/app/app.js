'use strict';

System.register(['./controllers/NegociacaoController.js'], function (_export, _context) {
  "use strict";

  var instanceNegociacaoCtrl, negociacaoController, $;
  return {
    setters: [function (_controllersNegociacaoControllerJs) {
      instanceNegociacaoCtrl = _controllersNegociacaoControllerJs.instanceNegociacaoCtrl;
    }],
    execute: function () {
      negociacaoController = instanceNegociacaoCtrl();
      $ = document.querySelector.bind(document);


      $('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      $('.btn-enviar').onclick = negociacaoController.envia.bind(negociacaoController);
      $('.btn-importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
      $('.btn-apagar').onclick = negociacaoController.limpa.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=app.js.map