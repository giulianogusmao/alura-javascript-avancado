'use strict';

System.register(['./View.js'], function (_export, _context) {
  "use strict";

  var View, _createClass, _get, MensagemView;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_ViewJs) {
      View = _ViewJs.View;
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

      _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      _export('MensagemView', MensagemView = function (_View) {
        _inherits(MensagemView, _View);

        function MensagemView() {
          _classCallCheck(this, MensagemView);

          return _possibleConstructorReturn(this, (MensagemView.__proto__ || Object.getPrototypeOf(MensagemView)).apply(this, arguments));
        }

        _createClass(MensagemView, [{
          key: 'template',
          value: function template(model) {
            var strTemplate = '';

            try {
              strTemplate = model.texto ? '\n      <p class="alert alert-info">\n        ' + model.texto + '\n      </p>\n    ' : '';
            } catch (e) {}

            return strTemplate;
          }
        }, {
          key: 'update',
          value: function update(model) {
            _get(MensagemView.prototype.__proto__ || Object.getPrototypeOf(MensagemView.prototype), 'update', this).call(this, model);
            if (model) this._clearTimer();
          }
        }, {
          key: '_clearTimer',
          value: function _clearTimer() {
            var _this2 = this;

            clearTimeout(this._timer);
            this._timer = setTimeout(function () {
              _this2.update();
            }, 3000);
          }
        }]);

        return MensagemView;
      }(View));

      _export('MensagemView', MensagemView);
    }
  };
});
//# sourceMappingURL=MensagemView.js.map