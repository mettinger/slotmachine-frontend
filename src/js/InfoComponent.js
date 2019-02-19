import React, { Component } from 'react';
import SlotMachine from '../ethereum/slotMachine';

class InfoComponent extends Component {

  state = {
    minBetDivisor: '',
    maxMultiplier: ''
  };

  async componentDidMount() {
    const minBetDivisor = await SlotMachine.methods.minBetDivisor().call();
    this.setState({ minBetDivisor });

    const maxMultiplier = await SlotMachine.methods.maxMultiplier().call();
    this.setState({ maxMultiplier });
  }

  render() {
    return (
      <div>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
        <h2>Info: </h2>
        <p>Bet Divisor (Ether): {this.state.minBetDivisor/1e18} </p>
        <p>House Balance (Ether): {this.props.balance/1e18} </p>
        <p>Max safe bet (Ether): {parseFloat(this.props.balance)/ (parseFloat(this.state.maxMultiplier) * 1e18)} </p>
        <p>Your house percentage ownership: {this.props.housePercentage * 100}</p>
        <hr />
      </div>
    );
  }
}

export default InfoComponent;
