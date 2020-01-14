import grpc from 'grpc';
import {
  QueryService_v1Client,
  CommandService_v1Client
} from 'iroha-helpers/lib/proto/endpoint_grpc_pb';
import { commands, queries } from 'iroha-helpers';
const { Router } = require("express");
const routerQueries = Router();
const util = require('util');
const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70';
const masterUser = 'admin@test'
var result;
var resultGrpc;

const queryOptions = {
  privateKey: adminPriv, // Private key in hex format
  creatorAccountId: masterUser, // Account id, ex. admin@test
  //quorum: 1,
  queryService: null,
  timeoutLimit: 5000,
}

const queryService = new QueryService_v1Client(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

//RUTAS getAccountTransactions
routerQueries.get('/getAccountTransactions', (req, res) => {
  console.log(req.query.accountId);
  //clean firstTxHash for null req
  if (req.query.firstTxHash.trim() == "") {
    req.query.firstTxHash = null;
  }
  queries.getAccountTransactions({
    privateKey: adminPriv,
    creatorAccountId: masterUser,
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: req.query.accountId,
    pageSize: req.query.pageSize,
    firstTxHash: req.query.firstTxHash,
  }).then(result => {
    res.json(result);
    //console.log("JSON TODO"+JSON.stringify(result));
  }).catch(error => {
    resultGrpc = { status: "error", message: error.toString() };
    //console.error("error: "+typeof(error)+" PRINT ",error.toSource());
    console.log(typeof (error));
    console.log(Object.keys(error));
    console.log(JSON.stringify(error));
    //console.log(JSON.stringify(error.toString(), null, 4));
    /*var output = "";
    var i = 0;
    for (var property in error) {
      i++;
      console("entro");
      console.log(error[property]);
      output += property + '::: ' + error[property]+'; ';
    }  
    console.log("propiedad:",output);*/

    res.status(500).json(resultGrpc);
    //res.json(error);
  })

});
//RUTAS GetAccountAssets
routerQueries.get('/getAccountAssets', (req, res) => {
  console.log(req.query.accountId);
  //clean firstTxHash for null req
  if (req.query.firstAssetId.trim() == "") {
    req.query.firstAssetId = null;
  }
  queries.getAccountAssets({
    privateKey: adminPriv,
    creatorAccountId: masterUser,
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: req.query.accountId,
    pageSize: req.query.pageSize,
    firstAssetId: req.query.firstAssetId,
  }).then(result => {
    res.json(result);
  }).catch(error => {
    resultGrpc = { status: "error", message: error.toString() };
    console.log(typeof (error));
    console.log(Object.keys(error));
    console.log(JSON.stringify(error));
    res.status(500).json(resultGrpc);
  })
});

//RUTAS GetAccountAssetTransactions
routerQueries.get('/getAccountAssetTransactions', (req, res) => {
  console.log(req.query.accountId);
  //clean firstTxHash for null req
  /*if (req.query.firstAssetId.trim() == "") {
    req.query.firstAssetId = null;
  }*/
  console.log(req.query.assetId);
  queries.getAccountAssetTransactions({
    privateKey: adminPriv,
    creatorAccountId: masterUser,
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: req.query.accountId,
    assetId: req.query.assetId,
    pageSize: req.query.pageSize,  
  }).then(result => {
    res.json(result);
  }).catch(error => {
    resultGrpc = { status: "error", message: error.toString() };
    console.log(typeof (error));
    console.log(Object.keys(error));
    console.log(JSON.stringify(error));
    res.status(500).json(resultGrpc);
  })
});

//RUTAS getAccount
routerQueries.get('/getAccount', (req, res) => {
  console.log(req.query.accountId);
  queries.getAccount({
    privateKey: adminPriv,
    creatorAccountId: masterUser,
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: req.query.accountId
  }).then(result => {
    res.json(result);
  }).catch(error => {
    resultGrpc = { status: "error", message: error.toString() };
    console.log(typeof (error));
    console.log(Object.keys(error));
    console.log(JSON.stringify(error));
    res.status(500).json(resultGrpc);
  })
});

//RUTAS getTransactions
routerQueries.get('/getTransactions', (req, res) => {
  console.log("txt: ",req.query.txHashesList);
  queries.getTransactions({
    privateKey: adminPriv,
    creatorAccountId: masterUser,
    queryService,
    timeoutLimit: 5000
  }, {
    txHashesList: req.query.txHashesList
  }).then(result => {
    res.json(result);
  }).catch(error => {
    resultGrpc = { status: "error", message: error.toString() };
    console.log(typeof (error));
    console.log(Object.keys(error));
    console.log(JSON.stringify(error));
    res.status(500).json(resultGrpc);
  })
});

// Service fetchCommits
var resp;
queries.fetchCommits(
  {
    privateKey: adminPriv,
    creatorAccountId: masterUser,
    queryService
  },
  (block) => {
    //console.log('fetchCommits new block:', block);
    console.log("Transacction commit");
    resp = block;
    console.log("imprimo json::",resp);
    //test = resp;
    //return resp;
  },
  (error) => {
    console.error('fetchCommits failed:', error.stack);
    resp = JSON.stringify(error);
  }
)


//RUTAS fetchCommits
var test = "a";
exports.TestA = test;
routerQueries.get('/fetchCommits', (req, res) => {
  console.log('/fetchCommits');
  res.json(resp);
});



module.exports = routerQueries;