const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const bc1 = {
    chain: [
    {
    index: 1,
    timestamp: 1528083361264,
    transactions: [ ],
    nonce: 100,
    hash: "0",
    previousBlockHash: "0"
    },
    {
    index: 2,
    timestamp: 1528083390060,
    transactions: [ ],
    nonce: 18140,
    hash: "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    previousBlockHash: "0"
    },
    {
    index: 3,
    timestamp: 1528083393075,
    transactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "66dbaf0067a811e896bc79a973c21c97",
    transactionId: "7807e4b067a811e896bc79a973c21c97"
    }
    ],
    nonce: 73475,
    hash: "0000eaa9b1c0da3cbd526a782a6dbab0b8590f38caf4e33618c5fcb351f6b4c4",
    previousBlockHash: "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    index: 4,
    timestamp: 1528083393992,
    transactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "66dbaf0067a811e896bc79a973c21c97",
    transactionId: "79d1f65067a811e896bc79a973c21c97"
    }
    ],
    nonce: 33726,
    hash: "000012ec2918b049b969d2973a08270d70f0d82e66cbab5f71c21834c768d80d",
    previousBlockHash: "0000eaa9b1c0da3cbd526a782a6dbab0b8590f38caf4e33618c5fcb351f6b4c4"
    },
    {
    index: 5,
    timestamp: 1528083441493,
    transactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "66dbaf0067a811e896bc79a973c21c97",
    transactionId: "7a5dbb9067a811e896bc79a973c21c97"
    },
    {
    amount: 503040,
    sender: "ADSADASDSA323232",
    recipient: "IUW099999WEWQEWEQW",
    transactionId: "8df524e067a811e896bc79a973c21c97"
    },
    {
    amount: 503040,
    sender: "ADSADASDSA323232",
    recipient: "IUW099999WEWQEWEQW",
    transactionId: "8fbee86067a811e896bc79a973c21c97"
    },
    {
    amount: 503040,
    sender: "ADSADASDSA323232",
    recipient: "IUW099999WEWQEWEQW",
    transactionId: "8fd5087067a811e896bc79a973c21c97"
    },
    {
    amount: 503040,
    sender: "ADSADASDSA323232",
    recipient: "IUW099999WEWQEWEQW",
    transactionId: "8fe97ad067a811e896bc79a973c21c97"
    }
    ],
    nonce: 25090,
    hash: "00001711e629eabb2402f5e404a9653a265268751fa20c5efa3dd6cde5dbfefc",
    previousBlockHash: "000012ec2918b049b969d2973a08270d70f0d82e66cbab5f71c21834c768d80d"
    },
    {
    index: 6,
    timestamp: 1528083467056,
    transactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "66dbaf0067a811e896bc79a973c21c97",
    transactionId: "96adcf6067a811e896bc79a973c21c97"
    },
    {
    amount: 33,
    sender: "ADSADASDSA323232",
    recipient: "IUW099999WEWQEWEQW",
    transactionId: "9fbb9ec067a811e896bc79a973c21c97"
    },
    {
    amount: 60,
    sender: "ADSADASDSA323232",
    recipient: "IUW099999WEWQEWEQW",
    transactionId: "a202a89067a811e896bc79a973c21c97"
    },
    {
    amount: 70,
    sender: "ADSADASDSA323232",
    recipient: "IUW099999WEWQEWEQW",
    transactionId: "a405cb9067a811e896bc79a973c21c97"
    }
    ],
    nonce: 206284,
    hash: "0000a9e730e11963e9f38c4150a7a2abae7b7ec3f605d2a40e29c747580f66ad",
    previousBlockHash: "00001711e629eabb2402f5e404a9653a265268751fa20c5efa3dd6cde5dbfefc"
    }
    ],
    pendingTransactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "66dbaf0067a811e896bc79a973c21c97",
    transactionId: "a5eab83067a811e896bc79a973c21c97"
    }
    ],
    currentNodeUrl: "http://localhost:3001",
    networkNodes: [ ]
    };
    
    console.log('VALID: ',bitcoin.chainIsValid(bc1.chain));