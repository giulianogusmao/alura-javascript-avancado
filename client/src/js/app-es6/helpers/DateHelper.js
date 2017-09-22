export class DateHelper {
  constructor() {
    throw new Error('DateHelper não deve ser instanciado');
  }

  /*
    o new Date trabalha os meses como sendo de 0-11, por isso, para realizar a conversão
    corretamente é necessário decrementar 1 do mês quando for converter uma string para um date e
    adicionar 1 para converter um date em string.
  */

  // return string da data no formato dd/mm/yyyy ou yyyy-mm-dd
  static dateToStr(date, isBr = true) {
    let pt = new Intl.DateTimeFormat('pt-BR'),
      dateBr = pt.format(date);

    return isBr ? dateBr : dateBr.split('/').reverse().join('-');
  }

  static strToDate(str) {
    let array = [],
      regexUS = /\d{4}-\d{1,2}-\d{1,2}/g,
      regexBR = /\d{1,2}\/\d{1,2}\/\d{4}/g;

    switch(true) {
      case regexUS.test(str):
        array = str
          .split('-') // quebra a data em um array
          .map((item, i) => item - i % 2); // subtrai 1 para o indice impar
        break;

      case regexBR.test(str):
        array = str
          .split('/')
          .reverse()
          .map((item, i) => item - i % 2); // subtrai 1 para o indice impar
        break;

      default:
        throw new Error(`Data ${str} inválida. Informe uma data no formato aaaa-mm-dd`);
    }

    return new Date(... //adiciona os itens do array individualmente
      array
    );
  }
}
