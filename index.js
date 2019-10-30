const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

let solved = false;
let lost = false;
let answer = [];
let guesses = [];
let progress = [];
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

    
    j += 1; 
    if (j>5) solved=true;
}

// console.log(wordBank);
// console.log(wordBank[7]);
// const myVariable = prompt.question("Please guess a letter: ");
// console.log(myVariable);
// console.log(myVariable);
// console.log(myVariable);
// console.log(myVariable + "\n\n");
// console.log(myVariable);