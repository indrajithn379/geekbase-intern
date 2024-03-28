const words = [
    { word: 'PUZZLE', clue: 'Its a type of challenge often found in newspapers.' },
    { word: 'GARDEN', clue: 'This can be found in the backyard and is filled with flowers.' },
    { word: 'ORANGE', clue: 'An Edible Colour.'},
    { word: 'CASTLE', clue: 'A large fortified building often seen in fairy tales.' },
    { word: 'JACKET', clue: 'You wear this to keep warm during cold weather.' },
    { word: 'POETRY', clue: 'Its a form of literature often containing rhythm and rhyme.' },
    { word: 'WONDER', clue: 'Feeling amazement or admiration at something beautiful or unfamiliar.' },
    { word: 'MONSTER', clue: 'A frightening creature often depicted in horror movies.' },
    { word: 'COUNTRY', clue: 'A large area of land with its own government, laws, and leaders.' },
    { word: 'PROBLEM', clue: 'A difficult situation or question that requires a solution.' }
];

let currentWordIndex;
let remainingGuesses = 5;
let guessedLetters = [];
let initialLetters = [];

function newGame() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    remainingGuesses = 5;
    guessedLetters = [];
    initialLetters = generateInitialLetters(words[currentWordIndex].word.length);
    updateClue();
    updateWordDisplay();
    document.getElementById('feedback').innerText = '';
    document.getElementById('guess-input').value = '';
    document.getElementById('remaining-guesses').innerText = remainingGuesses;
}

function updateClue() {
    const word = words[currentWordIndex];
    document.getElementById('clue').innerText = `${word.clue}`;
}

function updateWordDisplay() {
    const word = words[currentWordIndex].word.toUpperCase();
    const guessInput = document.getElementById('guess-input').value.toUpperCase();
    const wordContainer = document.getElementById('word-container');

    for (let i = 0; i < word.length; i++) {
        let letterBox = wordContainer.children[i];

        if (!letterBox) {
            letterBox = document.createElement('div');
            letterBox.className = 'letter-box';
            wordContainer.appendChild(letterBox);
        }

        if (guessedLetters.includes(word[i])) {
            letterBox.innerText = word[i];
        } else if (initialLetters.includes(i)) {
            letterBox.innerText = word[i];
        } else {
            letterBox.innerText = '';
        }
    }

    const guessedWord = Array.from(wordContainer.children).map(letterBox => letterBox.innerText).join('');
    if (guessedWord === word) {
        document.getElementById('feedback').innerText = `Congratulations! You have guessed the word "${word}"!`;
        document.getElementById('feedback').style.color = 'green'; 
        document.getElementById('guess-input').disabled = true;
        document.getElementById('submit-button').disabled = true;
    }
}

function generateInitialLetters(wordLength) {
    const initialIndices = [];
    const numInitialLetters = wordLength === 7 ? 3 : 2;

    while (initialIndices.length < numInitialLetters) {
        const index = Math.floor(Math.random() * wordLength);
        if (!initialIndices.includes(index)) {
            initialIndices.push(index);
        }
    }

    return initialIndices;
}

function checkGuess() {
    const guessInput = document.getElementById('guess-input').value.toUpperCase();
    const word = words[currentWordIndex].word.toUpperCase();

    if (guessedLetters.includes(guessInput)) {
        document.getElementById('feedback').innerText = `You've already guessed the letter "${guessInput}". Try another one.`;
    } else if (word.includes(guessInput)) {
        guessedLetters.push(guessInput);
        document.getElementById('feedback').innerText = `Good guess! The word has the letter "${guessInput}"!`;
        document.getElementById('feedback').style.color='blue';
        updateWordDisplay();
    } else {
        remainingGuesses--;
        document.getElementById('remaining-guesses').innerText = remainingGuesses;
        if (remainingGuesses === 0) {
            document.getElementById('feedback').innerText = `Sorry, you've run out of guesses. The word was "${word}".`;
            document.getElementById('feedback').style.color = 'red'; 
            document.getElementById('guess-input').disabled = true;
            document.getElementById('submit-button').disabled = true;
        } else {
            document.getElementById('feedback').innerText = `Wrong guess! You have ${remainingGuesses} guesses left.`;
            document.getElementById('feedback').style.color='red'
        }
    }
}

newGame();

