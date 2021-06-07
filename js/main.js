/*----- constants -----*/
const MASTER_DECK = [2,3,4,5,6,7,8,9,10,10,10,10,11];
const PLAYER_HAND = [];
const DEALER_HAND = [];

/*----- app's state (variables) -----*/
let playerTotal;
let dealerTotal;
let dealerSum;
let playerSum;
let gameStatus;
let winner;

/*----- cached element references -----*/
const dealEl = document.querySelector("#deal");
const headerEl = document.querySelector("h1");

/*----- event listeners -----*/


/*----- functions -----*/
function init() {
    headerEl.style.color = "yellow";
} 
init()

function pickACard() {
 let randomCard = MASTER_DECK[Math.floor(Math.random() * MASTER_DECK.length)]
  console.log(randomCard);
}
pickACard()
