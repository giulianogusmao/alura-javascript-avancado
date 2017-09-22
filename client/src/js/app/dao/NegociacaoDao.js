'use strict';

System.register(['../models/Negociacao.js'], function (_export, _context) {
  "use strict";

  var Negociacao, _createClass, NegociacaoDao;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_modelsNegociacaoJs) {
      Negociacao = _modelsNegociacaoJs.Negociacao;
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

      _export('NegociacaoDao', NegociacaoDao = function () {
        function NegociacaoDao(connection) {
          _classCallCheck(this, NegociacaoDao);

          this._connection = connection;
          this._storeTarget = 'negociacoes';

          this._store = this._connection.transaction([this._storeTarget], 'readwrite').objectStore(this._storeTarget);
        }

        _createClass(NegociacaoDao, [{
          key: 'adiciona',
          value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
              var request = _this._store.add(negociacao);

              /* podemos abortar uma transação com o seguinte código:
              transaction.abort();
              transaction.onabort = e => {
                  console.log('Transação abortada');
              };
               */

              request.onsuccess = function (e) {
                resolve('Negociação adicionada com sucesso!');
              };

              request.onerror = function (e) {
                console.error(e.target.error.name);
                reject('Não foi possível adicionar a Negociação');
              };
            });
          }
        }, {
          key: 'getNegociacoes',
          value: function getNegociacoes() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              var negociacoes = [];
              var cursor = _this2._store.openCursor();

              cursor.onsuccess = function (e) {
                var atual = e.target.result;

                if (atual) {
                  var obj = atual.value;
                  negociacoes.push(new Negociacao(obj._data, obj._quantidade, obj._valor));
                  atual.continue();
                } else {
                  resolve([].concat(negociacoes));
                }
              };

              cursor.onerror = function (e) {
                console.error(e.target.error.name);
                reject('Não foi possível ler as negociações');
              };
            });
          }
        }, {
          key: 'apagaTodos',
          value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
              var request = _this3._store.clear();

              request.onsuccess = function (e) {
                resolve('Negociações apagadas com sucesso!');
              };

              request.onerror = function (e) {
                console.error(e.target.error.name);
                reject('Não foi possível apagar as negociações');
              };
            });
          }
        }]);

        return NegociacaoDao;
      }());

      _export('NegociacaoDao', NegociacaoDao);
    }
  };
});
//# sourceMappingURL=NegociacaoDao.js.map