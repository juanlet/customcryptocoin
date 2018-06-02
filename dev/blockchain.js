function Blockchain(){
    //this contains blocks of transactions, these are set in stone once the blocks are pushed into this array
    this.chain = [];
    //pending transactions, this newTransactions are not set in stone until a new block is created/mined
    this.pendingTransactions = [];
}

Blockchain.prototype.createNewBlock = function(nonce,previousBlockHash,hash){
  //creates a new block   
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        trassactions: this.pendingTransactions,
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

Blockchain.prototype.createNewTransaction = function(amount, sender, recepient){
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

module.exports = Blockchain;