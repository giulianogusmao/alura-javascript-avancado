class HttpService {

  get(url) {
    return this._sendRequest(url);
  }

  post(url, dado) {
    return this._sendRequest(url, dado);
  }

  _sendRequest(url, dado) {
    return new Promise((resolve, reject) => {

      let xhr = new XMLHttpRequest();

      if (dado) {
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/json");
      } else {
        xhr.open('GET', url);
      }

      xhr.onreadystatechange = () => {
        /*
          Estados
            0: requisição ainda não iniciada
            1: conexão com o servidor estabelecida
            2: requisição recebida
            3: processando requisição
            4: requisição está concluída e a resposta está pronta
        */
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        }
      };

      xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
    });
  }

}
