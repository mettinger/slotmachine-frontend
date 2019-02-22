const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = require(`../assets/symbols/${name}`);
      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach(symbol => new Symbol(symbol));
  }

  // MODIFY THIS TO IMPORT YOUR SYMBOLS
  static get symbols() {
    return ['at_at.svg',
            'c3po.svg',
            'darth_vader.svg',
            'death_star.svg',
            'falcon.svg',
            'r2d2.svg',
            'stormtrooper.svg',
            'tie_ln.svg',
            'yoda.svg'];
  }

  static random() {
    return this.symbols[Math.floor(Math.random()*this.symbols.length)];
  }
}
