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

  // PLAY THE GAME
  onSubmitPlay = async event => {
/*
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
                    counter:  await SlotMachine.methods.counter().call()});*/

    this.props.spinFunction([3,3,3,3,3]);

  };

  render() {
    return (
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
        <form onSubmit={this.onSubmitPlay}>
          <h4>Play the game!</h4>
          <div>
            <label>Bet id: </label>
            <input type="text"
              value={this.state.playID}
              onChange={event => this.setState({ playID: event.target.value, message: event.target.value })}
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
