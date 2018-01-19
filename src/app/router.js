/**
 * Class representing Router service
 * @namespace  Router
 */
export default class Router {
  /**
   * constructor of Router
   * @constructs Router
   * @memberOf Router
   */
  constructor() {
    this.routes = [];
    this.defaultRoute = '';
  }

  /**
   * Clear slashes from path
   * @param {string} path - path
   * @returns {string|XML} - parsed path
   * @memberOf Router
   */
  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  /**
   * Get formatted path
   * @returns {string} - path
   * @memberOf Router
   */
  getFragment() {
    const match = window.location.href.match(/#(.*)$/),
      fragment = match ? match[1] : '';
    return this.clearSlashes(fragment);
  }

  /**
   * Check for changes of hash
   * @param {string} fragment - path
   * @returns {Router}
   * @memberOf Router
   */
  check(fragment = this.getFragment()) {
    for (let elem of this.routes) {
      let match = fragment.match(elem.re);

      if (match) {
        if (match[0] === '') {
          this.navigate(this.defaultRoute);

          return this;
        }

        match.shift();
        elem.handler.apply({}, match);

        return this;
      }
    }
  }

  /**
   * Add new path with its handler to service
   * @param {string} re
   * @param {function} handler
   * @memberOf Router
   */
  add(re, handler) {
    if(typeof re == 'function') {
      handler = re;
      re = '';
    }
    this.routes.push({re: re, handler: handler});
  }

  /**
   * Check for changes of hash and change url
   * @memberOf Router
   */
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

  /**
   * Change hash
   * @param {string} path - path
   * @memberOf Router
   */
  navigate(path = '') {
    window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
  }
}
