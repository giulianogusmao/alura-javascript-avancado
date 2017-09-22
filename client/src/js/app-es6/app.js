import { instanceNegociacaoCtrl } from './controllers/NegociacaoController.js';
// import {} from './polyfills/fetch';

var negociacaoController = instanceNegociacaoCtrl();

/*
  removendo as propriedades do html, pois agora o escopo do negociacaoController é privado
    onsubmit="negociacaoController.adiciona(event);"
    onclick="negociacaoController.envia();"
    onclick="negociacaoController.importaNegociacoes();"
    onclick="negociacaoController.limpa();"
*/
let $ = document.querySelector.bind(document);

$('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
$('.btn-enviar').onclick = negociacaoController.envia.bind(negociacaoController);
$('.btn-importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
$('.btn-apagar').onclick = negociacaoController.limpa.bind(negociacaoController);
