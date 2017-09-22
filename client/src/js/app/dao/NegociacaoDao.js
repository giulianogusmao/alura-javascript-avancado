class NegociacaoDao {
  constructor(connection) {
    this._connection = connection;
    this._storeTarget = 'negociacoes';

    this._store = this._connection
      .transaction([this._storeTarget], 'readwrite')
      .objectStore(this._storeTarget);
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      let request = this._store.add(negociacao);

      /* podemos abortar uma transação com o seguinte código:
      transaction.abort();
      transaction.onabort = e => {
          console.log('Transação abortada');
      };
       */

      request.onsuccess = e => {
        resolve('Negociação adicionada com sucesso!');
      };

      request.onerror = e => {
        console.error(e.target.error.name);
        reject('Não foi possível adicionar a Negociação');
      };
    });
  }

  getNegociacoes() {
    return new Promise((resolve, reject) => {
      let negociacoes = [];
      let cursor = this._store.openCursor();

      cursor.onsuccess = e => {
        let atual = e.target.result;

        if (atual) {
          let obj = atual.value;
          negociacoes.push(new Negociacao(obj._data, obj._quantidade, obj._valor));
          atual.continue();
        } else {
          resolve([].concat(negociacoes));
        }
      };

      cursor.onerror = e => {
        console.error(e.target.error.name);
        reject('Não foi possível ler as negociações');
      };
    });
  }

  apagaTodos() {
    return new Promise((resolve, reject) => {
      let request = this._store.clear();

      request.onsuccess = e => {
          resolve('Negociações apagadas com sucesso!');
      };

      request.onerror = e => {
        console.error(e.target.error.name);
        reject('Não foi possível apagar as negociações');
      };
    });
  }
}
