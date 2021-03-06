import { HttpService } from './HttpService.js';
import { Negociacao } from '../models/Negociacao.js';
import { ConnectionFactory } from './ConnectionFactory.js';
import { NegociacaoDao } from '../dao/NegociacaoDao.js';

export class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  lista() {
    return this._getNegociacaoDao()
      .then(negociacaoDao => negociacaoDao.getNegociacoes())
      .catch(err => {
        console.erro(err);
        this._mensagem.texto = 'Não foi possível listar as negociações';
      });
  }

  cadastra(negociacao) {
    return this._getNegociacaoDao()
      .then(negociacaoDao => negociacaoDao.adiciona(negociacao))
      .then(() => 'Negociação adicionada com sucesso!') // return implicito na arrow function
      .catch(err => {
        console.error(err);
        throw new Error('Não foi possível adicionar a negociação');
      });
  }

  excluiTodos() {
    return this._getNegociacaoDao()
      .then(negociacaoDao => negociacaoDao.apagaTodos())
      .then(() => 'Lista de negociações apagada com sucesso!')
      .catch(err => {
        console.error(err);
        throw new Error('Não foi possível apagar negociações');
      });
  }

  _getNegociacaoDao() {
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .catch(err => {
        console.error(err);
        throw new Error('Não foi possivel montar a NegociacaoDao para fazer a persistência com o banco');
      });
  }

  getSemana() {
    return this._getNegociacao('/negociacoes/semana');
  }

  getAnterior() {
    return this._getNegociacao('/negociacoes/anterior', 'anterior');
  }

  getRetrasada() {
    return this._getNegociacao('/negociacoes/retrasada', 'retrasada');
  }

  getNegociacoes() {
    return Promise.all([
      this.getSemana(),
      this.getAnterior(),
      this.getRetrasada()
    ]);
  }

  // carrega e retorna lista de negociacoes sem valore duplicados
  importa(listaAtual) {
    return this.getNegociacoes()
      .then(negociacoes =>
        negociacoes
          .reduce((novoArray, array) => novoArray.concat(array), []) /* o Promise.all retorna um array com os dados(array), por isso preciso achatar ele transformando em um array com 1 dimensão */
          .filter(negociacao =>
            // importar somente negociacoes que não foram importadas
            // percorre a lista de negociacoes atual e verifica se a negociação já foi importada
            !listaAtual.some(item => negociacao.isEquals(item))
          )
      )
      .catch(err => {
        throw new Error(err);
      });
  }

  postNegociacao(negociacao) {
    return this._http
      .post('/negociacoes', negociacao.toJSON())
      .then(msg => msg)
      .catch(err => {
        throw new Error(`Não foi possível enviar a negociação. (Código do erro: ${status})`);
      });
  }

  _getNegociacao(url, msg) {
    return this._http
      .get(url)
      .then(negociacoes =>
        negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
      )
      .catch(err => {
        throw new Error(`Não foi possível obter as negociações da semana ${msg}`)
      });
  }
}
