import React, { Component } from 'react';
import SlotMachine from '../ethereum/slotMachine';
import InfoComponent from './InfoComponent.js';
import PlayComponent from './PlayComponent.js';
import web3 from '../ethereum/web3';

class InfoAndActionComponent extends Component {
  constructor(props) {
    super(props);
    this.balanceChange = this.balanceChange.bind(this);
    this.housePercentageChange = this.housePercentageChange.bind(this);
    this.state = {balance: '',
                  housePercentage: '',
                  account: ''};
  }

  async componentDidMount() {
    this.setState({ balance: await SlotMachine.methods.getBalance().call() });

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const housePercentage = await SlotMachine.methods.housePercentages(this.state.account).call();
    this.setState({ housePercentage: housePercentage.numerator/housePercentage.denominator});
  }

  async balanceChange() {
    this.setState({ balance: await SlotMachine.methods.getBalance().call() });
  }

  async housePercentageChange() {
    const housePercentage = await SlotMachine.methods.housePercentages(this.state.account).call();
    this.setState({ housePercentage: housePercentage.numerator/housePercentage.denominator});
  }

  render() {
    return (
      <div>
        <InfoComponent balance={this.state.balance}
                       housePercentage={this.state.housePercentage}
                       account={this.state.account}/>

        <PlayComponent onBalanceChange={this.balanceChange}
                       spinFunction={this.props.spinFunction}
                       onHousePercentageChange={this.housePercentageChange}
                       account={this.state.account}/>
      </div>
    );
  }
}

export default InfoAndActionComponent;
