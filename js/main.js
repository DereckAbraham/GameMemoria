let lives = 4; 
let level = 1;
let timer = 60; 
let timerInterval;

let flippedCard = null;
let matchedCards = [];

const cardContents = ["🏎️", "🚘", "🏍️", "✈️", "🛺", "🛴", "🐭", "🍀"]; 


function generateBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    const numberOfCards = level + 3; 


    let shuffledContents = cardContents.slice(0, numberOfCards); 
    shuffledContents = [...shuffledContents, ...shuffledContents].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledContents.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = shuffledContents[i]; 

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    }

  
    setTimer(level);
}


function setTimer(level) {
    
    switch (level) {
        case 1:
            timer = 60; 
            break;
        case 2:
            timer = 90; 
            break;
        case 3:
            timer = 120; 
            break;
        
        default:
            timer = 150; 
            break;
    }

   
    updateTimerDisplay(timer);
}


function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


function flipCard() {
    if (this === flippedCard || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');

    if (!flippedCard) {
        flippedCard = this;
    } else {
       
        checkMatch(this);
    }
}


function checkMatch(card) {
    if (card.querySelector('.card-back').textContent === flippedCard.querySelector('.card-back').textContent) {
      
        setTimeout(() => {
            card.classList.add('matched');
            flippedCard.classList.add('matched');
            matchedCards.push(card, flippedCard);
            flippedCard = null;

            
            if (matchedCards.length === cardContents.length * 2) {
                
                nextLevel();
            }
        }, 1000);
    } else {
        
        setTimeout(() => {
            card.classList.remove('flipped');
            flippedCard.classList.remove('flipped');
            flippedCard = null;

            
            loseLife();
        }, 1000);
    }
}


function loseLife() {
    lives--;
    document.getElementById('livesCount').textContent = lives;

    if (lives === 0) {
        
        gameOver();
    }
}

function nextLevel() {
    level++;
    document.getElementById('level').textContent = level;
    matchedCards = [];
    flippedCard = null;
    clearInterval(timerInterval);
    startTimer();
    generateBoard();
}

function startGame() {
    level = 1;
    lives = 3; 
    document.getElementById('livesCount').textContent = lives;
    document.getElementById('level').textContent = level;
    matchedCards = [];
    flippedCard = null;
    startTimer(); 
    generateBoard();
}


function restartGame() {
    level = 1;
    lives = 3; 
    document.getElementById('livesCount').textContent = lives;
    document.getElementById('level').textContent = level;
    matchedCards = [];
    flippedCard = null;
    clearInterval(timerInterval);
    startTimer();
    generateBoard();
}

function startTimer() {
    updateTimerDisplay(timer);
    timerInterval = setInterval(() => {
        timer--;
        updateTimerDisplay(timer);

        if (timer === 0) {
            clearInterval(timerInterval);
           
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    alert('¡Juego terminado!');

    restartGame();
}

startGame();
