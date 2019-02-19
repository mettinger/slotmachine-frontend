
import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import SlotMachine from '../ethereum/slotMachine';
import { Button } from 'semantic-ui-react';

class App extends Component {

  state = {
    owner: '',
    message: '',
    balance: '',
    minBetDivisor: '',
    valueFund: '',
    valueBet: '',
    counter: '',
    playID: '',
    outcome: ''
  };

  async componentDidMount() {
    const owner = await SlotMachine.methods.owner().call();
    this.setState({ owner });

    const minBetDivisor = await SlotMachine.methods.minBetDivisor().call()/1e18;
    this.setState({ minBetDivisor });

    const balance = await SlotMachine.methods.getBalance().call()/1e18;
    this.setState({ balance });

    const counter = await SlotMachine.methods.counter().call();
    this.setState({ counter });
  }


  onSubmitFund = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await SlotMachine.methods.fund().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.valueFund, 'ether')
    });

    this.setState({ message: 'You have funded!', balance:  await SlotMachine.methods.getBalance().call()/1e18});
  };

  // MAKE A BET
  onSubmitBet = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await SlotMachine.methods.wager().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.valueBet, 'ether')
    });

    this.setState({ message: 'You have bet!',
                    balance:  await SlotMachine.methods.getBalance().call()/1e18,
                    counter:  await SlotMachine.methods.counter().call()});
  };

  // PLAY THE GAME
  onSubmitPlay = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await SlotMachine.methods.play(this.state.playID).send({
      from: accounts[0]
    });

    const outcome = await SlotMachine.methods.outcomeGet(this.state.playID).call();






    this.setState({ outcome });

    this.setState({ message: `Play outcome: ${this.state.outcome}`,
                    balance:  await SlotMachine.methods.getBalance().call()/1e18,
                    counter:  await SlotMachine.methods.counter().call()});
  };



  render() {
    return (
      <div>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
        <h2>SlotMachine</h2>
        <p>Owner: {this.state.owner} </p>
        <p>Bet Divisor: {this.state.minBetDivisor} </p>
        <p>Balance: {this.state.balance} </p>
        <p>Next Bet ID: {this.state.counter} </p>
        <hr />

        <form onSubmit={this.onSubmitFund}>
          <h4>Fund the contract.</h4>
          <div>
            <label>Amount of ether to fund: </label>
            <input
              value={this.state.valueFund}
              onChange={event => this.setState({ valueFund: event.target.value })}
            />
          </div>
          <Button primary>Enter</Button>
        </form>

        <hr />
        <form onSubmit={this.onSubmitBet}>
          <h4>Make a bet!</h4>
          <div>
            <label>Amount of ether to bet: </label>
            <input
              value={this.state.valueBet}
              onChange={event => this.setState({ valueBet: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <form onSubmit={this.onSubmitPlay}>
          <h4>Play the game!</h4>
          <div>
            <label>Bet id: </label>
            <input
              value={this.state.playID}
              onChange={event => this.setState({ playID: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>


        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
