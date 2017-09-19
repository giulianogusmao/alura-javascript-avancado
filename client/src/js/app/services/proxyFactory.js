class ProxyFactory {
  static create(objeto, props, action) {
    return new Proxy(objeto, {

      get(target, prop, receiver) {
        if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
          return function () {
            console.log(`método '${prop}' interceptado`);

            Reflect.apply(target[prop], target, arguments);
            return action(target);
          }
        }

        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver) {
        if (props.includes(prop) && prop.indexOf('_') < 0) {
          console.log(`método '${prop}' interceptado`);
          target[prop] = value;
          action(target);
        }

        return Reflect.set(target, prop, value, receiver);
      },

    });
  }

  static _isFunction(propriedade) {
    return typeof (propriedade) == typeof (Function);
  }
}
