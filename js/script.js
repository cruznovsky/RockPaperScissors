'use strict';

// General
var compMove;
var userMove;

// Results
var compResult = document.getElementById('computer');
var playerResult = document.getElementById('player');

//Button
var btnRock = document.getElementById('rock');
var btnPaper = document.getElementById('paper');
var btnScissors = document.getElementById('scissors');
var btnNewGame = document.getElementById('new-game');

// Outputs
var output = document.getElementById('output');
var text = document.getElementById('modalHeader');

// Parameters

var params = {
    compResult: 0,
    playerResult: 0,
    roundsToWin: 0,
};

compResult.innerHTML = params.compResult;
playerResult.innerHTML = params.playerResult;

buttonDisabled();

var buttons = document.querySelectorAll('.player-move');

for (var i = 0; i < buttons.length; i++) {
    var dataMove = buttons[i].getAttribute('data-move');
    buttons[i].addEventListener('click', function () {
        playerMove(dataMove);
    })
};

btnNewGame.addEventListener('click', function () {
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
        case 'rock':
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

        case 'paper':
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

        case 'scissors':
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
    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissors.disabled = true;
};

function buttonEnable() {
    btnRock.disabled = false;
    btnPaper.disabled = false;
    btnScissors.disabled = false;
};

function newGame() {
    resetParameters();
    params.roundsToWin = window.prompt('How many round would you like to play?');
    if (params.roundsToWin.length < 1 || NaN) {
        output.innerHTML = 'Write a number';
    }
    else {
        output.innerHTML = 'Play till ' + params.roundsToWin + ' won rounds!';
        buttonEnable();
    }
};

function resetParameters() {
    params.compResult = 0;
    params.playerResult = 0;
    compResult.innerHTML = 0;
    playerResult.innerHTML = 0;
};

function winner() {
    if (params.playerResult == params.roundsToWin) {
        // output.innerHTML = 'You WON whole game! <br> In order to start new game, click START button';
        openModal('#progress');
        text.innerHTML = params.playerResult + ' - ' + params.compResult + '<br><br>' + 'You WON game! <br><br> In order to start new game, click START button';
        buttonDisabled();
    }
    else if (params.compResult == params.roundsToWin) {
        // output.innerHTML = 'You LOSE: computer was better! <br> In order to start new game, click START button';
        openModal('#progress');
        text.innerHTML = params.playerResult + ' - ' + params.compResult + '<br><br>' + 'You LOSE game! <br><br> In order to start new game, click START button';
        buttonDisabled();
    }
};

// Funkcja otwierająca modal
function openModal(modal) {
    document.querySelectorAll('#overlay > *').forEach(function (modal) {
        modal.classList.remove('show');
    })
    document.querySelector('#overlay').classList.add('show')
    document.querySelector(modal).classList.add('show')

    if (params.playerResult >= params.roundsToWin) {
        text.innerHTML = 'YOU WON !!!';
    }
    else if (params.compResult >= params.roundsToWin) {
        text.innerHTML = 'YOU LOST !!!';
    }
}
// Funkcja zamykająca modal
function closeModal() {
    document.getElementById('overlay').classList.remove('show');
}
// Zamknięcie modala poprzez X
document.querySelectorAll('#overlay .close').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
    })
})
// Zamknięcie modala poprzez kliknięcie ESC
document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
        closeModal();
    }
})