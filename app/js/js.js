/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */
(function () {
    //variables
    var cardFirst;
    var cardSecond;
    var startGame;
    var endGame;
    var resultTime;
    var counterInterval;
    var records = [];
    //opening section
    var opening = document.getElementById("opening");
    //scoreboard section
    var scoreBoard = document.getElementById("scoreBoard");
    //result section
    var resultDiv = document.getElementById("result");
    //time element for showing result
    var resultTimeDiv = document.getElementById("time");
    //scoreboard list
    var scoreLi = document.getElementById("scoreList");
    //text input for player's name
    var nameOfPlayer = document.getElementById("nameOfPlayer");
    //buttons
    var saveScoreButton = document.getElementById("saveScore");
    var startButton = document.getElementById("startButton");
    var exitGameButton = document.getElementById("exitGame");
    var newGameButton = document.getElementById("newGame");
    var scoreBoardButton = document.getElementById("scoreBoardButton");
    var closeScoreBoard = document.getElementById("closeScoreBoard");
    //saves scores in local storage
    function saveRecords() {
        localStorage.setItem("records_array", JSON.stringify(records));
    }
    //object constructor creating record object
    function Record(result, nickname) {
        this.result = result;
        this.nickname = nickname;
    }
    //create list items on score board list
    function createScoreBoardList(arr) {
        scoreLi.innerHTML = "";
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
            scoreLi.appendChild(item);
        }
    }
    //arrange ascending 10 best scores
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
    //function controlling what happens when card is clicked
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
                cardFirst.classList.remove("back");
                cardSecond.previousSibling.classList.add("grayish");
                cardSecond.classList.remove("back");
            }
            cardSecond = "";
            cardFirst = event.target;
            flipped(cardFirst);
        }
    }
    //check if game is finished
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
    //shuffle cards in random order
    function shuffle() {
        var cards = ["czech", "france", "italy", "japan", "korea", "portugal", "russia", "uruguay", "czech", "france", "italy", "japan", "korea", "portugal", "russia", "uruguay"];
        var deal = [];
        while(cards.length){
            var numberOfCard = Math.floor(Math.random() * cards.length);
            deal.push(cards.splice(numberOfCard, 1)[0]);
        }
        return deal;
    }
    //create cards on board
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
            cardFront.setAttribute("alt", cards[0]);
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
    //count time from begining of the game
    function counter() {
        var counterEl = document.getElementById("counter");
        endGame = new Date().getTime();
        resultTime = endGame - startGame;
        resultTime = resultTime / 1000;
        resultTime = Math.round(resultTime * 10) / 10;
        counterEl.textContent = resultTime;
    }
    function clearCards() {
        cardFirst = "";
        cardSecond = "";
    }
    function slideDown(el) {
        el.style.display = "flex";
        el.classList.add("slideDown");
        setTimeout(function () {
            el.classList.remove("slideDown");
        }, 500);
    }
    function slideUp(el) {
        el.classList.add("slideUp");
        setTimeout(function () {
            el.style.display = "none";
            el.classList.remove("slideUp");
        }, 500);
    }
    window.addEventListener("load", function () {
        var localRecords = JSON.parse(localStorage.getItem("records_array"));
        if(localRecords) {
            records = localRecords;
            makeScoreList(records);
        }
    }, false);
    startButton.addEventListener("click", function (e) {
        clearCards();
        dealCards();
        slideUp(opening);
        startGame = new Date().getTime();
        counterInterval = setInterval(counter, 100);
    }, false);
    scoreBoardButton.addEventListener("click", function () {
        slideDown(scoreBoard);
    }, false);
    closeScoreBoard.addEventListener("click", function () {
        slideUp(scoreBoard);
    }, false);
    newGameButton.addEventListener("click", function (e) {
        e.preventDefault();
        clearCards();
        var karty = document.getElementsByClassName("card");
        for(var i = 0; i < karty.length; i++){
            var duration = Math.floor(Math.random()*300);
            if(karty[i].classList.contains("flipped")){
                setTimeout(function (i) {
                    karty[i].classList.remove("flipped");
                }, duration, i);
            }
        }
        if(counterInterval){
            clearInterval(counterInterval);
        }
        setTimeout(function () {
            dealCards();
            startGame = new Date().getTime();
            counterInterval = setInterval(counter, 100);
        }, 802);
    }, false);
    exitGameButton.addEventListener("click", function () {
        clearCards();
        if(counterInterval){
            clearInterval(counterInterval);
        }

        slideDown(opening);
    }, false);
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
                    slideDown(resultDiv);
                }, 1000);
            }
        }
    }, false);
    saveScoreButton.addEventListener("click", function (e) {
        e.preventDefault();
        records.push(new Record(resultTime, nameOfPlayer.value));
        opening.style.display = "flex";
        slideUp(resultDiv);
        nameOfPlayer.value = "";
        makeScoreList(records);
        saveRecords();
    }, false);
})();