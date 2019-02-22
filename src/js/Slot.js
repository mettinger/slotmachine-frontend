import Reel from './Reel.js';
import Symbol from './Symbol.js';

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();
    var firstSymbol = Symbol.symbols[0];

    this.currentSymbols = [
      [firstSymbol, firstSymbol, firstSymbol],
      [firstSymbol, firstSymbol, firstSymbol],
      [firstSymbol, firstSymbol, firstSymbol],
      [firstSymbol, firstSymbol, firstSymbol],
      [firstSymbol, firstSymbol, firstSymbol],
    ];

    this.nextSymbols = [
      [firstSymbol, firstSymbol, firstSymbol],
      [firstSymbol, firstSymbol, firstSymbol],
      [firstSymbol, firstSymbol, firstSymbol],
      [firstSymbol, firstSymbol, firstSymbol],
      [firstSymbol, firstSymbol, firstSymbol],
    ]

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName('reel')).map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]));

    if (config.inverted) {
      this.container.classList.add('inverted');
    }

    this.spin = this.spin.bind(this);

  }

  spin(outcome) {

    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [Symbol.random(), Symbol.symbols[outcome[0]], Symbol.random()],
      [Symbol.random(), Symbol.symbols[outcome[1]], Symbol.random()],
      [Symbol.random(), Symbol.symbols[outcome[2]], Symbol.random()],
      [Symbol.random(), Symbol.symbols[outcome[3]], Symbol.random()],
      [Symbol.random(), Symbol.symbols[outcome[4]], Symbol.random()],
    ];


    return Promise.all(this.reels.map(reel => {
      reel.renderSymbols(this.currentSymbols[reel.idx], this.nextSymbols[reel.idx]);
      return reel.spin();
    }));
  }
}
