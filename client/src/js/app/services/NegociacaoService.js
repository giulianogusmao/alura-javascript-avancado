class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  getSemana() {
    return this._getNegociacao('/negociacoes/semana');
  }

  getAnterior() {
    return this._getNegociacao('/negociacoes/anterior', 'anterior');
  }

  getRetrasada() {
    return this._getNegociacao('/negociacoes/retrasada', 'retrasada');
  }

  _getNegociacao(url, msg) {
    return this._http
      .get(url)
      .then(negociacoes =>
        negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
      )
      .catch((status, err) => {
        throw new Error(`Não foi possível obter as negociações da semana ${msg}`)
      });
  }
}