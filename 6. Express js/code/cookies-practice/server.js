const express = require("express");

const app = express();

const PORT = 5000;

app.get('/', (req, res)=>{
    res.cookie("username", "manoj");
    res.cookie("theme", "dark");
     res.cookie("language", "en");
    res.send("Cookie created successfully");
    
})



app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
})