import { DateHelper } from '../helpers/DateHelper.js';
import { Bind } from '../helpers/Bind.js';
import { Negociacao } from '../models/Negociacao.js';

import { Mensagem } from '../models/Mensagem.js';
import { MensagemView } from '../views/MensagemView.js';

import { ListaNegociacoes } from '../models/ListaNegociacoes.js';
import { NegociacoesView } from '../views/NegociacoesView.js';

import { NegociacaoService } from '../services/NegociacaoService.js';

class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._mensagem = new Bind(
      new Mensagem(), new MensagemView($('#mensagemView')), 'texto'
    );

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena'
    );

    this._negociacaoService = new NegociacaoService();
    this._init();
  }

  _init() {
    // carregar negociacaoes do indexedDB
    this._carregaNegociacoes();

    // importando negociacoes automaticamente
    // this.importaNegociacoes();
    // this._timerImportaNegociacoes = setInterval(() => {
    //   this.importaNegociacoes();
    // }, 3000);
  }

  // lista negociacoes do indexedDB
  _carregaNegociacoes() {
    this._negociacaoService
      .lista()
      .then(negociacoes =>
        negociacoes.forEach(negociacao =>
            this._listaNegociacoes.adiciona(negociacao))
      )
      .catch(err => this._mensagem.texto = err);
  }

  // adiciona uma negociacao na lista de negociacoes
  adiciona(event) {
    event.preventDefault();

    let negociacao = this._criaNegociacao();

    this._negociacaoService
      .cadastra(negociacao)
      .then(msg => {
        this._listaNegociacoes.adiciona(negociacao);
        this._limpaFormulario();
        this._mensagem.texto = msg;
      })
      .catch(err => this._mensagem.texto = err);
  }

  envia() {
    this._negociacaoService.postNegociacao(
      this._criaNegociacao())
      .then(x => {
        this._limpaFormulario();
        this._mensagem.texto = 'Negociação enviada com sucesso!';
      })
      .catch(err => this._mensagem.texto = err);
  }

  /* Após excluir todos os itens do indexedDb, limpa a lista de negociacoes */
  limpa() {
    this._negociacaoService
      .excluiTodos()
      .then(msg => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = msg;
      })
      .catch(err => this._mensagem.texto = err);
  }

  importaNegociacoes() {
    this._negociacaoService
      .importa(this._listaNegociacoes.listaNegociacoes)
      .then(listaNegociacoes => {
        listaNegociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações importadas com sucesso!';
      })
      .catch(err => this._mensagem.texto = err);
  }

  ordenaColuna(coluna) {
    this._listaNegociacoes.ordena(coluna);
  }

  // captura os valores do formulário e retorna uma Negociacao instanciada
  _criaNegociacao() {
    // builderForm
    this._inputData.value = this._inputData.value || DateHelper.dateToStr(new Date(), false);
    this._inputQuantidade.value = this._inputQuantidade.value || Math.floor(Math.random() * 10) + 1;
    this._inputValor.value = Number(this._inputValor.value) > 0 ? this._inputValor.value : Math.random() * 200;

    try {
      return new Negociacao(
        DateHelper.strToDate(this._inputData.value),
        parseInt(this._inputQuantidade.value),
        parseFloat(this._inputValor.value)
      );
    } catch (err) {
      this._mensagem.texto = err;
      throw new Error(err); // gera o erro recebido para interromper o código e não continuar com a inclusão
    }
  }

  // limpa todos os dados do formulariao e aplica o focus no campo data
  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;

    this._inputData.focus();
  }
}

let negociacaoController = new NegociacaoController();
export function instanceNegociacaoCtrl() {
  return negociacaoController;
}
