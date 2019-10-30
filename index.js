const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

let solved = false;            //puzzle solved
let lost = false;              //game lost 
let badGuessesAllowed = 5;     //maximum bad guesses
let answer = [];               //word to be guessed as an array
let guesses = [];              //array of used guesses
let progress = [];             //array of users progress in game
let guessIndex = 0;            //if guess found in answer, where is it
let startSearchIndex = 0;      //when searching answer, where to start searching
let searchingForGuess = true;  //searching loop control value
let correctGuess = false;      //guess outcome
let badGuessTotal = 0;         //number of incorrect guesses
let j = 0;

const findIt = (arr, arg) => {
    let found = arr.find(itm => itm === arg);
    return found;
};

// Get answer
while (answer.length === 0) {
    let answerIdx = Math.floor(Math.random() * 1000) + 1;
    if (wordBank[answerIdx]){
        answer = Array.from(wordBank[answerIdx]);  
    }
}

// Init progress 
for (i=0;i<answer.length;i++) {
    progress.push('_');
}

// Welcome
console.clear();
console.log('Welcome to Hangman.  Good luck.');
console.log('Try to guess this word:'+ "\n");
console.log(answer);
console.log(progress.join(' ') + "\n");

// Run the game until the user solves it or loses (ctrl+c will break out)
while ((!solved) && (!lost)) {
    
    // Get the guess
    let guess = prompt.question("Please guess a letter: ").substring(0,1);
    guess = guess.toLowerCase();
    
    // Test that the guess is a letter bypass if not
    if (!findIt(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],guess)) {
        console.log('Not a letter.  Try again please');
        continue;
    } 

    // See if guess is a new guess and bypass if not
    if (findIt(guesses,guess)) {
        console.log('Already used that letter.  Try again please');
        continue;
    } else {
        // Add new guess into guesses
        guesses.push(guess);
    }
    
    // Process new guess
    startSearchIndex = 0;
    searchingForGuess = true;
    correctGuess = false;
    while (searchingForGuess) {
        guessIndex = answer.indexOf(guess,startSearchIndex);
        if (guessIndex === -1) {
            searchingForGuess = false;  
        } else {
            correctGuess = true;
            progress[guessIndex] = guess;
            startSearchIndex = guessIndex + 1; 
        }
    }

    // Give feedback
    if (correctGuess) {
        console.log('Congratulations, you guessed well!!!');
        if (progress.toString() === answer.toString()) {
            solved = true;
            console.log('You win!!!!!!!');
            continue;
        }
    }  else {
        badGuessTotal += 1;
        console.log('Sorry, that guess is incorrect');
        // Paint hangman
        if (badGuessTotal > badGuessesAllowed) {
            console.log('You are out of guesses.  You lose.');
            lost = true;
        }
    }

    // console.log(progress);



    

}