var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');

//this will be the address to send the mining reward
const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();
const port = process.argv[2];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain',function(req,res){
  //returns the whole blockchain
   res.send(bitcoin);
});

app.post('/transaction',function(req,res){
   //creates a new transaction
  const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
  res.json({note:`Transaction will be added in block ${blockIndex}.`})
});

app.get('/mine',function(req,res){
   const lastBlock = bitcoin.getLastBlock();
   const previousBlockHash = lastBlock['hash'];
   const currentBlockData = {
     transactions: bitcoin.pendingTransactions,
     index: lastBlock['index'] + 1
   }

   const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
   const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

   //reward for the person that created the block, this is the node of the miner
   bitcoin.createNewTransaction(12.5,"00", nodeAddress);

   const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash, blockHash);

   res.json({
     note: "New block mined successfully",
     block: newBlock
   });
});

// register a node and broadcast it to the network
app.post('/register-and-broadcast-node',function(req,res){
  const newNodeUrl = req.body.newNodeUrl;

});

//register a node with the network
app.post('/register-node',function(req,res){

  
});

//register multiple nodes at once
app.post('/register-nodes-bulk',function(req,res){

  
});

app.listen(port, function(){
  console.log(`Listening on port ${port}....`);
});