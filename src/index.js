const express = require('express');
const {serverConfig} = require('./config') ;

const app = express();
const apiRoutes = require('./routes')


app.use('/api',apiRoutes);


app.listen(serverConfig.PORT,()=>{
    console.log(`Server is up and running on port: ${serverConfig.PORT}`)
})
