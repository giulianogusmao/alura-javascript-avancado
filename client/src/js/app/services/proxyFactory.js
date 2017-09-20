class ProxyFactory {
  static create(objeto, props, action) {
    return new Proxy(objeto, {

      get(target, prop, receiver) {
        if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
          return function () {
            console.log(`método '${prop}' interceptado`);

            let retorno = Reflect.apply(target[prop], target, arguments);
            action(target);
            return retorno;
          }
        }

        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver) {
        // atribui o valor passado
        let retorno = Reflect.set(target, prop, value, receiver);

        if (props.includes(prop) && prop.indexOf('_') < 0) {
          console.log(`método '${prop}' interceptado`);
          // executa armadilha
          action(target);
        }

        return retorno;
      },

    });
  }

  static _isFunction(propriedade) {
    return typeof (propriedade) == typeof (Function);
  }
}
