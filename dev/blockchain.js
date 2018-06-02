const sha256 = require('sha256');
  
function Blockchain(){
    //this contains blocks of transactions, these are set in stone once the blocks are pushed into this array
    this.chain = [];
    //pending transactions, this newTransactions are not set in stone until a new block is created/mined
    this.pendingTransactions = [];
    //I create the genesys block, the first block of the chain
    this.createNewBlock(100,'0','0');
}

Blockchain.prototype.createNewBlock = function(nonce,previousBlockHash,hash){
  //creates a new block   
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
     };

  //I clear the pendingTransactions array that already has been added to the actual block so the next block starts from scratch with new transactions empty   
  this.pendingTransactions = [];  
  //push the new block into the chain 
  this.chain.push(newBlock);
  //creates new block
  return newBlock;

}
//return the latest block that was added to the chain
Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
     const newTransaction = {
         amount: amount,
         sender: sender,
         recipient: recipient
     };
     //add transaction to pending transactions to be added to the next block
     this.pendingTransactions.push(newTransaction);

     //return number of the block that this transaction will be added to
     return this.getLastBlock()['index'] + 1;

}

Blockchain.prototype.hashBlock = function(previousBlockHash,currentBlockData,nonce){
    //it will return a fixed length string(SHA256)
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    
    const hash = sha256(dataAsString);
    
    return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){
    //will generate hash until the hash starts with 4 zeros, it will probably have to do hundreds/thousands of iterations
    //this nonce will change for each iteration to generate a new hash until the hash starts with 0000
    let nonce = 0;

    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    while(hash.substring(0,4) !== '0000'){
        nonce++;
        hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    }   
    
    return nonce;

}

module.exports = Blockchain;