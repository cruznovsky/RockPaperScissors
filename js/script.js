'use strict';

// General
var compMove;
var userMove;
var howManyRounds;


// Results
var compResult = document.getElementById('computer');
var playerResult = document.getElementById('player');

// Buttons
var btn1 = document.getElementById('rock');
var btn2 = document.getElementById('paper');
var btn3 = document.getElementById('scissors');
var btn4 = document.getElementById('new-game');

// Outputs
var output = document.getElementById('output');

// Parameters
var params = {
    compResult: 0,
    playerResult: 0,
};

compResult.innerHTML = params.compResult;
playerResult.innerHTML = params.playerResult;

buttonDisabled();

btn1.addEventListener('click', function () {
    playerMove(rock);
});

btn2.addEventListener('click', function () {
    playerMove(paper);
});

btn3.addEventListener('click', function () {
    playerMove(scissors);
});

btn4.addEventListener('click', function () {
    newGame();
});

function playerMove(userMove) {
    var compMove = computerMove();
    alerts(compMove, userMove);
};

function computerMove() {
    var randomNumber = Math.floor(Math.random() * 3 + 1);
    if (randomNumber === 1) {
        return 'paper';
    }
    else if (randomNumber === 2) {
        return 'rock';
    }
    else {
        return 'scissors';
    }
};

function alerts(compMove, userMove) {
    switch (userMove) {
        case rock:
            if (compMove === 'scissors') {
                output.insertAdjacentHTML('afterBegin', 'You WON!: You played rock, computer played scissors! <br>');
                params.playerResult++;
                playerResult.innerHTML = params.playerResult;
                winner();
            }
            else if (compMove === 'rock') {
                output.insertAdjacentHTML('afterBegin', 'It is draw!: you played rock, computer played the same<br>');
            }
            else {
                output.insertAdjacentHTML('afterBegin', 'You LOSE!: you played rock, computer played paper<br>');
                params.compResult++;
                compResult.innerHTML = params.compResult;
                winner();
            }
            break;

        case paper:
            if (compMove === 'rock') {
                output.insertAdjacentHTML('afterBegin', 'You WON!: You played paper, computer played rock!<br>');
                params.playerResult++;
                playerResult.innerHTML = params.playerResult;
                winner();
            }
            else if (compMove === 'paper') {
                output.insertAdjacentHTML('afterBegin', 'It is draw!: you played paper, computer played the same<br>');
            }
            else {
                output.insertAdjacentHTML('afterBegin', 'You LOSE!: you played paper, computer played scissors<br>');
                params.compResult++;
                compResult.innerHTML = params.compResult;
                winner();
            }
            break;

        case scissors:
            if (compMove === 'paper') {
                output.insertAdjacentHTML('afterBegin', 'You WON!: You played scissors, computer played paper!<br>');
                params.playerResult++;
                playerResult.innerHTML = params.playerResult;
                winner();
            }
            else if (compMove === 'scissors') {
                output.insertAdjacentHTML('afterBegin', 'It is draw!: you played scissors, computer played the same<br>');
            }
            else {
                output.insertAdjacentHTML('afterBegin', 'You LOSE!: you played scissors, computer played rock<br>');
                params.compResult++;
                compResult.innerHTML = params.compResult;
                winner();
            }
            break;
    }
};

function buttonDisabled() {
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
};

function buttonEnable() {
    btn1.disabled = false;
    btn2.disabled = false;
    btn3.disabled = false;
};

function newGame() {
    resetParameters();
    howManyRounds = parseFloat(window.prompt('To how many won rounds we play?'));
    if (howManyRounds != null) {
        output.innerHTML = 'We play into ' + howManyRounds + ' wins!';
    }
    else {
        output.innerHTML = 'You have to write a number!';
    }
    buttonEnable();
};

function resetParameters() {
    params = {
        compResult: 0,
        playerResult: 0,
    }
    compResult.innerHTML = params.compResult;
    playerResult.innerHTML = params.playerResult;
};

function winner() {
    if (params.playerResult === howManyRounds) {
        output.innerHTML = 'You WON whole game! <br> In order to start new game, click START button';
        buttonDisabled();
    }
    else if (params.compResult === howManyRounds) {
        output.innerHTML = 'You LOSE: computer was better! <br> In order to start new game, click START button';
        buttonDisabled();
    }
};
