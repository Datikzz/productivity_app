//require('./app/pages/settings-pomodoro/settings_pomodoro');

export const Router = {
  routes: [],
  root: '/',
  defaultRoute: {},

  getFragment() {
    let fragment = '';
    let match = window.location.href.match(/#(.*)$/);
    fragment = match ? match[1] : '';

    return this.clearSlashes(fragment);
  },

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  },

  add(re, handler) {
    this.routes.push({re: re, handler: handler});
    return this;
  },

  check(f) {
    let fragment = f || this.getFragment();

    for (let i = 0; i < this.routes.length; i++) {
      let match = fragment.match(this.routes[i].re);

      if (match) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        return this;
      }
    }
    this.defaultRoute();
    return this;
  },

  listen() {
    let self = this;
    let current = self.getFragment();
    let fn = () => {
      if (current !== self.getFragment()) {
        current = self.getFragment();
        self.check(current);
      }
    };

    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  },

  navigate(path) {
    path = path ? path : '';
    window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    return this;
  }
};

Router.add(/about/,function(){console.log("about");})
Router.navigate('/about');
