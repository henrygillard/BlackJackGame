const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];


/*----- app's state (variables) -----*/
let playerHand;
let dealerHand;
let dealerSum;
let playerSum;
let gameStatus
let winner;
let betPower;
let bet;

/*----- cached element references -----*/
const dealEl = document.querySelector("#deal");
const headerEl = document.querySelector("h1");
const playerCardEl = document.querySelector(".player-card");
const playerSumEl = document.getElementById("player-sum");
const hitEl = document.querySelector("#hit");
const standEl = document.querySelector("#stand");
/*----- event listeners -----*/
document.querySelector("#deal").addEventListener("click", setDeal)

/*----- functions -----*/
init()
function init() {
   
  playerHand = [];
  dealerHand = [];
  playerSum = 0;
  dealerSum = 0;
  bet = 0;
  betPower = 0;
  gameStatus = null;
  winner = null;
  //set hit and stand buttons to invisible//
 hitEl.disabled = true;
  standEl.disabled = true;
   render();
} 


function setDeal() {
  standEl.disabled = false;
  hitEl.disabled = false;
  headerEl.innerHTML = "Do you want to hit or stand?"
  computeHand();

 }

function computeHand() {
  let randomCard = ranks[Math.floor(Math.random() * ranks.length)] // this could be in handleHand function
  
 // add the random integer to player hand array//

playerCardEl.innerHTML = randomCard;
  
playerSumEl.innerHTML = randomCard; // add the next values
}
function render() {
    
}


