const SHA256 = require('crypto-js/sha256');

class Block{
    //property of block
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index ;
        this.timestamp = timestamp ;
        this.data = data ;
        this.previousHash = previousHash ;
        this.hash = this.calculateHash() ;
    }

    //to generate hash of data
    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    //initializing the blockchain
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    //first block of chain in called genesis block
    createGenesisBlock(){
        return new Block(0, "21/07/2021", "Genesis Block", "0");
    }

    //to get latest block in the chain
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    //to add new block in the chain
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

//instance of block chain
let bdt = new BlockChain();
// add new block
bdt.addBlock(new Block(1, "21/07/2021", {amount: 10}));
bdt.addBlock(new Block(2, "21/07/2021", {amount: 15}));

//output
console.log(JSON.stringify(bdt, null, 4));