/*
 * Create a list that holds all of your cards
 */
const cardNames = ["diamond", "paper-plane-o", "bomb","bolt", "anchor", "cube", "leaf", "bicycle","diamond", 
							"paper-plane-o", "bomb","bolt", "anchor", "cube", "leaf", "bicycle"];

const deck = document.getElementsByClassName("deck")[0];

let cards;
let openCards = [];
 


let numClicks = 0

function start() {
	const deckShuffled = shuffle(cardNames);
	createCards(deckShuffled);

	cards = document.getElementsByClassName("card");
	addCardListener();
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


// deck.addEventListener('click', function(event){
// 	if(event.target.nodeName === "LI"){
// 		click(event.target);
// 	}
// });


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
	if (!openCards.includes(card)) {
		card.classList.toggle("open");
		card.classList.toggle("show");
		openCards.push(card);
	}	
}

// //keep track of open cards by grabbing all cards that have class open and show
function checkCard(){
	let pair = document.getElementsByClassName("show");
	if (pair.length == 2){
		console.log("only when two")
		pair[0].innerHTML == pair[1].innerHTML ? badGuess(pair) : matched(pair)
	}
}


function matched(pair){
	console.log("yas")
	// add class and remove event listener for click
}

function badGuess(pair){
	console.log("noo")
}

// while(numClicks % 2 === 0){
// 	checkCard
// }

