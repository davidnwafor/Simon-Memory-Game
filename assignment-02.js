var isGameOn = false; // boolean to check if the game is playing or not
let timer = null; // 5 sec timer for game
let greenCircle = document.querySelector('.green-circle'); // store info on each circle
let redCircle = document.querySelector('.red-circle');
let blueCircle = document.querySelector('.blue-circle');
let yellowCircle = document.querySelector('.yellow-circle');

var highScore = 0; // keep track of high score
let currentScoreBtn = document.querySelector('.current-score'); // get the button element
let currentScore = '00'; // set initial score to 00, used for button text
currentScoreBtn.innerHTML = currentScore;

let highScoreBtn = document.querySelector('.highest-score') // store high score button info
let highestScore = '00';
highScoreBtn.innerHTML = highestScore;
// following code has been tweaked and inspired from the website: https://codepen.io/JackBid/pen/ojayNj
var circles = [".green-circle",".red-circle",".yellow-circle",".blue-circle"]; // array of all four circles
var score = 0; // keep track of score
var canClick = false; // boolean used for when user can click on a circle (should really be named cantClick)
var sequence = []; // stores signals
var clicked = []; // stores clicked signals
var speed = 800; // initial speed of the game
var signal; // used in executing the signals

function reset() { // reset all variables
    clearInterval(signal);
    sequence = [];
    clicked = [];
    speed = 800;
    score = 0;
    currentScore = '00';
    canClick = false;
    isGameOn = false;
}
function flash(circle) { // take in a circle and flash it for 1/2 seconds
    
    $(circle).addClass('active'); // make circle white
    setTimeout(function() {
        $(circle).removeClass('active');
    },500);
}
function addNew() { // add random number between 0-3 to array, used for adding circle to sequence
    var randomIndex = Math.floor(Math.random() * 4); // generate random index
    sequence.push(randomIndex); // insert into sequence
    canClick = true;
}
function newSignal() { // when user has responded correctly, set what they clicked to nothing, add another random number to this sequence and animate it
    if (score === 5) { // increase speed in 5th, 9th and 13th rounds
        speed = 700;
    } else if (score === 9) {
        speed = 500;
    }
    else if (score === 13) {
        speed = 400;
    }
    clicked = []; // reset all clicked circles
    canClick = true;
    addNew();
    flashAll(sequence);
}
function flashAll(sequence) { // takes in a sequence and flashes all of its circles
    var i = 0;
    signal = setInterval(function() {
        flash(circles[sequence[i]]);
        i++;
        if (i >= sequence.length) {
            clearInterval(signal);
            canClick = false;
            timer = setTimeout(endGame, 5000); // when done flashing set timer to 5 seconds
        }
    }, speed + 500); // adds a brief pause of 500ms between each flashed circle
}

// When user clicks on a circle
$(".circle").on("click", function() {
    // if sequence is still being shown do not allow user to do anything
    if (!canClick && isGameOn) {
        clearTimeout(timer); // quit timer
        // add number to sequence based on what user has clicked
        if ($(this).hasClass("green-circle")) {
            clicked.push(0);
        } else if ($(this).hasClass("red-circle")) {
            clicked.push(1);
        } else if ($(this).hasClass("yellow-circle")) {
            clicked.push(2);
        } else if ($(this).hasClass("blue-circle")) {
            clicked.push(3);
        }
        timer = setTimeout(endGame, 5000); // set timer again to 5 secs inbetween each circle click or signal
        // for each circle user clicks, see if this is equal to the sequence order, if not player loses
        for (var i = 0; i < clicked.length; i++) {
            if (clicked[i] !== sequence[i]) {
                clearTimeout(timer); // quit timer
                endGame();
                break;
            } else if (clicked.length === sequence.length) {
                var counter = 0;
                for (var i = 0; i < clicked.length; i++) {
                    if (clicked[i] === sequence[i]) {
                        counter++;
                    }
                }
                if (counter === clicked.length) {
                    score++;
                    updateCurrentScore();
                    clearTimeout(timer); // quit timer
                    setTimeout(newSignal, 550);
                } else {
                    clearTimeout(timer); // quit timer
                    endGame();
                }
            }
        }
    }
});
// above code has been tweaked and inspired from website: https://codepen.io/JackBid/pen/ojayNj

function startGame() { // starts the game
    if (!isGameOn) {
        isGameOn = true; // turn game on
        var minicircle = document.getElementsByClassName('mini-circle'); // storing info of mini-circle
        for (var i = 0; i < minicircle.length; i++) // changing mini-circle to green
        {
            minicircle[i].style.backgroundColor = "chartreuse";
        }
        setTimeout(newSignal,3000); // flash a circle after 3 seconds
    }
}

// The following methods are used for when the player loses the game

function endGame() {
    clearTimeout(timer); // quit timer
    var minicircle = document.getElementsByClassName('mini-circle'); // storing info of mini-circle
    for (var i = 0; i < minicircle.length; i++) // changing mini-circle to red
    {
        minicircle[i].style.backgroundColor = "red";
    }
    failFlash(); // flash all circles 5 times
    currentScoreBtn.innerHTML = currentScore; // display score of the game just completed
    if (score > highScore) { // if user beats their high score
        highScore = score; // update the high score
        highestScore = currentScore;
        highScoreBtn.innerHTML = highestScore; // update high score button
    }
    reset();
}

function failFlash() { 
    var i = 0;
    var lose = setInterval(function() {
        flash('.circle');
        i++;
        if (i >= 5) {
            clearInterval(lose);
        }
    }, 800 + 100); // adds a brief pause of 100ms between each flashed circle
}


function updateCurrentScore () { // used for updating button score
    currentScore = (parseInt(currentScore)+1).toString(); // increase score by 1
    if (currentScore.length < 2) { // if score is 1 digit add a 0
        currentScore = '0' + currentScore;
    }

}