const express = require("express");
const cookieParser = require("cookie-parser");



const app = express();
app.use(cookieParser());

const PORT = 5000;

app.get('/', (req, res)=>{
    res.cookie("username", "manoj");
    res.cookie("theme", "dark");
     res.cookie("language", "en");
    //  res.send(req.headers.cookie)
    res.send("Cookie created successfully");

    
})

app.get("/profile", (req, res)=>{
    console.log(req.cookies);
    res.send(req.cookies);
})



app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
})