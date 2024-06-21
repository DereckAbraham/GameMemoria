// Variables globales
let lives = 4; // Vidas iniciales
let level = 1;
let timer = 60; // segundos
let timerInterval;

let flippedCard = null;
let matchedCards = [];

const cardContents = ["🏎️", "🚘", "🏍️", "✈️", "🛺", "🛴", "🐭", "🍀"]; // Contenido de las tarjetas, para niveles más avanzados puede ser imágenes u otro contenido

// Función para generar el tablero de memoria
function generateBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    // Determinar la cantidad de cartas según el nivel actual
    const numberOfCards = level + 3; // Empezamos con 4 cartas en el nivel 1, luego 5 en el nivel 2, etc.

    // Generar una lista aleatoria de contenidos de tarjetas
    let shuffledContents = cardContents.slice(0, numberOfCards); // Tomamos solo los primeros elementos necesarios para el nivel
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
        cardBack.textContent = shuffledContents[i]; // Contenido visible de la tarjeta

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    }

    // Establecer tiempo según el nivel actual
    setTimer(level);
}

// Función para establecer el tiempo según el nivel
function setTimer(level) {
    // Definir tiempo según el nivel
    switch (level) {
        case 1:
            timer = 60; // 60 segundos para el nivel 1
            break;
        case 2:
            timer = 90; // 90 segundos para el nivel 2
            break;
        case 3:
            timer = 120; // 120 segundos para el nivel 3
            break;
        // Puedes agregar más casos según necesites
        default:
            timer = 150; // Valor predeterminado por si se alcanza un nivel no definido
            break;
    }

    // Actualizar el contador de tiempo en el HTML
    updateTimerDisplay(timer);
}

// Función para actualizar el contador de tiempo en el HTML
function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Función para voltear una tarjeta
function flipCard() {
    if (this === flippedCard || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');

    if (!flippedCard) {
        flippedCard = this;
    } else {
        // Segunda tarjeta volteada, comprobar si coinciden
        checkMatch(this);
    }
}

// Función para verificar si las tarjetas volteadas son iguales
function checkMatch(card) {
    if (card.querySelector('.card-back').textContent === flippedCard.querySelector('.card-back').textContent) {
        // Coinciden
        setTimeout(() => {
            card.classList.add('matched');
            flippedCard.classList.add('matched');
            matchedCards.push(card, flippedCard);
            flippedCard = null;

            // Verificar si se ha completado el nivel
            if (matchedCards.length === cardContents.length * 2) {
                // Implementar lógica para pasar al siguiente nivel
                nextLevel();
            }
        }, 1000);
    } else {
        // No coinciden, voltear nuevamente
        setTimeout(() => {
            card.classList.remove('flipped');
            flippedCard.classList.remove('flipped');
            flippedCard = null;

            // Disminuir vidas
            loseLife();
        }, 1000);
    }
}

// Función para disminuir vidas
function loseLife() {
    lives--;
    document.getElementById('livesCount').textContent = lives;

    if (lives === 0) {
        // Implementar lógica para fin de juego por pérdida de vidas
        gameOver();
    }
}

// Función para pasar al siguiente nivel
function nextLevel() {
    level++;
    document.getElementById('level').textContent = level;
    matchedCards = [];
    flippedCard = null;
    clearInterval(timerInterval);
    startTimer();
    generateBoard();
}

// Función para iniciar el juego
function startGame() {
    level = 1;
    lives = 3; // Reiniciar vidas
    document.getElementById('livesCount').textContent = lives;
    document.getElementById('level').textContent = level;
    matchedCards = [];
    flippedCard = null;
    startTimer(); // Iniciar el cronómetro al empezar el juego
    generateBoard();
}

// Función para reiniciar el juego
function restartGame() {
    level = 1;
    lives = 3; // Reiniciar vidas
    document.getElementById('livesCount').textContent = lives;
    document.getElementById('level').textContent = level;
    matchedCards = [];
    flippedCard = null;
    clearInterval(timerInterval);
    startTimer();
    generateBoard();
}

// Función para iniciar el cronómetro
function startTimer() {
    updateTimerDisplay(timer);
    timerInterval = setInterval(() => {
        timer--;
        updateTimerDisplay(timer);

        if (timer === 0) {
            clearInterval(timerInterval);
            // Implementar lógica para fin de juego por tiempo
            gameOver();
        }
    }, 1000);
}

// Función para finalizar el juego
function gameOver() {
    alert('¡Juego terminado!');

    // Reiniciar juego al nivel principal
    restartGame();
}

// Iniciar el juego al cargar la página
startGame();
