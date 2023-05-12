const express = require('express')
const connectToMongo = require('./Database/db')
const app = express()
const port = 5000;
const cors = require('cors')

connectToMongo();

app.use(cors());
app.use('/' , require('./route/import'))

app.listen(port , () =>{
     console.log("App listening on port " + port);
})