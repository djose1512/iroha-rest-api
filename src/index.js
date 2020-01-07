require('@babel/register')({//@babel/register
    presets: [ '@babel/env' ]
  })
const express = require('express');
const app = express();

const morgan = require('morgan');
//Conf
app.set('port',process.env.PORT || 3000);
//Format response in navigator
app.set("json spaces",2);

//Middlewares
app.use(morgan('dev'));
//urlencoded ready
app.use(express.urlencoded({extended:false}));
//json raw ready
app.use(express.json());

//rutas de routes
app.use("/api/iroha/queries",require("./routes/queries"));
app.use("/api/iroha/commands",require("./routes/iroha"));


//Sube el servidor
app.listen(app.get("port"),() =>{
    console.log('server init complete '+app.get("port"));
}); 