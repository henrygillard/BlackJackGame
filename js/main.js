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
let smallBet;
let bigBet;

/*----- cached element references -----*/
const dealEl = document.querySelector("#deal");
const headerEl = document.querySelector("h1");
const playerCardEl = document.getElementById("pcards");
const dealerCardEl = document.getElementById("dcards");
const playerSumEl = document.getElementById("player-sum");
const dealerSumEl = document.getElementById("dealer-sum");
const hitEl = document.querySelector("#hit");
const standEl = document.querySelector("#stand");
const bet50El = document.querySelector("#small");
const betPwrEl = document.getElementById("betPwr");
/*----- event listeners -----*/
document.querySelector("#deal").addEventListener("click", setDeal)
document.querySelector("#hit").addEventListener("click", hit)
document.querySelector("#stand").addEventListener("click", stand)
document.getElementById("bet50").addEventListener("click", handleBet50)
/*----- functions -----*/
init()
function init() {
  shuffledDeck = getNewShuffledDeck(); 
  playerHand = [];
  dealerHand = [];
  playerSum = 0;
  dealerSum = 0;
  smallBet = 0;
  bigBet = 0;
  betPower = 500;
  gameStatus = null;
  winner = null;
  //set hit and stand buttons to invisible//
 hitEl.disabled = true;
  standEl.disabled = true;
   render();
} 

function handleBet50() {
  smallBet = 50;
  betPower -= smallBet; 
  betPwrEl.innerHTML = `Betting Power: $${betPower}`
  bet50El.style.visibility = "visible"

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
  if(dealerHand.length < 5) {
    getNewShuffledDeck();
  }
   playerSum = 0; 
  let playerCardsHtml = '';
  playerHand.forEach(function(card) {
    playerCardsHtml += `<div class="card ${card.face}"></div>`;
    playerSum += card.value;
    playerSumEl.innerHTML = playerSum;
    
  });
  playerCardEl.innerHTML = playerCardsHtml;
  
 
  
  
    dealerSum = 0;
  let dealerCardsHtml = "";
  dealerHand.forEach(function(card) {
    dealerCardsHtml += `<div class="card ${card.face}"></div>`;
    dealerSum += card.value;
    dealerSumEl.innerHTML = dealerSum;
    
    
  });
    
  dealerCardEl.innerHTML = dealerCardsHtml;
  checkBJ();
  
};

function hit() {
  
  playerHand.push(shuffledDeck.pop());
  render();
  if(dealerSum === 21 || playerSum > 21) {
    dealerWins();
    return;
  } else if (playerSum === 21) {
    playerWins();
    return;
  } else if(playerSum > 21) {
    dealerWins();
    return;
  } else if (dealerSum === playerSum) {
    push();
  }return;
  
  };

  function push() {
    
      if(playerSum >= 17 && dealerSum >= 17) {
        headerEl.innerHTML = "Push";
        hitEl.disabled = true;
        standEl.disabled = true;
        dealEl.disabled = false;
      }
    }
    
function dealerWins() {
  headerEl.innerHTML = "Dealer Wins!";
  hitEl.disabled = true;
  standEl.disabled = true;
  dealEl.disabled = false;
}

function playerWins() {
  headerEl.innerHTML = "Player Wins!";
  hitEl.disabled = true;
  standEl.disabled = true;
  dealEl.disabled = false;
}

function stand() {
  hitEl.disabled = true;
  standEl.disabled = true;
  dealerHand.push(shuffledDeck.pop());
  render();
  if (dealerSum < 17 || dealerSum < playerSum) {
    dealerHand.push(shuffledDeck.pop());
    render();
  }
  if (dealerSum > 21) {
    playerWins();
  } else if (dealerSum > playerSum && dealerSum < 22) {
    dealerWins();
  } else if (dealerSum === playerSum) {
    push();
  }
 
  
}

function checkBJ() {
  if (playerSum === 21) {
    headerEl.innerHTML = "BlackJack!"
    hitEl.disabled = true;
    standEl.disabled = true;
    dealEl.disabled = false;
  }else if (dealerSum === 21) {
    headerEl.innerHTML = "Dealer BlackJack!"
    hitEl.disabled = true;
    standEl.disabled = true;
    dealEl.disabled = false;
  }
}

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
    if (newShuffledDeck.length < 4) {
      getNewShuffledDeck(); 
    }
    return newShuffledDeck;
    
  }  

  function buildMasterDeck() {
      const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
          deck.push({ // Push those into masterDeck object array //
            face: `${suit}${rank}`,
            value: Number(rank) || (rank === "A" ? 11 : 10),
            hidden: false
          })
        })
      }) 
      return deck;
    }  
