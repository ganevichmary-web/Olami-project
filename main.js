// ==============================================
// ОСНОВНОЙ СКРИПТ ДЛЯ УПРАВЛЕНИЯ СТРАНИЦЕЙ
// ==============================================

// Элементы DOM
const gameContainer = document.getElementById('game-container');
const gamesList = document.getElementById('games-list');
const gamesListTitle = document.getElementById('games-list-title');
const snakeGameOver = document.getElementById('snake-game-over');

// Показ игры при клике на элемент списка
document.querySelectorAll('.game-list li').forEach(item => {
    item.addEventListener('click', function() {
        const gameName = this.getAttribute('data-game');
        showGame(gameName);
    });
});

// Функция показа игры
function showGame(gameName) {
    // Скрыть список игр и показать игровой контейнер
    gamesList.style.display = 'none';
    gamesListTitle.style.display = 'none';
    document.querySelector('.instructions').style.display = 'none';
    
    // Показать игровой контейнер
    gameContainer.style.display = 'block';
    gameContainer.innerHTML = '';
    
    // Установить заголовок игры
    const gameTitles = {
        'tictactoe': 'КРЕСТИКИ-НОЛИКИ',
        'snake': 'ЗМЕЙКА',
        'tetris': 'ТЕТРИС',
        'pong': 'ПОНГ',
        'minesweeper': 'САПЁР'
    };
    
    // Создать заголовок
    const title = document.createElement('div');
    title.className = 'current-game-title';
    title.textContent = gameTitles[gameName] || 'ИГРА';
    gameContainer.appendChild(title);
    
    // Инициализировать выбранную игру
    if (gameName === 'tictactoe') {
        initTicTacToeGame();
    } else if (gameName === 'snake') {
        initSnakeGame();
    } else if (gameName === 'tetris') {
        initTetrisGame();
    } else if (gameName === 'pong') {
        initPongGame();
    } else if (gameName === 'minesweeper') {
        initMinesweeperGame();
    } else {
        // Для других игр показываем заглушку
        const stub = document.createElement('div');
        stub.className = 'game-stub';
        stub.innerHTML = `
            <h3>${gameTitles[gameName]}</h3>
            <p>Эта игра находится в разработке</p>
            <button class="back-button" onclick="hideGame()">Вернуться к списку игр</button>
        `;
        gameContainer.appendChild(stub);
    }
}

// Функция скрытия игры и возврата к списку
function hideGame() {
    // Остановить игры, если они запущены
    if (window.snakeGame && window.snakeGame.stop) {
        window.snakeGame.stop();
    }
    
    if (window.tetrisGame && window.tetrisGame.stop) {
        window.tetrisGame.stop();
    }
    
    if (window.pongGame && window.pongGame.stop) {
        window.pongGame.stop();
    }
    
    if (window.minesweeperGame && window.minesweeperGame.stop) {
        window.minesweeperGame.stop();
    }
    
    // Скрыть игровой контейнер и экран окончания игры
    gameContainer.style.display = 'none';
    snakeGameOver.style.display = 'none';
    
    // Показать список игр и другие элементы
    gamesList.style.display = 'block';
    gamesListTitle.style.display = 'block';
    document.querySelector('.instructions').style.display = 'block';
}

// Функция показа инструкций для Змейки
function showSnakeInstructions() {
    alert("Управление:\nСтрелки ←↑↓→ - движение\nR или пробел - перезапуск\n\nЦель игры:\nСобирайте красную еду, чтобы расти и набирать очки.\nИзбегайте столкновения с собственным хвостом!\n\nСкорость увеличивается каждые 50 очков.");
}

// Инициализация при загрузке страницы
window.addEventListener('load', function() {
    // Ничего не делаем при загрузке, ждем выбора игры
});