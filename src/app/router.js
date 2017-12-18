export default class Router {
  constructor() {
    this.routes = [];
    this.defaultRoute = '';
  }

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  getFragment() {
    const match = window.location.href.match(/#(.*)$/),
      fragment = match ? match[1] : '';

    return this.clearSlashes(fragment);
  }

  check(fragment = this.getFragment()) {
    for (let elem of this.routes) {
      let match = fragment.match(elem.re);

      if (match) {
        if (match[0] == '') {
          this.navigate(this.defaultRoute);

          return this;
        }

        match.shift();
        elem.handler.apply({}, match);

        return this;
      }
    }
  }

  add(re, handler) {
    if(typeof re == 'function') {
      handler = re;
      re = '';
    }

    this.routes.push({re: re, handler: handler});
  }

  listen() {
    let current = this.getFragment();

    this.check();
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      if (current !== this.getFragment()) {
        current = this.getFragment();
        this.check(current);
      }
    }, 50);
  }

  navigate(path = '') {
    window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
  }
}
