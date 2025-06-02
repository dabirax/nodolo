const express = require("express");
const app = express();

app.get('/hello', (req,res)=>{
    res.send('Task Manager App')
})


const port = 5175;


app.listen(port, console.log(`server is listening on ${port}`));
