/*
  Regras para implementar o indexedDB no projeto principal
  - getConnection vai ser um método estático
  - getConnection vai retornar uma promise
  - Não importa o número de vezes que o método estático for chamado, a conexão deve ser sempre a mesma
  - o programador não pode fechar uma conexão diretamente. Ela só pode ser fechada através da própria
    factory.
*/
const _dbName = 'aluraframe',
  _dbVersion = 1,
  _stores = ['negociacoes'];

let _connection = null,
  _closeConnection = null;

export class ConnectionFactory {
  constructor() {
    throw new Error('Não é possível criar instâncias de ConnectionFactory');
  }

  static getConnection() {
    return new Promise((resolve, reject) => {
      let openRequest = window.indexedDB.open(_dbName, _dbVersion);

      openRequest.onupgradeneeded = e => {
        // console.log('Banco criado ou alterado com sucesso');
        ConnectionFactory._createStores(ConnectionFactory._connection(e));
      };

      openRequest.onsuccess = e => {
        // console.log('Conexão obtida com sucesso');
        resolve(ConnectionFactory._connection(e));
      }

      openRequest.onerror = e => {
        console.error(e.target.error);
        reject(e.target.error.name);
      }
    });
  }

  static closeConnection() {
    // caso a funcao close tenha sido salva sem o objeto de referência, preciso referência-la com o apply
    // Reflect.apply(_closeConnection, _connection, []);

    // Com o auxili do bind não preciso referenciar a funcao com o objeto
    _closeConnection();
    _connection = null;
    // console.log('Conexão encerrada com sucesso!');
  }

  static _createStores(connection) {
    _stores.forEach(store => {
      if (connection.objectStoreNames.contains(store))
        connection.deleteObjectStore(store);

      connection.createObjectStore(store, { autoIncrement: true });
    });
  }

  static _connection(e) {
    // cria conexão caso não exista nenhuma
    if (!_connection) {
      _connection = e.target.result;
      // armazendo a funcao close antes de sobrescreve-la, e referenciando com a própria conexão
      _closeConnection = _connection.close.bind(_connection);
      /* Monkey Patch: que consiste em mudar o método ou função dinamicamente
      Sobrescrevendo a funcao para que o programador não consiga acessar o metodo close diretamente
      */
      _connection.close = () => {
        throw new Error('Você não pode fechar diretamente a conexão, utilize o ConnectionFactory.Connection()');
      }
    }
    return _connection;
  }
}
