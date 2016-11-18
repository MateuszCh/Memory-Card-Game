/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */

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

document.addEventListener("load", dealCards(), false);
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
        dealCards();
    }, 802);
}, false);

document.addEventListener("click", function (e) {
    if(e.target && (e.target.classList.contains("front") || e.target.classList.contains("back"))){
        if(e.target.parentNode.classList.contains("flipped")){
            e.target.parentNode.classList.remove("flipped")
        } else {
            e.target.parentNode.classList.add("flipped");
        }
    }
}, false);


//opening section with start button, and click to score board - shuffle and deal cards, timer begin counting
//board section  - timer counts duration of game, click card, if 2 consecutive cards are the same, then don't flip back
//after each click we check if all cards are flipped, if so then game is over, timer stops and after 2s
//score section is displayed with result, score board of 10 best results, button to new game