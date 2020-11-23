
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {//to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
  if (!started) {
    $("#level-title").text("Level " + level);//The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {// plays the sound of the buttoncolor chosen by the user
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {//check if the most recent user answer is the same as the game pattern
      if (userClickedPattern.length === gamePattern.length){ //then check that they have finished their sequence
        setTimeout(function () { //Call nextSequence() after a 1000 millisecond delay
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}


function nextSequence() {  // fades out the next random color (user has to select this color)
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level); //update the h1 with this change in the value of level
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) { // when the color is pressed give it grey background for 100 milliseconds
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) { //plays the sound of "name" color
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() { //reset conditions
  level = 0;
  gamePattern = [];
  started = false;
}
