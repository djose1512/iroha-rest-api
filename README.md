# crypto-esb_api_iroha

REST api for Iroha blockchain. based in nodejs library and express js.

To test the rest services in postman, just import the file iroha.postman_collection.json in example folder

how to use:

## 1.
//the default parameters of the official iroha container are currently set

in files routes/iroha.js and queries.js update.
const adminPriv = 'privateKey';
const masterUser = 'admin@test' //user for uso comands and querys. see https://iroha.readthedocs.io/en/latest/develop/api/permissions.html#list-of-permissions

## 2. update in files routes/iroha.js and queries.js update. 
commandService and queryService with ip and port of iroha torii server. 

## 3.RUN: Inside directory

cd src/
index.js 

-or
npm run dev

## 4.ENJOY

status of queries and commands ready for use:
			
**querys:** 
- Get Account		
- Get Signatories		
- Get Transactions **Ready**
- Get Pending Transactions		
- Get Account Asset Transactions **Ready**
- Get Account Assets **Ready**
- Get Account Detail	
- Get Asset Info		
- Get Roles		
- Get Role Permissions		
- Get Peers		
- Fetch Commits	**Ready**
			
**commands:** 
- Add asset quantity		
- Add peer		
- Add signatory		
- append role		
- create account **Ready**
- сreate asset		
- create domain		
- create role		
- detach role		
- grant permission		
- remove peer		
- remove signatory		
- revoke permission		
- set account detail **Ready**
- set account quorum		
- subtract asset quantity 		
- transfer asset **Ready**		
- compare and set account detail		
- set setting value		
