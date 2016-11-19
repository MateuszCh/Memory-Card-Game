/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */

var cardFirst;
var cardSecond;

var startGame;
var endGame;
var resultTime;
var counterInterval;

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

// document.getElementById("openingStartButton").addEventListener("click", function (e) {
//     dealCards();
//     var opening = document.getElementById("opening");
//     opening.classList.add("zwinC");
//     setTimeout(function () {
//         opening.style.display = "none";
//         opening.classList.remove("zwinC");
//     }, 500);
// }, false);


function newGame(event) {
    dealCards();
    var parent = event.target.parentNode;
    parent.classList.add("zwinC");
    setTimeout(function (parent) {
        parent.style.display = "none";
        parent.classList.remove("zwinC");
    }, 500, parent);
}


var startButton = document.getElementById("startButton");

startButton.addEventListener("click", function (e) {
    newGame(e);
    startGame = new Date().getTime();
    counterInterval = setInterval(counter, 1);
}, false);

var saveScoreButton = document.getElementById("saveScore");

saveScoreButton.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("opening").style.display = "flex";
    var resultDiv = document.getElementById("result");
    resultDiv.classList.add("zwinC");
    setTimeout(function () {
        resultDiv.style.display = "none";
        resultDiv.classList.remove("zwinC");
    }, 500);
}, false);

//
// list.classList.add("zwinC");
// setTimeout(function () {
//     list.style.display = "none";
//     list.classList.remove("zwinC");
// }, 500);

// document.addEventListener("load", dealCards(), false);
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
        counterInterval = setInterval(counter, 1);
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

function counter() {
    var counterEl = document.getElementById("counter");
    endGame = new Date().getTime();
    resultTime = endGame - startGame;
    resultTime = resultTime / 1000;
    resultTime = Math.round(resultTime * 10) / 10;
    counterEl.textContent = resultTime;
}

// list.style.display = "block";
// list.classList.add("rozwinC");
// setTimeout(function () {
//     list.classList.remove("rozwinC");
// }, 500)

//opening section with start button, and click to score board - shuffle and deal cards, timer begin counting
//board section  - timer counts duration of game, click card, if 2 consecutive cards are the same, then don't flip back
//after each click we check if all cards are flipped, if so then game is over, timer stops and after 2s
//score section is displayed with result, score board of 10 best results, button to new game