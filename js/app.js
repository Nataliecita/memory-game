/*
 * Create a list that holds all of your cards
 */
const cardNames = ["diamond", "paper-plane-o", "bomb","bolt", "anchor", "cube", "leaf", "bicycle","diamond", 
							"paper-plane-o", "bomb","bolt", "anchor", "cube", "leaf", "bicycle"];

const deck = document.getElementsByClassName("deck")[0];

let stars = document.getElementsByClassName("stars")[0];

// Track number of moves
let moves;
let movesCounter = document.querySelector(".moves")
let correctMatches;

//game state
let gameOver;


//timer 
let startTime;
let currentTime;
let totalTime;

let cards;
let openCards;
 

function start() {
	newGame();
	const deckShuffled = shuffle(cardNames);
	createCards(deckShuffled);
	createStars();


	cards = document.getElementsByClassName("card");
	addCardListener();

	time(); 
}


window.addEventListener('load', function() {
    start();
})

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//from the shuffled array now add the classes to the the list item....

function createCards(deckArray) {
	const deckFragment = document.createDocumentFragment();
	
	for (const card of deckArray){
  	let li = document.createElement("LI");
  	let i = document.createElement("I");

  	li.classList.add("card");
  	
  	const currentCard = li.appendChild(i);
  	currentCard.classList.add("fa", "fa-" + card);

  	deckFragment.append(li)
	}
	deck.appendChild(deckFragment);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// create stars
function createStars(){

	const starsFragment = document.createDocumentFragment();

	for (i = 0; i < 3; i++) {
		let li = document.createElement("LI");
  	let i = document.createElement("I");

  	li.classList.add("fa", "fa-star");
  	starsFragment.append(li);
	}
	stars.appendChild(starsFragment);

	stars = document.getElementsByClassName("stars")[0];
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// add event listener for HTML Collection of cards
function addCardListener(){
	for(let i = 0; i < cards.length; i++){
		cards.item(i).addEventListener('click', function(event){
			click(cards.item(i));
		});
	}
}

// display card when clicked
function click(card){
	if (!openCards.includes(card) && openCards.length < 2) {
		card.classList.toggle("open");
		card.classList.toggle("show");
		openCards.push(card);

		if(openCards.length === 2){
			addMove();
			checkCard()
		}	
	}		
}


function addMove(){
	moves++;
	movesCounter.textContent= moves.toString();

	getRating();

}


// //keep track of open cards by grabbing all cards that have class open and show
function checkCard(){

	if(openCards[0].innerHTML === openCards[1].innerHTML){
			matched(openCards);
	}	else {
		setTimeout(function(){
			badGuess(openCards);	
		}, 700);
	}	

}


function matched(pair){
	pair[0].classList.add("match");
	pair[0].classList.remove("show", "open");
	pair[1].classList.add("match");
	pair[1].classList.remove("show", "open");

	openCards = [];
	correctMatches++;

	if(correctMatches === cardNames.length/2){
		endGame()
	}
}

function badGuess(pair){
	pair[0].classList.remove("show", "open");
	pair[1].classList.remove("show", "open");
	openCards = []
}


function timeNow(){
	let time = new Date().getTime();
	return time;
}


function time(){
	startTime = Date.now()

	let timeInterval = setInterval(function() {
  	// let millis = Date.now() - startTime;

		currentTime = timeNow();
  	// Find the distance between now an start date
  	let distance = currentTime - startTime;

  	// Time calculations for days, hours, minutes and seconds 
	  let minutes = calculateTime(distance, "minutes")

	  let seconds = calculateTime(distance, "seconds")

  	// Display the time 
  	if(minutes == 0){
  		if(seconds < 10){
  			document.querySelector(".timer").innerHTML = "Time: 0"+ minutes + ":" + "0"+seconds;
  		} else{
  			document.querySelector(".timer").innerHTML = "Time: 0"+ minutes + ":" + seconds;
  		}
  	} else{
  		if(seconds < 10){
  			document.querySelector(".timer").innerHTML = "Time: "+ minutes + ":" + "0"+seconds;
  		}else{
  			document.querySelector(".timer").innerHTML = "Time: "+ minutes + ":" + seconds;
  		}
  	}

  	// lose a star for too much time
  	if(distance/1000 > 28){
  		starForTime = false;
  	}

  	//WHEN GAME IS OVER
  	if (gameOver) {
    	clearInterval(timeInterval);
 		}

	}, 0);


}

function calculateTime(distance, timeType){
	let interval
	if(timeType == "seconds") {
		interval = Math.floor((distance % (1000 * 60)) / 1000);
	} else{
	  interval = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	}
	return interval; 
}


function endGame(){
	gameOver = true;
	totalTime = currentTime - startTime;

	let minutes = calculateTime(totalTime, "minutes");
	let seconds = calculateTime(totalTime, "seconds");

	totalTime = [minutes, seconds];
	updateModal();
	openModal();
}

function newGame(){
	gameRating = 3;
	moves = 0;
	correctMatches = 0;

//game state
	gameOver = false;
	openCards = []
}



function getRating(){
		if(moves == 10 ){
			emptyHalfStar(2);
		} else if(moves == 12 ) {
			emptyStar(2);
		} else if (moves == 14){
			emptyHalfStar(1);
		} else if(moves == 16) {
			emptyStar(1);
		} else if(moves == 18){
			emptyHalfStar(0);
		}
		else if(moves == 20){
			emptyStar(0);
		}
}


function emptyHalfStar(starPosition){
	console.log(stars.children[starPosition])
	stars.children[starPosition].classList.remove("fa-star");
	stars.children[starPosition].classList.add("fa-star-half-empty")
}

function emptyStar(starPosition){
	stars.children[starPosition].classList.remove("fa-star-half-empty")
	stars.children[starPosition].classList.add("fa-star-o")
}




// add listener for new game when icon is clicked
const reset = document.querySelector(".restart");

reset.addEventListener("click", function(){
	redrawBoard();
	start();
})

function redrawBoard(){
	document.querySelector(".deck").innerHTML = "";
	movesCounter.textContent= "0";
	stars.innerHTML = "" ;

	//redraw time;
	document.querySelector(".timer").innerHTML = "Time:00:00"
}


// MODAL
// Get the modal
function openModal(){
	   modal.style.display = "block";
}

function updateModal(){
	document.getElementById("congrats-moves").innerText = moves;
	document.getElementById("congrats-time").innerText = `${totalTime[0]} minute(s) and ${totalTime[1]} seconds `;
	document.getElementById("congrats-rating").innerHTML = stars.innerHTML;

}

let modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let playAgain = document.getElementById("play-again");


// When user clicks plays again, hide modal and restart game;
playAgain.addEventListener("click", function(){
	modal.style.display = "none";
	redrawBoard();
	start();
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
  }
}


