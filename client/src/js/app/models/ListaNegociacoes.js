'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, ListaNegociacoes;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
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

      _export('ListaNegociacoes', ListaNegociacoes = function () {
        function ListaNegociacoes() {
          _classCallCheck(this, ListaNegociacoes);

          this.__ordemAtual = '';
          this._listaNegociacoes = [];
        }

        _createClass(ListaNegociacoes, [{
          key: 'adiciona',
          value: function adiciona(negociacao) {
            this._listaNegociacoes.push(negociacao);
          }
        }, {
          key: 'esvazia',
          value: function esvazia() {
            if (this._listaNegociacoes.length) this._listaNegociacoes.length = 0;
          }
        }, {
          key: 'ordena',
          value: function ordena(coluna) {
            this._listaNegociacoes.sort(function (a, b) {
              return a['_' + coluna] - b['_' + coluna];
            });

            // caso seja a mesma coluna que esteja sendo ordenada, ordena do maior para o menor (lista reversa)
            if (coluna == this._ordemAtual) this._listaNegociacoes.reverse();

            this._ordemAtual = coluna;
          }
        }, {
          key: 'listaNegociacoes',
          get: function get() {
            return [].concat(this._listaNegociacoes);
          }
        }, {
          key: 'volumeTotal',
          get: function get() {
            return this._listaNegociacoes.reduce(function (total, item) {
              return total = parseFloat(total) + item.volume;
            }, 0.0);
          }
        }]);

        return ListaNegociacoes;
      }());

      _export('ListaNegociacoes', ListaNegociacoes);
    }
  };
});
//# sourceMappingURL=ListaNegociacoes.js.map