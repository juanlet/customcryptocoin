var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const rp = require('request-promise');

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
// this is the first endpoint we are going to hit
app.post('/register-and-broadcast-node',function(req,res){
  const newNodeUrl = req.body.newNodeUrl;
  if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1 ) bitcoin.networkNodes.push(newNodeUrl);
  
  const regNodesPromises = [];

  bitcoin.networkNodes.forEach(networkNodeUrl =>{
    const requestOptions = {
       uri: networkNodeUrl + '/register-node',
       method: 'POST',
       body: { newNodeUrl: newNodeUrl },
       json: true
    };

    regNodesPromises.push(rp(requestOptions));
  });

  Promise.all(regNodesPromises)
  .then(data=>{
     const bulkRegisterOptions = {
       uri: newNodeUrl + '/register-nodes-bulk',
       method: 'POST',
       body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
       json: true
     } 
     return rp(bulkRegisterOptions);

  })
  
  .then(data =>{
      res.json({ node: 'New node registered with network successfully.'});
  });
  ;  

          

});

//register a node with the network
app.post('/register-node',function(req,res){
   
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

  if(nodeNotAlreadyPresent && notCurrentNode){
    console.log("Pushing register-node", newNodeUrl,nodeNotAlreadyPresent,notCurrentNode);
    bitcoin.networkNodes.push(newNodeUrl);
  } 

  res.json({ note: 'New node registered successfully.'});
  
});

//register multiple nodes at once
app.post('/register-nodes-bulk',function(req,res){
  
  const allNetworkNodes = req.body.allNetworkNodes;

  allNetworkNodes.forEach(networkNodeUrl=>{
    
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
 
    if(nodeNotAlreadyPresent && notCurrentNode){
      console.log("Pushing register-node-bulk", networkNodeUrl,nodeNotAlreadyPresent,notCurrentNode);
      bitcoin.networkNodes.push(networkNodeUrl);
    } 
  });
   console.log(bitcoin.networkNodes);
  res.json({note: 'Bulk registration successful.'});
  
});

app.listen(port, function(){
  console.log(`Listening on port ${port}....`);
});