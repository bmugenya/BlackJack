//
// Blackjack
// by Brian Mugenya
//


// Card Variables
let suits = [ 'Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ['Ace', 'King', 'Queen', 'Jack','Ten', 'Nine',
    'Eight','Seven','Six','Five', 'Four', 'Three', 'Two'];

//DOM Variables
let textArea = document.getElementById('text-area'),
    newGameBtn = document.getElementById('new-game-btn'), 
    hitBtn = document.getElementById('hit-btn'),
    stayBtn = document.getElementById('stay-btn');

//Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
    

hitBtn.style.display = 'none';
stayBtn.style.display = 'none';
show_status();


newGameBtn.addEventListener('click', function(){

  gameStarted = true;
  gameOver=false;
  playerWon = false;

  deck = create_deck();
  shuffle_deck(deck);
  dealerCards = [ get_next_card(), get_next_card() ];
  playerCards = [ get_next_card(), get_next_card() ];

 
  newGameBtn.style.display = 'none';
  hitBtn.style.display='inline';
  stayBtn.style.display='inline';
  show_status();
});

hitBtn.addEventListener('click', function(){
  playerCards.push(get_next_card());
  game_over();
  show_status();
});

stayBtn.addEventListener('click', function(){
  gameOver = true;
  game_over();
  show_status();
});


function create_deck(){
  let deck = [];
  for (let suitId = 0; suitId < suits.length; suitId++){
  
    for(let valueId = 0; valueId < values.length; valueId++){
      
      let card = {
          suit: suits[suitId],
          value:values[valueId]
      };
      
      deck.push(card);
    }
}  


return deck;
}


function shuffle_deck(deck){
  for(let i = 0; i < deck.length; i++) {
    let swapId = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapId];
    deck[swapId] = deck[i];
    deck[i] = tmp;
  }
}

function get_card_string(card){
  return card.value + ' of ' + card.suit;
}

function get_card_numeric_value(card){
  switch(card.value){
    case 'Ace':
      return 1;
        
    case 'Two':
      return 2;
          
    case 'Three':
      return 3;
          
    case 'Four':
      return 4;
          
    case 'Five':
      return 5;
          
    case 'Six':
      return 6;
          
    case 'Seven':
      return 7;
      
    case 'Eight':
      return 8;
          
    case 'Nine':
      return 9;
      
    default:
      return 10;

  }
  
}


function get_score(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i = 0; i < cardArray.length; i++){
    let card = cardArray[i];
    score += get_card_numeric_value(card);
    if(card.value === 'Ace'){
      hasAce = true;
    }
  }
  
  if(hasAce && score + 10 <= 21){
    return score + 10;
  }
  
  return score;
  
}

function update_scores()  {
  dealerScore = get_score(dealerCards);
  playerScore = get_score(playerCards);
}

function game_over(){
  
  update_scores();
  
  if(gameOver){
    // let dealer take cards
    while(dealerScore < playerScore
        && playerScore <=21
        &&  dealerScore <= 21){
          dealerCards.push(get_next_card());
          update_score();
        }
  }
  
  if(playerScore > 21){
    playerWon = false;
    gameOver = true;
  }
  
  else if(dealerScore > 21){
    playerWon = true;
    gameOver = true;
    
  }
  
  else if(gameOver){
    if(playerScore > dealerScore){
      playerWon = true;
    }
    
    else{
      playerWon = false;
      
    }
  }
}

function show_status(){
  if(!gameStarted){
    textArea.innerText = "Welcome to BlackJack!";
    return;
  } 
  
  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++){
    dealerCardString += get_card_string(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '';
  for (let i = 0; i < playerCards.length; i++){
    playerCardString += get_card_string(playerCards[i]) + '\n';
  }
  
  update_scores();
  
  textArea.innerText= 'Dealer has:\n' + dealerCardString +
                      '(score: ' + dealerScore + ')\n\n'+
                      
                      
                      'player has:\n' + playerCardString +
                      '(score: ' + playerScore + ')\n\n';
                      
  if(gameOver){
    if(playerWon){
      textArea.innerText += "YOU WON";
      
    }
    else {
      textArea.innerText += "DEALER WINS";
    }
    
  newGameBtn.style.display = 'inline';
  hitBtn.style.display='none';
  stayBtn.style.display='none';
  }
  
}

function get_next_card(){
  return deck.shift();
}


