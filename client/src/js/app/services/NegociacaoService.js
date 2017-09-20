class NegociacaoService {
  constructor() {
    this._xhr = new XMLHttpRequest();
  }

  getSemana(cb) {
    this._getRequest(cb, '/negociacoes/semana');
  }

  getAnterior(cb) {
    this._getRequest(cb, '/negociacoes/anterior');
  }

  getRetrasada(cb) {
    this._getRequest(cb, '/negociacoes/retrasada');
  }

  cadastraNegociacao(negociacao, cb) {
    this._sendRequest(cb, '/negociacoes', negociacao);
  }

  _sendRequest(cb, url, negociacao) {
    this._xhr.open("POST", url, true);
    this._request(cb, 'POST', negociacao);
  }

  _getRequest(cb, url) {
    this._xhr.open('GET', url);
    this._request(cb);
  }

  _request(cb, type, params) {
    if (type == 'POST')
      this._xhr.setRequestHeader("Content-type", "application/json");

    this._xhr.onreadystatechange = () => {
      /*
      Estados
      0: requisição ainda não iniciada
      1: conexão com o servidor estabelecida
      2: requisição recebida
      3: processando requisição
      4: requisição está concluída e a resposta está pronta
      */
      if (this._xhr.readyState == 4) {
        if (this._xhr.status == 200) {
          if (type == 'POST') {
            cb(false);
          } else {
            cb(false, JSON.parse(this._xhr.responseText)
              .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
          }
        } else {
          cb('Não foi possível obter as negociações');
          console.error(`Error code: ${this._xhr.status}, Type Error: ${this._xhr.statusText}, Error: ${this._xhr.responseText}`);
        }
      }
    };

    if (type == 'POST')
      this._xhr.send(JSON.stringify(params));
    else
      this._xhr.send();
  }
}
