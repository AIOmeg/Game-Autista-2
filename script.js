let currentLevel = 1;
let correctClicks = 0;
let incorrectClicks = 0;
const feedbackElement = document.getElementById('feedback');
const levelTitle = document.getElementById('level-title');
const playButton = document.getElementById('play-button');
const restartButton = document.getElementById('restart-button');
const shapesContainer = document.getElementById('shapes-container');
const reportElement = document.getElementById('report');

const levels = [
    {
        message: 'Nível 1: Clique no círculo azul',
        correctShapeId: 'blue-circle',
        successMessage: 'Parabéns! Você completou o nível 1!',
        backgroundColor: '#ADD8E6' // Light Blue
    },
    {
        message: 'Nível 2: Clique no quadrado verde',
        correctShapeId: 'green-square',
        successMessage: 'Parabéns! Você completou o nível 2!',
        backgroundColor: '#98FB98' // Pale Green
    },
    {
        message: 'Nível 3: Clique na estrela amarela',
        correctShapeId: 'yellow-star',
        successMessage: 'Parabéns! Você completou o nível 3!',
        backgroundColor: '#FFD700' // Gold
    }
];

function updateLevel() {
    const level = levels[currentLevel - 1];
    levelTitle.textContent = level.message;
    document.body.style.backgroundColor = level.backgroundColor; // Muda a cor de fundo
    feedbackElement.textContent = '';
}

function showReport() {
    reportElement.innerHTML = `
        <p>Relatório:</p>
        <p>Acertos: ${correctClicks}</p>
        <p>Erros: ${incorrectClicks}</p>
    `;
}

function resetGame() {
    currentLevel = 1;
    correctClicks = 0;
    incorrectClicks = 0;
    updateLevel();
    showReport();
    feedbackElement.textContent = '';
    restartButton.style.display = 'none';
    shapesContainer.style.display = 'flex';
}

document.querySelectorAll('.shape').forEach(shape => {
    shape.addEventListener('click', function () {
        const level = levels[currentLevel - 1];
        if (this.id === level.correctShapeId) {
            correctClicks++;
            feedbackElement.textContent = level.successMessage;
            if (currentLevel < 3) {
                setTimeout(() => {
                    currentLevel++;
                    updateLevel();
                }, 1000);
            } else {
                feedbackElement.textContent += ' Você terminou o jogo!';
                shapesContainer.style.display = 'none';
                restartButton.style.display = 'block';
                showReport();
            }
        } else {
            incorrectClicks++;
            feedbackElement.textContent = 'Tente novamente!';
        }
    });
});

playButton.addEventListener('click', function() {
    playButton.style.display = 'none';
    levelTitle.style.display = 'block';
    shapesContainer.style.display = 'flex';
    updateLevel();
});

restartButton.addEventListener('click', resetGame);

updateLevel();
