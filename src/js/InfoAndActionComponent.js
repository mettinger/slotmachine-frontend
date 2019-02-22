import React, { Component } from 'react';
import SlotMachine from '../ethereum/slotMachine';
import InfoComponent from './InfoComponent.js';
import PlayComponent from './PlayComponent.js';
import web3 from '../ethereum/web3';

class InfoAndActionComponent extends Component {
  constructor(props) {
    super(props);
    SlotMachine.events.BetPlaced({}, (error, events) => this.betEventDetected(events));
    SlotMachine.events.Awarded({}, (error, events) => this.awardDetected(events));

    this.balanceChange = this.balanceChange.bind(this);
    this.houseAccountChange= this.houseAccountChange.bind(this);
    this.state = {balance: '',
                  houseAccountBalance: '',
                  account: '',
                  minInvestment: '',
                  openBets: []};
  }

  async componentDidMount() {
    this.setState({ balance: await SlotMachine.methods.getBalance().call() });

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const houseAccountBalance = await SlotMachine.methods.houseAccountGet(this.state.account).call();
    this.setState({ houseAccountBalance: houseAccountBalance});

    this.setState({minInvestment: await SlotMachine.methods.minInvestment().call()});

    this.setState({openBets: await this.openBetsInit()});
  }

  awardDetected = (events) => {
    var possibleIndex = this.state.openBets.indexOf(parseInt(events.returnValues.id));
    console.log(possibleIndex);
    if (possibleIndex > -1) {
      var tempOpenBets = this.state.openBets;
      tempOpenBets.splice(possibleIndex,1);
      this.setState({openBets: tempOpenBets});
    }
  }

  betEventDetected = (events) => {
    if (events.returnValues.user === this.state.account) {
      var update = this.state.openBets;
      update.push(events.returnValues.counter);
      this.setState({openBets: update});
    }
  }

  async openBetsInit() {
     const counter = await SlotMachine.methods.counter().call();
     var openBetArray = [];
     var thisBet;
     var thisAlreadyPlayed;

     for (var i=0; i < counter; i++) {
       thisBet = await SlotMachine.methods.bets(i).call();
       thisAlreadyPlayed = await SlotMachine.methods.alreadyPlayed(i).call();
       if ((thisBet.user === this.state.account) && (thisAlreadyPlayed === false)) {
         openBetArray.push(i);
       }
      }
      return openBetArray;
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
                       minInvestment={this.state.minInvestment}
                       openBets={this.state.openBets}/>

        <PlayComponent onBalanceChange={this.balanceChange}
                       spinFunction={this.props.spinFunction}
                       onHouseAccountChange={this.houseAccountChange}
                       account={this.state.account}/>
      </div>
    );
  }
}

export default InfoAndActionComponent;
