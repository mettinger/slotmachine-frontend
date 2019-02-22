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
  this.setState({ message: 'Waiting on transaction success...' });

  await SlotMachine.methods.fund().send({
    from: this.props.account,
    value: web3.utils.toWei(this.state.valueFund, 'ether')
  });

  this.props.onBalanceChange();
  this.props.onHouseAccountChange();
  this.setState({ message: 'You have funded!'});
};

// MAKE A BET
onSubmitBet = async event => {
  event.preventDefault();
  this.setState({ message: 'Waiting on transaction success...' });

  await SlotMachine.methods.wager().send({
    from: this.props.account,
    value: web3.utils.toWei(this.state.valueBet, 'ether')
  });

  this.props.onBalanceChange();
  this.props.onHouseAccountChange();
  const thisCounter = await SlotMachine.methods.counter().call();
  this.setState({ message: `You have bet!  Your bet ID: ${thisCounter - 1}`,
                  counter:  thisCounter});

};

  // PLAY THE GAME
  onSubmitPlay = async event => {

    event.preventDefault();
    this.setState({ message: 'Waiting on transaction success...' });
    await SlotMachine.methods.play(this.state.playID).send({
      from: this.props.account
    });
    const outcome = await SlotMachine.methods.outcomeGet(this.state.playID).call();
    console.log("Outcome: " + outcome.toString());
    this.setState({ outcome });

    this.setState({ message: 'Spinning!' });
    this.props.spinFunction(outcome);
    setTimeout( async () => {this.setState({ message: `Your payout: ${await SlotMachine.methods.award().call()}`});},5500);
    this.props.onBalanceChange();
    this.props.onHouseAccountChange();

  };

  // CASH OUT HOUSE OWNERSHIP
  onSubmitCashOut = async event => {
    event.preventDefault();
    this.setState({ message: 'Waiting on transaction success...' });
    await await SlotMachine.methods.houseWithdraw(this.props.account).send({
      from: this.props.account
    });

    this.props.onBalanceChange();
    this.props.onHouseAccountChange();
    this.setState({ message: "Withdrawl successful!" });
  }

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


        {/* CASH OUT HOUSE OWNERSHIP */}
        <hr />
        <h4>Cash out house ownership.</h4>
        <Button primary onClick={this.onSubmitCashOut}>Cash Out!</Button>

        {/* MESSAGES! */}
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}

export default PlayComponent;
