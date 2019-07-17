'use strict';


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
    roundNumber: 0,
    compMove: '',
    userMove: '',
    winner: '',
    progress: [],
};

var roundsNumberValue = document.getElementById('roundsNumberValue');
var playerName = document.getElementById('playerNameValue');

compResult.innerHTML = params.compResult;
playerResult.innerHTML = params.playerResult;

buttonDisabled();

var buttons = document.querySelectorAll('.player-move');

buttons.forEach(el => {
    el.addEventListener("click", function () {
        var e = el.getAttribute("data-move");
        playerMove(e)
    })
});

btnNewGame.addEventListener('click', function () {
    openModal('#startGame');

    var startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function () {
        params.roundsToWin = roundsNumberValue.value;
        closeModal();
        newGame();
    })
});

function playerMove(userMove) {
    var compMove = computerMove();
    params.roundNumber++;
    getWinner(userMove, compMove);
    params.progress.push({
        roundNumber: params.roundNumber,
        userMove: userMove,
        compResult: params.compResult,
        compMove: compMove,
        playerResult: params.playerResult,
        winner: params.winner,
    });
    endGame();
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
    rowRemove();
    if (params.roundsToWin.length < 1 || NaN) {
        output.innerHTML = 'Write a number';
    }
    else {
        output.innerHTML = 'Play till ' + params.roundsToWin + ' won rounds!';
        buttonEnable();
    }
};

function resetParameters() {
    playerName.value = '';
    roundsNumberValue.value = '';
    params.roundNumber = 0;
    params.compResult = 0;
    params.playerResult = 0;
    params.progress = [];
    compResult.innerHTML = 0;
    playerResult.innerHTML = 0;
};

function endGame() {
    if (params.playerResult == params.roundsToWin) {
        openModal('#progress');
        text.innerHTML = params.playerResult + ' - ' + params.compResult + '<br><br>' + playerName.value + ' WON game! <br><br> In order to start new game, click START button!' + '<br>';
        buttonDisabled();
        resetParameters();
    }
    else if (params.compResult == params.roundsToWin) {
        openModal('#progress');
        text.innerHTML = params.playerResult + ' - ' + params.compResult + '<br><br>' + playerName.value + ' LOSE game! <br><br> In order to start new game, click START button!' + '<br>';
        buttonDisabled();
        resetParameters();
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
    addTable();
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

function addTable() {

    var tbody = document.getElementById('modalTableBody');

    for (var i = 0; i < params.progress.length; i++) {

        var row = document.createElement('tr');

        var roundNumber = document.createElement('td');
        roundNumber.innerText = params.progress[i].roundNumber;

        var userChoice = document.createElement('td');
        userChoice.innerText = params.progress[i].userMove;

        var compChoice = document.createElement('td');
        compChoice.innerText = params.progress[i].compMove;

        var win = document.createElement('td');
        win.innerText = params.progress[i].winner;

        var result = document.createElement('td');
        result.innerText = params.progress[i].playerResult + ' - ' + params.progress[i].compResult;

        row.appendChild(roundNumber);
        row.appendChild(userChoice);
        row.appendChild(compChoice);
        row.appendChild(win);
        row.appendChild(result);
        tbody.appendChild(row);
    }
};

function rowRemove() {
    var table = document.getElementById('table');
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
};

function getWinner(userMove, compMove) {

    if (userMove === compMove) {
        output.insertAdjacentHTML('afterBegin', 'It is draw!: ' + playerName.value + ' played ' + userMove + ', computer played the same<br>');
        params.winner = 'DRAW';
    }
    else if ((userMove == 'paper') && (compMove == 'rock') ||
        (userMove == 'rock') && (compMove == 'scissors') ||
        (userMove == 'scissors') && (compMove == 'paper')) {
        output.insertAdjacentHTML('afterBegin', playerName.value + ' WON!: ' + playerName.value + ' played ' + userMove + ', computer played ' + compMove + '!<br>');
        params.playerResult++;
        playerResult.innerHTML = params.playerResult;
        params.winner = playerName.value;
    }
    else {
        output.insertAdjacentHTML('afterBegin', playerName.value + ' LOSE!: ' + playerName.value + ' played ' + userMove + ', computer played ' + compMove + '!<br>');
        params.compResult++;
        compResult.innerHTML = params.compResult;
        params.winner = 'Computer';
    }
}