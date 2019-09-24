const express = require('express');

let app = express();

app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.post("/calculate", (req, res)=>{
   console.log(req.body);
});

const server = app.listen(process.env.PORT || '5000', () => {
    console.log(`App listen on port ${server.address().PORT}`);
    console.log('Press Ctrl+C to quit');
});