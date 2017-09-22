'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, DateHelper;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

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

      _export('DateHelper', DateHelper = function () {
        function DateHelper() {
          _classCallCheck(this, DateHelper);

          throw new Error('DateHelper não deve ser instanciado');
        }

        /*
          o new Date trabalha os meses como sendo de 0-11, por isso, para realizar a conversão
          corretamente é necessário decrementar 1 do mês quando for converter uma string para um date e
          adicionar 1 para converter um date em string.
        */

        // return string da data no formato dd/mm/yyyy ou yyyy-mm-dd


        _createClass(DateHelper, null, [{
          key: 'dateToStr',
          value: function dateToStr(date) {
            var isBr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var pt = new Intl.DateTimeFormat('pt-BR'),
                dateBr = pt.format(date);

            return isBr ? dateBr : dateBr.split('/').reverse().join('-');
          }
        }, {
          key: 'strToDate',
          value: function strToDate(str) {
            var array = [],
                regexUS = /\d{4}-\d{1,2}-\d{1,2}/g,
                regexBR = /\d{1,2}\/\d{1,2}\/\d{4}/g;

            switch (true) {
              case regexUS.test(str):
                array = str.split('-') // quebra a data em um array
                .map(function (item, i) {
                  return item - i % 2;
                }); // subtrai 1 para o indice impar
                break;

              case regexBR.test(str):
                array = str.split('/').reverse().map(function (item, i) {
                  return item - i % 2;
                }); // subtrai 1 para o indice impar
                break;

              default:
                throw new Error('Data ' + str + ' inv\xE1lida. Informe uma data no formato aaaa-mm-dd');
            }

            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray( //adiciona os itens do array individualmente
            array))))();
          }
        }]);

        return DateHelper;
      }());

      _export('DateHelper', DateHelper);
    }
  };
});
//# sourceMappingURL=DateHelper.js.map