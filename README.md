# slot machine - frontend

This repository contains frontend code for the ethereum slot machine contract developed
in my other repository: [slotmachine-ethereum](https://github.com/mettinger/slotmachine-ethereum).  

Both repositories are intended to be easily customizable, making it easy to design and deploy new, creative slot machines on Ethereum.

Please note that this slot machine animation code is adapted from the original code found in [Johannes Kronmüller's repository](https://github.com/johakr/html5-slot-machine).

Frontend instructions for creating your custom slot machine:

1.  Put your symbol images, and ONLY your symbol images, in src/assets/symbols.  
2.  After deploying the contract, put SlotMachine.json in src/ethereum.
3.  Specify your provider in src/ethereum/web3.js
