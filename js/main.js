const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
let shuffledDeck;
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
const playerCardEl = document.getElementById("pcards");
const dealerCardEl = document.getElementById("dcards");
const playerSumEl = document.getElementById("player-sum");
const dealerSumEl = document.getElementById("dealer-sum");
const hitEl = document.querySelector("#hit");
const standEl = document.querySelector("#stand");
/*----- event listeners -----*/
document.querySelector("#deal").addEventListener("click", setDeal)

/*----- functions -----*/
init()
function init() {
  shuffledDeck = getNewShuffledDeck(); 
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
  dealHand();
    render();
 }

function dealHand(hand) {
    playerHand = [shuffledDeck.pop(), shuffledDeck.pop()]
    dealerHand = [shuffledDeck.pop(), shuffledDeck.pop()]

};
  

  

function render() {
    
  let playerCardsHtml = '';
  playerHand.forEach(function(card) {
    playerCardsHtml += `<div class="card ${card.face}"></div>`;
    playerSumEl.innerHTML = playerHand[0].value + playerHand[1].value;
    });
  playerCardEl.innerHTML = playerCardsHtml;
    
  let dealerCardsHtml = "";
  dealerHand.forEach(function(card) {
    dealerCardsHtml += `<div class="card ${card.face}"></div>`;
    dealerSumEl.innerHTML = dealerHand[0].value + dealerHand[1].value;
    });
    
  dealerCardEl.innerHTML = dealerCardsHtml;
    
  

    
   
  

    
};


function getNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }

  function buildMasterDeck() {
      const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
          deck.push({ // Push those into masterDeck object array //
            face: `${suit}${rank}`,
            value: Number(rank) 
          })
        })
      }) 
      return deck;
  } 