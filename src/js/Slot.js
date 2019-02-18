import Reel from './Reel.js';
import Symbol from './Symbol.js';

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ['death_star', 'death_star', 'death_star'],
      ['death_star', 'death_star', 'death_star'],
      ['death_star', 'death_star', 'death_star'],
      ['death_star', 'death_star', 'death_star'],
      ['death_star', 'death_star', 'death_star'],
    ];

    this.nextSymbols = [
      ['death_star', 'death_star', 'death_star'],
      ['death_star', 'death_star', 'death_star'],
      ['death_star', 'death_star', 'death_star'],
      ['death_star', 'death_star', 'death_star'],
      ['death_star', 'death_star', 'death_star'],
    ]

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName('reel')).map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]));

    if (config.inverted) {
      this.container.classList.add('inverted');
    }

    this.spin = this.spin.bind(this);

  }

  spin(outcome) {
    console.log(Symbol.symbols[0]);

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
