'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, _dbName, _dbVersion, _stores, _connection2, _closeConnection, ConnectionFactory;

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

      _dbName = 'aluraframe';
      _dbVersion = 1;
      _stores = ['negociacoes'];
      _connection2 = null;
      _closeConnection = null;

      _export('ConnectionFactory', ConnectionFactory = function () {
        function ConnectionFactory() {
          _classCallCheck(this, ConnectionFactory);

          throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }

        _createClass(ConnectionFactory, null, [{
          key: 'getConnection',
          value: function getConnection() {
            return new Promise(function (resolve, reject) {
              var openRequest = window.indexedDB.open(_dbName, _dbVersion);

              openRequest.onupgradeneeded = function (e) {
                // console.log('Banco criado ou alterado com sucesso');
                ConnectionFactory._createStores(ConnectionFactory._connection(e));
              };

              openRequest.onsuccess = function (e) {
                // console.log('Conexão obtida com sucesso');
                resolve(ConnectionFactory._connection(e));
              };

              openRequest.onerror = function (e) {
                console.error(e.target.error);
                reject(e.target.error.name);
              };
            });
          }
        }, {
          key: 'closeConnection',
          value: function closeConnection() {
            // caso a funcao close tenha sido salva sem o objeto de referência, preciso referência-la com o apply
            // Reflect.apply(_closeConnection, _connection, []);

            // Com o auxili do bind não preciso referenciar a funcao com o objeto
            _closeConnection();
            _connection2 = null;
            // console.log('Conexão encerrada com sucesso!');
          }
        }, {
          key: '_createStores',
          value: function _createStores(connection) {
            _stores.forEach(function (store) {
              if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

              connection.createObjectStore(store, { autoIncrement: true });
            });
          }
        }, {
          key: '_connection',
          value: function _connection(e) {
            // cria conexão caso não exista nenhuma
            if (!_connection2) {
              _connection2 = e.target.result;
              // armazendo a funcao close antes de sobrescreve-la, e referenciando com a própria conexão
              _closeConnection = _connection2.close.bind(_connection2);
              /* Monkey Patch: que consiste em mudar o método ou função dinamicamente
              Sobrescrevendo a funcao para que o programador não consiga acessar o metodo close diretamente
              */
              _connection2.close = function () {
                throw new Error('Você não pode fechar diretamente a conexão, utilize o ConnectionFactory.Connection()');
              };
            }
            return _connection2;
          }
        }]);

        return ConnectionFactory;
      }());

      _export('ConnectionFactory', ConnectionFactory);
    }
  };
});
//# sourceMappingURL=ConnectionFactory.js.map