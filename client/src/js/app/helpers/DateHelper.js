class DateHelper {
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
    if (!/\d{4}-\d{1,2}-\d{1,2}/g.test(str))
      throw new Error(`Data ${str} inválida. Informe uma data no formato aaaa-mm-dd`);

    return new Date(... //adiciona os itens do array individualmente
      str
        .split('-') // quebra a data em um array
        .map((item, i) => item - i % 2) // subtrai 1 para o indice impar
    );
  }
}
