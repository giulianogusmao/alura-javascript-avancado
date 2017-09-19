class Bind {
  constructor(model, view, ...props) {
    // cria a proxy que ficará responsável em atualizar a view quando as propriedades forem alteradas
    let proxy = ProxyFactory.create(
      model, props, model => view.update(model)
    );

    // atualiza a view assim que for instanciada
    view.update(model);

    // retorna proxy instanciada
    return proxy;
  }
}
