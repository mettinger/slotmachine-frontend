import React, { Component } from 'react';
import SlotMachine from '../ethereum/slotMachine';

class InfoComponent extends Component {

  state = {
    minDivisor: '',
    maxMultiplier: ''
  };

  async componentDidMount() {
    const minDivisor = await SlotMachine.methods.minDivisor().call();
    this.setState({ minDivisor });

    const maxMultiplier = await SlotMachine.methods.maxMultiplier().call();
    this.setState({ maxMultiplier });
  }

  render() {
    return (
      <div>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
        <h2>Info: </h2>
        <p>Bet/Fund Divisor (Ether): {this.state.minDivisor/1e18} </p>
        <p>House Balance (Ether): {this.props.balance/1e18} </p>
        <p>Max safe bet (Ether): {parseFloat(this.props.balance)/ (parseFloat(this.state.maxMultiplier) * 1e18)} </p>
        <p>Your house balance (Ether): {this.props.houseAccountBalance/1e18}</p>
        <p>Minimum investment for new member (Ether): {this.props.minInvestment}</p>
        <p>Your open bets: {this.props.openBets.toString()}</p>
        <hr />
      </div>
    );
  }
}

export default InfoComponent;
