const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`Please use one of the following: /sum /cipher /lotto
    `);
});

app.listen(8080, () => {
    console.log("Express is listening on port 8080");
})

app.get('/sum', (req, res) => {
    let a = req.param('a'); 
    a = parseInt(a);
    let b = req.param('b');
    b = parseInt(b);
    let c = (a + b);
    res.send(`The sum of ${a} and ${b} is ${c}`);
})

app.get('/cipher', (req, res) => {
    res.send('Nothing implimented into the /cipher route yet.')
})

app.get('/lotto', (req, res) => {
    res.send('Nothing implimented into the /lotto route yet.')
})