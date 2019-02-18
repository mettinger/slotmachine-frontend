import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import web3 from '../ethereum/web3';
import SlotMachine from '../ethereum/slotMachine';
import { Button } from 'semantic-ui-react';

class PlayComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
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

}

// FUND THE HOUSE
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

  this.setState({ message: `You have bet!  Your bet ID: ${await SlotMachine.methods.counter().call() - 1}`,
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
    this.setState({ message: `Your payout: ${await SlotMachine.methods.award().call()}`,
                    balance:  await SlotMachine.methods.getBalance().call()/1e18,
                    counter:  await SlotMachine.methods.counter().call()});

    this.props.spinFunction(outcome);

  };

  render() {
    return (
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>

        {/* FUND!! */}

        <form>
          <h4>Fund the contract.</h4>
          <div>
            <label>Amount of ether to fund: </label>
            <input
              value={this.state.valueFund}
              onChange={event => this.setState({ valueFund: event.target.value })}
            />
          </div>
          <Button primary onClick={this.onSubmitFund}>Fund!</Button>
        </form>

        {/* BET!! */}

        <hr />
        <form>
          <h4>Make a bet!</h4>
          <div>
            <label>Amount of ether to bet: </label>
            <input
              value={this.state.valueBet}
              onChange={event => this.setState({ valueBet: event.target.value })}
            />
          </div>
          <Button primary onClick={this.onSubmitBet}>Bet!</Button>
        </form>

        {/* SPIN!! */}

        <hr />
        <form>
          <h4>Play the game!</h4>
          <div>
            <label>Bet id: </label>
            <input type="text"
              value={this.state.playID}
              onChange={event => this.setState({ playID: event.target.value})}
            />
          </div>
        </form>
        <Button primary onClick={this.onSubmitPlay}>Spin!</Button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}

export default PlayComponent;
