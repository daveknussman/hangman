// includes
const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

//game display lines
let hangmanTop  = '_____';    
let hangmanRope = '|     |'; 
let hangmanPole = '|'; 
let hangmanBase = '_________';

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
let messageType = ' ';         //message type for display

// functions to use
function showHangman (errors,feedbackType) {
    console.clear();
    console.log('Welcome to Hangman.  Good luck.' + "\n");
    console.log('Try to guess the word:' + "\n");
    console.log(hangmanTop);
    console.log(hangmanRope);
    (errors > 0) ? console.log(hangmanPole + '     o' ) : console.log(hangmanPole);
    (errors > 3) ? console.log(hangmanPole + "    /|\\") : (errors > 2) ? console.log(hangmanPole + "    /|") : (errors > 1) ? console.log(hangmanPole + "     |") : console.log(hangmanPole);
    (errors > 5) ? console.log(hangmanPole + '    / \\' ) : (errors > 4) ? console.log(hangmanPole + '    /') : console.log(hangmanPole) ;
    console.log(hangmanPole);
    console.log(hangmanBase);
    console.log("\n");
    switch (feedbackType) {
        case 'invalid' :
            console.log('Not a letter.  Try again please');
            break;
        case 'repeat' :
            console.log('Already used that letter.  Try again please');
            break;
        case 'correct' :
            console.log('Congratulations, you guessed well!!!');
            break;
        case 'wrong' :
            console.log('Sorry, that guess is incorrect');
            break;
        case 'won' :
            console.log('You win!!!!!!!'  + "\n");
            console.log('Thanks for playing!');
            break;
        case 'lost' :
            console.log('You are out of guesses.  You lose.'  + "\n");
            console.log('Thanks for playing!'); 
    };
    console.log(progress.join(' ') + "\n\n");
};

const findIt = (arr, arg) => {
    let found = arr.find(itm => itm === arg);
    return found;
};

// ****************** Main Program Logic *********************
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

// Run the game loop until the user solves it or loses (ctrl+c will break out)
while ((!solved) && (!lost)) {

    // show game display    
    showHangman(badGuessTotal, messageType);
    
    // Get the guess
    let guess = prompt.question("Please guess a letter: ").substring(0,1);
    guess = guess.toLowerCase();
    
    // Test that the guess is a letter bypass if not
    if (!findIt(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],guess)) {
        messageType = 'invalid';
        // console.log('Not a letter.  Try again please');
        continue;
    } 

    // See if guess is a new guess and bypass if not
    if (findIt(guesses,guess)) {
        messageType = 'repeat';
        // console.log('Already used that letter.  Try again please');
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
        messageType = 'correct';
        // console.log('Congratulations, you guessed well!!!');
        if (progress.toString() === answer.toString()) {
            solved = true;
            continue;
        }
    }  else {
        badGuessTotal += 1;
        messageType = 'wrong';
        // console.log('Sorry, that guess is incorrect');
        if (badGuessTotal > badGuessesAllowed) {
            lost = true;
        }
    }
}

// Game ended
if (solved) {
    messageType = 'won';
    // showHangman(badGuessTotal);
    // console.log('You win!!!!!!!');
}  else if (lost) {
    messageType = 'lost';
    // showHangman(badGuessTotal); 
    // console.log('You are out of guesses.  You lose.'); 
};

showHangman(badGuessTotal, messageType);