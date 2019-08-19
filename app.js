const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`Please use one of the following: /sum /cipher /lotto
    `);
});

app.listen(8060, () => {
    console.log("Express is listening on port 8060");
})

app.get('/sum', (req, res) => {
    if (req.param('a') === undefined || req.param('b') === undefined) {
        res.send(`Please submit keys and values for a and b.`)
    }
    else {
        let a = req.param('a');
        a = parseInt(a);
        let b = req.param('b');
        b = parseInt(b);
        if ((a === NaN) || (b === NaN)) {
            res.send(`A and B must be numbers`);
        }
        else {
            let c = (a + b);
            res.send(`The sum of ${a} and ${b} is ${c}`);
        }
    }
})

app.get('/cipher', (req, res) => {

    //Set Vars
    let textToCipher = req.param('text');
    let shift = req.param('shift');
    let cipheredText = "";
    shift = parseInt(shift);
    shift = Math.floor(shift);

    //Check inputs
    if ((textToCipher === undefined) || (shift === undefined)) {
        res.send(`Please submit keys for 'text' and 'shift'`);
    }
    else if ((shift < 0) || (shift > 26) || (shift === NaN)) {
        res.send(`'shift' must be a number that is between 0 and 26.`)
    }
    else {
        //Cipher
        if ((shift === 0)) {
            cipheredText = textToCipher;
        }
        else {
            let arr = [];
            for (let i = 0; i < textToCipher.length; i++) {
                let currentCharCode = textToCipher.charCodeAt(i);
                if ((currentCharCode >= 65) && (currentCharCode <= 90)) {
                    //character is uppercase
                    if ((currentCharCode + shift) < 65){
                        //character will loop around
                        let tempCustomCharCode = (currentCharCode - 64); //1 = A, 2 = B, etc.
                        tempCustomCharCode = (tempCustomCharCode + shift); //0 = Z, -1 = X, etc.
                    }
                    else {

                    }
                }
                if ((currentCharCode >= 97) && (currentCharCode <= 122)) {
                    //character is lowercase
                }
                else {
                    //character is a special character
                    arr.push(currentCharCode);
                }
            }
            cipheredText = arr.join('');
        }
        
        res.send(cipheredText);
    }
})

app.get('/lotto', (req, res) => {
    res.send('Nothing implimented into the /lotto route yet.')
})