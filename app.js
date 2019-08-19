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
                    let newCharCode = currentCharCode + shift;
                    if (newCharCode  > 90) {
                        newCharCode = newCharCode - 26;
                    }
                    arr.push(newCharCode);
                }
                if ((currentCharCode >= 97) && (currentCharCode <= 122)) {
                    //character is lowercase
                    let newCharCode = currentCharCode + shift;
                    if (newCharCode  > 122) {
                        newCharCode = newCharCode - 26;
                    }
                    arr.push(newCharCode);
                }
                else {
                    //character is a special character
                    arr.push(currentCharCode);
                }
            }

            for (let i = 0; i < arr.length; i++){
                arr[i] = String.fromCharCode(arr[i]);
            }

            cipheredText = arr.join('');
        }

        res.send(cipheredText);
    }
})

app.get('/lotto', (req, res) => {
    //Set Vars
    let inputedLottoNums = req.param('arr');
    let yourLottoNums = [];
    let output = '';
    let numCorrect = 0;

    if (inputedLottoNums.length != 6) {
        output = `Please submit 6 numbers in arr. IE: ?arr=1&arr=2&arr=3&arr=4&arr=5&arr=6`;
    }
    else {
        for (let i = 0; i < 6; i++) {
            let currentLottoNum = inputedLottoNums[i];
            currentLottoNum = parseInt(currentLottoNum);
            currentLottoNum = Math.floor(currentLottoNum);
            if ((currentLottoNum == NaN) || (currentLottoNum < 0) || (currentLottoNum > 20)) {
                output = 'Please make sure all values are numbers betweeo 1 and 20.';
            }
            else {
                yourLottoNums.push(currentLottoNum);
            }
        }
        if (output === '') {
            for (let i = 0; i < 6; i++) {
                let currentDrawnLottoNum = ((Math.random() * (21 - 1)) + 1);
                currentDrawnLottoNum = Math.floor(currentDrawnLottoNum);
                if (currentDrawnLottoNum === yourLottoNums[i]) {
                    numCorrect++;
                }
            }

            if (numCorrect < 4) {
                output = "Sorry, you lose";
            }
            else if (numCorrect === 4) {
                output = "Congratulations, you win a free ticket";
            }
            else if (numCorrect === 5) {
                output = "Congratulations! you win $100";
            }
            else if (numCorrect === 6) {
                output = "Wow! Unbelievable! you could have won the mega millions!";
            }
            else {
                output = 'The lottery machine broke. See a technician.';
            }
        }
    }

    res.send(output);
})