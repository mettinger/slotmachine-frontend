import React, { Component } from 'react';
import SlotMachine from '../ethereum/slotMachine';
import InfoComponent from './InfoComponent.js';
import PlayComponent from './PlayComponent.js';
import web3 from '../ethereum/web3';

class InfoAndActionComponent extends Component {
  constructor(props) {
    super(props);
    this.balanceChange = this.balanceChange.bind(this);
    this.houseAccountChange= this.houseAccountChange.bind(this);
    this.state = {balance: '',
                  houseAccountBalance: '',
                  account: '',
                  minInvestment: ''};
  }

  async componentDidMount() {
    this.setState({ balance: await SlotMachine.methods.getBalance().call() });

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const houseAccountBalance = await SlotMachine.methods.houseAccountGet(this.state.account).call();
    this.setState({ houseAccountBalance: houseAccountBalance});

    this.setState({minInvestment: await SlotMachine.methods.minInvestment().call()})
  }

  async balanceChange() {
    this.setState({ balance: await SlotMachine.methods.getBalance().call() });
  }

  async houseAccountChange() {
    const houseAccountBalance = await SlotMachine.methods.houseAccountGet(this.state.account).call();
    this.setState({ houseAccountBalance: houseAccountBalance});
  }

  render() {
    return (
      <div>
        <InfoComponent balance={this.state.balance}
                       houseAccountBalance={this.state.houseAccountBalance}
                       account={this.state.account}
                       minInvestment={this.state.minInvestment}/>

        <PlayComponent onBalanceChange={this.balanceChange}
                       spinFunction={this.props.spinFunction}
                       onHouseAccountChange={this.houseAccountChange}
                       account={this.state.account}/>
      </div>
    );
  }
}

export default InfoAndActionComponent;
