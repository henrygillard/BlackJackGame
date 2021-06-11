/*----- app's Constant (variables) -----*/

const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();
const sounds = {
  blackjack: "https://freesound.org/data/previews/575/575429_12990837-lq.mp3",
  dealerWins: 'https://freesound.org/data/previews/575/575428_12990837-lq.mp3',
  playerWins: 'https://freesound.org/data/previews/575/575427_12990837-lq.mp3',
}

/*----- app's state (variables) -----*/

let shuffledDeck;
let playerHand;
let dealerHand;
let dealerSum;
let playerSum;
let betPower = 500;
let smallBet;
let bigBet;

/*----- cached element references -----*/

const player = new Audio();
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

dealEl.addEventListener("click", setDeal)
hitEl.addEventListener("click", hit)
standEl.addEventListener("click", stand)
bet50El.addEventListener("click", handleBet50)
bet100El.addEventListener("click", handleBet100);
betAgainEl.addEventListener("click", init);

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
  betPower;
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
  updateBetPwr();
  betSpaceEl.style.visibility = "visible";
  betSpaceEl.innerHTML = `${betTotal}`;
}

function handleBet100() {
  bigBet += 100;
  betPower -= 100;
  betTotal = smallBet + bigBet;
  updateBetPwr();
  betSpaceEl.style.visibility = "visible";
  betSpaceEl.innerHTML = `${betTotal}`;
}

function setDeal() {
  player.src = "https://freesound.org/data/previews/575/575387_12990837-lq.mp3"
  player.play();
  updateBetPwr();
  dealEl.disabled = false;
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

function dealHand() {
  playerHand = [shuffledDeck.pop(), shuffledDeck.pop()]
  dealerHand = [shuffledDeck.pop(), shuffledDeck.pop()]
};

function updateBetPwr() {
  betPwrEl.innerHTML = `Betting Power: $${betPower}`
}
  
function flipDealerCard() {
  dealerSumEl.style.visibility = "visible"
  let dealerCardsHtml = "";
  dealerHand.forEach(function(card) {
    dealerCardsHtml += `<div class="card ${card.face}"></div>`;
    dealerSumEl.innerHTML = dealerSum;
    });
  dealerCardEl.innerHTML = dealerCardsHtml;
};

function render() {
  if(dealerHand.length < 5) {
    getNewShuffledDeck();
  }
  dealerSum = 0;
  playerSum = 0; 
  let playerCardsHtml = '';
  playerHand.forEach(function(card) {
    playerCardsHtml += `<div class="card ${card.face}"></div>`;
    playerSum += card.value;
    playerSumEl.innerHTML = playerSum;
  });
  playerCardEl.innerHTML = playerCardsHtml;
  let dealerCardsHtml = "";
  dealerHand.forEach(function(card, idx) {
    dealerCardsHtml += `<div class="card ${idx ? card.face:"back"}"></div>`;
    dealerSum += card.value;
    dealerSumEl.innerHTML = dealerSum;
  })
  dealerCardEl.innerHTML = dealerCardsHtml;
  checkBJ();
};

function hitLogic() {
  if(dealerSum === 21 || playerSum > 21) {
    setTimeout(flipDealerCard, 1000)
    setTimeout(dealerWins, 1500);
    } else if (playerSum === 21) {
    setTimeout(flipDealerCard, 1000)
    setTimeout(playerWins, 1500);
    } else if (dealerSum === playerSum) {
    setTimeout(push, 1500);
  } return;
}

function hit() {
  playerHand.push(shuffledDeck.pop());
  render();
  hitLogic();
  
};

function push() {  
  if(playerSum >= 17 && dealerSum >= 17) {
    headerEl.innerHTML = "Push";
    dealerSumEl.innerHTML = dealerSum;
    betPower += betTotal;
    playAgain();
    }
}

function playAgain() {
  hitEl.disabled = true;
  standEl.disabled = true;
  dealEl.disabled = true;
  betAgainEl.disabled = false;
  updateBetPwr();
}

function dealerWins() {
  player.src = sounds.dealerWins;
  player.play();
  dealerSumEl.style.visibility = "visible"
  headerEl.innerHTML = "Dealer Wins!";
  playAgain();
}

function playerWins() {
  player.src = sounds.playerWins;
  player.play();
  dealerSumEl.style.visibility = "visible"
  headerEl.innerHTML = "Player Wins!";
  betPower += betTotal *2;
  playAgain();
}

function standLogic() {
  while (dealerSum < 17) {
    dealerHand.push(shuffledDeck.pop());
    render();
  } if (dealerSum > 21) {
      setTimeout(playerWins, 1500);
  } else if (dealerSum > playerSum && dealerSum < 22) {
      setTimeout(dealerWins, 1500);
  } else if (dealerSum === playerSum) {
      setTimeout(push, 1500);
  } else if (playerSum > dealerSum && playerSum < 22) {
      setTimeout(playerWins, 1500);
  }else if (dealerSum >=17 && playerSum > dealerSum) {
    setTimeout(playerWins, 1500);
  }
}

function stand() {
  setTimeout(flipDealerCard, 1000);
  hitEl.disabled = true;
  standEl.disabled = true;
  render();
  standLogic();
}

function checkBJ() {
  if (playerSum === 21) {
    flipDealerCard()
    player.src = sounds.blackjack;
    player.play();
    headerEl.innerHTML = "BlackJack!"
    playAgain();
    betPower += (betTotal*2.5);
    updateBetPwr();
  }else if (dealerSum === 21) {
    flipDealerCard()
    player.src = sounds.dealerWins;
    player.play();
    headerEl.innerHTML = "Dealer BlackJack!"
    playAgain();
    betPower -= betTotal;
    updateBetPwr();
  }
}

function getNewShuffledDeck() {
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
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
        deck.push({
          face: `${suit}${rank}`,
          value: Number(rank) || (rank === "A" ? 11 : 10),
        })
      })
    }) 
    return deck;
  };  

