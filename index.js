var gamePattern = [];
var gameStarted = false;
var level = 0;
var postionClicks = 0;
var restartGame = false;
function nextSequence() {
  var number = Math.floor(Math.random() * 4);
  return number;
}
var buttonColours = ["red", "blue", "green", "yellow"];

function playAudio(color) {
  var sound = new Audio("./sounds/" + color + ".mp3");
  sound.play();
}
function animateButton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 300);
}
function changeTitle() {
  level++;
  $("h1").text("level " + level);
}
function wrongTitle() {
  $("h1").text("Game Over, Press Any Key To Restart");
  $("body").addClass("game-over");
  var sound = new Audio("./sounds/wrong.mp3");
  sound.play();
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 500);
}

function checkCorrectinput() {
  setTimeout(function () {
    if (gameStarted && postionClicks == gamePattern.length) {
      postionClicks = 0;
      changeTitle();
      setTimeout(randomChosenColour(), 500);
    }
  }, 2500);
}

function randomChosenColour() {
  var randomNumber = nextSequence();
  var color = buttonColours[randomNumber];
  gamePattern.push(color);
  playAudio(color);
  animateButton(color);
}
function startGame() {
  if (gameStarted == true) return;
  gameStarted = true;
  randomChosenColour();
  changeTitle();
}
function handleClick(event) {
  if (gameStarted) {
    console.log(event);
  }
}
function restartGameFun() {
  restartGame = true;
  level = 0;
  postionClicks = 0;
  gamePattern = [];
  gameStarted = false;
}

$("body").keydown(function (event) {
  if ((event.key === "a" || event.key == "A") && restartGame == false) {
    startGame();
  } else if (restartGame == true) {
    restartGame = false;
    startGame();
  }
});
$(".btn").click(function (e) {
  if (gameStarted) {
    let id = $(this).attr("id");
    console.log("id " + id);
    let arrayId = gamePattern[postionClicks];

    if (id == arrayId) {
      postionClicks++;
      playAudio(id);
      animateButton(id);
      checkCorrectinput();
    } else {
      wrongTitle();
      restartGameFun();
    }
  }
});
