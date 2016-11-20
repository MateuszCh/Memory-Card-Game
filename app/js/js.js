/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */

var cardFirst;
var cardSecond;

var startGame;
var endGame;
var resultTime;
var counterInterval;
var records = [];

var scoreBoard = document.getElementById("scoreBoard");
var scoreBoardButton = document.getElementById("scoreBoardButton");
var closeScoreBoard = document.getElementById("closeScoreBoard");


scoreBoardButton.addEventListener("click", function (e) {
    scoreBoard.style.display = "flex";
    scoreBoard.classList.add("rozwinC");
    setTimeout(function () {
        scoreBoard.classList.remove("rozwinC");
    }, 501);
}, false);

closeScoreBoard.addEventListener("click", function (e) {
    scoreBoard.classList.add("zwinC");
    setTimeout(function () {
        scoreBoard.style.display = "none";
        scoreBoard.classList.remove("zwinC");
    }, 500);
}, false);

function Record(result, nickname) {
    this.result = result;
    this.nickname = nickname;
}

var scoreList = document.getElementById("scoreList");

function createScoreBoardList(arr) {
    scoreList.innerHTML = "";
    for(var i = 0; i < arr.length; i++){
        var item = document.createElement("li");
        var position = document.createElement("span");
        var nickname = document.createElement("span");
        var timeResult = document.createElement("span");
        position.textContent = i + 1;
        nickname.textContent = arr[i].nickname;
        timeResult.textContent = arr[i].result;
        item.appendChild(position);
        item.appendChild(nickname);
        item.appendChild(timeResult);
        scoreList.appendChild(item);
    }
}

function makeScoreList(arr) {
    if(arr.length > 1){
        arr.sort(function (a,b) {
            return a.result - b.result;
        });
    }
    if(arr.length > 10){
        arr.pop();
    }
    createScoreBoardList(arr);
}


function clickingCard(event) {
    if(!cardFirst && !cardSecond){
        cardFirst = event.target;
        flipped(event.target);
    } else if(cardFirst && !cardSecond){
        flipped(event.target);
        cardSecond = event.target;
    } else if(cardFirst && cardSecond){
        if(cardFirst.previousSibling.src != cardSecond.previousSibling.src){
            unflipped(cardFirst);
            unflipped(cardSecond);
        } else if (cardFirst.previousSibling.src = cardSecond.previousSibling.src){
            cardFirst.previousSibling.classList.add("grayish");
            cardSecond.previousSibling.classList.add("grayish");
        }
        cardSecond = "";
        cardFirst = event.target;
        flipped(cardFirst);
    }
}

function checkResult() {
    var karty = document.getElementsByClassName("card");
    for(var i = 0; i <karty.length; i++){
        if(!karty[i].classList.contains("flipped")){
            return false;
        }
    }
    return true;
}

function flipped(e) {
    e.parentNode.classList.add("flipped");
}

function unflipped(e) {
    e.parentNode.classList.remove("flipped");
}

function shuffle() {
    var cards = ["czech", "france", "italy", "japan", "korea", "portugal", "russia", "uruguay", "czech", "france", "italy", "japan", "korea", "portugal", "russia", "uruguay"];
    var deal = [];
    while(cards.length){
        var numberOfCard = Math.floor(Math.random() * cards.length);
        deal.push(cards.splice(numberOfCard, 1)[0]);
    }
    return deal;
}

function dealCards() {
    var board = document.getElementById("board");
    board.innerHTML = "";
    var cards = shuffle();
    while (cards.length){
        var cardFront = document.createElement("img");
        var cardBack = document.createElement("figure");
        var divForCard = document.createElement("div");
        divForCard.classList.add("container");
        var divForFrontAndBack = document.createElement("div");
        divForFrontAndBack.classList.add("card");
        cardFront.src = "images/" + cards[0] + ".png";
        cardFront.classList.add("front");
        cardBack.textContent = "Fun with Flags";
        cardBack.classList.add("back");
        divForFrontAndBack.appendChild(cardFront);
        divForFrontAndBack.appendChild(cardBack);
        divForCard.appendChild(divForFrontAndBack);
        board.appendChild(divForCard);
        cards.splice(0, 1);
    }
}

function newGame(event) {
    dealCards();
    var parent = event.target.parentNode;
    parent.classList.add("zwinC");
    setTimeout(function (parent) {
        parent.style.display = "none";
        parent.classList.remove("zwinC");
    }, 500, parent);
}

function counter() {
    var counterEl = document.getElementById("counter");
    endGame = new Date().getTime();
    resultTime = endGame - startGame;
    resultTime = resultTime / 1000;
    resultTime = Math.round(resultTime * 10) / 10;
    counterEl.textContent = resultTime;
}

var startButton = document.getElementById("startButton");

startButton.addEventListener("click", function (e) {
    newGame(e);
    startGame = new Date().getTime();
    counterInterval = setInterval(counter, 100);
}, false);

var saveScoreButton = document.getElementById("saveScore");

var nameOfPlayer = document.getElementById("nameOfPlayer");

saveScoreButton.addEventListener("click", function (e) {
    e.preventDefault();
    records.push(new Record(resultTime, nameOfPlayer.value));
    document.getElementById("opening").style.display = "flex";
    var resultDiv = document.getElementById("result");
    resultDiv.classList.add("zwinC");
    setTimeout(function () {
        resultDiv.style.display = "none";
        resultDiv.classList.remove("zwinC");
    }, 500);
    nameOfPlayer.value = "";
    makeScoreList(records);
}, false);

document.getElementById("newGame").addEventListener("click", function (e) {
    e.preventDefault();
    var karty = document.getElementsByClassName("card");
    for(var i = 0; i < karty.length; i++){
        var duration = Math.floor(Math.random()*300);
        if(karty[i].classList.contains("flipped")){
            setTimeout(function (i) {
                karty[i].classList.remove("flipped");
            }, duration, i);
        }
    }
    setTimeout(function () {
        if(counterInterval){
            clearInterval(counterInterval);
        }
        dealCards();
        startGame = new Date().getTime();
        counterInterval = setInterval(counter, 100);
    }, 802);
    cardFirst = "";
    cardSecond = "";
}, false);

var resultDiv = document.getElementById("result");
var resultTimeDiv = document.getElementById("time");


document.addEventListener("click", function (e) {
    if(e.target && e.target.classList.contains("back")){
        clickingCard(e);
        if(checkResult()){
            clearInterval(counterInterval);
            endGame = new Date().getTime();
            resultTime = endGame - startGame;
            resultTime = resultTime / 1000;
            resultTimeDiv.textContent = "Your time is: " + resultTime + " seconds.";
            setTimeout(function () {
                resultDiv.style.display = "flex";
                resultDiv.classList.add("rozwinC");
                setTimeout(function () {
                    resultDiv.classList.remove("rozwinC");
                }, 500);
            }, 1000);
        }
    }
}, false);



