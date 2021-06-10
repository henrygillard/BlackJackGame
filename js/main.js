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
const bet50El = document.querySelector("#bet50");
const bet100El = document.querySelector("#bet100");
const betPwrEl = document.getElementById("betPwr");
const playerSpaceEl = document.querySelector("#player");
const betSpaceEl = document.querySelector("#bet-space");
const betAgainEl = document.querySelector("#play-again");
const dealerCardAreaEl = document.querySelector(".dealer-card");
/*----- event listeners -----*/

document.querySelector("#deal").addEventListener("click", setDeal)
document.querySelector("#hit").addEventListener("click", hit)
document.querySelector("#stand").addEventListener("click", stand)
document.getElementById("bet50").addEventListener("click", handleBet50)
document.getElementById("bet100").addEventListener("click", handleBet100);
document.getElementById("play-again").addEventListener("click", betAgain);
{/* <div class="card back-red"></div>
dealer-card.firstChild.classList.remove("back-blue") */}
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
  betTotal = 0;
  betPower = 500;
 hitEl.disabled = true;
  standEl.disabled = true;
  bet50El.disabled = false;
  bet100El.disabled = false;
  betAgainEl.disabled = true;
  betSpaceEl.style.visibility = "hidden";
  dealerSumEl.style.visibility = "hidden";
  playerSumEl.style.visibility = "hidden";
   render();
} 
function betAgain() {
  console.log(betTotal)
  console.log(betPower)
  shuffledDeck = getNewShuffledDeck(); 
  playerHand = [];
  dealerHand = [];
  playerSum = 0;
  dealerSum = 0;
  smallBet = 0;
  bigBet = 0;
  betTotal = 0;
  dealEl.disabled = false;
  hitEl.disabled = true;
  standEl.disabled = true;
  bet50El.disabled = false;
  bet100El.disabled = false;
  betAgainEl.disabled = true;
  betSpaceEl.style.visibility = "hidden";
  dealerSumEl.style.visibility = "hidden";
  playerSumEl.style.visibility = "hidden";
  render();
}
function handleBet50() {
  
  smallBet += 50;
  betPower -= 50; 
  betTotal = smallBet + bigBet;
  betPwrEl.innerHTML = `Betting Power: $${betPower}`
  betSpaceEl.style.visibility = "visible";
  betSpaceEl.innerHTML = `${betTotal}`;

}

function handleBet100() {
  bigBet += 100;
  betPower -= 100;
  betTotal = smallBet + bigBet;
  betPwrEl.innerHTML = `Betting Power: $${betPower}`
  betSpaceEl.style.visibility = "visible";
  betSpaceEl.innerHTML = `${betTotal}`;
}
function setDeal() {
  console.log(betTotal)
  console.log(betPower)
  
  betPwrEl.innerHTML = `Betting Power: $${betPower}`
  standEl.disabled = false;
  hitEl.disabled = false;
  dealEl.disabled = true;
  bet50El.disabled = true;
  bet100El.disabled = true;
  headerEl.innerHTML = "Do you want to hit or stand?"
  dealerSumEl.style.visibility = "hidden";
  playerSumEl.style.visibility = "visible";
  dealHand();
    render();
    
 }

function dealHand(hand) {
    playerHand = [shuffledDeck.pop(), shuffledDeck.pop()]
    dealerHand = [shuffledDeck.pop(), shuffledDeck.pop()]

};
  
// make function that flips dealer card
function flipDealerCard() {
  let dealerCardsHtml = "";
  dealerHand.forEach(function(card) {
    dealerCardsHtml += `<div class="card ${card.face}"></div>`;
    })
  dealerCardEl.innerHTML = dealerCardsHtml;
  console.log(dealerCardsHtml)
}

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
    dealerHand.forEach(function(card, idx) {
    dealerCardsHtml += `<div class="card ${idx ? card.face:"back" }"></div>`;
    dealerSum += card.value;
    dealerSumEl.innerHTML = dealerSum;
    
    
})

  

  
    
  dealerCardEl.innerHTML = dealerCardsHtml;
  checkBJ();
  
};

function hit() {
  
  flipDealerCard()
  
  playerHand.push(shuffledDeck.pop());
  render();
  
  if(dealerSum === 21 || playerSum > 21) {
    
    flipDealerCard()
    dealerWins();
    return;
  } else if (playerSum === 21) {
    
    flipDealerCard()
    playerWins();
    return;
  } else if(playerSum > 21) {
    
    flipDealerCard()
    dealerWins();
    return;
  } else if (dealerSum === playerSum) {
    push();
  }return;
  
  };

  function push() {
    console.log(betTotal)
  console.log(betPower)
    
      if(playerSum >= 17 && dealerSum >= 17) {
        headerEl.innerHTML = "Push";
        hitEl.disabled = true;
        standEl.disabled = true;
        dealEl.disabled = true;
        betAgainEl.disabled = false;
        betPower += betTotal;
      }
    }
    
function dealerWins() {
  dealerSumEl.style.visibility = "visible"
  headerEl.innerHTML = "Dealer Wins!";
  hitEl.disabled = true;
  standEl.disabled = true;
  dealEl.disabled = true;
  betAgainEl.disabled = false;
  betPwrEl.innerHTML = `Betting Power: $${betPower}`
}

function playerWins() {
  dealerSumEl.style.visibility = "visible"
  headerEl.innerHTML = "Player Wins!";
  hitEl.disabled = true;
  standEl.disabled = true;
  dealEl.disabled = true;
  betAgainEl.disabled = false;
  betPower += betTotal *2;
  betPwrEl.innerHTML = `Betting Power: $${betPower}`
}

function stand() {
  dealerSumEl.style.visibility = "visible"
  hitEl.disabled = true;
  standEl.disabled = true;
  dealerHand.push(shuffledDeck.pop());
  render();
  flipDealerCard()
  if (dealerSum < 17 || dealerSum < playerSum) {
    dealerHand.push(shuffledDeck.pop());
    render();
    flipDealerCard()
  }
  if (dealerSum > 21) {
    playerWins();
  } else if (dealerSum > playerSum && dealerSum < 22) {
    dealerWins();
  } else if (dealerSum === playerSum) {
    push();
    console.log(betTotal)
  console.log(betPower)
  }
 
  
}
// if BJ, render card face
function checkBJ() {
  if (playerSum === 21) {
    flipDealerCard()
    headerEl.innerHTML = "BlackJack!"
    hitEl.disabled = true;
    standEl.disabled = true;
    dealEl.disabled = true;
    betAgainEl.disabled = false;
    betPower += (betTotal*2.5);
    betPwrEl.innerHTML = `Betting Power: $${betPower}`
  }else if (dealerSum === 21) {
    flipDealerCard()
    headerEl.innerHTML = "Dealer BlackJack!"
    hitEl.disabled = true;
    standEl.disabled = true;
    dealEl.disabled = true;
    betAgainEl.disabled = false;
    betPower -= betTotal;
    betPwrEl.innerHTML = `Betting Power: $${betPower}`
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
          })
        })
      }) 
      return deck;
    }  
