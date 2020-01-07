import grpc from 'grpc';
import {
  QueryService_v1Client,
  CommandService_v1Client
} from 'iroha-helpers/lib/proto/endpoint_grpc_pb';
import { commands, queries } from 'iroha-helpers';
const { Router } = require("express");
const router = Router();
const util = require('util');
//const b = require("./queries").TestA;
const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70';
const masterUser = 'admin@test'
//var result;

const commandOptions = {
  privateKeys: [adminPriv], // Array of private keys in hex format
  creatorAccountId: masterUser, // Account id, ex. admin@test
  quorum: 1,
  commandService: null,
  timeoutLimit: 5000
}

const commandService = new CommandService_v1Client(
  'localhost:50051',
  grpc.credentials.createInsecure()
);
// Account schema
router.post('/account', (req, res) => {
  //console.log(req.body);
  var resultGrpc;
  try {
  console.log(req.body.method + " " + req.body.publicKey + " " + req.body.domain + " " + req.body.accountName);
  console.log("Parametros: " + JSON.stringify(req.params) + JSON.stringify(req.body));
  //validate of parameter create account
  if (req.body.method && (req.body.method == "createAccount") && req.body.accountName && req.body.domain && req.body.publicKey) {

    commands.createAccount({
      privateKeys: [adminPriv],
      creatorAccountId: masterUser,
      quorum: 1,
      commandService,
      timeoutLimit: 5000
    }, {
      accountName: req.body.accountName,
      domainId: req.body.domain,
      publicKey: req.body.publicKey
      //e3d0943b58ebc6aec81361b95aa64a8fc39a423a8a40038d911af6bf1cad91e3
    }).then(result => {
      console.log("aqui " + JSON.stringify(result) + " " + result);
      resultGrpc = { status: "success", publicKey: req.body.publicKey.toString() };
      res.json(resultGrpc);
    }).catch(error => {
      console.error("Error: " + JSON.stringify(error) + " " + error.toString());
      resultGrpc = { status: "error", message: error.toString() };
      res.status(500).json(resultGrpc);
    });//validate of parameter set account detail
  } else if (req.body.method && (req.body.method == "setAccountDetail") && req.body.key && req.body.value && req.body.accountId) {
    console.log(req.body.method + " " + req.body.key + " " + req.body.value + " " + req.body.accountId);

    commands.setAccountDetail({
      privateKeys: [adminPriv],
      creatorAccountId: masterUser,
      quorum: 1,
      commandService,
      timeoutLimit: 5000
    }, {
      accountId: req.body.accountId,
      key: req.body.key,
      value: req.body.value
    }).then(result => {

      //console.log("aqui "+JSON.stringify(result)+" "+result);
      resultGrpc = { status: "success" };
      console.log("release transacction");
      res.json(resultGrpc);
    }).catch(error => {
      //console.error("Error: "+JSON.stringify(error)+" "+error.toString());
      resultGrpc = { status: "error", message: error.toString() };
      res.status(500).json(resultGrpc);
    });
  } else {
    res.status(500).json({ status: "error", message: "Method not exist." });
  }
} catch (error) {
  resultGrpc = { status: "error", message: error.toString() };
  console.error("Try caught", error.toString());
  res.status(500).json(resultGrpc);
}
  //console.log("TESTA"+b);
});

// Account transfer

router.post('/account/transferAsset', (req, res) => {
  var resultGrpc;
  try {
    commands.transferAsset({
      privateKeys: [adminPriv],
      creatorAccountId: masterUser,
      quorum: 1,
      commandService,
      timeoutLimit: 5000
    }, {
      srcAccountId: req.body.srcAccountId,
      destAccountId: req.body.destAccountId,
      assetId: req.body.assetId,
      description: req.body.description,
      amount: req.body.amount
    }).then(result => {
      console.log("aqui " + JSON.stringify(result) + " " + result);
      resultGrpc = { status: "success" };
      res.json(resultGrpc);
    }).catch(error => {
      console.log("entro en error");
      console.error("Error: C" + JSON.stringify(error));
      resultGrpc = { status: "error", message: error.toString() };
      res.status(500).json(resultGrpc);
    })
  } catch (error) {
    resultGrpc = { status: "error", message: error.toString() };
    console.error("Try caught", error.toString());
    res.status(500).json(resultGrpc);
  }
});

module.exports = router;