
export interface Expression<ARGS extends any[]> {
  (...args: ARGS): boolean,
}

export function AND<ARGS extends any[]>(expressions: Expression<ARGS>[]): Expression<ARGS> {
  function _and(this: any, ...args: ARGS): boolean {
    for(const expr of expressions) {
      if(!expr.apply(this, args)) {
        return false;
      }
    }

    return true;
  }

  return _and;
}


export function OR<ARGS extends any[]>(expressions: Expression<ARGS>[]): Expression<ARGS> {
  function _or(this: any, ...args: ARGS): boolean {
    for(const expr of expressions) {
      if(expr.apply(this, args)) {
        return true;
      }
    }

    return false;
  }

  return _or;
}

export function NOT<ARGS extends any[]>(expr: Expression<ARGS>): Expression<ARGS> {
  function _not(this: any, ...args: ARGS): boolean {
    return !expr.apply(this, args);
  }

  return _not;
}

