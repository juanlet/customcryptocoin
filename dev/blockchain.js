const sha256 = require('sha256');
const currentNodeUrl = process.argv[3]; 
const uuid = require('uuid/v1');

function Blockchain(){
    //this contains blocks of transactions, these are set in stone once the blocks are pushed into this array
    this.chain = [];
    //pending transactions, this newTransactions are not set in stone until a new block is created/mined
    this.pendingTransactions = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
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
         recipient: recipient,
         transactionId: uuid().split('-').join('')
     };
     return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj){
   this.pendingTransactions.push(transactionObj);
   return this.getLastBlock()['index'] + 1;
};

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

Blockchain.prototype.chainIsValid = function(blockchain){
      //ALGORITHM USER: longest chain rule
    let validChain = true;
    //check that all blocks of the blockchain are valid
    for(var i = 1; i< blockchain.length; i++){
      
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i-1];
        const blockHash = this.hashBlock(prevBlock['hash'],{transactions: currentBlock['transactions'], index: currentBlock['index']}, currentBlock['nonce']);
        //all blocks should start with 0000 since that was the hashing condition to mine a block
        if(blockHash.substring(0,4) !== '0000') {
            console.log("invalid: there is a block with an invalid hash format ",blockHash.substring(0,4));
            validChain = false;
        }
        //previousBlockHash of the current iterated block and the hash of the previous block in the chain should be equal
        if(currentBlock['previousBlockHash'] !== prevBlock['hash']){
            console.log("invalid: hash and previous hash of a pair of blocks doesn't match ",currentBlock['previousBlockHash'], prevBlock['hash']);
            validChain = false;
        }

        //log the previous and current hash for visualization
        console.log("Previous hash:", prevBlock['hash'])
        console.log("Current hash: ",currentBlock['previousBlockHash'],"\n")
        

    }
    //check that the genesis block(the first block of the chain) is valid
    const genesisBlock = blockchain[0];

    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;

    if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) {
        validChain = false;
        console.log("invalid: Genesys block is invalid ",correctNonce, correctPreviousBlockHash, correctHash, correctTransactions);

    }

    return validChain;
}

module.exports = Blockchain;