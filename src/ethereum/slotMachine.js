import web3 from './web3';
import SlotMachine from './SlotMachine.json';


const instance = new web3.eth.Contract(
  SlotMachine.abi,
  SlotMachine.networks[5777].address
);

export default instance;
