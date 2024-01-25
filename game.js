const html = document.querySelector("html");
html.style.cssText = "margin: 0; padding: 0; box-sizing: border-box;";
const head = document.querySelector("head");
head.innerHTML += 
`
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Holtwood+One+SC&family=VT323&display=swap" rel="stylesheet">
<link rel="shortcut icon" href="simon.png" type="image/x-icon">
`;
const body = document.querySelector("body");
body.style.cssText = "background-color: #555; margin: 0; padding: 0; display: flex; justify-content: space-between; align-items: center; flex-direction: column; gap: 50px;";

let container = document.createElement("div");
container.style.cssText = "width: 100%; display: flex; justify-content: center; align-items:center; flex-direction: column; gap:50px;";
container.id = "container";

let gameTitle = document.createElement("h1");
gameTitle.innerText = "Press Any Key to Start!";
gameTitle.style.cssText = "font-family: 'VT323', monospace; font-size: 55px; color: #bbb; width: 100%; text-align:center;";
gameTitle.id = "gameTitle";

container.append(gameTitle);

let gameContainer = document.createElement("div");
gameContainer.style.cssText = "width: 75%; display:flex; justify-content: center; align-items:center; border-radius: 50%; overflow:hidden; background-color: white; gap: 10px; flex-direction: column; max-width: 600px; position: relative; box-shadow: 0 0px 30px rgba(255,255,255,.5); border: 3px solid rgba(242, 245, 151,.5);";
gameContainer.id = "gameContainer";

let btnStyle = "width:50%; height: 250px;";

let rowStyle = "width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-direction: row;";

let gameRow = document.createElement("div");
gameRow.style.cssText = rowStyle;
gameRow.id = "gameRow1";

let button = document.createElement("div");
button.style.cssText = btnStyle + "background-color: green";
button.classList.add("btn");
button.id = "green";
gameRow.append(button);
button.addEventListener("click", onClick);

button = document.createElement("div");
button.style.cssText = btnStyle + "background-color: red";
button.classList.add("btn");
button.id = "red";
gameRow.append(button);
button.addEventListener("click", onClick);
gameContainer.append(gameRow);

gameRow = document.createElement("div");
gameRow.style.cssText = rowStyle;
gameRow.id = "gameRow2";

button = document.createElement("div");
button.style.cssText = btnStyle + "background-color: yellow";
button.classList.add("btn");
button.id = "yellow";
gameRow.append(button);
button.addEventListener("click", onClick);

button = document.createElement("div");
button.style.cssText = btnStyle + "background-color: blue";
button.classList.add("btn");
button.id = "blue";
gameRow.append(button);
button.addEventListener("click", onClick);
gameContainer.append(gameRow);

let centerLogo = document.createElement("div");
centerLogo.style.cssText = "position: absolute; top: 50%; transform: translateY(-50%) translateX(-50%); left: 50%; width: 75px; height: 75px; background-color: black; border-radius: 50%; color: white; font-size:20px; display: flex; align-items: center; justify-content: center; font-family: 'Holtwood One SC', serif;";
centerLogo.id = "centerLogo";
centerLogo.innerText = "MLH";
gameContainer.append(centerLogo);

container.append(gameContainer);

let author = document.createElement("h3");
author.style.cssText = "width: 100%; text-align:center; font-size: 30px; color: #eee; font-family: 'Arial', sans-serif;";
author.innerText = "Melihcan Şahin";

body.prepend(author);

body.prepend(container);



let gameColorPattern = [];
let playerColorPattern = [];
let level = 1;
let gameStarted = false;
let levelTitle = $("#gameTitle");
const buttonColours = ["red", "blue", "green", "yellow"];

function nextLevel() {
    let randomNumber = Math.round(Math.random() * 3);
    let randomColour = buttonColours[randomNumber];
    gameColorPattern.push(randomColour);
    buttonAnimate(randomColour);
    playSound(randomColour);
    playerColorPattern = [];
}

function resetGame() {
    gameStarted = false;
    level = 1;
    gameColorPattern = [];
    playerColorPattern = [];
}

function checkAnswer(currentLevel) {
    if (gameColorPattern[currentLevel] != playerColorPattern[currentLevel]) {
        resetGame();
        playSound("gameOver");
        levelTitle.text("Game Over! Press any key to restart!");
    }else if(gameColorPattern.length == currentLevel + 1){
        level += 1;
        levelTitle.text("Level: " + level);
        setTimeout(nextLevel, 1000);
    }
}

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function buttonAnimate(currentColour) {
    let button = $("#" + currentColour);
    button.fadeOut(100).fadeIn(100);
    
    button.css({"box-shadow": "0 0 20px white", "background-color": "grey"});
    setTimeout(function () {
        button.css({"box-shadow": "none", "background-color": currentColour});
    }, 100);
}

function onClick() {
    if (!gameStarted) {
        gameStarted = true;
        $("#gameTitle").text("Level: " + level);
        nextLevel();
    } else {
        let userButtonColour = this.id;
        playerColorPattern.push(userButtonColour);
        playSound(userButtonColour);
        buttonAnimate(userButtonColour);
        checkAnswer(playerColorPattern.length - 1);
    }
};

$(document).on("keypress", function () {
    if (!gameStarted) {
        $("#gameTitle").text("Level: " + level);
        nextLevel();
    }
});

function changeStyles() {
    let btn = $(".btn");
    btn.css({ height: btn.width() });
}

window.addEventListener('resize', changeStyles, true);
window.addEventListener('load', changeStyles, true);