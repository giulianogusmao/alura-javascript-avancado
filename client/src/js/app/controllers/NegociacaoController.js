'use strict';

System.register(['../helpers/DateHelper.js', '../helpers/Bind.js', '../models/Negociacao.js', '../models/Mensagem.js', '../views/MensagemView.js', '../models/ListaNegociacoes.js', '../views/NegociacoesView.js', '../services/NegociacaoService.js'], function (_export, _context) {
  "use strict";

  var DateHelper, Bind, Negociacao, Mensagem, MensagemView, ListaNegociacoes, NegociacoesView, NegociacaoService, _createClass, NegociacaoController, negociacaoController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function instanceNegociacaoCtrl() {
    return negociacaoController;
  }

  _export('instanceNegociacaoCtrl', instanceNegociacaoCtrl);

  return {
    setters: [function (_helpersDateHelperJs) {
      DateHelper = _helpersDateHelperJs.DateHelper;
    }, function (_helpersBindJs) {
      Bind = _helpersBindJs.Bind;
    }, function (_modelsNegociacaoJs) {
      Negociacao = _modelsNegociacaoJs.Negociacao;
    }, function (_modelsMensagemJs) {
      Mensagem = _modelsMensagemJs.Mensagem;
    }, function (_viewsMensagemViewJs) {
      MensagemView = _viewsMensagemViewJs.MensagemView;
    }, function (_modelsListaNegociacoesJs) {
      ListaNegociacoes = _modelsListaNegociacoesJs.ListaNegociacoes;
    }, function (_viewsNegociacoesViewJs) {
      NegociacoesView = _viewsNegociacoesViewJs.NegociacoesView;
    }, function (_servicesNegociacaoServiceJs) {
      NegociacaoService = _servicesNegociacaoServiceJs.NegociacaoService;
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

      NegociacaoController = function () {
        function NegociacaoController() {
          _classCallCheck(this, NegociacaoController);

          var $ = document.querySelector.bind(document);

          this._inputData = $('#data');
          this._inputQuantidade = $('#quantidade');
          this._inputValor = $('#valor');

          this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

          this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena');

          this._negociacaoService = new NegociacaoService();
          this._init();
        }

        _createClass(NegociacaoController, [{
          key: '_init',
          value: function _init() {
            // carregar negociacaoes do indexedDB
            this._carregaNegociacoes();

            // importando negociacoes automaticamente
            // this.importaNegociacoes();
            // this._timerImportaNegociacoes = setInterval(() => {
            //   this.importaNegociacoes();
            // }, 3000);
          }
        }, {
          key: '_carregaNegociacoes',
          value: function _carregaNegociacoes() {
            var _this = this;

            this._negociacaoService.lista().then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                return _this._listaNegociacoes.adiciona(negociacao);
              });
            }).catch(function (err) {
              return _this._mensagem.texto = err;
            });
          }
        }, {
          key: 'adiciona',
          value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._negociacaoService.cadastra(negociacao).then(function (msg) {
              _this2._listaNegociacoes.adiciona(negociacao);
              _this2._limpaFormulario();
              _this2._mensagem.texto = msg;
            }).catch(function (err) {
              return _this2._mensagem.texto = err;
            });
          }
        }, {
          key: 'envia',
          value: function envia() {
            var _this3 = this;

            this._negociacaoService.postNegociacao(this._criaNegociacao()).then(function (x) {
              _this3._limpaFormulario();
              _this3._mensagem.texto = 'Negociação enviada com sucesso!';
            }).catch(function (err) {
              return _this3._mensagem.texto = err;
            });
          }
        }, {
          key: 'limpa',
          value: function limpa() {
            var _this4 = this;

            this._negociacaoService.excluiTodos().then(function (msg) {
              _this4._listaNegociacoes.esvazia();
              _this4._mensagem.texto = msg;
            }).catch(function (err) {
              return _this4._mensagem.texto = err;
            });
          }
        }, {
          key: 'importaNegociacoes',
          value: function importaNegociacoes() {
            var _this5 = this;

            this._negociacaoService.importa(this._listaNegociacoes.listaNegociacoes).then(function (listaNegociacoes) {
              listaNegociacoes.forEach(function (negociacao) {
                return _this5._listaNegociacoes.adiciona(negociacao);
              });
              _this5._mensagem.texto = 'Negociações importadas com sucesso!';
            }).catch(function (err) {
              return _this5._mensagem.texto = err;
            });
          }
        }, {
          key: 'ordenaColuna',
          value: function ordenaColuna(coluna) {
            this._listaNegociacoes.ordena(coluna);
          }
        }, {
          key: '_criaNegociacao',
          value: function _criaNegociacao() {
            // builderForm
            this._inputData.value = this._inputData.value || DateHelper.dateToStr(new Date(), false);
            this._inputQuantidade.value = this._inputQuantidade.value || Math.floor(Math.random() * 10) + 1;
            this._inputValor.value = Number(this._inputValor.value) > 0 ? this._inputValor.value : Math.random() * 200;

            try {
              return new Negociacao(DateHelper.strToDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
            } catch (err) {
              this._mensagem.texto = err;
              throw new Error(err); // gera o erro recebido para interromper o código e não continuar com a inclusão
            }
          }
        }, {
          key: '_limpaFormulario',
          value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0;

            this._inputData.focus();
          }
        }]);

        return NegociacaoController;
      }();

      negociacaoController = new NegociacaoController();
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map