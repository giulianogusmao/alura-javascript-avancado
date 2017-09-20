class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._mensagem = new Bind(
      new Mensagem(), new MensagemView($('#mensagemView')), 'texto'
    );

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia'
    );
  }

  // adiciona uma negociacao na lista de negociacoes
  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._limpaFormulario();

    this._mensagem.texto = "Negociação adicionada com sucesso!";
  }

  limpa() {
    this._listaNegociacoes.esvazia();

    this._mensagem.texto = "Lista de negociações apagada com sucesso!";
  }

  importaNegociacoes() {
    let xhr = new XMLHttpRequest();
    let url = '/negociacoes/semana';

    xhr.open('GET', url);

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
          console.log(xhr.responseText);
          JSON.parse(xhr.responseText)
            .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

          this._mensagem.texto = 'Negociações importadas com sucesso!';
        } else {
          this._mensagem.texto = 'Não foi possível obter as negociações';
          console.error(`Error code: ${xhr.status}, Type Error: ${xhr.statusText}, Error: ${xhr.responseText}`);
        }
      }
    };

    xhr.send();
  }

  // captura os valores do formulário e retorna uma Negociacao instanciada
  _criaNegociacao() {
    // builderForm
    this._inputData.value = DateHelper.dateToStr(new Date(), false);
    this._inputQuantidade.value = Math.floor(Math.random() * 10) + 1;
    this._inputValor.value = Math.random() * 200;

    return new Negociacao(
      DateHelper.strToDate(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  // limpa todos os dados do formulariao e aplica o focus no campo data
  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;

    this._inputData.focus();
  }
}
