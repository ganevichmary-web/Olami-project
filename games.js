// ==============================================
// СКРИПТ ИГРЫ "КРЕСТИКИ-НОЛИКИ"
// ==============================================

function initTicTacToeGame() {
    // Создаем контейнер для игры
    const tttContainer = document.createElement('div');
    tttContainer.className = 'ttt-container';
    
    // Создаем разметку игры
    tttContainer.innerHTML = `
        <div class="ttt-status" id="ttt-status">Ход игрока: <span class="x-turn">X</span></div>
        
        <div class="ttt-board" id="ttt-board"></div>
        
        <div class="ttt-score">
            <div class="ttt-score-x">X: <span id="ttt-scoreX">0</span></div>
            <div class="ttt-score-draw">Ничьи: <span id="ttt-scoreDraw">0</span></div>
            <div class="ttt-score-o">O: <span id="ttt-scoreO">0</span></div>
        </div>
        
        <div class="ttt-controls">
            <button class="ttt-button" id="ttt-restart">Новая игра</button>
            <button class="ttt-button" id="ttt-resetScore">Сбросить счёт</button>
        </div>
        
        <div class="ttt-game-info">
            <p><strong>Правила игры:</strong></p>
            <p>1. Игроки по очереди ставят X и O на поле 3×3.</p>
            <p>2. Первый, выстроивший в ряд 3 своих фигуры (по вертикали, горизонтали или диагонали), выигрывает.</p>
            <p>3. Если все поля заполнены, а победителя нет, объявляется ничья.</p>
        </div>
        
        <button class="back-button" onclick="hideGame()">Вернуться к списку игр</button>
    `;
    
    // Добавляем контейнер в игровую область
    gameContainer.appendChild(tttContainer);
    
    // Инициализируем игру
    initTicTacToe();
}

function initTicTacToe() {
    // Состояние игры
    const gameState = {
        currentPlayer: 'X',
        gameBoard: ['', '', '', '', '', '', '', '', ''],
        gameActive: true,
        score: {
            X: 0,
            O: 0,
            draw: 0
        }
    };

    // Элементы DOM
    const statusElement = document.getElementById('ttt-status');
    const boardElement = document.getElementById('ttt-board');
    const scoreXElement = document.getElementById('ttt-scoreX');
    const scoreOElement = document.getElementById('ttt-scoreO');
    const scoreDrawElement = document.getElementById('ttt-scoreDraw');
    const restartButton = document.getElementById('ttt-restart');
    const resetScoreButton = document.getElementById('ttt-resetScore');

    // Сообщения о состоянии игры
    const winningMessage = () => `Игрок ${gameState.currentPlayer} победил!`;
    const drawMessage = () => 'Игра закончилась вничью!';
    const currentPlayerTurn = () => `Ход игрока: ${gameState.currentPlayer}`;

    // Выигрышные комбинации
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные
        [0, 4, 8], [2, 4, 6]             // Диагональные
    ];

    // Инициализация игрового поля
    function initializeBoard() {
        boardElement.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('button');
            cell.classList.add('ttt-cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', () => handleCellClick(i));
            boardElement.appendChild(cell);
        }
        
        updateStatus();
        updateScoreDisplay();
    }

    // Обработка клика по клетке
    function handleCellClick(index) {
        // Если клетка уже занята или игра не активна, ничего не делаем
        if (gameState.gameBoard[index] !== '' || !gameState.gameActive) {
            return;
        }

        // Делаем ход
        gameState.gameBoard[index] = gameState.currentPlayer;
        updateCell(index);
        
        // Проверяем результат игры
        const result = checkGameResult();
        if (result === 'win') {
            handleWin();
        } else if (result === 'draw') {
            handleDraw();
        } else {
            // Меняем игрока
            gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    }

    // Обновление клетки на поле
    function updateCell(index) {
        const cell = boardElement.children[index];
        cell.textContent = gameState.gameBoard[index];
        cell.classList.add(gameState.gameBoard[index].toLowerCase());
    }

    // Проверка результата игры
    function checkGameResult() {
        let roundWon = false;
        
        // Проверяем все выигрышные комбинации
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (
                gameState.gameBoard[a] === '' ||
                gameState.gameBoard[b] === '' ||
                gameState.gameBoard[c] === ''
            ) {
                continue;
            }
            
            if (
                gameState.gameBoard[a] === gameState.gameBoard[b] &&
                gameState.gameBoard[a] === gameState.gameBoard[c]
            ) {
                roundWon = true;
                
                // Подсвечиваем выигрышные клетки
                boardElement.children[a].classList.add('ttt-winning-cell');
                boardElement.children[b].classList.add('ttt-winning-cell');
                boardElement.children[c].classList.add('ttt-winning-cell');
                break;
            }
        }
        
        if (roundWon) {
            return 'win';
        }
        
        // Проверяем на ничью
        const roundDraw = !gameState.gameBoard.includes('');
        if (roundDraw) {
            return 'draw';
        }
        
        return 'continue';
    }

    // Обработка выигрыша
    function handleWin() {
        gameState.gameActive = false;
        statusElement.textContent = winningMessage();
        
        // Обновляем счет
        gameState.score[gameState.currentPlayer]++;
        updateScoreDisplay();
    }

    // Обработка ничьей
    function handleDraw() {
        gameState.gameActive = false;
        statusElement.textContent = drawMessage();
        
        // Обновляем счет
        gameState.score.draw++;
        updateScoreDisplay();
    }

    // Обновление статуса игры
    function updateStatus() {
        statusElement.textContent = currentPlayerTurn();
    }

    // Обновление отображения счета
    function updateScoreDisplay() {
        scoreXElement.textContent = gameState.score.X;
        scoreOElement.textContent = gameState.score.O;
        scoreDrawElement.textContent = gameState.score.draw;
    }

    // Сброс игры (сохраняя счет)
    function restartGame() {
        gameState.currentPlayer = 'X';
        gameState.gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameState.gameActive = true;
        
        // Убираем подсветку с выигрышных клеток
        const cells = document.querySelectorAll('.ttt-cell');
        cells.forEach(cell => {
            cell.classList.remove('ttt-winning-cell', 'x', 'o');
            cell.textContent = '';
        });
        
        updateStatus();
    }

    // Сброс счета
    function resetScore() {
        gameState.score.X = 0;
        gameState.score.O = 0;
        gameState.score.draw = 0;
        updateScoreDisplay();
        restartGame();
    }

    // Добавляем обработчики событий
    restartButton.addEventListener('click', restartGame);
    resetScoreButton.addEventListener('click', resetScore);

    // Инициализация игры при загрузке
    initializeBoard();
}