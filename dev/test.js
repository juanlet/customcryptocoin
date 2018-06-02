const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389,"3232DSADASDAS","DSADASDASD32");
bitcoin.createNewBlock(321,"22222DASDAS","NAADASDASD32");
bitcoin.createNewBlock(2877,"321452DSADASDAS","D44444SDASD32");

console.log(bitcoin);