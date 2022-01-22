const buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
userClickedPattern = [];
level = 0;

// Detecting Keyboard press
$(document).keypress(function (e) { 
    if(level === 0){
        console.log(e.key);
        nextSequence();
    }
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNum];
    gamePattern.push(randomColor);
    console.log(gamePattern);

    sound_buttonAnimation(randomColor);
    
}


// Detecting Button Clicks

$(".btn").click(function (e) {
    var activeBtn = $(this).attr("id");
    // console.log(activeBtn);
    userClickedPattern.push(activeBtn);
    sound_buttonAnimation(activeBtn);

    checkAnswer(userClickedPattern.length-1);
});
    


// Function for playing sound & Button animation
function sound_buttonAnimation(buttonId) {
    var audio = new Audio("sounds/" + buttonId +".mp3");
    audio.play();

    $("#" + buttonId).addClass("pressed");
    setTimeout(() => { $("#" + buttonId).removeClass("pressed"); }, 100);
}


// Function for checking Answer
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => { nextSequence(); }, 1000);
        }
    }
    else {
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over"); }, 200);
        
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
    
}
