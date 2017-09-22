'use strict';

System.register(['./HttpService.js', '../models/Negociacao.js', './ConnectionFactory.js', '../dao/NegociacaoDao.js'], function (_export, _context) {
  "use strict";

  var HttpService, Negociacao, ConnectionFactory, NegociacaoDao, _createClass, NegociacaoService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_HttpServiceJs) {
      HttpService = _HttpServiceJs.HttpService;
    }, function (_modelsNegociacaoJs) {
      Negociacao = _modelsNegociacaoJs.Negociacao;
    }, function (_ConnectionFactoryJs) {
      ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
    }, function (_daoNegociacaoDaoJs) {
      NegociacaoDao = _daoNegociacaoDaoJs.NegociacaoDao;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('NegociacaoService', NegociacaoService = function () {
        function NegociacaoService() {
          _classCallCheck(this, NegociacaoService);

          this._http = new HttpService();
        }

        _createClass(NegociacaoService, [{
          key: 'lista',
          value: function lista() {
            var _this = this;

            return this._getNegociacaoDao().then(function (negociacaoDao) {
              return negociacaoDao.getNegociacoes();
            }).catch(function (err) {
              console.erro(err);
              _this._mensagem.texto = 'Não foi possível listar as negociações';
            });
          }
        }, {
          key: 'cadastra',
          value: function cadastra(negociacao) {
            return this._getNegociacaoDao().then(function (negociacaoDao) {
              return negociacaoDao.adiciona(negociacao);
            }).then(function () {
              return 'Negociação adicionada com sucesso!';
            }) // return implicito na arrow function
            .catch(function (err) {
              console.error(err);
              throw new Error('Não foi possível adicionar a negociação');
            });
          }
        }, {
          key: 'excluiTodos',
          value: function excluiTodos() {
            return this._getNegociacaoDao().then(function (negociacaoDao) {
              return negociacaoDao.apagaTodos();
            }).then(function () {
              return 'Lista de negociações apagada com sucesso!';
            }).catch(function (err) {
              console.error(err);
              throw new Error('Não foi possível apagar negociações');
            });
          }
        }, {
          key: '_getNegociacaoDao',
          value: function _getNegociacaoDao() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).catch(function (err) {
              console.error(err);
              throw new Error('Não foi possivel montar a NegociacaoDao para fazer a persistência com o banco');
            });
          }
        }, {
          key: 'getSemana',
          value: function getSemana() {
            return this._getNegociacao('/negociacoes/semana');
          }
        }, {
          key: 'getAnterior',
          value: function getAnterior() {
            return this._getNegociacao('/negociacoes/anterior', 'anterior');
          }
        }, {
          key: 'getRetrasada',
          value: function getRetrasada() {
            return this._getNegociacao('/negociacoes/retrasada', 'retrasada');
          }
        }, {
          key: 'getNegociacoes',
          value: function getNegociacoes() {
            return Promise.all([this.getSemana(), this.getAnterior(), this.getRetrasada()]);
          }
        }, {
          key: 'importa',
          value: function importa(listaAtual) {
            return this.getNegociacoes().then(function (negociacoes) {
              return negociacoes.reduce(function (novoArray, array) {
                return novoArray.concat(array);
              }, []) /* o Promise.all retorna um array com os dados(array), por isso preciso achatar ele transformando em um array com 1 dimensão */
              .filter(function (negociacao) {
                return (
                  // importar somente negociacoes que não foram importadas
                  // percorre a lista de negociacoes atual e verifica se a negociação já foi importada
                  !listaAtual.some(function (item) {
                    return negociacao.isEquals(item);
                  })
                );
              });
            }).catch(function (err) {
              throw new Error(err);
            });
          }
        }, {
          key: 'postNegociacao',
          value: function postNegociacao(negociacao) {
            return this._http.post('/negociacoes', negociacao.toJSON()).then(function (msg) {
              return msg;
            }).catch(function (err) {
              throw new Error('N\xE3o foi poss\xEDvel enviar a negocia\xE7\xE3o. (C\xF3digo do erro: ' + status + ')');
            });
          }
        }, {
          key: '_getNegociacao',
          value: function _getNegociacao(url, msg) {
            return this._http.get(url).then(function (negociacoes) {
              return negociacoes.map(function (obj) {
                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
              });
            }).catch(function (err) {
              throw new Error('N\xE3o foi poss\xEDvel obter as negocia\xE7\xF5es da semana ' + msg);
            });
          }
        }]);

        return NegociacaoService;
      }());

      _export('NegociacaoService', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map