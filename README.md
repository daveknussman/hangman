# hangman
ACC Javascript Fundamentals Hangman Project

Overview
The first progect for the ACC Javascript Fundamentals class is to develop a game of Hangman.  The game will be executed in the terminal using node.  All interaction with the user (displays, prompts, progress, results, ...) will be done via the console. 

Coding/Development
The application was written in Javascript.  The library "readline-sync" was also utilized for user prompting.

The game utilized a while loop that runs runs a game-round loop, keeps track and displays rounds results, and promts gthe user for additional round play.   

The game-round loop performs player prompting, guess feedback, and round progress.  

We were required to use at least one high-order function.  For this game, I used Array.find to search the selected word to see if contains the users' guess.  The function executed by the find utilizes an arrow function - also a requirement.  

Gameplay
Hangman is a word guessing game where the computer picks a word or phrase. A player must guess what the word or phrase is, letter-by-letter. If they make too many gueses, the hangman is "hung" and they will lose.

The game has multiple rounds. Each round will begin with the game picking a word at random. The player will then make a series of guesses. The round will end when the player either guesses the entire word or they incorrectly six times.

The game provides feedback after every guess, letting the user know if the guess was legitimate (a letter), a repeat, correct, or incorrect.  The hangman display will be updated when an incorrect guess is made.  If a correct guess is made, the word display will be updated to show the correct guess.  

The game keeps track of the number rounds the player wins and the total number of rounds played. It displays the results after each round ends.