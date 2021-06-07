const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = [];


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
const player1CardEl = document.getElementById("pcard1");
const player2CardEl = document.getElementById("pcard2");
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
  dealEl.disabled = true;
  headerEl.innerHTML = "Do you want to hit or stand?"
  computeHand();

 }

function computeHand(hand) {
  
 // Iterate through the suits and ranks arrays //
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      masterDeck.push({ // Push those into masterDeck object array //
        face: `${suit}${rank}`,
        value: Number(rank) 
      })
    })
  }) 
  hand = masterDeck[Math.floor(Math.random() * masterDeck.length)] // set hand parameter to random face value
  
  player1CardEl.innerHTML = `${hand.face}` // Set card1 element to face value
  player2CardEl.innerHTML = `${hand.face}` // Set card 2 element to face value
  
  console.log(masterDeck);
  playerSum = hand.value + hand.value; // Set player sum to card 1 + card 2 value
  playerSumEl.innerHTML = `${playerSum}`;
 
  render();
 
  // console.log(playerHand[1].value); This will give you the card value!
  
// playerSumEl.innerHTML = randomCard; // add the next values
}
function render() {
  // console.log(masterDeck);
//   let playerHand = 
//   console.log(playerHand);
 ;
  
 
    
};


